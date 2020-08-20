// Create a new express router
const express = require("express");
const router = express.Router();
const mainController = require("./controllers/main.controller");

// Main routes (Bag)
router.get("/", mainController.showHome);

// Item detail routes
router.get("/item/:slug", mainController.showItem);

// Create Item
// Edit Item
// Delete Item

//Export the router
module.exports = router;
