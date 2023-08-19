const initWebRoutes = require("./routes/web");
const express = require("express");
const connectDB = require("./config/dbConnection");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 6969;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();

initWebRoutes(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
