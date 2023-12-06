import { feedbackPrompt } from "../temp_database/prompts.js";
import { getAssistantResponse } from "../services/openai.service.js";
import { createFeedback, retrieveSavedFeedback } from "../services/feedback.service.js";


/**
 * @desc   create new feedback
 * @route  POST /api/v1/feedback/new
 * @access private
*/

const createNewFeedbackController = async (req, res, next) => {
  
    try{
        const uid = req.uid;
        const feedback = [await getAssistantResponse(feedbackPrompt)];

        if(feedback){
            createFeedback(uid, feedback)
        };

        res.status(200).json(feedback)
    } catch (error) {
        next(error);
    }
};


/**
 * @desc   get latest feedback
 * @route  GET /api/v1/feedback
 * @access private
*/


  
const retriveFeedbackController = async (req, res, next) => {

    console.log('retriveController')

    try{
        const uid = req.uid;
        console.log('feedback-uid', uid)
        const feedback = await retrieveSavedFeedback(uid);
        console.log('feedback', feedback)
        res.status(200).json('ok');

    } catch (error) {
       next(error)
    }
};


export {
    createNewFeedbackController,
    retriveFeedbackController,
}
