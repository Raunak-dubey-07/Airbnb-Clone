module.exports.isLoggedIn=(req,res,next)=>{
    req.locals.CurrPath=req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
}