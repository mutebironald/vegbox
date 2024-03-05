const { Schema, model } = require("mongoose");

const boxSchema = new Schema({
  contents: [{ type: Schema.Types.ObjectId, ref: "Vegetable" }],
});

module.exports = model("Box", boxSchema);
