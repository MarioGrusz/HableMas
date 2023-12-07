/**
 * @method GET
 * @access privat
 * @endpoint /api/v1/feedback
**/

/**
 * @method POST
 * @access privat
 * @endpoint /api/v1/feedback
**/


import express from 'express';
import authenticateToken from '../middleware/auth.js';
import { createNewFeedbackController, retriveFeedbackController } from '../controllers/feedback.controller.js';
const router = express.Router();
router.use(authenticateToken);

router.route("/").get(retriveFeedbackController);
router.route("/").post(createNewFeedbackController);

export default router;