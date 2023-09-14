const mongoose = require("mongoose");



const connectDb = async(DB_URI) => {
   await mongoose.connect(DB_URI);
  };
  
  
  module.exports = connectDb