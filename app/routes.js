// Create a new express router
const express = require("express");
const router = express.Router();
const mainController = require("./controllers/main.controller");
const itemsController = require("./controllers/items.controller");

// Main routes (Bag)
router.get("/", mainController.showHome);

// Item detail routes
router.get("/items", itemsController.showItems);
router.get("/item/:slug", itemsController.showItem);

// Create Item
// Edit Item
// Delete Item

//Export the router
module.exports = router;
