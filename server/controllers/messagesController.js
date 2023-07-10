const asyncHandler=require("express-async-handler");
const messageModel = require("../model/messageModel");
const addMessage=asyncHandler(async(req,res)=>{
    const {from,to,message}=req.body;
    console.log(req.body);
    const data=await messageModel.create({
        message:{text:message},
        users:[from,to],
        sender:from,
    });
    if(data) return res.json({msg:"message added successfully"});
    
    return res.json({msg:"failed to add message"});
});
const getMessages=asyncHandler(async(req,res)=>{
    const {from,to}=req.body;
    const messages=await messageModel.find({
        users:{ 
            $all:[from,to]
        },
    }).sort({updatedAt:1});
    
    const projectMessages=messages.map((msg)=>{
        return{
            fromSelf: msg.sender.toString()===from,
            message:msg.message.text,
        };
    });
   
    res.json(projectMessages);
});

module.exports= {addMessage,getMessages};
 