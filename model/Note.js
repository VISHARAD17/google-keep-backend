import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: String, 
    content: String
});

const Note = new mongoose.model("Note", noteSchema);

export default Note;
