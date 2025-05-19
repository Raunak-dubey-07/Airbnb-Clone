const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const ExpressError=require("../util/ExpressError.js");
const {listingSchema}=require("../schema.js");
const {isLoggedIn, isOwner}=require("../middleware.js");
router.get("/:id/edit",isLoggedIn, isOwner,async(req,res)=>{

    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});
router.get("/",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});
//new lisitngs
router.get("/new",isLoggedIn,(req,res)=>{
    
    res.render("listings/new.ejs");
});
router.post("/",isLoggedIn,async(req,res,next)=>{
    try{
       listingSchema.validate(req.body);
    const NewListing=new Listing(req.body);
    NewListing.owner=req.user._id;
    await NewListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
    }catch(err){
        next(err);
    }
});
//update route
router.put("/:id",isLoggedIn,isOwner, async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
   
    let updateListing=await Listing.findByIdAndUpdate(id,{...req.body});
    req.flash("success",`${updateListing.title} Listing Updated!`);
    res.redirect("/listings");
});
//Delete Route
router.delete("/:id",isLoggedIn,isOwner, async(req,res)=>{
    let {id}=req.params;
    let deletelist=await Listing.findByIdAndDelete(id);
    req.flash("success",`${deletelist.title} Listing deleted!`);
    res.redirect("/listings");
});
//Edit Route
// router.get("/:id/edit",async(req,res)=>{
//     const {id}=req.params;
//     const listing=await Listing.findById(id);
//     res.render("listings/new.ejs",{listing});
// });
router.get("/:id",async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id).populate("reviews").populate("owner");
     if(!listing){
         req.flash("error","Listing doesn't exist");
         res.redirect("/listings");
     }
     else{
    res.render("listings/show.ejs",{listing});
     }
});
module.exports=router;