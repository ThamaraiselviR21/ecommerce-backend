const sendMail =require("../middleware/sendemail");
const users =require("../models/users");
const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');
//new user acc create
exports.registeruser = async (req, res) => {
    try {
        console.log(req.body);

        const { name, email, password, contact, role } = req.body;
        let user = await users.findOne({ email });

        if (user){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 5);

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000); // Always 4-digit OTP

        // Create user object (not saving to DB yet)
        user = { name, email, password: hashPassword, contact, role };

        // Generate JWT token with OTP
        const token = jwt.sign({ user, otp }, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });

        console.log("Generated Token:", token); 

        // Send OTP email
        const message = `Your OTP is ${otp}`;
        await sendMail(email, "OTP Verification", message);

        return res.status(200).json({
            message: "OTP sent to your email",
            token, // Returning token to frontend
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// otp verify
exports.verifyUser = async (req, res) => {
    try {
        const { otp, token } = req.body; // Use token from body, not headers

        if (!token) {
            return res.status(401).json({ message: "Token must be provided" });
        }

        console.log("Received Token:", token); 
        console.log("Received OTP:", otp); 

        let verify;
        try {
            verify = jwt.verify(token, process.env.ACTIVATION_SECRET);
            console.log("Decoded Token:", verify); // Debugging
        } catch (err) {
            console.error("JWT Verification Error:", err.message);
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        if (Number(verify.otp) !== Number(otp)) {
            return res.status(400).json({ message: "Wrong OTP" });
        }

        // Save user to database
        await users.create({
            name: verify.user.name,
            email: verify.user.email,
            password: verify.user.password, // Using correct key
            contact: verify.user.contact,
        });

        return res.status(200).json({ message: "Registration successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


//login user
exports.loginUser=async(req,res)=>{
    try {
        const{email,password}=req.body;
        //check user email id
        const user=await users.findOne({email});
        if(!user){
            return res.status(400).json({
                message:`invalid`
                })
        }
        //check password
        const matchPassword=await bcrypt.compare(password,user.password);
        if(!matchPassword){
            return res.status(400).json({
                message:`invalid`
                });
        } 
        //auth 30days
        const token=jwt.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:"10d"});
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        //remove password for token generate
        const{password:userPassword, ...userDel}=user.toObject();


        return res.status(200).json({message:"success",token,userDel})
    }
    catch (error) {
        return res.status(500).json({
            message:error.message
            })

    }
}
//profile
exports.profileUser=async (req,res) =>{
    try {
        const user=await users.findById(req.user._id).select("-password");
        return res.status(200).json({user});

    } catch (error) {
       return res.status(500).json({message:error.message})
    }
}