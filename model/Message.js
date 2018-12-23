const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = Schema({
    email: {
      type: String,
      required: true
    },
    message:{
      type:String,
      required:true
    },
    date: {
      type: Date,
      required: true
    }
  });
  
  module.exports = mongoose.model("message", MessageSchema);