const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// require("dotenv").config();

const api = require("./routes");
const db = require("./database");
const limiter = require("./middleware/rateLimitingMiddleware");

const app = express();

app.use(cors());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
// app.use("/api", api);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`vegbox listening on port ${port}`);
});
