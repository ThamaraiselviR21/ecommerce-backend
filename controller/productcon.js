const { json } = require("express");
const Product = require("../models/Product");

// Get products
exports.getProduct = async (req, res) => {
  try {
    // Build the query object based on the keyword
    const query = req.query.keyword? {
          name: {
            $regex: req.query.keyword, // Perform a regex match on the 'name' field
            $options: 'i', // Case-insensitive match
          },
        }
      : {};

    // Fetch products from the database based on the query
    const products = await Product.find(query);

    // Return the fetched products
    return res.status(200).json({ success: true, products });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ success: false, message: error.message });
  }
};


//get single product

exports.singleProduct=async (req,res) => {
    try {
          console.log(req.params.id);
         const products= await Product.findById(req.params.id)
        return res.status(200).json({products});

    } catch (error) {
       return res.status(404).json({message:"invalid"})
    }
};
//create new product
exports.newProduct=async (req,res) => {
    try {
         const products= await Product.create(req.body)
        return res.status(200).json({products});

    } catch (error) {
       return res.status(500).json({message:error.message})
    }
};
//update product

exports.updateProduct=async (req,res) => {
    try {
          console.log(req.params.id);
         let products= await Product.findById(req.params.id);
          if(!products){
            return res.status(404).json({message:"not found"});
          }
         products= await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
         })


        return res.status(200).json({products});


    } catch (error) {
       return res.status(404).json({message:error.message})
    }
};

//delete product
exports.deleteProduct=async (req,res,next) => {
    try {
          
         let products= await Product.findByIdAndDelete(req.params.id);
          if(!products){
            return res.status(404).json({message:"not found"});
          };

          



        return res.status(200).json({message:"success",products});


    } catch (error) {
       return res.status(404).json({message:error.message})
    }
};