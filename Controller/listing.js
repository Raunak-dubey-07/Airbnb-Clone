const Listing=require("../models/listing");
const {listingSchema}=require("../schema.js")

module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};
module.exports.newlistings=(req,res)=>{
    res.render("listings/new.ejs");
};
module.exports.createlistings=async(req,res,next)=>{
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
};
module.exports.Updatelistings=async(req,res)=>{
    //console.log("hii");
    let {id}=req.params;
    let listing=await Listing.findById(id);
    let updateListing=await Listing.findByIdAndUpdate(id,{...req.body});
    req.flash("success",`${updateListing.title} Listing Updated!`);
    res.redirect("/listings");
};
module.exports.Deletelistings=async(req,res)=>{
    let {id}=req.params;
    let deletelist=await Listing.findByIdAndDelete(id);
    req.flash("success",`${deletelist.title} Listing deleted!`);
    res.redirect("/listings");
};
module.exports.Showlistings=async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id).populate({
        path:"reviews",populate:{ path:"author"}

    }).populate("owner");
     if(!listing){
         req.flash("error","Listing doesn't exist");
         res.redirect("/listings");
     }
     else{
    res.render("listings/show.ejs",{listing});
     }
};
module.exports.Editlistings=async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
};