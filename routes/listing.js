const express=require("express");
const router=express.Router();
const {isLoggedIn, isOwner}=require("../middleware.js");
const listingController=require("../Controller/listing");
//edit route
router.get("/:id/edit",isLoggedIn, isOwner,listingController.Editlistings);
router.route("/")
//ALL Listings
.get(listingController.index)
//create Listings
.post(isLoggedIn,listingController.createlistings);
//new lisitngs
router.get("/new",isLoggedIn,listingController.newlistings);
router.route("/:id")
//update route
.put(isLoggedIn,isOwner, listingController.Updatelistings)
//Delete route
.delete(isLoggedIn,isOwner, listingController.Deletelistings)
//show Listings
.get(listingController.Showlistings);
module.exports=router;