var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    start();
});

function start(){
    inquirer.prompt([
        {
            name:"action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        }
    ])
    .then(function(answer){
        switch (answer.action) {
            case "View Products for Sale":
                productsForSale();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
};

function productsForSale(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};

function lowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};

function addInventory(){
    inquirer.prompt([
        {
            name:"item",
            type: "input",
            message: "Enter the ID of the item you'd like to add inventory to?"
        },
        {
            name:"quantity",
            type: "input",
            message: "How many would you like to add?"
        }
    ]).then(function(answer){
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { item_id: answer.item }, function(err, res){
            var newQuantity = parseInt(res[0].stock_quantity) + parseInt(answer.quantity);
            console.log("new quantity should be " + newQuantity);
            var itemToUpdate = res[0].item_id;
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newQuantity
                    },
                    {
                        item_id: itemToUpdate
                    }
                ], function(error){
                    if(error)throw err;
                    console.log("\nInventory Added\n")
                    //console.table(res);
                    start();
                }
            );
        })
    })
};

function addProduct(){
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Name of New Item?"
        },
        {
            name: "category",
            type: "input",
            message: "Category of New Item?"
        },
        {
            name: "price",
            type: "input",
            message: "Price of New Item?"
        },
        {
            name: "quantity",
            type: "input",
            message: "Quantity of New Item In Stock?"
        }
    ]).then(function(answer){
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.name,
                department_name: answer.category,
                price: answer.price,
                stock_quantity: answer.quantity
            },
            function(err, res){
                console.log("\nProduct Added\n");
                start();
            }
        )
    });
};