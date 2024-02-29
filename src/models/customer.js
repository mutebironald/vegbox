const { Schema, model } = require("mongoose");

const customerSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  preferences: [String],
  subscription: { type: String, enum: ["weekly", "fortnightly", "monthly"] },
});

models.exports = model("Customer", customerSchema);
