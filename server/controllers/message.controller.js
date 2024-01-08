import { 
    addMessageToDatabase, 
    getLastConversation,
    resetMessages,
} from "../services/message.service.js";
import { resetJSONMessages } from "../temp_database/database.js";

/**
 * @desc   add message to database
 * @route  POST /api/v1/message
 * @access private
*/


const addMessageToDatabaseController = async (req, res, next) => {

    try{
        const uid = req.uid;
        const { newMessage } = req.body;
        await addMessageToDatabase(uid, newMessage);
        res.status(200).json({ message: 'new message added to database'})

    } catch (error) {
        next(error)
    }

};

/**
 * @desc   get laast conversation
 * @route  GET /api/v1/message
 * @access private
*/

const getLastConversationController = async (req, res, next) => {

    try{
        const uid = req.uid;
        const lastConversation = await getLastConversation(uid);
        res.status(200).json(lastConversation)
       
    } catch (error) {
        next(error)
    }

};


/**
 * @desc   delete last conversation
 * @route  DELETE /api/v1/message
 * @access private
*/

const deleteLastConversationController = async (req, res, next) => {

    try{
        const uid = req.uid;
        const deletedConversation = await resetMessages(uid);
        resetJSONMessages();
        res.status(200).json({message: 'conversation deleted sucessfully'})
       
    } catch (error) {
        next(error)
    }

};


export {
    addMessageToDatabaseController,
    getLastConversationController,
    deleteLastConversationController
}