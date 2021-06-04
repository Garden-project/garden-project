module.exports = app => {
    const products = require("../controller/productsController");
  
    // Create a new Product
    app.post("/products", products.create);
  
    // Retrieve all Products
    app.get("/products", products.findAll);
  
    // Retrieve a single Product with productId
    app.get("/products/:productId", products.findOne);
  
    // Update a Product with productId
    app.put("/products/:productId", products.update);
  
    // Delete a Product with productId
    app.delete("/products/:productId", products.delete);
  
    // Create a new Product
    app.delete("/products", products.deleteAll);
  };