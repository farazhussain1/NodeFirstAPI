//const { response } = require("express");
const express = require("express");
const app = express();

//import Note from mongoose.models.Note;

const mongoose = require("mongoose");
const Note = require('./models/Note');


//Body PARSER
const bodyParser = require('body-parser');
const {response} = require("express");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//app.use(express.json());
mongoose.connect("mongodb+srv://faraz:123@cluster0.wiq4umt.mongodb.net/notesdb").then(function(){

    ///////// HOME PAGE
    app.get("/",function(req,res){
        const response={message: "API works!!"};
        res.json(response);
    });

    ///////// NOTES LISTS PAGE
    // app.post("/lists",async function(req,res){
    //     const notes = await Note.find({id: req.body.id});
    //     res.json(notes);
    // });


    //////// VIEW, ADD, UPDATE, DELETE ROUTER
    const noteRouter = require('./routes/Note');
    app.use("/notes",noteRouter);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,function(){
    console.log("local Host created at 5000");
});

 