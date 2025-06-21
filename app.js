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
const MongoStore = require("connect-mongo");
main()
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => console.log("❌ MongoDB connection error:", err));

async function main() {
  await mongoose.connect('mongodb+srv://rounakdubey:Raunak%4012@cluster0.0s2sqfj.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0');
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded( {extended:true} ));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const store=MongoStore.create({
    mongoUrl:'mongodb+srv://rounakdubey:Raunak%4012@cluster0.0s2sqfj.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0',
    crypto:{
        secret:"mysecretcode",
    },
    touchAfter:24*3600,
});
store.on("error",()=>{
    console.log("Error in mongo session code",err);
})
const sessionOptions={
    store,
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
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.CurrUser=req.user;
    next();
});
app.use("/listings",listings_route);
app.use("/listings/:id/reviews",review_route);
app.use("/",User_route);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));

})
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;
    res.render("error.ejs",{message}); 
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
