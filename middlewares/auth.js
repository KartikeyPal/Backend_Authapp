//auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{
    try {
        //extract jwt token
        //pending: other ways to fetch token
        console.log("cookie ", req.cookies.token);//more secure
        console.log("body ", req.body.token);//less secure
        // console.log("header ", req.cookies.token);//very secure  

        const token = req.cookies.token || req.body.tokens ||req.header("Authorization").replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                success:false,
                message:'token missing'
            })
        }

        //varifying the token
        try {
            const payload = jwt.verify(token,process.env.JWT_SECRET) 
            console.log(payload);

            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid'
            })
        }
        next(); 
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'something went wrong while verifing the token'
        })
    }
}

exports.isStudent  = (req,res,next) =>{
try {
    if(req.user.role !== "Student"){
        return res.status(401).json({
                success:false,
                message:"this is the protected route for student"
        })
    }
    next();
} catch (error) {
    res.status(401).json({
        success:false,
        message:"user role is not matching"
        })
    }
}

exports.isAdmin = (req,res,next) => {
    try {
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                messsage:"this is the protected route for admin"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message: "user role is not matching"
        })
        
    }
}


