const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const connectDb = async () => {
    try{
    await mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb+srv://swathy:Swathy1996@cluster0.lvwbu.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
      console.log("MongoDB Connected");
    } catch (error) {
      console.log(error);
      process.exit();
    }
  };
  
  module.exports = connectDb