const mongoose = require("mongoose");



const connectDb = (DB_URI) => {
    mongoose.connect(DB_URI);
  };
  
  
  module.exports = connectDb