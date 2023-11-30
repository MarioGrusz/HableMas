import admin from 'firebase-admin';
import loadEnv from '../utils/loadEnv.js';

//Load environment variables from .env file
loadEnv('../.env');


//Use the GOOGLE_APPLICATION_CREDENTIALS environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;
