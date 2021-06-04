module.exports = app => {
    const roles= require("../controller/rolesController");
  
    // Create a new Role
    app.post("/roles", roles.create);
  
    // Retrieve all Roles
    app.get("/roles", roles.findAll);
  
    // Retrieve a single Role with roleId
    app.get("/roles/:roleId", roles.findOne);
  
    // Update Roles with roleId
    app.put("/roles/:roleId", roles.update);
  
    // Delete a Role with roleId
    app.delete("/roles/:roleId", roles.delete);
  
    // Create a new Role
    app.delete("/roles", roles.deleteAll);
  };