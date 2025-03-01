const express = require('express');
const router=express.Router();
const { getProduct, singleProduct, newProduct, updateProduct, deleteProduct }=require("../controller/productcon")
router.get("/product/getpro",getProduct);
router.get("/product/:id",singleProduct);
router.post("/product/new",newProduct);
router.put("/product/:id",updateProduct);
router.delete("/product/:id",deleteProduct);



module.exports = router;