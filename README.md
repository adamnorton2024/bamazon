# Bamazon

## To install and run Bamazon:

1. Download the repo. 
2. Use the bmazon_schema.sql to create your database and tables in MySQL.
3. Use the bamazon_seeds.sql to add temp data to your tables, or add your own if you prefer. 
4. Open bamazonCustomer.js, bamazonManager.js, and bamazonSupervisor.js add your own password between the "" on the line that says "Password" in order to connect to your own database.  
5. Open a terminal or command line window, and naviate the folder containing the app. 
6. On the command line, type "npm install".  This will install the required modules to run the app. 
7. At this point, you can type "node bamazonCustomer.js", or use either of the other javascript filenames in order to run the module of your choice. 

## Customer Module

On the command line, type "node bamazonCustomer.js" in order to run the customer module. Here you can see the times available for sale. You can also place an order of an item and the quantity you'd like.  It'll either tell you the total, and reduce the inventory by the amount you purchased, or it'll tell you insufficient quantity if there are not enough items in stock. 

## Manager Module

On the command line, type "node bamazonManager.js" in order to run the Manager module. Here you can see the items available for sale, or you can check which items are low inventory.  You can add to the inventory, or add new items as well. 

## Supervisor Module

On the command line, type "node bamazonSupervisor.js" in order to run the Supervisor module. Here you can see the department list, the over head of each department, the sales of each department, as well as the profit per department. You can add new departments.  The functionality actually does work as it adds the new department to the table.  However, I was not able to get it to list that department into the table for some reason. 

## Video

Please view the bamazon video in the repo to see the app in action!

