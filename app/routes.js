// Create a new express router
const express = require("express");
const router = express.Router();
// const mainController = require("./controllers/main.controller");
const bagController = require("./controllers/bag.controller");
const itemsController = require("./controllers/items.controller");

// Main routes (Bag)
router.get("/", bagController.showBag);
router.get("/add/:slug", bagController.processAdd);

// All available items
router.get("/items/", itemsController.showItems);
router.get("/items/seed", itemsController.seedItems);

// Create Item
router.get("/items/create", itemsController.showCreate);
router.post("/items/create", itemsController.processCreate);

// Edit Item
router.get("/items/:slug/edit", itemsController.showEdit);
router.post("/items/:slug", itemsController.processEdit);

// Delete Item
router.get("/items/:slug/delete", itemsController.deleteItem);

// Item detail routes
router.get("/items/:slug", itemsController.showItem);

//Export the router
module.exports = router;
