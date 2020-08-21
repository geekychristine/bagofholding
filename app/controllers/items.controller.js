const Item = require("../models/item");

const getItem = query => items.results.find(item => item.slug === query);

module.exports = {
  showItems: (req, res) => {
    res.render("items", { items });
  },
  showItem: (req, res) => {
    res.render("item", { item: getItem(req.params.slug) });
  },

  // Seed our database
  seedItems: (req, res) => {
    // Create some items from static file
    const items = require("../../data/items.json").results;

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
};
