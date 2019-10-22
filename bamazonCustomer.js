const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "C5pkhi6r",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    start();

    
});

function start(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        store();
    });
}

function store(){

    
    
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Make a purchase",
                "Exit"
            ]
        })
        .then(function(answer){
            switch (answer.action) {
                case "Make a purchase":
                    purchase();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
};

function purchase(){
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Type the ID of the item you'd like to purchase:"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
        }
    ]).then(function(answer) {
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { item_id: answer.id}, function(err, res){
            if(err) throw err;
            if(res[0].stock_quantity >= answer.quantity){
                var saleAmount = res[0].price * answer.quantity;
                var salesTotal = res[0].product_sales + saleAmount;
                console.log("\nYour purchase total is: $" + saleAmount + "\n ");
                var newQuantity = res[0].stock_quantity - answer.quantity;
                var itemToUpdate = res[0].item_id;
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity,
                            product_sales: salesTotal
                        },
                        {
                            item_id: itemToUpdate
                        }
                    ],function(error){
                        if(error) throw err;
                        start();
                    }
                );
                
                //updateQuantity(newQuantity, res[0].item_id);
            } else {
                console.log("\nInsufficient Quantity in stock! Please try another order.\n")
                start();
            }

        })
    }

)};


