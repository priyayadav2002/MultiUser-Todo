 require('dotenv').config() 
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_PASS)


const userschema = new mongoose.Schema({
  username:String,
  password:String,
  todos:[{
    todo:String,
    description:String,
    completed:Boolean,
  }]
})



const users=mongoose.model("users",userschema)

module.exports={
  users
}



