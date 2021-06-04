module.exports = app => {
    const product_reviews = require("../controller/product_reviewsController");
  
    // Create a new Product_review
    app.post("/product_reviews", product_reviews.create);
  
    // Retrieve all Product_reviews
    app.get("/product_reviews", product_reviews.findAll);
  
    // Retrieve a single Product_review with product_reviewId
    app.get("/product_reviews/:product_reviewId", product_reviews.findOne);
  
    // Update Product_reviews with product_reviewId
    app.put("/product_reviews/:product_reviewId", product_reviews.update);
  
    // Delete a Product_review with product_reviewId
    app.delete("/product_reviews/:product_reviewId", product_reviews.delete);
  
    // Create a new Product_review
    app.delete("/product_reviews", product_reviews.deleteAll);
  };