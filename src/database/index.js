const { connect } = require("mongoose");

const url = process.env.MONGO_URI;

const connectDB = connect(url)
  .then(
    () => console.log("Database connected-----"),
    (error) => console.log("Error connecting to database----", error)
  )
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

class Database {
  constructor() {
    connectDB();
  }

  getInstanceStatus() {
    return process.env.NODE_ENV === "production" ? "__production" : "__staging";
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new Database();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
