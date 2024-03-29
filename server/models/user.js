import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    firebaseId: { type: String, required: true },
    allFlashcardSets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet'}],
    feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback'}],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Messages'}],
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

export default User;
 
