const Item = require("../models/item");
const items = require("../../data/items.json").results;

const getItem = query => items.results.find(item => item.slug === query);

// Show all Items
function showItems(req, res) {
  res.render("items", { items });
}

// Show single Item
function showItem(req, res) {
  res.render("item", { item: getItem(req.params.slug) });
}

function seedItems(req, res) {
  // Use the item model to insert/save
  Item.remove({}, () => {
    for (item of items) {
      let newItem = new Item(item);
      newItem.save();
    }
  });

  // Seeded!
  res.send("Database Seeded!");
}

module.exports = {
  showItems: showItems,
  showItem: showItem,
  seedItems: seedItems
};
