const Category = require("../models/categoriesModel");

// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Category
  const category = new Category({
    category_name: req.body.category_name,
    category_image: req.body.category_image,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  });

  // Save Category in the database
  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
    else res.send(data);
  });
};

// Retrieve all Category from the database.
exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    else res.send(data);
  });
};

// Find a single Category with a categoryId
exports.findOne = (req, res) => {
    category.findById(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.categoryId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Category with id " + req.params.categoryId,
        });
      }
    } else res.send(data);
  });
};

// Update a Category identified by the categoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Category.updateById(
    req.params.categoryId,
    new Category(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Category with id ${req.params.categoryId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Category with id " + req.params.categoryId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Category with the specified categoryId in the request
exports.delete = (req, res) => {
    Category.remove(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.categoryId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Category with id " + req.params.categoryId,
        });
      }
    } else res.send({ message: `Category was deleted successfully!` });
  });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    Category.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories.",
      });
    else res.send({ message: `All Categories were deleted successfully!` });
  });
};
