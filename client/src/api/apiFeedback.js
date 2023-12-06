import { BASE_URL } from '../constant/apiConstants';
import apiRequest from './helpers/apiRequest';
import axios from "axios";


const getLatestFeedback = async (token) => {
    if(!token) return
    return apiRequest(`${BASE_URL}/feedback`, 'GET', token, null);
};
 


const getNewFeedbackFromOpenAI = async (token) => {
    if(!token) return
    return apiRequest(`${BASE_URL}/feedback/new`, 'POST', token, null);
};


export {
    getLatestFeedback,
    getNewFeedbackFromOpenAI,
}
