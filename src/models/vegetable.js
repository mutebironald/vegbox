const { Schema, model } = require("mongoose");

/**
 * could be extended to include nutritional information, category, etc
 */
const vegetableSchema = new Schema({
  name: {type: String, required: true, unique: true },
  color: { type: String, required: true },
  price: { type: String, required: true},
});

module.exports = model("Vegetable", vegetableSchema);
