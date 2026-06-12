const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser")

const app=express();
app.use(express.json());

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true

}))

/* require  all the routes here */
const authRouter=require("./routes/auth.routes")



/*Using all the routes */
app.use(cookieParser());
app.use('/api/auth',authRouter)

module.exports=app;