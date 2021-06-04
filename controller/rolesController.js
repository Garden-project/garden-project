const Role = require("../models/rolesModel");

// Create and Save a new Role
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a role 
  const role = new Role ({
    rolename: req.body.rolename,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  });

  // Save Rolein the database
  Role.create(role, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Role.",
      });
    else res.send(data);
  });
};

// Retrieve all Roles  from the database.
exports.findAll = (req, res) => {
    Role.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving role.",
      });
    else res.send(data);
  });
};

// Find a single Role with a roleId
exports.findOne = (req, res) => {
    role.findById(req.params.roleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Role with id ${req.params.roleId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Role with id " + req.params.roleId,
        });
      }
    } else res.send(data);
  });
};

// Update a Role identified by the roleId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Role.updateById(
    req.params.roleId,
    new Role(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Role with id ${req.params.roleId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Role with id " + req.params.roleId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Role with the specified roleId in the request
exports.delete = (req, res) => {
    Role.remove(req.params.roleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Role with id ${req.params.roleId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Role with id " + req.params.roleId,
        });
      }
    } else res.send({ message: `Role was deleted successfully!` });
  });
};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
    Role.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all roles.",
      });
    else res.send({ message: `All roles were deleted successfully!` });
  });
};
