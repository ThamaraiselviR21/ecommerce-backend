const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors=require('cors')
const port = process.env.PORT || 3289; // Default to 3000 if PORT is not defined
const user=require('./models/users')
const Product=require('./models/Product.js')
//import routes
const userRoute=require("./routes/user.js");
const proRoute=require("./routes/product.js");
const orderRoute=require("./routes/order.js")

// Database Connection
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("DB connected");

        // Call the function to insert data
       
    } catch (error) {
        console.error("DB connection failed:", error.message);
    }
};

app.use(express.json());
app.use(cors());
app.use("/api/",userRoute);
app.use("/api/",proRoute);
app.use("/api/",orderRoute);




// Default Route
app.get('/', (req, res) => {

});

// Start the Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectdb(); // Connect to the database when the server starts
});
