const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken'); 

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET;
    return jwt.sign({_id}, jwtkey, {expiresIn: '7d'})
}

const registerUser = async (req,res) => {
    try{
        const {name,email,password} = req.body;

        let user = await userModel.findOne({email});
        if (user) return res.status(400).json("User already exists");

        user = new userModel({name,email,password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        const token = createToken(user._id);

        res.status(200).json({_id: user._id, name, email, token});

    }catch(error){
        console.log(error);
        res.status(500).json(`Error: ${error}`);
    }
}

const loginUser = async (req,res) => {
    const {email,password} = req.body;

    try {
        let user = await userModel.findOne({email});
        if(!user) return res.status(406).json("User does not exist");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.status(400).json("Invalid password");

        const token = createToken(user._id);
        
        res.status(200).json({_id: user._id,name: user.name, email, token})

    }catch(error){
        console.log(error);
    }
}

const findUser = async (req,res) => {
    const userId = req.params.userId;
    try{
        const user = await userModel.findOne({email:userId});
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(404).json("User not found")
    }
}

const getUsers = async (req,res) => {
    try{
        const users = await userModel.find();
        res.status(200).json(users);
    }catch(err){
        console.log(err);
        res.status(500).json("Server error")
    }
}

module.exports = {registerUser, loginUser, findUser, getUsers};