const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:[true,"User name already exist"]
  },

  email:{
    type:String,
    unique:[true,"Account already exist with this email"],
    required:true
  },

  password:{
    type:String,
    required:true,

  }

})

const userModel=mongoose.model("User",userSchema);

module.exports=userModel;