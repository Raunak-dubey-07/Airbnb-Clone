const express=require("express");
const router=express.Router();
const {isLoggedIn, isOwner}=require("../middleware.js");
const listingController=require("../Controller/listing");
//edit route
router.get("/:id/edit",isLoggedIn, isOwner,listingController.Editlistings);
router.get("/",listingController.index);
//new lisitngs
router.get("/new",isLoggedIn,listingController.newlistings);
router.post("/",isLoggedIn,listingController.createlistings);
//update route
router.put("/:id",isLoggedIn,isOwner, listingController.Updatelistings);
//Delete route
router.delete("/:id",isLoggedIn,isOwner, listingController.Deletelistings);
//show Listings
router.get("/:id",listingController.Showlistings);
module.exports=router;