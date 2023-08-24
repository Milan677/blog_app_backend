const express= require("express");
const app=express();
require("dotenv").config();
const{connection}=require("./db");
const{userRouter}=require("./routes/user");
const{authenticate}=require("./middleware/authentication");
const cookieParser = require('cookie-parser');
const cors=require("cors");
const { blogRouter } = require("./routes/blog");



app.use(cors({origin:"*"}))
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("welcome to blogong app")
})

app.use(cookieParser());
app.use("/user",userRouter);
app.use(authenticate);
app.use("/blog",blogRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected with database")
    } catch (error) {
        console.log(error)
    }

    console.log(`app is running on the port ${process.env.port}...`)
})