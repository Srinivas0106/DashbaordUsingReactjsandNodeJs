const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    // No deprecated options needed
  };
  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Could not connect to database!", error); // Better error handling
  }
};
