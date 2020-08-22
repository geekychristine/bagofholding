const Item = require("../models/item");
const itemSeed = require("../../data/items.json").results;

// Show all Items
function showItems(req, res) {
  // grab all items, the {} matches all
  Item.find({}, (err, items) => {
    if (err) {
      res.status(404);
      res.send("No items to display.");
    }

    res.render("items", { items: items });
  });
}

// Show single Item
function showItem(req, res) {
  // grab a single item with the slug ping-pong
  Item.findOne({ slug: req.params.slug }, (err, item) => {
    if (err) {
      res.status(404);
      res.send("Could not find that item.");
    }

    res.render("item", { item: item });
  });
}

// Show create Item page
function showCreate(req, res) {
  res.render("create");
}

// Process create Item form
function processCreate(req, res) {
  console.warn("req", req);
}

function seedItems(req, res) {
  // Use the item model to insert/save
  Item.deleteMany({}, () => {
    for (item of itemSeed) {
      let newItem = new Item(item);
      newItem.save();
    }
  });

  // Seeded!
  res.send("Database Seeded!");
}

module.exports = {
  showCreate: showCreate,
  processCreate: processCreate,
  showItems: showItems,
  showItem: showItem,
  seedItems: seedItems,
};
