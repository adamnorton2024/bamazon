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
    if(err) throw err;
    start();
});

function start(){
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
                "Exit"
            ]
        }).then(function(answer){
            switch(answer.action) {
                case "View Product Sales by Department":
                    viewSales();
                    break;
                case "Create New Department":
                    newDept();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
};


function viewSales(){
    var query = "SELECT departments.department_name,  (sum(products.product_sales) - min(departments.over_head_costs)) AS total_profit ";
    query += "FROM departments INNER JOIN products ON (departments.department_name = products.department_name)";
    query += "GROUP BY department_name";

    connection.query(query, function (err, res){
        if(err) throw err;
        console.table(res);
        start();
    });
};

function newDept(){
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message:"What is the new department name?"
        },
        {
            name: "overhead",
            type: "input",
            message: "What are the overhead costs?"
        }
    ]).then(function(answer){
        connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: answer.department,
                over_head_costs: answer.overhead
            },
            function(err){
                if(err) throw err;
                console.log(" \n Department Created \n ");
                start();
            }
            
        ) 
    });
};