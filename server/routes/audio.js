/**
 * @method POST
 * @access public
 * @endpoint /api/v1/sendAudio
**/

/**
 * @method GET
 * @access public
 * @endpoint /api/v1/getAudio
**/


import express from 'express';
import { reciveAndConvertAudio, sendAudioAnswer } from '../controllers/audio.controller.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('audio'), reciveAndConvertAudio);
router.get('/', sendAudioAnswer);

export default router;