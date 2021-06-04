module.exports = app => {
    const transactions = require("../controller/transactionsController");
  
    // Create a new Transaction
    app.post("/transactions", transactions.create);
  
    // Retrieve all Transactions
    app.get("/transactions", transactions.findAll);
  
    // Retrieve a single Transaction with transactionId
    app.get("/transactions/:transactionId", transactions.findOne);
  
    // Update Transactions with transactionId
    app.put("/transactions/:transactionId", transactions.update);
  
    // Delete a Transaction with transactionId
    app.delete("/transactions/:transactionId", transactions.delete);
  
    // Create a new Transaction
    app.delete("/transactions", transactions.deleteAll);
  };