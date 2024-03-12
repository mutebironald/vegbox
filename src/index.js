const express = require("express");
const cors = require("cors");

// require("dotenv").config();

const api = require("./routes");
const db = require("./database");
const limiter = require("./middleware/rateLimitingMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/", api);
app.use(limiter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`vegbox listening on port ${port}`);
});
