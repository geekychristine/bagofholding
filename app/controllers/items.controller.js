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
  // grab a single item with the slug
  Item.findOne({ slug: req.params.slug }, (err, item) => {
    if (err) {
      res.status(404);
      res.send("Could not find that item.");
    }

    res.render("items", { item: item, success: req.flash("success") });
  });
}

// Show create Item page
function showCreate(req, res) {
  res.render("create", { errors: req.flash("errors") });
}

// Process create Item form
function processCreate(req, res) {
  const { name, desc, type, rarity, requires_attunement } = req.body;
  // Validate information
  req.checkBody("name", "Name is required.").notEmpty();
  req.checkBody("desc", "Description is required.").notEmpty();
  req.checkBody("type", "Type is required.").notEmpty();
  req.checkBody("rarity", "Rarity is required.").notEmpty();
  req
    .checkBody("requires_attunement", "Requires Attunement is required.")
    .notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.flash(
      "errors",
      errors.map((err) => err.msg)
    );
    return res.redirect("create");
  }

  const attunement = requires_attunement === true ? "requires attunement" : "";

  // Create new item
  const item = new Item({
    name,
    desc,
    type,
    rarity,
    requires_attunement: attunement,
  });

  // SAve the Item
  item.save((err) => {
    if (err) {
      throw err;
    }

    // Set a successful flash message
    req.flash("success", "Successfully created event!");

    // Redirect to newly created item page.
    res.redirect(`/item/${item.slug}`);
  });
}

// Show create Item page
function showEdit(req, res) {
  Item.findOne({ slug: req.params.slug }, (err, item) => {
    if (err) {
      throw err;
    }

    res.render("edit", { item, errors: req.flash("errors") });
  });
}

// Process create Item form
function processEdit(req, res) {
  const { name, desc, type, rarity, requires_attunement } = req.body;
  // Validate information
  req.checkBody("name", "Name is required.").notEmpty();
  req.checkBody("desc", "Description is required.").notEmpty();
  req.checkBody("type", "Type is required.").notEmpty();
  req.checkBody("rarity", "Rarity is required.").notEmpty();
  req
    .checkBody("requires_attunement", "Requires Attunement is required.")
    .notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.flash(
      "errors",
      errors.map((err) => err.msg)
    );
    return res.redirect(`/items/${req.params.slug}/edit`);
  }

  // Find existing item
  Item.findOne({ slug: req.params.slug }, (err, item) => {
    if (err) {
      throw err;
    }

    // Update item
    item.name = name;
    item.desc = desc;
    item.type = type;
    item.rarity = rarity;
    item.requires_attunement = requires_attunement;

    item.save((err) => {
      if (err) throw err;

      // Success flash message
      req.flash("success", "Item successfully updated!");
      //Redirect user to item page
      res.redirect("/items");
    });
  });
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
  showEdit: showEdit,
  processEdit: processEdit,
  showItems: showItems,
  showItem: showItem,
  seedItems: seedItems,
};
