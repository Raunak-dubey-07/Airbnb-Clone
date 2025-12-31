const express=require("express");
const router=express.Router();
const {isLoggedIn, isOwner}=require("../middleware.js");
const listingController=require("../Controller/listing");
router.post("/:id/book", isLoggedIn, listingController.Booklistingss);
router.get("/my/bookings", isLoggedIn,listingController.myBookings);
//edit route
router.get("/:id/edit",isLoggedIn,isOwner,listingController.Editlistings);
router.get("/:id/booking",isLoggedIn,listingController.Booklistings);
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