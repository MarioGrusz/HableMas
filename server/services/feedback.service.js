import findUser from './helpers/findUser.js';
import withSession from './helpers/withSession.js';
import Feedback from '../models/feedback.js';



const retrieveSavedFeedback = async (uid) => {

    console.log('service retrive data')
    const user = await findUser(uid);
    if (!user) return null;
    const feedback = await Feedback.findOne({ creator: user._id });
    return feedback;
    // return await withSession(async (session) => {
    //     const user = await findUser(uid);
    //     if (!user) return null;
    //     const feedback = await Feedback.findOne({ creator: user._id }).session(session);
    //     return feedback;
    // });
};
 
const createFeedback = async (uid, feedback) => {
    return await withSession(async (session) => {
        const user = await findUser(uid);
        if (!user) return null;
        if (user.feedback.length > 0) {
            await Feedback.deleteMany({ _id: { $in: user.feedback } });
            user.feedback = [];
        }
        const newFeedback = await Feedback.create({
            feedback: feedback,
        });
        user.feedback.push(newFeedback._id);
        await user.save({ session });
    });
};

export {
    retrieveSavedFeedback,
    createFeedback,
}
 
 