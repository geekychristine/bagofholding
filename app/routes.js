// Create a new express router
const express = require("express");
const router = express.Router();
const mainController = require("./controllers/main.controller");
const itemsController = require("./controllers/items.controller");

// Main routes (Bag)
router.get("/", mainController.showHome);

// All available items
router.get("/items/", itemsController.showItems);
router.get("/items/seed", itemsController.seedItems);

// Item detail routes
router.get("/items/:slug", itemsController.showItem);

// Create Item
router.get("/items/create", itemsController.showCreate);
router.post("/items/create", itemsController.processCreate);

// Edit Item
router.get("/items/:slug/edit", itemsController.showEdit);
router.post("/items/:slug", itemsController.processEdit);

// Delete Item
// router.get("/items/delete", itemsController.showDelete);
// router.post("/items/delete", itemsController.processDelete);

//Export the router
module.exports = router;
