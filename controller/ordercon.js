const order=require("../models/Order");
const products=require("../models/Product")

exports.createOrder=async (req,res) => {
    try {
        const cart=req.body;
        const amount=Math.floor(cart.reduce((acc,item)=>(acc + item.product.price * item.qty),0));
        const status='pending';
        console.log(req.body,"data","\n",amount);

      const orders= await order.create({cart,amount,status});
       // Updating product stock
     //  cart.forEach( async (item)=> {
     // const product = await products.findById(item.product._id);
     // product.stock = product.stock - item.qty;
     // await product.save();
       // })

        
        return res.status(200).json({message:"success",orders});


    } catch (error) {
       return res.status(500).json({message:error.message})
    }
}