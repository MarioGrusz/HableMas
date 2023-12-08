import { BASE_URL } from '../constant/apiConstants';
import apiRequest from './helpers/apiRequest';


const getLatestFeedback = async (token) => {
    if(!token) return
    return await apiRequest(`${BASE_URL}/feedback`, 'GET', token);
};

const getNewFeedbackFromOpenAI = async (token) => {
    if(!token) return
    return apiRequest(`${BASE_URL}/feedback`, 'POST', token);
};


export {
    getLatestFeedback,
    getNewFeedbackFromOpenAI,
}
