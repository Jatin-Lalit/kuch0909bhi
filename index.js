const express =require("express");

const{connection}=require("./db.js");
const { userrouter } = require("./routs/user.js");
const app=express();
const {notesRouter}=require("./routs/notes.js")
const {auth}=require("./middleware/auth.middleware.js")
const cors=require("cors");

app.use(express.json());
app.use(cors());
app.use("/users",userrouter)

app.use(auth);
app.use("/notes",notesRouter)
app.listen(9090, async ()=>{
    try{
        await connection
         console.log("connected");
    }catch(err){
console.log(err)
    }
    console.log("ok")
   
})