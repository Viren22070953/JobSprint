const mongoose=require("mongoose")


/**
 * - job Description:string
 * - resume text:String
 * - Self Description:String
 * 
 * -matchScore:Number
 * 
 * -Technical Questions:
 *    [{
 *      question:"",
 *      intention:"",
 *       answer:""
 *    }]
 * -Behavioral Questions:
 *    [{
 *      question:"",
 *      intention:"",
 *       answer:""
 *    }]
 * -Skills gaps :
 *    [{
 *      skill:"",
 *      severity:{
*           type:String,
            enum:["low","medium","high"]
*       }
 *     }]
 * -preparation Plan :[{
 *    day:Number
 *    focus:String,
 *    tasks:[String]
 * }]
 */

const technicalQuestionSchema=new mongoose.Schema({
  question:{
    type:String,
    required:true
  },
  intention:{
    type:String
  },
  answer:{
    type:String,
    required:true
  }
},{_id:false})


const behavioralQuestionSchema=new mongoose.Schema({
  question:{
    type:String,
    required:true
  },
  intention:{
    type:String
  },
  answer:{
    type:String,
    required:true
  }
},{_id:false})

const skillGapSchema=new mongoose.Schema({
  skill:{
    type:String,
    required:true
  },

  severity:{
    type:String,
    enum:["low","medium","high"],
    required:true
  }
},{_id:false})

const preparationPlanSchema=new mongoose.Schema({
  day:{
    type:Number,
    required:true,
  },

  focus:{
    type:String,
    required:true

  },

  tasks:[{
    type:String,
    required:true
  }]


},{_id:false})



const interviewReportSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  jobDescription:{
    type:String,
    required:true
  },

  resume:{
    type:String
  },

  selfDescription:{
    type:String
  },

  matchScore:{
    type:Number,
    min:0,
    max:100
  },

  technicalQuestions:[technicalQuestionSchema],

  behavioralQuestions:[behavioralQuestionSchema],

  skillGaps:[skillGapSchema],

  preparationPlan:[preparationPlanSchema],

  title:{
        type: String,
        required: [ true, "Job title is required" ]
  }





},{timestamps:true})

const interviewReportModel=mongoose.model("InterviewReport",interviewReportSchema)

module.exports=interviewReportModel