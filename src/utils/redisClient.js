const redis = require('ioredis');
const client = redis.createClient();

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.log("Error connecting to Redis: ", err);
});

module.exports = client;
