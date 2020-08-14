// Grab our dependencies
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// Configure our application

// Set the routes
app.get("/", (req, res) => {
  res.send("Hello, I'm the App!");
});

// Start our server!
app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
