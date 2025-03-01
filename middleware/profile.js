const jwt =require("jsonwebtoken");
const users=require("../models/users");

exports.isAuth=async (req,res,next) => {
    try {
        const token=req.headers.token;
        if(!token){
            return res.status(403).json({message:error.message})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await users.findById(decoded._id);
        next();
        
    } catch (error) {
        return res.status(403).json({message:"login first"})
        
    }
    
}