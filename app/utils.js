const Item = require("./models/item");

// function to slugify a name
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

const queryItem = (slug) => {
  const item = Item.findOne({ slug: slug }, (err, item) => {
    if (err) {
      return "Could not find that item.";
    }
    return item;
  });

  return item;
};

module.exports = {
  slugify,
  queryItem,
};
