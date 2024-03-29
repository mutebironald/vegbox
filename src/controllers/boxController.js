const Box = require("../models/box");
const redisClient = require("../utils/redisClient");

exports.getBoxContents = async (req, res) => {
  try {
    const { boxId } = req.params;
    const box = await Box.findById(boxId).populate("contents");
    if (!box) {
      return res.status(404).json({ message: "Box not found" });
    }
    redisClient.set(req.originalUrl, JSON.stringify(box), (err) => {
      if (err) {
        console.log("Error caching items: ", err);
      }
      return res.status(200).json({ contents: box.contents });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.swapItems = async (req, res) => {
  try {
    const { boxId, itemIdToReplace, newItemId } = req.body;
    const box = await Box.findById(boxId);
    if (!box) {
      return res.status(404).json({ message: "Box Not found" });
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

exports.createBox = async (req, res) => {
  try {
    const { id } = req.params;
    const { vegetableId } = req.body;
    let vegetableIds;
    const box = await Box.findById(id);
    if (!box) {
      vegetableIds = [vegetableId];
      const newBox = new Box({ contents: vegetableIds });
      await newBox.save();
      return res.status(201).json({ box: newBox, message: "Box created" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateBox = async (req, res) => {
  const { id } = req.params;
  const box = await Box.findById(id);
  const { vegetableId } = req.body;
  if (!box) {
    return res
      .status(400)
      .json({ message: "Ensure that box being updated is present" });
  }
  vegetableIds = [...box.contents, vegetableId];
  box.contents = vegetableIds;
  box.save();
  return res.status(201).json({ box, message: "Box has been Updated " });
};
