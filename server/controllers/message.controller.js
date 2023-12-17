import { addMessageToDatabase, getLastConversation } from "../services/message.service.js";

/**
 * @desc   get latest flashcard set
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
 * @desc   get latest flashcard set
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


export {
    addMessageToDatabaseController,
    getLastConversationController,
}