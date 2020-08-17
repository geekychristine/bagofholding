// Grab our dependencies
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const port = process.env.PORT || 8080;

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

// Set the routes
app.use(require("./app/routes"));

// Start our server!
app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
