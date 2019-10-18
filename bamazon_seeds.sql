USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES
    ("Gears of War 5", "Video Games", 59.99, 30 ),
    ("Assassin's Creed Odyssey", "Video Games", 39.99, 20 ),
    ("80 inch TV", "Electronics", 10559, 9 ),
    ("RAW Cashews", "Food", 4.99, 8 ),
    ("Jack Daniels", "Alcohol", 34.99, 2 ),
    ("Macbook Pro", "Electronics", 2500, 49 ),
    ("DJI Mavic Pro Drone", "Electronics", 999.99, 14 ),
    ("Desk Chair", "Furniture", 20, 4 ),
    ("Computer Desk", "Furniture", 69.99, 17 ),
    ("Office Trash Bin", "Furniture", 9.99, 256 );

    SELECT * FROM products;

INSERT INTO departments (department_name, over_head_costs)
    VALUES
    ("Video Games", 5000),
    ("Electronics", 12000),
    ("Food", 2500),
    ("Alcohol", 3000),
    ("Furniture", 1500);

    SELECT * FROM departments;

