const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const connectDb = (DB_URI) => {
    mongoose.connect(DB_URI);
  };
  
  
  module.exports = connectDb