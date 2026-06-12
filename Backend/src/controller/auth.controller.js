const userModel=require('../models/user.model')
const tokenBlacklistModel=require("../models/blacklist.model")

const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

/** 
 * @name registerUserController
 * @description register a new user , expects username, email and password form req.body
 * @access Public 
*/
async function registerUser(req,res){

  const {username,email,password}=req.body;

  if(!username || !email || !password){
    return res.status(400).json({
      message:"Please provide username, email, password"
    })
  }

  const userAlreadyExist=await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })

  if(userAlreadyExist){
    return res.status(400).json({
      message:"User Already Exist"
    })
  }

  try{
    const hash=await bcrypt.hash(password,10);

    const user=await userModel.create({
      username,
      email,
      password:hash

    })

    const token=jwt.sign({
      id:user._id, username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token);

    res.status(201).json({
      message:"User Registered Succesfully",
      user:{
        id:user._id,
        username:user.username,
        email:user.email

      }
      
    })

  }

  catch(error){
    console.log(error);
    return res.status(401).json({
      message:"Internal Server Error"
    })

  }

}

/** 
 * @name loginUserController
 * @description login a new user , expects username or email and password form req.body
 * @access Public 
*/
async function loginUser(req,res){

  const {email,password}=req.body;

  const user=await userModel.findOne({
    
      
      email
    
  })

  if(!user){
    return res.status(400).json({
      message:"User Not Exists"
    })

  }

  try{
    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
      return res.status(400).json({
        message:"Password not valid"
      })
    }

    const token=jwt.sign({
      id:user._id , username:user.username
    },process.env.JWT_SECRET, {expiresIn:"1d"})

    res.cookie("token",token);

    res.status(200).json({
      message:"User Logged in succesfully",
      user:{

        id:user._id,
        username:user.username,
        email:user.email
        
      }
    })


  }

  catch(error){
    return res.status(401).json({
      message:"Internal Server error"
    })
  }
}

/** 
 * @name logoutUserController
 * @description logout user , clear token from cookies
 * @access Public 
*/
async function logoutUser(req,res){
  const token=req.cookies.token;

  if(token){
    await tokenBlacklistModel.create({token})
  }
  res.clearCookie("token");

  res.status(200).json({
    message:"User Logged out succesfully"
  })


}

/** 
 * @name getMeController
 * @description get the current logged in user details
 * @access Public 
*/
async function getMe(req,res){
  const user=await userModel.findById(req.user.id)

  res.status(200).json({
    message:"User Details fetched succesfully",
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }
  })

}

module.exports={registerUser,loginUser,logoutUser,getMe};