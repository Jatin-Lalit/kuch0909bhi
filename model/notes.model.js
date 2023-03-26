const mongoose=require("mongoose");


const NotesSchema=mongoose.Schema({
   title:String,
    body:String,
    sub:String,
    userID:String
},{
    versionKey: false
})

const NotesModel=mongoose.model("notes",NotesSchema)
module.exports={
    NotesModel
}