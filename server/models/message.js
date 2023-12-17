import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
    messages: [{
        type: { type: String, required: true },
        message: { type: String, required: true },
        audio: { type: Buffer },
    }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created_at: { type: Date, default: Date.now },
});
 

const Messages = mongoose.model('Message', MessagesSchema);

export default Messages;