const Box = require("../models/box");

exports.getBoxContents = async (req, res) => {
  try {
    const { boxId } = req.params;
    const box = await Box.findById(boxId).populate("contents");
    if (!box) {
      return res.json(404).json({ message: "Box not found" });
    }
    return res.status(200).json({ contents: box.contents });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.swapItems = async (req, res) => {
  try {
    const { boxId, itemIdToReplace, newItemId } = req.body;
    const box = await Box.findById(boxId);
    if (!box) {
      return res.status(404).json({ message: "box Not found" });
    }
    const itemIndex = box.contents.findIndex(
      (item) => item.toString() === itemIdToReplace
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in box" });
    }
    box.contents[itemIndex] = newItemId;
    await box.save();
    return res.status(200).json({ message: "Item swapped successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
