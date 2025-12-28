import express from 'express';

const router = express.Router();

router.get("/signup",(req,res)=>{
  res.send("Signup API called");
})


router.get("/login",(req,res)=>{
   res.send("Login API called");
})


router.get("/logout",(req,res)=>{
  res.send("Logout API called");
})

export default router;