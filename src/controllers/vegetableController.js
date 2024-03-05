const Vegetable = require("../models/vegetable");

exports.createVegetable = async (req, res) => {
  try {
    const { name, color, price } = req.body;
    const vegetable = new Vegetable({ name, color, price });
    await vegetable.save();
    return res
      .status(201)
      .json({ message: "Vegetable created successfully", vegetable });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllVegetables = async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    return res.status(200).json({ vegetables });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getvegetableById = async (req, res) => {
  try {
    const { vegetableId } = req.params;
    const vegetable = Vegetable.findById(vegetableId);
    if (!vegetable) {
      return res.status(404).json({ message: "Vegetable not found" });
    }
    return res.status(200).json({ vegetable });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateVegetable = async (req, res) => {
  try {
    const { vegetableId } = req.paams;
    const { name, color, price } = req.body;
    const updatedVegetable = await Vegetable.findByIdAndUpdate(
      vegetableId,
      { name, color, price },
      { new: true }
    );
    if (!updatedVegetable) {
      return res.status(404).json({ message: "Vegetable not found" });
    }
    return res
      .status(200)
      .json({ message: "Vegetable successfully updated", vegetable });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteVegetable = async (req, res) => {
  try {
    const { vegetableId } = req.params;
    const deletedVegetable = await Vegetable.findByIdAndDelete(vegetableId);
    if (!deletedVegetable) {
      return res.status(404).json({ message: "Vegetable not found" });
    }
    return res
      .status(200)
      .json({ messsage: "Vegetable deleted successfully", deletedVegetable });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
