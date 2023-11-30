import path from 'path';
import { promises as fs } from 'fs';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const relativeFilePath = '../uploads';
const filePath = path.join(__dirname, relativeFilePath, 'output.mp3' );
ffmpeg.setFfmpegPath(ffmpegPath.path);


/**
 * @desc   reciving audio file converting into mp3
 * @route  POST /api/v1/audio
 * @access privite
 * 
*/

const reciveAndConvertAudio = async(req, res) => { //apply error midleware

  const oldPath = req.file.path;
  const newFileName = 'audio.mp3';
  const newPath = path.join('uploads', newFileName);

  if (!fs.existsSync(oldPath)) {
    res.status(400).send('File not found');
    return;
  }

  await new Promise((resolve, reject) => {
    ffmpeg(oldPath)
      .toFormat('mp3')
      .on('error', (err) => {
        console.log('Error converting audio: ' + err.message);
        reject(err);
      })
      .on('end', () => {
        fs.unlinkSync(oldPath); // Remove the original file
        resolve();
      })
      .save(newPath);
  });

  res.status(200).json({ message: 'File converted and uploaded successfully' });
};



/**
 * @desc   sending audio file to client
 * @route  GET /api/v1/audio
 * @access privite
 * 
*/

const sendAudioAnswer = (req, res) => {

  try{
      res.set('Content-Type', 'audio/mpeg');
      res.sendFile(filePath);
  } catch (error) {
      res.status(500).json({ error: 'Error reading file.' });
  }
    
  
}
  
export { reciveAndConvertAudio, sendAudioAnswer };

