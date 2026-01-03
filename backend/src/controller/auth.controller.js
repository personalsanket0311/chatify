import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import {generateToken} from '../lib/utils.js';
 export const signup =async (req,res) => {
    const {fullName,email,password} = req.body

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.lenth < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }
        //check if email valid :regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Please enter a valid email address"})
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User with this email already exists"})
        }

        const salt = await bcrypt.genSalt(12);
        const hasehedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hasehedPassword
        })

        if(newUser){
           generateToken(newUser._id,res)
           await newUser.save();

           res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic,
           });
           //todo: send welcome email
        }else{
            res.json(400).json({message:"Invalid user data"})
        }

    }catch(error){
        return res.status(500).json({message:"Internal sserver Error"})

    }
}