import React, { useEffect, useState } from "react";
import "./index.scss";
import socket from "../../socket/socket";
import {
  UserMessage,
  ChatBotMessage,
  DotAnimation,
} from "../ChatElements/ChatElements";
import AudioRecorderComponent from "../AudioRecorder/AudioRecorder";
import {
  saveMessageToDataBase,
  getLastConversation,
  deleteLastConversation,
} from "../../api/apiMessage";
import { UserAuth } from "../../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import ButtonCircle from "../ButtonCircle/ButtonCircle";

const ChatController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBot, setIsLoadingBot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isRecordingEnabled, setIsRecordingEnabled] = useState(true);
  const { token } = UserAuth();
  const queryClient = useQueryClient();
  const initialMessage = {
    type: "bot",
    message:
      "Hola, que tal? Soy Alejandro. Press and hold purple mic icon to start a conversation",
  };

  const {
    data,
    isLoading: isLoadingLastConversation,
    isFetching,
  } = useQuery(["messages"], () => getLastConversation(token), {
    refetchOnWindowFocus: true,
    staleTime: 0,
    onSuccess: (data) => {
      if (data) {
        const messages = data.messages;
        const newMessages = messages?.map((message, index) => {
          if (message.type === "bot" && message.audio) {
            let bufferObject = message.audio;
            let arrayBuffer = new ArrayBuffer(bufferObject.data.length);
            let typedArray = new Uint8Array(arrayBuffer);
            for (let i = 0; i < bufferObject.data.length; ++i) {
              typedArray[i] = bufferObject.data[i];
            }
            const blob = new Blob([arrayBuffer], { type: "audio/mp3" });
            const url = URL.createObjectURL(blob);

            return { ...message, url };
          }
          return message;
        });

        !data?.messages
          ? setMessages([initialMessage])
          : setMessages(newMessages);
      }
    },
  });

  const { mutateAsync: deleteLastConversationMutation, isLoadingConversation } =
    useMutation({
      mutationFn: () => deleteLastConversation(token),
      onSuccess: () => {
        queryClient.invalidateQueries([["messages"]]);
        setMessages([initialMessage]);
      },
    });

  const handleSocketEvents = () => {
    socket.on("receive-transcription", (message) => {
      console.log("receive-transcription event triggered");
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", message },
      ]);
      setIsLoading(false);
      setIsLoadingBot(true);
      saveMessageToDataBase(token, { type: "user", message });
    });

    socket.on("receive-Mp3", (data, chatAnswer) => {
      console.log("receive-Mp3 event triggered");
      const message = chatAnswer;

      const blob = new Blob([data], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", message, url },
      ]);
      const audio = new Audio(url);
      setIsLoadingBot(false);
      audio.play();
      setIsRecordingEnabled(true);
      saveMessageToDataBase(token, { type: "bot", message, url });

      //audio.onended = () => setIsRecordingEnabled(true)
    });

    return () => {
      socket.off("receive-transcription");
      socket.off("receive-Mp3");
    };
  };

  const handleMessage = (message, index) => {
    if (message.type === "user") {
      return <UserMessage key={index} message={message.message} />;
    } else if (message.type === "bot") {
      return (
        <ChatBotMessage
          key={index}
          message={message.message}
          audioUrl={message.url}
        />
      );
    }
    return null;
  };

  useEffect(handleSocketEvents, [socket]);

  return (
    <>
      <div className="chat-controller">
        <div className="mobile-only-info">
          <p>Sorry microphone doesn't work on mobile</p>
          <p>I am working on that</p>
          <p>Please, use your computer</p>
        </div>
        <ButtonCircle
          text="Reset Chat"
          backgroundColor="white"
          color="black"
          onClick={deleteLastConversationMutation}
          alignSelf={"flex-end"}
          margin={"1rem"}
        />
        <div className="chat-controller__chatbox">
          {messages?.map((message, index) => handleMessage(message, index))}
          {isLoading && <DotAnimation />}
          {!isLoading && isLoadingBot && <DotAnimation />}
        </div>
        <AudioRecorderComponent
          setIsLoading={setIsLoading}
          isRecordingEnabled={isRecordingEnabled}
          setIsRecordingEnabled={setIsRecordingEnabled}
        />
      </div>
    </>
  );
};

export default ChatController;
