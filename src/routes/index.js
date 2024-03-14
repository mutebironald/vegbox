const express = require("express");
const router = express.Router();
const {
  getBoxContents,
  swapItems,
  createBox,
  updateBox,
} = require("../controllers/boxController");

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
//Apply error handling middleware for all routes
router.use(errorHandlingMiddleware);

router.get("/hello", cacheMiddleware, (req, res) => {
  return res.status(200).json(result);
});

//add the other routes

//vegetables
router.post("/vegetables", authMiddleware, createVegetable);
router.get("/vegetables", authMiddleware, cacheMiddleware, getAllVegetables);
router.get(
  "/vegetables/:id",
  authMiddleware,
  cacheMiddleware,
  getvegetableById
);
router.put("/vegetables/:id", authMiddleware, updateVegetable);
router.delete("/vegetables/:id", authMiddleware, deleteVegetable);

// subscriptions
router.post("/subscriptions", authMiddleware, createSubscription);
router.put("/subscriptions/:id", authMiddleware, updateSubscription);
router.delete("/subscriptions/:id", authMiddleware, cancelSubscription);

//customers
router.post("/customers/register", register);
router.post("/customers/login", login);
router.put("/customers/:id/preferences", authMiddleware, updatePreferences);

//box
router.post("/boxes/swap", authMiddleware, swapItems);
router.post("/boxes/:id", authMiddleware, createBox);
router.put("/boxes/:id/update", authMiddleware, updateBox);
router.get(
  "/boxes/:boxId/contents",
  authMiddleware,
  // cacheMiddleware,
  getBoxContents
);

module.exports = router;
