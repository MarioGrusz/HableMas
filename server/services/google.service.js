import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import util from 'util';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


import loadEnv from '../utils/loadEnv.js';
loadEnv('../.env');

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '../uploads/output.mp3');

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
const client = new textToSpeech.TextToSpeechClient({ credentials: credentials });
const spanishMaleVoice = 'es-ES-Neural2-F';
const spanishMaleVoiceYoung = 'es-ES-Wavenet-B';

const convertTextToMp3 = async (text) => {

  try {
    console.log('1')
    const request = {
      input: { text: text },
      voice: { languageCode: 'es-ES', name: spanishMaleVoice },
      audioConfig: { audioEncoding: 'MP3' }
    };

    console.log('request', request)
    console.log('2')

    const [response] = await client.synthesizeSpeech(request);
    console.log('3')
    const writeFile = util.promisify(fs.writeFile);
    console.log('4')
    await writeFile(filePath, response.audioContent, 'binary');
    console.log('5')

    console.log('MP3 file successfully created at', filePath);
  } catch (error) {
    console.error('Error converting text to MP3:', error);
  }
};

const text = 'La capital de Alemania es Berlín, como te dije anteriormente. Pero, por curiosidad, ¿sabías que en alemán se dice "Hauptstadt" para referirse a capital? Es una palabra interesante.'

//convertTextToMp3(text)

export {
  convertTextToMp3
}




