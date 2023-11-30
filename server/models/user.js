const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    firebaseId: { type: String, required: true },
    allFlashcardSets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet'}],
    feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback'}],
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

export default User;