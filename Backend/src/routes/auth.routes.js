const express=require("express")
const router=express.Router();
const authController=require("../controller/auth.controller")
const authMiddleware=require("../middleware/auth.middleware")

/**
 * @router POST /api/auth/register
 * @description Register a new User
 * @acces Public 
 */
router.post('/register',authController.registerUser);

/**
 * @router POST /api/auth/login
 * @description login User
 * @acces Public 
 */
router.post('/login',authController.loginUser);

/**
 * @router GET /api/auth/logout
 * @description clear token from user cookie add token in the blacklist
 * @acces Public 
 */
router.get("/logout",authController.logoutUser)

/**
 * @router GET /api/auth/get-me
 * @description get the current logged in user details
 * @acces Public 
 */
router.get("/get-me",authMiddleware.authUser,authController.getMe)

module.exports=router;