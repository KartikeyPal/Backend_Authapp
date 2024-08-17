const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");

//cookie parser => what is this and why we need this
app.use(cookieParser());
app.use(express.json());


require("./config/database").connectDB();

const user = require("./routes/user.js");
app.use("/api/v1",user);

app.listen(PORT,(req,res)=>{
    console.log(`App is running at port no. ${PORT}`)
}) 

app.get("/api/v1",(req,res)=>{
    res.send("ye lo ho gya chalu")
})