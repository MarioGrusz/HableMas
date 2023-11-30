import mongoose from 'mongoose';
import Feedback from '../models/feedback.js';
import User from '../models/user.js';

const retrieveSavedFeedback = async (uid) => {

    const session = await mongoose.startSession();
    const user = await session.withTransaction(async () => {
        const user = await User.findOne({ firebaseId: uid }).session(session);
        if (!user) {
            console.log('User not found.');
            return null;
        }
 
        const feedback = await Feedback.findOne({ creator: user._id }).session(session);
        if (!feedback) return null;
 
        return feedback;
    });
 
    return user;
}
 