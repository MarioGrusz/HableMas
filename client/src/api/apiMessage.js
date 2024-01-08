import axios from 'axios';
import { BASE_URL } from '../constant/apiConstants';
import apiRequest from './helpers/apiRequest';

const saveMessageToDataBase = async (token, newMessage) => {
    if(!token) return
    return await apiRequest(`${BASE_URL}/message`, 'POST', token,{ newMessage: newMessage}, null);

};


const getLastConversation = async (token) => {
    if(!token) return
    return await apiRequest(`${BASE_URL}/message`, 'GET', token, null, null);
};


const deleteLastConversation = async (token) => {
    if(!token) return
    return await apiRequest(`${BASE_URL}/message`, 'DELETE', token, null, null);
};
 

export {
    saveMessageToDataBase,
    getLastConversation,
    deleteLastConversation,
}

