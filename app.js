const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const session=require("express-session");
const flash=require("connect-flash");
const ExpressError=require("./util/ExpressError.js");
const listings_route=require("./routes/listing.js");
const review_route=require("./routes/reviews.js");
const User_route=require("./routes/User.js");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/User.js");
main().then(()=>{
    console.log("connected to db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded( {extended:true} ));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const sessionOptions={
    secret:"mysecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 
// app.get("/",(req,res)=>{
//     res.send("Hi, I am root");
// });
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.CurrUser=req.user;
    next();
});
// app.get("/demouser",async (req,res)=>{
//     let fakeUser=new User({
//         email:"abc123@getMaxListeners.com",
//         username:"new-student",
//     });
//     let newUser=await User.register(fakeUser,'12345678');
//     res.send(newUser);

// })
app.use("/listings",listings_route);
app.use("/listings/:id/reviews",review_route);
app.use("/",User_route);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));

})
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;
    //res.status(statusCode).send(message);
    res.render("error.ejs",{message}); 
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
