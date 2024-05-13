const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require("./Routes/userRoutes");
const chatRoute = require("./Routes/chatRoutes");
const messageRoute = require("./Routes/messageRoutes");

const app = express();
require('dotenv').config()

app.use(express.json());
app.use(cors());
app.use('/api/users',userRoute);
app.use('/api/chats',chatRoute);
app.use('/api/messages',messageRoute);

const PORT = 5000;
const uri = process.env.MONGODB_URI

app.listen(PORT, (req,res)=>{
    console.log(`Server running on port ${5000}`);
})

mongoose.connect(uri).then(()=>console.log("Connect to Mongo DB"))
.catch((err)=>console.log(err))

