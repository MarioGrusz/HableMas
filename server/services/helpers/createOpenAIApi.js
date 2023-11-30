import { Configuration, OpenAIApi } from 'openai';
import loadEnv from '../../utils/loadEnv.js';
loadEnv('../.env');


function createOpenAIApi() {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    return openai;
}


export default createOpenAIApi