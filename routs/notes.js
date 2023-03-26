const express =require("express");
const notesRouter=express.Router();
const jwt = require('jsonwebtoken');
const {NotesModel}=require("../model/notes.model.js")
const bcrypt=require("bcrypt");


notesRouter.get("/",async(req,res)=>{
try{
const notes=await NotesModel.find()
res.send(notes);

}catch(err){
    console.log(err)
}
})
///////
notesRouter.post("/add",async (req,res)=>{
    try{
        const note=new NotesModel(req.body);
        await  note.save();
        res.send("Notes have been added")
    }catch(err){
        console.log(err);
    }
    
  
})
///////////
notesRouter.patch("/update/:id",async (req,res)=>{
    const id=req.params.id;
    const data=req.body;
    try{
        const notes=await NotesModel.findByIdAndUpdate({_id:id},data);
        res.send("updated")
    }catch(err){
        res.send("Error wile updating data")
    }
})
///////
notesRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const notes=await NotesModel.findByIdAndDelete({_id:id});
        res.send("deleted successfuly")
    }catch(err){
        res.send("Error wile deleting data")
    }
})

module.exports={
    notesRouter  
}