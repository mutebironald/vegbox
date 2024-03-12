const { Schema, model } = require("mongoose");

const customerSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true},
  preferences: [String],
  subscription: { type: String, enum: ["weekly", "fortnightly", "monthly"] },
});

module.exports = model("Customer", customerSchema);
