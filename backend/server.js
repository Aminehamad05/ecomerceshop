import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
const app= express();
app.get("/", (req, res) => {
    res.send("Welcome to E-commerce API");
});
connectDB();
app.listen(5000,()=>{
    console.log("Server started at http://localhost:5000")
})