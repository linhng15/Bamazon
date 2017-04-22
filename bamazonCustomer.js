//note: must ask the TA to remove the node modules from git 
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "Bamazon_db"
});

connection.connect(function(error) {
  if (error) {
    console.log("getting the error message inside connection.connect");
    console.log(err);
  } else {
    console.log("connect as id" + connection.threadId);
  }
});

var display = function() {
  connection.query("SELECT * FROM products", function(error, response) {
    // console.log(response);
    for (var i = 0; i < response.length; i++) {
      console.log("ID: " + response[i].item_id + " ||Product: " + response[i].product_name + " ||Department: " + response[i].department_name + " ||Price: " + response[i].price + " ||Quantity: " + response[i].stock_quantity);
    }
    console.log("__________________________________________");
    console.log("Our Inventory!")
    customerDecision();
  });
};


var customerDecision = function() {
    connection.query("SELECT * FROM products"),
      function(error, results) {
        if (error) throw error;
      }
    inquirer.prompt([{
        name: "choice",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].item_id);
          }
          return choiceArray;
        },
        message: "Please input the ID of the product you would like to buy."
      }]).then(function(answer) {
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].item_id === answer.choice) {
              chosenItem = results[i];
              inquirer.prompt([{
                name: "stock_quantity",
                type: "input",
                message: "how many units of the product would you like to buy?",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
              }]).then(function(answer) {
                  //determine if stock quantity < 0 / insufficient or minus the user input
                  if ((product.stock_quantity - chosenItem.stock_quantity) > 0) {
                    connection.query("UPDATE products SET stock_quantity='" + (product.stock_quantity - chosenItem.stock_quantity), function(error, results2) {
                      console.log('Product Bought');
                      display();
                    });
                  } else {
                    console.log("Insufficient quantity!");
                  }
                });
            }
        }
    });
};

display();