const express=require("express");
const app=express();
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");
const sessionOptions={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
};
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(session(sessionOptions));
app.use(flash());
app.get("/register",(req,res)=>{
    let{name="anonymous"}=req.query;
    req.session.name=name;
    req.flash("success","user resgister successfully");
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
    console.log(req.flash);
    res.render("page.ejs",{name:req.session.name,msg:req.flash("success")});
})
app.listen(3000,()=>{
    console.log("server is running");
})