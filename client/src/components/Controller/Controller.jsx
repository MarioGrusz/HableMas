import React, { useEffect, useState } from 'react';
import socket from '../../socket/socket';


const Controller = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBot, setIsLoadingBot] = useState(false);
  const [isRecordingEnabled, setIsRecordingEnabled] = useState(true)
  const [messages, setMessages] = useState([]);


  console.log('message', messages)

  useEffect(() => {

    socket.on('receive-transcription', (message) => {
      console.log('receive-transcription event triggered');
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, { type: 'user', message }]);
      setIsLoading(false)
      setIsLoadingBot(true);
    
    });


    socket.on('receive-Mp3', (data, chatAnswer) => {
      console.log('receive-Mp3 event triggered');
      const message = chatAnswer

      console.log('chatAnswer' , chatAnswer)
      
      const blob = new Blob([data], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      setMessages((prevMessages) => [...prevMessages, { type: 'bot', message, url }]);
      const audio = new Audio(url);
      setIsLoadingBot(false);
      setIsRecordingEnabled(true);
      audio.play();

    });

    return () => {
      socket.off('receive-transcription');
      socket.off('receive-Mp3');
    };
  }, []);



  return (

    <div className="controller">


        <h1>Chat Messages</h1>

        <ul>
            {messages.map((message, index) => (
            <li key={index}>
                <strong>{message.type}:</strong> {message.message}
                <audio src={message.url} controls>
                </audio>
            </li>
            ))}
        </ul>
            
        {/* <div className="controller__chatbox">
            {messages.map((message, index) => {
            if (message.type === 'user') {
                return <p key={index}>USER {message.message}</p>;
            } else if (message.type === 'bot') {
                return <p> BOT {message.mesage}</p>;
            }
            return null;
            })}
        </div> */}
    </div>
  );
};

export default Controller;