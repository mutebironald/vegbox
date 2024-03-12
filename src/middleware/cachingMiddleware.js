const redisClient = require("../utils/redisClient");
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  redisClient.get(key, (err, data) => {
    console.log(key, "------++");
    if (err) {
      console.log("Error getting data from cache: ", err);
      return next(); // proceed to next middleware or route handler
    }
    if (data) {
      console.log("Data found in cache----");
      return res.status(200).json(JSON.parse(data));
    } else {
      console.log("Data not found in cache");
      return next();
    }
  });
};

module.exports = cacheMiddleware;
