const sql = require("./db");

// constructor
const Role= function (role) {
  this.rolename =role.rolename;
  this.created_at =role.created_at;
  this.updated_at =role.updated_at;
};

Role.create = (newRole, result) => {
  sql.query("INSERT INTO role SET ?", newRole, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("createdroles: ", { id: res.insertId, ...newRole });
    result(null, { id: res.insertId, ...newRole});
  });
};

Role.findById = (roleId, result) => {
  sql.query(`SELECT * FROM roles WHERE id = ${roleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found role: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Role with the id
    result({ kind: "not_found" }, null);
  });
};

Role.getAll = (result) => {
  sql.query("SELECT * FROM roles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("roles: ", res);
    result(null, res);
  });
};

Role.updateById = (id, role, result) => {
  sql.query(
    "UPDATE roles SET rolename = ?, created_at = ?, updated_at = ? WHERE id = ?",
    [
      role.rolename,
      role.created_at,
      role.updated_at,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Role with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated role: ", { id: id, ...role });
      result(null, { id: id, ...role});
    }
  );
};

Role.remove = (id, result) => {
  sql.query("DELETE FROM roles WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Role with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted role with id: ", id);
    result(null, res);
  });
};

Role.removeAll = (result) => {
  sql.query("DELETE FROM roles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} roles`);
    result(null, res);
  });
};

module.exports = Role;
