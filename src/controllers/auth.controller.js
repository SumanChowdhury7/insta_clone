const express = require('express');
const jwt = require ('jsonwebtoken')
const userModel = require('../models/user.model')
const crypto = require('crypto');

const authController = {
   registerController: async (req,res)=>{
    const {username,email,password,bio,profileImage} = req.body

    const existedUser = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    });

    if(existedUser){
        return res.status(409).json({
            
            error: existedUser.email === email ? "Email already exist" : "Username already exist"
        })
    }

    const user = await userModel.create({
        username,
        email,
        password:crypto.createHash('sha256').update(password).digest('hex'),
        bio,
        profileImage
    })
    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET, {expiresIn: '1h'})

    res.cookie('token', token);

    res.status(201).json({
        message: "registration sucessfull",
        user:{
            email:user.email,
            username: user.username,
            bio: user.bio
        },
        token
    })


},
loginController: async (req,res)=>{
    const {email, username, password} = req.body;  
    const user = await userModel.findOne({
        $or:[
            {
                email : email
            },
            {
                username: username
            }
        ]
    });

    if (!user){
        return res.status(400).json({
            message: "User not found!"
        })
    }
    if (user.password !== crypto.createHash('sha256').update(password).digest('hex')) {
        return res.status(400).json({
            message: "Invalid password!"
        })
    }
    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET, {expiresIn: '1h'})
    res.cookie('token', token);
    
    res.status(200).json({
        message: "Logged in sucessfully."
    })
    


}

}
module.exports = authController;