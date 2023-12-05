import { BASE_URL } from '../constant/apiConstants';
import apiRequest from './helpers/apiRequest';


const createUserInDatabse = async (user) => {
    return apiRequest(`${BASE_URL}/user`, 'POST' , null, { name: user.displayName, email: user.email, firebaseId: user.uid })
};


export { createUserInDatabse }