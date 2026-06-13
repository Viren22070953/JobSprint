const express=require("express")
const authMiddleware=require("../middleware/auth.middleware")
const interviewController=require("../controller/interview.controller")

const upload=require("../middleware/file.middleware")

const router=express.Router();




/**
 * @route Post /api/interview
 * @description genarare new interview report on the basis of user self description, resume pdf and job description
 * @access Private
 */
router.post('/report-generate' , authMiddleware.authUser , upload.single("resume") , interviewController.generateInterviewReportController)


module.exports=router;