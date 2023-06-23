const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const connectDB=require("./dbConnection");
const userRoutes=require("./routes/userRoutes");
const errorHandler=require("./middleware/errorHandler");
require("dotenv").config();
connectDB();
const app=express();
const port=5000 || process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use(errorHandler);
const server=app.listen(port,()=>{
    console.log(`connection established on port ${port}`);
    
});

  