import findUser from './helpers/findUser.js';
import withSession from './helpers/withSession.js';
import Messages from '../models/message.js';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import util from 'util';


const readFile = util.promisify(fs.readFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '../uploads/output.mp3');



const addMessageToDatabase = async (uid, newMessage) => {
   let fileData;
   let base64String;

   try {
       fileData = await readFile(filePath);
       //base64String = fileData.toString('base64');
       if(newMessage.type === 'bot'){
        newMessage.audio = fileData;
    }
   } catch (error) {
       console.error(`Got an error trying to read the file: ${error.message}`);
       return;
   } 

   console.log('newMessageBEFORE', newMessage)

   return await withSession(async (session) => {
       const user = await findUser(uid);
       if (!user) return null;

       let message = await Messages.findOneAndUpdate(
           { creator: user._id },
           { $push:{ messages: newMessage } },
           { new: true, upsert: true },
       );

       console.log('newMessageAFTER-ADD', message)

       if (!message) throw new Error('Failed to update message');
       return message;
   })
};


const getLastConversation = async (uid) => {

    return await withSession(async (session) => {
        const user = await findUser(uid);
        if (!user) return null;

        let lastConversation = await Messages.findOne({ creator: user._id }).session(session);
        if (!lastConversation) return 'no conversation found';
        return lastConversation;       
    })


};


const resetMessages = async (uid) => {
    return await withSession(async (session) => {
        const user = await findUser(uid);
        if (!user) return null;
 
        let result = await Messages.deleteMany({ creator: user._id });
 
        if (result.deletedCount === 0) throw new Error('No messages found to delete');
        return result;
    });
};
 

export {
    addMessageToDatabase,
    getLastConversation,
    resetMessages,
}