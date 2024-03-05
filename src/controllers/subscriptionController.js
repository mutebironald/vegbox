const Subscription = require("../models/subscription");

exports.createSubscription = async (req, res) => {
  try {
    const { customerId, frequency } = req.body;
    const subscription = new Subscription({ customer: customerId, frequency });
    await subscription.save();
    return res
      .status(201)
      .json({ message: "Subscription created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { frequency } = req.body;
    const subscription = await Subscription.findOne({ customer: customerId });
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    subscription.frequency = frequency;
    await subscription.save();
    return res
      .status(200)
      .json({ message: "subsciption updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const { customerId } = req.params;
    const subscription = await Subscription.findOneAndDelete({
      customer: customerId,
    });
    if (!subscription) {
      return res.status(404).json({ message: "Subsctiption not found" });
    }
    return res
      .status(200)
      .json({ message: "Subscription canceled successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
