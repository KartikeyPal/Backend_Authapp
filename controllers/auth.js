const bcrypt = require("bcrypt");
const User = require('../models/user');
const jwt = require("jsonwebtoken");
// const { options } = require("../routes/user");
require('dotenv').config();
// signup Router
exports.signup = async (req,res)=>{
    try {
        //get data
        const {name,email,password,role} = req.body;
        //check if user is already exit
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exist",
            });
        }
            //secure password
            let hashedPassword;
            try{
                 hashedPassword = await bcrypt.hash(password,10);
            }
            catch(error){
                res.status(400).json({
                    success:false,
                    message:"error in hashing password",
                }); 
            }

            //create entry for the user
            const user = await User.create({
                name,email,password:hashedPassword,role
            })
            return res.status(200).json({
                success:true,
                message:"user created successful",
            })
        }
        catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"user cannot be registered please try again later",
        });        
    }
}

exports.login = async (req,res)=>{
    try {
        // fetching data 
        const {email,password} = req.body;

        // validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill all the details carefully",
            });
            }
            let user= await User.findOne({email});
            // if user is not registered
            if(!user){
                return res.status(401).json({
                    success:false,
                    message:"user does not exist",
                });
            }
            
            const payload ={
                email:user.email,
                id:user._id,
                role:user.role,
            }
            //verify password and generate token
            if( bcrypt.compare(password, user.password)){
                //password matched
                let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});
                user = user.toObject();
                user.token =token;
                user.password=undefined;
                
                const options = {
                    expires: new Date(Date.now()+3*60*60*1000),
                    httpOnly:true,


                }
                res.cookie("token",token,options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:"user logged in successfully"
                })

            }
            else{
                return res.status(403).json({
                    success:false,
                    message:"password incorrect",
                })
            }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
                success:false,
                message:"login failure",
        })
    }
}