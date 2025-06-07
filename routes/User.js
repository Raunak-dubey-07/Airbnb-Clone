const express=require("express");
const router=express.Router();
const passport=require("passport");
const {NewUrl}=require("../middleware.js");
const userController=require("../Controller/users");

router.get("/signup",userController.signup);
router.post("/signup",userController.postSignup);
    
   
router.get("/login",userController.login);
router.post("/login",NewUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.Postlogin);
router.get("/logout",userController.logout);
module.exports=router;