const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a data schema
const bagSchema = new Schema({
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

// Create the model
const bagModel = mongoose.model("Bag", bagSchema);

// Export the model
module.exports = bagModel;
