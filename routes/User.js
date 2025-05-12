const express=require("express");
const router=express.Router();
const User=require("../models/User.js");
const passport=require("passport");
const flash = require('connect-flash');
router.get("/signup",(req,res)=>{
    res.render("User/signup.ejs");
});
router.post("/signup",async(req,res)=>{
    try{
    let{username,Email,password}=await req.body;
     const newUser=await new User({Email,username});
     const registerUser=await User.register(newUser,password);
    await console.log(registerUser);
    req.flash("success","Welcome to AutoTravel!");
    res.redirect("/listings");
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/listings");
    }
});
router.get("/login",(req,res)=>{
    res.render("User/login.ejs");
});
router.post("/login",passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),async(req,res)=>{
    req.flash("success","Welcome to AutoTravel You are Logged in!");
    res.redirect("/listings");
});
module.exports=router;