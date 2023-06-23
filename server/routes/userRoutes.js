const express=require("express");
const {registerUser,loginUser,setAvatar, getAllUsers} =require("../controllers/userController");
const router=express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/setAvatar/:id",setAvatar);
router.get("/allUsers/:id",getAllUsers);
module.exports=router;