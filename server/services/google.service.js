import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import util from 'util';
import generateFilePath from '../utils/generateFilePath.js';
import loadEnv from '../utils/loadEnv.js';


loadEnv('../.env');

const filePath = generateFilePath('../uploads/output.mp3');

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
const client = new textToSpeech.TextToSpeechClient({ credentials: credentials });
const spanishMaleVoice = 'es-ES-Neural2-F';
const spanishMaleVoiceYoung = 'es-ES-Wavenet-B';

const convertTextToMp3 = async (text) => {

  try {
    const request = {
      input: { text: text },
      voice: { languageCode: 'es-ES', name: spanishMaleVoice },
      audioConfig: { audioEncoding: 'MP3' }
    };


    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(filePath, response.audioContent, 'binary');

    console.log('MP3 file successfully created at', filePath);
  } catch (error) {
    console.error('Error converting text to MP3:', error);
  }
};

export {
  convertTextToMp3
}




