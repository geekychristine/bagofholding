// Create a new express router
const express = require("express");
const router = express.Router();
const mainController = require("./controllers/main.controller");

router.get("/", mainController.showHome);
router.get("/item/:slug", mainController.showItem);

//Export the router
module.exports = router;
