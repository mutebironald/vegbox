const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Customer = require("../models/customer");
const { isValidEmail, isValidPassword } = require("../utils/validator");
// const Subscription = require("../models/subscription");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Email must be valid" });
    }
    if (!isValidPassword(password)) {
      return res
        .status(400)
        .json({
          message:
            "Password must contain an uppercase, a lowercase, digit, special character and  > 8 characters to be valid ",
        });
    }
    const customer = new Customer({ name, email, password: hashedPassword });
    await customer.save();
    return res.status(201).json({ customer });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(404).json({ message: "Invalid user" });
    }
    const token = jwt.sign(
      { customerId: customer._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { id: customerId } = req.params;
    const { preferences } = req.body;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ message: `Customer with id ${customerId} not found` });
    }
    customer.preferences = preferences;
    await customer.save();
    return res
      .status(200)
      .json({ message: "customer preferences updated", customer });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// exports.updateSubscription = async (req, res) => {
//   try {
//     //
//     const { customerId } = req.params;
//     const { frequency } = req.body;
//     const subscription = await Subscription.findOne({ customer: customerId });
//     if (!subscription) {
//       return res.status(404).json({ message: "Subscription not found" });
//     }
//     subscription.frequency = frequency;
//     await subscription.save();
//     return res
//       .status(200)
//       .json({ message: "subscription updated successfully" });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
