const mongoose = require("mongoose");
const url = process.env.MONGO_DB_CONNECTION_STRING;
const connect = mongoose.connect(
  "mongodb+srv://sreenath:1234@cluster0.x9z2p.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
connect
  .then((db) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
