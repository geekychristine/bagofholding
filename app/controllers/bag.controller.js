const Bag = require("../models/bag");

// Show all Items in Bag
function showItems(req, res) {
  // grab all items, the {} matches all
  Bag.find({}, (err, bag) => {
    if (err) {
      res.status(404);
      res.send("No items to display.");
    }

    res.render("home", { bag: bag.items, success: req.flash("success") });
  });
}

// Add item to bag

// Remove item from bag

module.exports = {
  showItems: showItems,
};
