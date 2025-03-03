const mongoose=require("mongoose");
const fs =require('fs')
const schema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stock:{
        type:Number, required:true
    },
    price:{
        type:Number,   required:true
    },
   image:[{
        type:String,
        required:true
    }],
    seller:{
        type:String,
    },
   category:{
        type:String,
        required:true
    }
},{timestamps:true});

const Product = mongoose.model("Product", schema);

module.exports = Product;

//let insertData = async () => {
 //const datajson = JSON.parse(fs.readFileSync('product.json', 'utf8'));
//  const result = await Product.insertMany(datajson);
 //  console.log(result);
//}
//insertData();

