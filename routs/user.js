const express =require("express");
const userrouter=express.Router();
const jwt = require('jsonwebtoken');
const {UserModel}=require("../model/m.js")
const bcrypt=require("bcrypt");
//registration

userrouter.post("/register",async (req,res)=>{
    const {email,pass,location,age}=req.body;
    try{

bcrypt.hash(pass, 5, async (err,hash)=> {
   
    const user=new  UserModel({email,pass:hash,location,age});
    await user.save();
    res.send("registration ho gya")
    console.log(user)
    // Store hash in your password DB.
        });
}
    catch(err){
        console.log(err)
    }


    })


//login
userrouter.post("/login",async (req,res)=>{
   const email=req.body.email;
   const pass=req.body.pass;
   try{
    const user=await UserModel.findOne({email})
    if(user){
bcrypt.compare(pass,user.pass, (err, result)=> {
            if( result){
                res.status(200).send({"msg":"login done","token":jwt.sign({ UserId: user._id }, 'TheEQT')})
                console.log(user)
            }else{
                res.send("wrong pass")
            }
        });
    
   }else{
    res.send("login fail")
   }
   }catch(err){
    console.log(err)
}
            
})

/////procted routera


userrouter.get("/details",(req,res)=>{
    const token=req.headers.authorization;
    jwt.verify(token, 'TheEQT', (err, decoded)=>{ 
       decoded? res.send("TODOs"): res.send("you are not allowed to get details")
    });
      
})








module.exports={
    userrouter
}