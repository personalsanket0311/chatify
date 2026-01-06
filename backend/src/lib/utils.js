import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export const generateToken = (userId ,res)=>{
        const token = jwt.sign({userId},ENV.JWT_SECRET,{
            expiresIn:'7d',
        })
        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            http:true,  // prevents XSS attacks
            sameSite :"strict", // CSRF protection
            secure:ENV.NODE_ENV ==="development" ? false : true, // set to true in production
        })

        return token;
}

