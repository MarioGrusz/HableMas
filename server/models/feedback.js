import mongoose from "mongoose";
import { getCurrentDate } from "../utils/getCurrentDate.js";

const FeedbackSchema = new mongoose.Schema({
    feedback: { type: mongoose.Schema.Types.Mixed, required: true },
    date: { type: String, default: getCurrentDate },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created_at: { type: Date, default: Date.now } 
});


const Feedback = mongoose.model('Feedback', FeedbackSchema);
  

export default Feedback;
