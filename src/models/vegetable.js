const { Schema, model } = require("mongoose");

/**
 * could be extended to include nutritional information, category, etc
 */
const vegetableSchema = new Schema({
  name: String,
  color: String,
  price: String,
});

module.exports = model("Vegetable", vegetableSchema);
