import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4001;
const CONNECTION_URL = "mongodb+srv://visharad:0Bnk5uamhybQQUap@cluster0.p5d50.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () =>{
    console.log("DB connected");
});

import Note from './model/Note.js'; 

app.get("", (req, res) => {
    res.send("Server is running");
});

// fetching all the notes/data
app.get('/api/getAll', (req, res) => {
    Note.find({}, (err, noteList) => {
        if(err) console.log(err);
        else{
            res.status(200).send(noteList);
        }
    });
});

// adding new note
app.post('/api/addNew', (req, res) => {
    const { title, content } = req.body;
    const noteObj = new Note({
        title : title,
        content : content
    });
    noteObj.save( err => {
        if(err) console.log(err);
        else console.log("Successfully added");

        Note.find({}, (err, noteList) => {
            if(err) console.log(err);
            else{
                res.status(200).send(noteList);
            }
        });
    });
});

// deleteing all the nodes
app.post('/api/delete', (req, res) => {
    const { id } = req.body;
    Note.deleteOne({_id: id}, () => {
        Note.find({}, (err, noteList) => {
            if(err) console.log(err);
            else{
                res.status(200).send(noteList);
            }
        }); 
    });
});

//update function
app.put('/api/update', (req, res) => {
    // console.log("update request!");
    const { id } = req.body;
    console.log(id);
    
})

app.listen(PORT, () => {
    console.log("backend connected at " + PORT)
});