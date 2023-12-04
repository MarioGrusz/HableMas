import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import { feedbackPrompt } from '../temp_database/prompts.js';
import createOpenAIApi from './helpers/createOpenAIApi.js';


import { getRecentMessages } from '../temp_database/database.js';

const openai = createOpenAIApi();
const model = 'whisper-1';

const __dirname = dirname(fileURLToPath(import.meta.url));
const relativeFilePath = '../uploads/input.mp3';
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



const getAssistantResponse = async (prompt) => {

  try {
    const messages = await getRecentMessages();

    const userMessage = { role: 'user', content: prompt };
    messages.push(userMessage);

    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    let assistantResponse = result.data.choices[0].message.content;
    return assistantResponse;
  } catch (error) {
    console.error(`Error during chat completion: ${error}`);
    throw error;  
  }
};

export { callWhisper, getAssistantResponse }