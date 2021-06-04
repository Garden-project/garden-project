const Product_review = require("../models/product_reviewsModel");

// Create and Save a new Product_review
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Product_review 
  const product_review = new Product_review ({
    product: req.body.product,
    user: req.body.user,
  });

  // Save Product_review in the database
  Product_review.create(product_review, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product_review.",
      });
    else res.send(data);
  });
};

// Retrieve all Product_reviews  from the database.
exports.findAll = (req, res) => {
    Product_review .getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product_review.",
      });
    else res.send(data);
  });
};

// Find a single Product_review with a product_reviewId
exports.findOne = (req, res) => {
    product_review.findById(req.params.product_reviewId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product_review with id ${req.params.product_reviewId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product_review with id " + req.params.product_reviewId,
        });
      }
    } else res.send(data);
  });
};

// Update a Product_review identified by the product_reviewId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Product_review.updateById(
    req.params.product_reviewId,
    new Product_review(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product_review with id ${req.params.product_reviewId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Product_review with id " + req.params.product_reviewId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Product_review with the specified product_reviewId in the request
exports.delete = (req, res) => {
    Product_review.remove(req.params.product_reviewId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product_review with id ${req.params.product_reviewId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product_review with id " + req.params.product_reviewId,
        });
      }
    } else res.send({ message: `Product_review was deleted successfully!` });
  });
};

// Delete all Product_reviews from the database.
exports.deleteAll = (req, res) => {
    Product_review.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all product_reviews.",
      });
    else res.send({ message: `All product_reviews were deleted successfully!` });
  });
};
