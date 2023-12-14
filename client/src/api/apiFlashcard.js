import { BASE_URL } from '../constant/apiConstants';
import apiRequest from './helpers/apiRequest';
import axios from 'axios'
 

const getLatestFlashcardSet = async (token) => {
    console.log('getLatestFlashcardSet')
    if(!token) return
    return await apiRequest(`${BASE_URL}/flashcard`, 'GET', token)
};

const getFlashcardsDateHeaders = async (token) => {
    console.log('getFlashcardsDateHeaders')
    if(!token) return
    return await apiRequest(`${BASE_URL}/flashcard/date`, 'GET', token)
};

const getFlashcardSetById = async (token, flashcardSetId) => {
    console.log('getFlashcardSetById')
    if(!token) return
    return await apiRequest(`${BASE_URL}/flashcard/:id`, 'GET', token, null, encodeURIComponent(flashcardSetId))
};

// const getFlashcardSetById = async (token, flashcardSetId) => {

//     const id = encodeURIComponent(flashcardSetId)

//     const config = {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//     };

    
//     const response = await axios.get(`${BASE_URL}/flashcard/${id}`, config)
//     return response.data
//         // .then((res) => console.log('retrivedDataID', res.data))
//         // .catch((err) => console.error(err));


// }

const createNewFlashcardSet = async (token) => {
    console.log('createNewFlashcardSet')
    if(!token) return
    return await apiRequest(`${BASE_URL}/flashcard/new`, 'POST', token)
};

export {
  getLatestFlashcardSet,
  createNewFlashcardSet,
  getFlashcardsDateHeaders,
  getFlashcardSetById,
}