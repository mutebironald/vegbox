const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  frequency: { type: String, enum: ["weekly", "fortnightly", "monthly"] },
});

module.exports = model("Subscription", subscriptionSchema);
