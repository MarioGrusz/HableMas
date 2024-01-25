# Hable Más 
AI Chatbot for Practicing Conversational Spanish

<!-- TABLE OF CONTENTS -->
Table of Contents

  - [Project Overview](#project-overview)
  - [Features](#features)
    - [Dynamic Conversations](#dynamic-conversations)
    - [Specific Scenarios](#specific-scenarios)
    - [Spanish & Fun Facts](#spanish-&-fun-facts)
    - [Feedback Based on Conversation](#feedback-based-on-conversation)
    - [Flashcards Creation](#flashcards-creation)
  - [Live Demo](#live-demo)
  - [Project Structure](#project-structure)
    - [Client Directory](#client-directory)
    - [Server Directory](#server-directory)
  - [Built With](#built-with)
  - [Deployment](#deployment)
  - [Getting Started](#getting-started)
  - [Setting Up Accounts on MongoDB Firebase OpenAI and Google](#setting-up-accounts-on-mongodb-firebase-openai-and-google)
    - [MongoDB](#mongodb)
    - [Firebase](#firebase)
    - [Google Text-to-Speech](#google-text-to-speech)
    - [OpenAI](#openai)
  - [License](#license)

## Project Overview

This project is an AI chatbot designed to help language learners practice conversational Spanish. Designed to overcome the challenge of lacking conversation partners, enableusers to engage in conversations with Alejandro. Through these interactions, users can receive constructive feedback and effortlessly generate flashcards with newly acquired vocabulary.
It is built with a MERN stack, socket.io for real-time communication, and Firebase for authentication. It also integrates Google Text-to-Speech and OpenAI for natural language processing.

<img width="1179" alt="ai_mobiles" src="https://github.com/MarioGrusz/HableMas/assets/113439131/cf74daa6-f073-4893-8165-cf47a2e84406">

## Features
### Dynamic Conversations

Users can engage in dynamic conversations with the chatbot, Alejandro, on different topics. The chatbot is designed to mimic a real-world conversation with someone else in the Spanish language, providing a comprehensive learning experience.

### Specific Scenarios

Users can request very specific scenarios, which can help them prepare for specific situations, such as business meetings or common situations they may face on vacation.

### Spanish & Fun Facts

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

<img alt="Node.js" src="https://img.shields.io/badge/-Node.js-339933?logo=node-dot-js&logoColor=white&style=for-the-badge"><img alt="Express" src="https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white&style=for-the-badge"><img alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-47A248?logo=mongoDB&logoColor=white&style=for-the-badge"><img alt="Mongoose" src="https://img.shields.io/badge/-Mongoose-880000?logoColor=white&style=for-the-badge"><img alt="Firebase Admin" src="https://img.shields.io/badge/-Firebase_Admin-FFCA28?logo=firebase&logoColor=black&style=for-the-badge"><img alt="OpenAI" src="https://img.shields.io/badge/OpenAI-blue?style=for-the-badge&logo=openai"><img alt="Socket.IO" src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket-dot-io"><img alt="Google Text-to-Speech" src="https://img.shields.io/badge/Google_Text_to_Speech-4285F4?style=for-the-badge&logo=google">

## Deployment

The application is deployed on Netlify and Railway.

## Getting Started
To get a local copy up and running follow these simple steps:

Clone the project

```bash
  git clone https://github.com/MarioGrusz/HableMas.git
```

Install dependencies

Server

```bash
  cd server
```

```bash
  npm install
```

Client 

```bash
  cd client
```

```bash
  npm install
```

Run the Project

Server

```bash
  npm start
```

Client

```bash
  npm run dev
```

## Setting Up Accounts on MongoDB Firebase OpenAI and Google
To successfully run this project, you need to create accounts on MongoDB, Firebase, Google and OpenAI. Here are the steps to follow:

### MongoDB

* Go to the MongoDB Atlas website and sign up for a new account.

* After signing up, create a new cluster. You can choose the free tier for development purpose.

* Set IP address to allow connections from everywhere.

* Create a new database user with a username and password. Note down the credentials as you will need them later to connect your application to MongoDB.

* In the server/.env file, update the MONGODB_URL variable with your MongoDB connection string. Replace with the password of the database user you just created.

### Firebase

* Go to the Firebase console and sign up for a new account.

* Click on "Create a project". Give your project a name and click on "Continue".

* Follow the prompts to configure your project. You can leave the default settings for now.

* After creating the project, you will be redirected to the project dashboard. Click on "Develop" in the left sidebar and then on "Database".

* Choose "Start in test mode" and enable the "Enable Firestore" switch.

* Navigate to the "Project settings" by clicking on the gear icon next to "Project Overview" and select "Service accounts".

* Click on "Generate new private key". This will download a JSON file containing your Firebase Admin SDK credentials. Keep this file safe as it contains sensitive information.

* In the server/.env file, update the FIREBASE_ADMIN_SDK variable with the content of the downloaded JSON file converted into a JSON string.

* Then client side, navigate to the Firebase console, click on "Project settings", then "Your apps", and select your app. In the "Firebase SDK snippet" section, select "Config". Copy the generated code and paste it into your client/.env file, replacing VITE_APP_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, and VITE_FIREBASE_APP_ID with the corresponding values from the copied code.

### Google Text-to-Speech
  
* Go to the Google Cloud Console and sign up for a new account if you haven't done so already.
* Create a new project. Give your project a name and click on "Create".
* After creating the project, you will be redirected to the project dashboard. Click on "Library" in the left sidebar.
* Search for "Text-to-Speech" and click on it.
* Click on "Enable" to enable the Text-to-Speech API for your project.
* After enabling the API, navigate to the "Credentials" section in the left sidebar.
* Click on "Create Credentials" and select "API key". This will generate a new API key.
* In the server/.env file, update the GOOGLE_APPLICATION_CREDENTIALS variable with the generated API key (JSON string).


### OpenAI

* Go to the OpenAI website and sign up for a new account.
* After signing up, navigate to the "API keys" section in the left sidebar.
* Click on "Create new API key". This will generate a new API key.
* In the server/.env file, update the OPENAI_API_KEY variable with the generated API key.
* Optionally, if you are part of an organization on OpenAI, you can also set the OPEN_AI_ORG variable with your organization ID.

## License

This project is licensed under the MIT License.







