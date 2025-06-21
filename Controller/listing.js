const Listing=require("../models/listing");
const Booking=require("../models/booking");
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
module.exports.Booklistingss = async (req, res, next) => {
    try {
        const newBooking = new Booking(req.body);

        // Override buyer from current logged-in user (ignore hidden input from form)
        newBooking.buyer = req.user._id;

        // Optional: Validate dates
        if (new Date(newBooking.checkin) >= new Date(newBooking.checkout)) {
            req.flash("error", "Check-out must be after check-in.");
            return res.redirect("back");
        }

        await newBooking.save();

        req.flash("success", "Booking successful!");
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
}
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
    await Booking.deleteMany({ listingRef: id });
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
module.exports.Booklistings=async(req,res)=>{
    const{id}=req.params;
    const listing = await Listing.findById(req.params.id).populate('owner');
    //console.log(booking);
    res.render("listings/booking.ejs",{listing});

}
module.exports.myBookings = async (req, res) => {
   const bookings = await Booking.find({ buyer: req.user._id }).populate("listingRef");
    res.render("listings/myBookings.ejs", { bookings });
};