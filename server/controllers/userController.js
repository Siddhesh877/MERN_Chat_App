const asyncHandler=require("express-async-handler")
const User=require("../model/userModel");
const bcrypt=require("bcrypt");
//@desc Register a User
//@route POST /api/auth/register
//@access public
const registerUser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
    const usernameCheck=await User.findOne({username});
    if(usernameCheck)
    {
        return res.json({message:"username already in use",status:false});   
    }
    const emailCheck=await User.findOne({email});
    if(emailCheck)
    {
        return res.json({message:"email already in use",status:false});   
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        email,
        username,
        password:hashedPassword,
    });
    
    return res.json({message:"user regestered",status:true});
    
});


//@desc Login a User
//@route POST /api/auth/login
//@access public
const loginUser=asyncHandler(async(req,res)=>{
    const{username,password}=req.body;
    const enteredUser =await User.findOne({username});
    if(!enteredUser)
    {
        return res.json({message:"incorrect username or password",status:false});   
    }
    
    const isPasswordValid=await bcrypt.compare(password,enteredUser.password)
    if(!isPasswordValid)
    {
        return res.json({message:"incorrect username or password",status:false});
    }
    
    return res.json({message:"user login successful",enteredUser,status:true});
    
});


//@desc set Avatar of a User
//@route POST /api/auth/setAvatar/:id
//@access public
const setAvatar=asyncHandler(async(req,res)=>{
    const userId=req.params.id;
    const avatar = req.body.image;
    const userData= await User.findByIdAndUpdate(userId,{
        isAvatarImageSet:true,
        avatarImage:avatar,
    });
    return res.json({
        isSet:userData.isAvatarImageSet,
        image: userData.avatarImage,
    });
    
});

const getAllUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({_id:{$ne:req.params.id}}).select([
        "email",
        "username",
        "avatarImage",
        "_id", 
    ]);
    return res.json(users);
});




module.exports= {registerUser,loginUser,setAvatar,getAllUsers};
