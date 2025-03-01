const mongoose=require("mongoose");
const orderSchema= new mongoose.Schema({
    cart: Array,
    amount:String,
    status:String

},{timestamps:true});

module.exports = mongoose.model("Order", orderSchema);
