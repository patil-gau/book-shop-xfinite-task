const express = require('express');
const cors = require('cors');

//import all routes
const userRouter = require('./routes/user.js');

//create app
const app = express();

//add middleware
app.use(express.json());
app.use(cors());

app.use("/api",userRouter);

//default home route
app.get("/",(req,res)=>{
  res.status(200).send("<h1>Book Shop</h1>");
})

module.exports = app;