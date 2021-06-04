const sql = require("./db");

// constructor
const Transaction = function (transaction) {
  this.token = transaction.token;
  this.xrefid = transaction.xrefid;
  this.transactionid = transaction.transactionid;
  this.totalamount = transaction.totalamount;
  this.payinguser = transaction.payinguser;
  this.created_at = transaction.created_at;
  this.updated_at = transaction.updated_at;
};

Transaction.create = (newTransaction, result) => {
  sql.query("INSERT INTO transaction SET ?", newTransaction, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created transaction: ", { id: res.insertId, ...newTransaction });
    result(null, { id: res.insertId, ...newTransaction });
  });
};

Transaction.findById = (transactionId, result) => {
  sql.query(`SELECT * FROM transactions WHERE id = ${transactionId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found transaction: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Transaction with the id
    result({ kind: "not_found" }, null);
  });
};

Transaction.getAll = (result) => {
  sql.query("SELECT * FROM transactions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("transactions: ", res);
    result(null, res);
  });
};

Transaction.updateById = (id, transaction, result) => {
  sql.query(
    "UPDATE transactions SET token = ?, xrefid = ?, transactionid = ?, totalamount = ?, payinguser = ?, created_at = ?, updated_at = ? WHERE id = ?",
    [
      transaction.token,
      transaction.xrefid,
      transaction.transactionid,
      transaction.totalamount,
      transaction.payinguser,
      transaction.created_at,
      transaction.updated_at,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Transaction with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated transaction: ", { id: id, ...transaction });
      result(null, { id: id, ...transaction });
    }
  );
};

Transaction.remove = (id, result) => {
  sql.query("DELETE FROM transactions WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Transaction with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted transaction with id: ", id);
    result(null, res);
  });
};

Transaction.removeAll = (result) => {
  sql.query("DELETE FROM transactions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} transactions`);
    result(null, res);
  });
};

module.exports = Transaction;
