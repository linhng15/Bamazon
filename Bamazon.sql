CREATE DATABASE Bamazon_db;
USE Bamazon_db;

#Then create a Table inside of that database called products.

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NULL,
	department_name VARCHAR(100) NULL,
	price DECIMAL(10,2) NULL, # (cost to customer)
	stock_quantity INT NULL, # (how much of the product is available in stores)
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

SELECT * FROM products WHERE item_id;