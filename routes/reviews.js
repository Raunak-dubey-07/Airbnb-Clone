const express=require("express");
const router=express.Router({mergeParams:true});
const {isLoggedIn, isReviewAuthor}=require("../middleware.js");
const reviewController=require("../Controller/review");
//REVIEWS
router.post("/",isLoggedIn,reviewController.newReview);
//delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, reviewController.deleteReview);
module.exports=router;
