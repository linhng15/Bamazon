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
    if (error) {return err;
    }; 
    // console.log(response);
    for (var i = 0; i < response.length; i++) {
      console.log("ID: " + response[i].item_id + " ||Product: " + response[i].product_name + " ||Department: " + response[i].department_name + " ||Price: " + response[i].price + " ||Quantity: " + response[i].stock_quantity);
    }
    console.log("__________________________________________");
    console.log("Our Inventory!")
    // customerDecision();
  });
};

display();
customerDecision();

function customerDecision() {
  inquirer.prompt([{
    type: "input",  
    message: "Please input the ID of the product you would like to buy",
    name: "itemId"
  }]).then(function(response) {
      inquirer.prompt([{
        name: "stockQuantity",
        type: "input",
        message: "how many units of the product would you like to buy?",
      }]).then(function(res){
        var SQLlist = "SELECT stock_quantity, price FROM bamazon_db.products WHERE item_id=" + response.itemId;
        connection.query(SQLlist, function(err, res){
          if (err) throw console.log("error is right here" + err);
          if (res.stock_quantity < res.stockQuantity) {
            console.log("insufficient quantity!");
          } else {
            SQLlist = "UPDATE products SET stock_quantity =" + (res.stock_quantity - res.stockQuantity) + "WHERE item_id=" + response.itemId;
            connection.query(SQLlist, function(err, res){
              if (err) throw err;
              var totalCost = res.stockQuantity * res.price;
              console.log("Total Cost: " + totalCost);
            }) 
          }
        })

      })
    })
}

