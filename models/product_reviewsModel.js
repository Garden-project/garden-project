const sql = require("./db");

// constructor
const Product_review= function (product_review) {
  this.product = product_review.product;
  this.user = product_review.user;
};

Product_review.create = (newProduct_review, result) => {
  sql.query("INSERT INTO product_review SET ?", newProduct_review, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product_review: ", { id: res.insertId, ...newProduct_review });
    result(null, { id: res.insertId, ...newProduct_review });
  });
};

Product_review.findById = (product_reviewId, result) => {
  sql.query(`SELECT * FROM product_reviews WHERE id = ${product_reviewId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product_review: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product_review with the id
    result({ kind: "not_found" }, null);
  });
};

Product_review.getAll = (result) => {
  sql.query("SELECT * FROM product_reviews", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("product_reviews: ", res);
    result(null, res);
  });
};

Product_review.updateById = (id, product_review, result) => {
  sql.query(
    "UPDATE product_reviews SET areaname = ? WHERE id = ?",
    [
    product_review.areaname,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product_review with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product_review: ", { id: id, ...product_review });
      result(null, { id: id, ...product_review});
    }
  );
};

Product_review.remove = (id, result) => {
  sql.query("DELETE FROM product_reviews WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Product_review with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product_review with id: ", id);
    result(null, res);
  });
};

Product_review.removeAll = (result) => {
  sql.query("DELETE FROM product_reviews", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} product_reviews`);
    result(null, res);
  });
};

module.exports = Product_review;
