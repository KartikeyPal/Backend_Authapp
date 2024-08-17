const express = require("express");
const router = express.Router();

const {login, signup} = require("../controllers/auth");
const {auth, isStudent, isAdmin} = require("../middlewares/auth");

// normal Routes
router.post("/login",login);
router.post("/signup",signup);

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        meessage:"welcome to the Protected test routes"
    })
})

//Protected Routes  
router.get("/student",auth,isStudent,(req,res) => {
    res.json({
        success:true,
        meessage:"welcome to the Protected student routes"
    })
});
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        meessage:"welcome to the Protected admin routes"
    })
});


module.exports = router;