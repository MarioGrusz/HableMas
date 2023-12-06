/**
 * @method GET
 * @access private
 * @endpoint /api/v1/flashcard
**/

/**
 * @method GET
 * @access private
 * @endpoint /api/v1/flashcard/date
**/


/**
 * @method POST
 * @access private
 * @endpoint /api/v1/flashcard/new
**/

/**
 * @method POST
 * @access private
 * @endpoint /api/v1/flashcard/id
**/


import express from 'express';

import {
    getLatestFlashcardSetController,
    getFlashcardSetByIdController,
    getAllFlashcardHeadersController,
    createFlashcardSetAndSaveController,

} from '../controllers/flashcard.controller.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();
router.use(authenticateToken);

router.route("/").get(getLatestFlashcardSetController);
router.route("/date").get(getAllFlashcardHeadersController);

router.route("/id").post(getFlashcardSetByIdController);
router.route("/new").post(createFlashcardSetAndSaveController);

export default router