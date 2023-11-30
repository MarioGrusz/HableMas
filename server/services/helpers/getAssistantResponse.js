import createOpenAIApi from './createOpenAIApi.js';
import { getRecentMessages } from '../../temp_database/database.js';
import { storeRecentMessages } from '../../temp_database/database.js';

const openai = createOpenAIApi();

const getAssistantResponse = async (model, prompt) => {

  try {
    const messages = await getRecentMessages();
    const userMessage = { role: 'user', content: prompt };

    messages.push(userMessage);
  
    const result = await openai.createChatCompletion({
      model: model,
      messages: messages,
    });
  
    let assistantResponse = result.data.choices[0].message.content;
    await storeRecentMessages(prompt, assistantResponse)
    return assistantResponse;
  } catch (error) {
    console.error(`Error during chat completion: ${error}`);
    throw error; 
  }
}

export default getAssistantResponse