const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser")

const app=express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:["http://localhost:5173", "http://localhost:3000","https://job-sprint-opal.vercel.app"],
  credentials:true

}))

/* require  all the routes here */
const authRouter=require("./routes/auth.routes")
const interviewRouter=require("./routes/interview.routes")



/*Using all the routes */

app.use('/api/auth',authRouter)
app.use('/api/interview',interviewRouter)

module.exports=app;