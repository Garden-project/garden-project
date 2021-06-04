const Area = require("../models/areaModel");

// Create and Save a new Area
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create an Area 
  const area = new Area ({
    areaname: req.body.areaname,
  });

  // Save Area in the database
  Area.create(area, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Area.",
      });
    else res.send(data);
  });
};

// Retrieve all Areas  from the database.
exports.findAll = (req, res) => {
    Area .getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving area.",
      });
    else res.send(data);
  });
};

// Find a single Area with an areaId
exports.findOne = (req, res) => {
    area.findById(req.params.areaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Area with id ${req.params.areaId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Area with id " + req.params.areaId,
        });
      }
    } else res.send(data);
  });
};

// Update an Area identified by the areaId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Area.updateById(
    req.params.areaId,
    new Area(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Area with id ${req.params.areaId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Area with id " + req.params.areaId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete an Area with the specified areaId in the request
exports.delete = (req, res) => {
    Area.remove(req.params.areaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Area with id ${req.params.areaId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Area with id " + req.params.areaId,
        });
      }
    } else res.send({ message: `Area was deleted successfully!` });
  });
};

// Delete all Areas from the database.
exports.deleteAll = (req, res) => {
    Area.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all areas.",
      });
    else res.send({ message: `All areaswere deleted successfully!` });
  });
};
