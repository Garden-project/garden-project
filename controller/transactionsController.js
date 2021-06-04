const Transaction = require("../models/transactionsModel");

// Create and Save a new Transaction 
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Transaction 
  const transaction  = new Transaction ({
    token: req.body.token,
    xrefid: req.body.xrefid,
    transactionid: req.body.transactionid,
    totalamount: req.body.totalamount,
    payinguser: req.body.payinguser,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  });

  // Save Transaction  in the database
  Transaction.create(transaction, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction.",
      });
    else res.send(data);
  });
};

// Retrieve all Transaction  from the database.
exports.findAll = (req, res) => {
    Transaction .getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    else res.send(data);
  });
};

// Find a single Transaction with a transactionId
exports.findOne = (req, res) => {
    transaction.findById(req.params.transactionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transaction with id ${req.params.transactionId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Transaction with id " + req.params.transactionId,
        });
      }
    } else res.send(data);
  });
};

// Update a Transaction identified by the transactionId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Transaction.updateById(
    req.params.transactionId,
    new Transaction(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Transaction with id ${req.params.transactionId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Transaction with id " + req.params.transactionId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Transaction with the specified transactionId in the request
exports.delete = (req, res) => {
    Transaction.remove(req.params.transactionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transaction with id ${req.params.transactionId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Transaction with id " + req.params.transactionId,
        });
      }
    } else res.send({ message: `Transaction was deleted successfully!` });
  });
};

// Delete all Transactions from the database.
exports.deleteAll = (req, res) => {
    Transaction.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all transactions.",
      });
    else res.send({ message: `All Transactions were deleted successfully!` });
  });
};
