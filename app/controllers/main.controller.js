const items = require("../../data/items.json");

const getItem = query => items.results.find(item => item.slug === query);

module.exports = {
  showHome: (req, res) => {
    res.render("home", { items });
  },
  showItem: (req, res) => {
    res.render("item", { item: getItem(req.params.slug) });
  }
};
