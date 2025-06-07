const review=require("../models/reviews");
const Listing=require("../models/listing.js");
module.exports.newReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new review(req.body);
    newReview.author=req.user._id;
    console.log(newReview);
    await listing.reviews.push(newReview);
    await listing.save();
    await newReview.save();
    console.log("New review save");
    res.redirect(`/listings/${listing._id}`);
};
module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
   await review.findByIdAndDelete(reviewId);
   req.flash("success","Review Deleted");
   res.redirect(`/listings/${id}`);
};