const items = require("../../data/items.json");

module.exports = {
  showHome: (req, res) => {
    res.render("home", { items });
  }
};
