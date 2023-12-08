/**
 * Project Name: AI CHATBOT
 * Description: AI powered chatbot with whm you can practise speaking skills.
 *
 * Author: Mariusz Gruszczynski
 * Email: mario.gruszczynski@gmail.com
 * Date: 14th September 2023
*/

import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import loadEnv from './utils/loadEnv.js';
import connectDB from './config/database.js';
import { setupSocketEvents } from './socket.js';
import errorHandler from './middleware/error.js';
import audioRouter from './routes/audio.js';
import userRouter from './routes/user.js'
import feedbackRouter from './routes/feedback.js';
import flashcardRouter from './routes/flashcard.js';

//Load environment variables from .env file
loadEnv('../.env');

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
const PORT = process.env.PORT || 5000;

app.use("/api/v1/audio", audioRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/flashcard", flashcardRouter);
app.use(errorHandler)

app.get("/", (req, res) => {
   res.send("HELLO FROM 'HABLE MAS' SPANISH CHATBOT!");
});



const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST'] 
    }
});

const startServer = async () => {

    try {

        connectDB(process.env.MONGODB_URL);

        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        });

        setupSocketEvents(io);

    } catch (error) {
        console.log(error)
    }
}


startServer();