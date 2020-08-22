// Load environment variables
require("dotenv").config();

// Grab our dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const port = process.env.PORT || 8080;

// Monkey-patch mongoose to default to lean queries
const __setOptions = mongoose.Query.prototype.setOptions;

mongoose.Query.prototype.setOptions = function (options, overwrite) {
  __setOptions.apply(this, arguments);
  if (this.mongooseOptions().lean == null) {
    this.mongooseOptions({ lean: true });
  }
  return this;
};

// Configure our application
// Tell express where our static assets are
app.use(express.static(__dirname + "/public"));

// Set handlebars as template engine
app.engine(
  "hbs",
  handlebars({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

// Connect to database ======================
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set the routes ===========================
app.use(require("./app/routes"));

// Start our server!
app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
