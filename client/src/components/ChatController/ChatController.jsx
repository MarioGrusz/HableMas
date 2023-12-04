import React, { useEffect, useState } from 'react';
import './index.scss';
import socket from '../../socket/socket';
import { UserMessage, ChatBotMessage, DotAnimation } from '../ChatElements/ChatElements';

const ChatController = ({ isLoading, setIsLoading, setIsRecordingEnabled }) => {

    const [isLoadingBot, setIsLoadingBot] = useState(false);
    const [messages, setMessages] = useState([]);


    const handleSocketEvents = () => {

        socket.on('receive-transcription', (message) => {
            console.log('receive-transcription event triggered');
            setMessages((prevMessages) => [...prevMessages, { type: 'user', message }]);
            setIsLoading(false)
            setIsLoadingBot(true);
          
        });
      
      
        socket.on('receive-Mp3', (data, chatAnswer) => {
            console.log('receive-Mp3 event triggered');
            const message = chatAnswer
            
            const blob = new Blob([data], { type: 'audio/mp3' });
            const url = URL.createObjectURL(blob);
            setMessages((prevMessages) => [...prevMessages, { type: 'bot', message, url }]);
            const audio = new Audio(url);
            setIsLoadingBot(false);
            audio.play();
            audio.onended = () => setIsRecordingEnabled(true)
      
        });
      
        return () => {
            socket.off('receive-transcription');
            socket.off('receive-Mp3');
        };
    };

    const handleMessage = (message, index) => {
        if (message.type === 'user') {
          return <UserMessage key={index} message={message.message} />;
        } else if (message.type === 'bot') {
          return <ChatBotMessage key={index} message={message.message} audioUrl={message.url} />;
        }
        return null;
    };

    useEffect(handleSocketEvents, [socket]);


    useEffect(() => {
        // Add initial bot message to messages array
        setMessages([{ type: 'bot', message: "Hola, que tal? Soy Alejandro. Press purple mic icon to start a conversation" }]);
    }, []);
  
    return (
        <div className="chat-controller">
            <div className="chat-controller__chatbox">
            {messages.map((message, index) => handleMessage(message, index))}
            {isLoading && <DotAnimation />}
            {!isLoading && isLoadingBot && <DotAnimation />}
            </div>
      </div>
    )
}

export default ChatController