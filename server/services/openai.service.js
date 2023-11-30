import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import { feedbackPrompt } from '../temp_database/prompts.js';
import createOpenAIApi from './helpers/createOpenAIApi.js';
import getAssistantResponse from './helpers/getAssistantResponse.js';


const openai = createOpenAIApi();
const model = 'whisper-1';

const __dirname = dirname(fileURLToPath(import.meta.url));
const relativeFilePath = '../uploads/audio.mp3';
const filePath = path.join(__dirname, relativeFilePath);

const formData = new FormData();
formData.append('model', model);
formData.append('file', fs.createReadStream(filePath));



const callWhisper = async () => {
  try {
    const result = await openai.createTranscription(
      fs.createReadStream(filePath),
      "whisper-1"
    );
    return result.data.text;
  } catch (error) {
    console.error('Error during transcription: error');
    throw error; 
  }
};

callWhisper()


const getChatResponse = async (prompt) => {
  return getAssistantResponse('gpt-3.5-turbo', prompt);
};

   
const getFeedback = async () => {
  return getAssistantResponse('gpt-3.5-turbo', feedbackPrompt);
};

export { callWhisper, getChatResponse, getFeedback }