const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// include routes 
require("./routes/customersRoutes")(app);
require("./routes/productsRoutes")(app);
require("./routes/categoriesRoutes")(app);
require("./routes/transactionsRoutes")(app);
require("./routes/areaRoutes")(app);
require("./routes/product_reviewsRoutes")(app);
require("./routes/rolesRoutes")(app);

// parse application/json
app.use(bodyParser.json());
 

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});



















































