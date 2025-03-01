const express = require('express');
const router=express.Router();
const {registeruser,verifyUser, loginUser, profileUser}=require( "../controller/usercon.js");
const { isAuth } = require('../middleware/profile.js');

router.post("/user/reg",registeruser);
console.log("registeruser:", registeruser);
router.post("/user/verify",verifyUser);

router.post("/user/login",loginUser);
router.get("/user/profile",isAuth,profileUser);


module.exports = router;