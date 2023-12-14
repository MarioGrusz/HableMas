import findUser from './helpers/findUser.js';
import withSession from './helpers/withSession.js';
import Feedback from '../models/feedback.js';
import FlashcardSet from '../models/flashcardSet.js';
import { extractFlashcardSet } from '../utils/extractFlascardSet.js';



const createFlashcardSet = async (uid) => {

    return await withSession(async (session) => {
        const user = await findUser(uid);
        if (!user) return null;

        const feedback = await Feedback.find({ _id: { $in: user.feedback } });
        if(!feedback) return;
        const flashcardSet = extractFlashcardSet(feedback[0].feedback);

        
        // Create a new FlashcardSet document
        let flashcardSetDocument = await FlashcardSet.create({
            creator: user._id,
            arrayOfObjects: flashcardSet
        });

        user.allFlashcardSets.push(flashcardSetDocument._id);
        await user.save({ session });
        
    })
};



const retriveLatestFlashcardSet = async (uid) => {

    return await withSession(async (session) => {
        const user = await findUser(uid);
        if (!user) return null;
        const flashcardSet = await FlashcardSet.findOne(
            { _id: { $in: user.allFlashcardSets } },
        ).sort({ 'created_at': -1 }).session(session);
        if (!flashcardSet) return 'no flashcards yet';
        return flashcardSet
    })
  
};


const getFlashcardSetById = async (uid, idDate) => {

    return await withSession(async (session) => {
        const user = await findUser(uid);
        if (!user) return null;
        const singleFlashcardSet = await FlashcardSet.findOne({
            _id: { $in: user.allFlashcardSets },
            date: idDate, 
        }).session(session);

        if (singleFlashcardSet) {
            return singleFlashcardSet
          } else {
            console.log('FlashcardSet not found');
            throw new Error('FlashcardSet not found');
        }

    })  
};

const getAllFlashcardSetDateHeaders = async (uid) => {

    return await withSession(async (session) => {
        const user = await findUser(uid);
        if (!user) return null;

        const result = await FlashcardSet.aggregate([
            {
              $match: { _id: { $in: user.allFlashcardSets } }
            },   
            {
              $group: {
                _id: null,
                dates: { $push: "$date" } // Push 'date' values into an array
              }
            }
        ]).session(session);

        const dateArray = result.length > 0 ? result[0].dates : [];
        const uniqueDateArray = Array.from(new Set(dateArray));
        return uniqueDateArray; 
    })
};

export{
    createFlashcardSet,
    retriveLatestFlashcardSet,
    getAllFlashcardSetDateHeaders,
    getFlashcardSetById
}