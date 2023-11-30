import mongoose from "mongoose";
import { getCurrentDate } from "../utils/getCurrentDate.js";


const FlashcardSetSchema = new mongoose.Schema({
    arrayOfObjects: [{ type: Object }],
    date: { type: String, default: getCurrentDate },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created_at: { type: Date, default: Date.now } 
});


const FlashcardSet = mongoose.model('FlashcardSet', FlashcardSetSchema);
  

export default FlashcardSet;