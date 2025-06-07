const User=require("../models/User.js");
module.exports.signup=(req,res)=>{
    res.render("User/signup.ejs");
};
module.exports.postSignup=async(req,res)=>{
    try{
    let{username,Email,password}=await req.body;
     const newUser=new User({Email,username});
     const registerUser=await User.register(newUser,password);
     req.login(registerUser,(err)=>{
        if(err){
            return next(err);
        }
         req.flash("success","Welcome to AutoTravel!");
         res.redirect("/listings"); 
     })
      }
         catch(e){
             req.flash("error",e.message);
             res.redirect("/listings");
         }
     };
module.exports.login=(req,res)=>{
    res.render("User/login.ejs");
};
module.exports.Postlogin=async(req,res)=>{
    req.flash("success","Welcome to AutoTravel You are Logged in!");
    console.log(res.locals.CurrPath);
    res.redirect(res.locals.CurrPath);
    // res.redirect("/listings");
};
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
           return  next(err);
        }
        req.flash("success","You are Logged Out");
        res.redirect("/listings");
    })
};
