# Hable Más 
AI Chatbot for Practicing Conversational Spanish

## Project Overview

This project is an AI chatbot designed to help language learners practice conversational Spanish. Designed to overcome the challenge of lacking conversation partners, enableusers to engage in conversations with Alejandro. Through these interactions, users can receive constructive feedback and effortlessly generate flashcards with newly acquired vocabulary.
It is built with a MERN stack, socket.io for real-time communication, and Firebase for authentication. It also integrates Google Text-to-Speech and OpenAI for natural language processing.

## Features
### Dynamic Conversations

Users can engage in dynamic conversations with the chatbot, Alejandro, on different topics. The chatbot is designed to mimic a real-world conversation with someone else in the Spanish language, providing a comprehensive learning experience.

### Specific Scenarios

Users can request very specific scenarios, which can help them prepare for specific situations, such as business meetings or common situations they may face on vacation.

### Information about Spanish and Spanish Speaking Countries

During conversation, the chatbot provides random information about Spanish and Spanish-speaking countries, mainly focusing on Spain. The bot also uses humor and sometimes colloquial phrases to make the learning process more enjoyable and engaging.

### Feedback Based on Conversation

After the conversation, users can request feedback based on their conversation skills. The feedback points out good skills and areas that need improvement. It also includes new vocabulary and useful phrases, which can be used to create flashcards for memorization.

### Flashcards Creation

Based on the feedback, users can create flashcards. These flashcards contain new vocabulary and useful phrases learned during the conversation. The flashcards are stored so that users can always return to them and continue their language learning journey.

## Live Demo
[HableMas](https://hable.netlify.app/)

## Project Structure

The project is divided into two main directories: client and server.

### Client Directory

The client directory contains the React application. The structure includes:
```
📦 client
 ┣ 📂 src
 ┃ ┣ 📂 api
 ┃ ┣ 📂 assets
 ┃ ┣ 📂 config
 ┃ ┣ 📂 constants
 ┃ ┣ 📂 context
 ┃ ┣ 📂 components
 ┃ ┣ 📂 icons
 ┃ ┣ 📂 pages
 ┃ ┣ 📂 socket
 ┃ ┣ 📂 styles
 ┃ ┣ 📜 .env
 ┃ ┣ 📜 index.js
 ┗ 📜 README.md
``` 

### Server Directory
```
📦 server
┣ 📂 config
┣ 📂 controllers
┣ 📂 middleware
┣ 📂 models
┣ 📂 routes
┣ 📂 scrapers
┣ 📂 services
┣ 📂 temp_database
┣ 📂 uploads
┣ 📂 utils
┣ 📜 index.js
┣ 📜 socket.js
┣ 📜 .env
```
## Built With

<img alt="Vite" src="https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge"><img alt="React" src="https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge"><img alt="React Router" src="https://img.shields.io/badge/-React_Router-CA4245?logo=react-router&logoColor=white&style=for-the-badge"><img alt="React Query" src="https://img.shields.io/badge/-React_Query-000000?logo=react-query&logoColor=white&style=for-the-badge"><img alt="Firebase" src="https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black&style=for-the-badge">

<img alt="Node.js" src="https://img.shields.io/badge/-Node.js-339933?logo=node-dot-js&logoColor=white&style=for-the-badge"><img alt="Express" src="https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white&style=for-the-badge"><img alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-47A248?logo=mongoDB&logoColor=white&style=for-the-badge"><img alt="Mongoose" src="https://img.shields.io/badge/-Mongoose-880000?logoColor=white&style=for-the-badge"><img alt="Firebase Admin" src="https://img.shields.io/badge/-Firebase_Admin-FFCA28?logo=firebase&logoColor=black&style=for-the-badge"><img alt="OpenAI" src="https://img.shields.io/badge/OpenAI-Test-blue?style=for-the-badge&logo=openai"><img alt="Socket.IO" src="https://img.shields.io/badge/Socket.IO-4.1.3-010101?style=for-the-badge&logo=socket-dot-io"><img alt="Google Text-to-Speech" src="https://img.shields.io/badge/Google_Text_to_Speech-Latest-4285F4?style=for-the-badge&logo=google">



