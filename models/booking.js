const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const bookingSchema=new Schema({
    buyer:{
       type:Schema.Types.ObjectId,
            ref:"User",
    },
     listingRef: {
        type: Schema.Types.ObjectId,
        ref: "Listing",   // Reference to your Listing model
        required: true
    },
    title:{
        type:String,
        required:true,
    },
    guest:{
        type:Number,
        required:true,
    },
    checkin:{
        type:Date,
        required:true,
    },
    checkout:{
        type:Date,
        required:true,
    },
    price:Number,
    location:String,
    country:String,
});
const Booking = mongoose.model("Booking",bookingSchema);
module.exports=Booking;