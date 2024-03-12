const express = require("express");
const router = express.Router();
const { getBoxContents, swapItems } = require("../controllers/boxController");

const {
  register,
  login,
  updatePreferences,
} = require("../controllers/customerController");

const {
  createSubscription,
  updateSubscription,
  cancelSubscription,
} = require("../controllers/subscriptionController");

const {
  createVegetable,
  getAllVegetables,
  getvegetableById,
  updateVegetable,
  deleteVegetable,
} = require("../controllers/vegetableController");
const loggingMiddleware = require("../middleware/loggingMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const errorHandlingMiddleware = require("../middleware/errorHandlingMiddleware");
const cacheMiddleware = require("../middleware/cachingMiddleware");
router.use(loggingMiddleware);

const redisClient = require("../utils/redisClient");

router.get("/hello", cacheMiddleware, (req, res) => {
  const result = "Hello, from Vegbox";
  redisClient.set(req.originalUrl, JSON.stringify(result), (err) => {
    if (err) {
      console.log("Error caching items:", err);
    }
    return res.status(200).json(result);
  });
});

//add the other routes

//vegetables
router.post("/vegetables", createVegetable);
router.get("/vegetables", cacheMiddleware, getAllVegetables);
router.get("/vegetables/:id", cacheMiddleware, getvegetableById);
router.put("/vegetables/:id", updateVegetable);
router.delete("/vegetables/:id", deleteVegetable);

// subscriptions
router.post("/subscriptions", createSubscription);
router.put("/subscriptions/:id", updateSubscription);
router.delete("/subscriptions/:id", cancelSubscription);

//customers
router.post("/customers/register", register);
router.post("/customers/login", login);
router.put("/customers/:id/preferences", updatePreferences);

//box
router.get(
  "/boxes/:boxId/contents",
  // authMiddleware,
  // cacheMiddleware,
  getBoxContents
);
router.post("/boxes/:boxId/swap", swapItems);

//Apply error handling middleware for all routes
router.use(errorHandlingMiddleware);
module.exports = router;
