import { callWhisper, getAssistantResponse } from './services/openai.service.js';
import { convertTextToMp3 } from './services/google.service.js';
import { storeRecentMessages } from './temp_database/database.js';
import fs from 'fs';

export const setupSocketEvents = (io) => {

        
   io.on('connection', (socket) => {
       console.log(`User Connected: ${socket.id}`);

       socket.on('get-transcription', async () => {
            try {
                const prompt = await callWhisper();
                socket.emit('receive-transcription', prompt);
                const chatAnswer = await getAssistantResponse(prompt);
                await convertTextToMp3(chatAnswer);
                storeRecentMessages(prompt, chatAnswer)
                const filePath = './uploads/output.mp3';
                const fileData = fs.readFileSync(filePath);
                socket.emit('receive-Mp3', fileData, chatAnswer);
            } catch (error) {
                console.error('Error:', error);
            }

        });

       socket.on("disconnect", (reason) => {
           console.log("Socket disconnected:", socket.id);
           console.log("Reason:", reason);
       }); 
   });
};

