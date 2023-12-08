import findUser from './helpers/findUser.js';
import withSession from './helpers/withSession.js';
import Feedback from '../models/feedback.js';
import { getCurrentDate } from '../utils/getCurrentDate.js';



const retrieveSavedFeedback = async (uid) => {

    return await withSession(async (session) => {
        const user = await findUser(uid);
        if (!user) return null;
        let feedback = await Feedback.findOne({ creator: user._id }).session(session);
        if (!feedback) return 'no feedback yet';
        return feedback

    });
};


const createFeedback = async (uid, feedback) => {

    return await withSession(async (session) => {
        const user = await findUser(uid);
        if (!user) return null;
  
        let feedbackDocument = await Feedback.findOneAndUpdate(
            { creator: user._id },
            { $set:{ date: getCurrentDate(), feedback: feedback } },
            { new: true, upsert: true }
        );

        user.feedback = []
        user.feedback.push(feedbackDocument._id);
        await user.save({ session });
    });
};
 
export {
    retrieveSavedFeedback,
    createFeedback,
}
 
 