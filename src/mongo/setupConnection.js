const mongoose = require("mongoose");

const setupMongoConnection = async () => {
  console.log("-Connecting to Mongo");
  await mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("--Connected to Mongo");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = setupMongoConnection;
