const Bag = require("../models/bag");
const utils = require("../utils");

// Show all Items in Bag
function showBag(req, res) {
  // grab all items, the {} matches all
  Bag.find({}, (err, bag) => {
    if (err) {
      res.status(404);
      res.send("No items to display.");
    }

    res.render("home", { items: bag.items, success: req.flash("success") });
  });
}

// Add item to bag
async function processAdd(req, res) {
  const item = await utils.queryItem(req.params.slug);

  Bag.find({})
    .lean(false)
    .exec((err, bag) => {
      if (err) {
        res.status(404);
        res.send("No bags to display.");
      }

      console.log(item._id);
      console.log(bag);
      // Add item to Bag
      // bag.items.push(item._id);

      // Save bag to DB
      // bag.save((err) => {
      //   if (err) throw err;

      //   // Success flash message
      //   req.flash("success", "Bag updated!");
      //   //Redirect user to home page
      //   res.redirect("/");
      // });

      // console.log(bag);
    });
}

// Remove item from bag

function seedBag(req, res) {
  // Use the item model to insert/save
  Bag.deleteMany({}, () => {
    const bag = new Bag({ items: [] });
    bag.save();
  });

  // Seeded!
  res.send("Bag Seeded!");
}

module.exports = {
  showBag: showBag,
  processAdd: processAdd,
  seedBag: seedBag,
};
