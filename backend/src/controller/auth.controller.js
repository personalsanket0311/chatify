import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import {generateToken} from '../lib/utils.js';
import {sendWelcomeEmail} from '../emails/emailHandler.js';
import { ENV } from '../lib/env.js';

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;

    try {
        // Validation
        if(!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        
        if(password.length < 6) {  // Fixed: lenth → length
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({message: "Please enter a valid email address"});
        }

        // Check existing user
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message: "User with this email already exists"});
        }

        // Hash password - Fixed: hasehedPassword → hashedPassword
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await newUser.save();  // Save FIRST so _id exists
        generateToken(newUser._id, res);

        // Send welcome email AFTER save, BEFORE response
        try {
            await sendWelcomeEmail(newUser.email, newUser.fullName, ENV.CLIENT_URL);
            console.log("✅ Welcome email sent successfully to", newUser.email);
        } catch (emailError) {
            console.error("❌ Welcome email failed:", emailError.message);
            // Don't fail signup if email fails
        }

        // Send success response
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });

    } catch(error) {
        console.error("Signup error:", error);
        res.status(500).json({message: "Internal server error"});  // Fixed: sserver → server
    }
};
