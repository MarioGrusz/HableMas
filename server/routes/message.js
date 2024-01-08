/**
 * @method POST
 * @access privat
 * @endpoint /api/v1/message
**/

/**
 * @method GET
 * @access privat
 * @endpoint /api/v1/message
**/

/**
 * @method DELETE
 * @access privat
 * @endpoint /api/v1/message
**/


import express from 'express';
import authenticateToken from '../middleware/auth.js';
import { 
    addMessageToDatabaseController, 
    getLastConversationController ,
    deleteLastConversationController
} from '../controllers/message.controller.js';
const router = express.Router();
router.use(authenticateToken);


router.route("/").post(addMessageToDatabaseController);
router.route("/").get(getLastConversationController);
router.route("/").delete(deleteLastConversationController);

export default router;