module.exports = app => {
    const areas = require("../controller/areaController");
  
    // Create a new Area
    app.post("/areas", areas.create);
  
    // Retrieve all Areas
    app.get("/areas", areas.findAll);
  
    // Retrieve a single Area with areaId
    app.get("/areas/:areaId", areas.findOne);
  
    // Update Areas with areaId
    app.put("/areas/:areaId", areas.update);
  
    // Delete Area with areaId
    app.delete("/areas/:areaId", areas.delete);
  
    // Create a new Area
    app.delete("/areas", areas.deleteAll);
  };