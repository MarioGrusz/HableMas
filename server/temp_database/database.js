import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { teacherPrompt } from './prompts.js';
import readDataFromFile from './helpers/readDataFromFile.js';
import writeDataToFile from './helpers/writeDataToFile.js';
import addRandomFactOrHumor from './helpers/addRandomFactOrHumor.js';


const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = './stored_data.json';
const fileName = path.resolve(__dirname, filePath);


const getRecentMessages = async () => {
        
    const learn_instruction = {
        "role": "system",
        "content": teacherPrompt,
    };

    const messages = [];
    addRandomFactOrHumor(learn_instruction);
    messages.push(learn_instruction);

    try {
        
        const data = await readDataFromFile(fileName);
        const messagesToAdd = data?.length < 5 ? data : data?.slice(-5);
        for (const item of messagesToAdd) {
            messages.push(item);
        }


    } catch (error) {
        console.error(error);
    }
    return messages;
};




const storeRecentMessages = async (request_message, response_message) => {

    try{

        const messages_raw = await getRecentMessages();
        const messages =  messages_raw.slice(1)

        const user_message = {'role' : 'user', 'content': request_message}
        const assistant_message = {'role' : 'assistant', 'content': response_message}
        messages.push(user_message, assistant_message)

        const data = JSON.stringify(messages);
        await writeDataToFile(fileName, data)

    } catch(error){
        console.error('Error writing to file:', error);
    }
    
};


const resetMessages = async () => {

    const data = JSON.stringify([]);
    try {
        await writeDataToFile(fileName, data);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
       
};

export { getRecentMessages, storeRecentMessages, resetMessages }
