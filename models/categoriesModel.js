const sql = require("./db");

// constructor
const Category = function (category) {
  this.category_name = category.category_name;
  this.category_image = category.category_image;
  this.created_at = category.created_at;
  this.updated_at = category.updated_at;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO category SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created category: ", { id: res.insertId, ...newCategory });
    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.findById = (categoryId, result) => {
  sql.query(`SELECT * FROM categories WHERE id = ${categoryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found category: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Category with the id
    result({ kind: "not_found" }, null);
  });
};

Category.getAll = (result) => {
  sql.query("SELECT * FROM categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("categories: ", res);
    result(null, res);
  });
};

Category.updateById = (id, category, result) => {
  sql.query(
    "UPDATE categories SET category_name = ?, category_image = ?, created_at = ?, updated_at = ? WHERE id = ?",
    [
      category.category_name,
      category.category_image,
      category.created_at,
      category.updated_at,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Category with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated category: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {
  sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Category with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted category with id: ", id);
    result(null, res);
  });
};

Category.removeAll = (result) => {
  sql.query("DELETE FROM categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} categories`);
    result(null, res);
  });
};

module.exports = Category;
