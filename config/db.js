const mongoose = require("mongoose");
// connect("host[:port]/mydb");
require("dotenv").config({ path: "variables.env" });

const URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost/databasetest";

const conectarDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
  } catch (error) {
    console.log("Errorrrr:", error);
    process.exit(1); //En caso de error se detiene la app
  }
};

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Data base is connected");
});
module.exports = conectarDB;
