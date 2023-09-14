const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const connectDb = async () => {
    try {
      await mongoose.connect(process.env.MongoDb_Url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("MongoDB Connected");
    } catch (error) {
      console.log("Error");
      process.exit();
    }
  };
  
  module.exports = connectDb