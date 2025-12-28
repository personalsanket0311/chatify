import express from 'express';

const router = express.Router();

router.get("/send",(req,res)=>{
  res.send("Get Messages API called");
})

export default router;  