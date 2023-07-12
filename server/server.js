const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const connectDB=require("./dbConnection");
const userRoutes=require("./routes/userRoutes");
const errorHandler=require("./middleware/errorHandler");
const messageRoutes=require("./routes/messagesRoutes");
const socket=require("socket.io"); 
require("dotenv").config();
connectDB();
const app=express();
const port=5000 || process.env.PORT;
app.use(cors());
app.use(express.json()); 
app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes);
app.use(errorHandler);
const server=app.listen(port,()=>{
    console.log(`connection established on port ${port}`);
    
});
const io=socket(server,{
    cors:{
        // origin:"http://localhost:3000",
        origin:"https://buzzchatapp.netlify.app",
        credentials:true,
    },
});

global.onlineUsers=new Map();

io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message);
        }
    });
})

  