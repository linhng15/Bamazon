//note: must ask the TA to remove the node modules from git 
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port:3306,
	user: "root",
	password: "password",
	database: "Bamazon_db"
});

connection.connect(function(error){
	if(error) {
		console.log("getting the error message inside connection.connect");
	console.log(err); 
	} else{
		console.log("connect as id" + connection.threadId);
		console.log("Items available for sale!!!!")
	}
});

connection.query("SELECT * FROM products", function(error, response){
	// console.log(response);
	for (var i = 0; i < response.length; i++) {
		console.log("ID: " +response[i].item_id + " ||Product: " + response[i].product_name + " ||Department: " + response[i].department_name + " ||Price: " + response[i].price + " ||Quantity: " + response[i].stock_quantity);
	}
	console.log("__________________________________________");
});

var customerChoice = function(){
	inquirer.prompt({
		name: "customer",
		type: "input",
		message: "Please input the ID of the product you would like to buy."
	}).then
};

/*Then create a Node application called bamazonCustomer.js. 

The app should then prompt users with two messages.
The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.
Once the customer has placed the order, 
your application should check if your store has enough of the product to meet the customer's request.
If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
However, if your store does have enough of the product, you should fulfill the customer's order.
This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase. */
