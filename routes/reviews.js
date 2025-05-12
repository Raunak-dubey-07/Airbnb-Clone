const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const review=require("../models/reviews.js");
const {reviewSchema}=require("../schema.js");
//REVIEWS
router.post("/",async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new review(req.body);
    console.log(newReview);
    await listing.reviews.push(newReview);
    await listing.save();
    await newReview.save();
    console.log("New review save");
    res.redirect(`/listings/${listing._id}`);
});
//delete review route
router.delete("/:reviewId", async(req,res)=>{
    let {id,reviewId}=req.params;
   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
   await review.findByIdAndDelete(reviewId);
   res.redirect(`/listings/${id}`);
});
module.exports=router;
