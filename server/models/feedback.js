import mongoose from "mongoose";
import { getCurrentDate } from "../utils/getCurrentDate.js";

const FeedbackSchema = new mongoose.Schema({
    feedback: { type: mongoose.Schema.Types.Mixed, required: true },
    date: { type: String, default: getCurrentDate },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

FeedbackSchema.pre('save', function preSave(next){
    this.date = getCurrentDate();
    next();
});


const Feedback = mongoose.model('Feedback', FeedbackSchema);
  

export default Feedback;
