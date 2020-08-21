const items = require("../../data/items.json");

const getItem = query => items.results.find(item => item.slug === query);

module.exports = {
  showItems: (req, res) => {
    res.render("items", { items });
  },
  showItem: (req, res) => {
    res.render("item", { item: getItem(req.params.slug) });
  }
};
