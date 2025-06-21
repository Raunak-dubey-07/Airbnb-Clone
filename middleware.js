const Listing=require("./models/listing");
const Review=require("./models/reviews");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.CurrPath=req.originalUrl;
        req.flash("error","You must be logged in to do this task!");
        return res.redirect("/login");
    }
    next();
};
module.exports.NewUrl=(req,res,next)=>{
    res.locals.CurrPath="/listings";
    if(req.session.CurrPath){
    res.locals.CurrPath=req.session.CurrPath;
    }
    next();
};
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
        if(!listing.owner._id.equals(res.locals.CurrUser._id)){
        req.flash("error","You don't have permission to do this task");
        return res.redirect(`/listings/${id}`);
    }
    next();

}
module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
        if(!review.author.equals(res.locals.CurrUser._id)){
        req.flash("error","You don't have not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();

}