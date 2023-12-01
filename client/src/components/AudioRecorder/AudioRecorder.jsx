
import { useState, useRef, useEffect, useCallback, useReducer } from "react";

//https://www.phind.com/search?cache=r482tyl2cuztu415pxekfnmg

const initialState = {
 permission: false,
 stream: null,
 recordingStatus: "inactive",
 audioChunks: [],
 audio: null,
};

const reducer = (state, action) => {
 switch (action.type) {
   case "SET_PERMISSION":
     return { ...state, permission: action.payload };
   case "SET_STREAM":
     return { ...state, stream: action.payload };
   case "SET_RECORDING_STATUS":
     return { ...state, recordingStatus: action.payload };
   case "SET_AUDIO_CHUNKS":
     return { ...state, audioChunks: action.payload };
   case "SET_AUDIO":
     return { ...state, audio: action.payload };
   default:
     throw new Error();
 }
};

const AudioRecorderComponent = () => {
 const [state, dispatch] = useReducer(reducer, initialState);
 const mediaRecorder = useRef(null);

 const getMicrophonePermission = useCallback(async () => {
   if ("MediaRecorder" in window) {
     try {
       const streamData = await navigator.mediaDevices.getUserMedia({
         audio: true,
         video: false,
       });
       dispatch({ type: "SET_PERMISSION", payload: true });
       dispatch({ type: "SET_STREAM", payload: streamData });
     } catch (err) {
       alert(err.message);
     }
   } else {
     alert("The MediaRecorder API is not supported in your browser.");
   }
 }, []);

 const startRecording = useCallback(async () => {
   dispatch({ type: "SET_RECORDING_STATUS", payload: "recording" });
   const media = new MediaRecorder(state.stream, { type: 'audio/wav' });
   mediaRecorder.current = media;
   mediaRecorder.current.start();
   let localAudioChunks = [];
   mediaRecorder.current.ondataavailable = (event) => {
     if (typeof event.data === "undefined") return;
     if (event.data.size === 0) return;
     localAudioChunks.push(event.data);
   };
   dispatch({ type: "SET_AUDIO_CHUNKS", payload: localAudioChunks });
 }, [state.stream]);

 const stopRecording = useCallback(() => {
   dispatch({ type: "SET_RECORDING_STATUS", payload: "inactive" });
   mediaRecorder.current.stop();
   mediaRecorder.current.onstop = () => {
     const audioBlob = new Blob(state.audioChunks, { type: 'audio/wav' });
     const audioUrl = URL.createObjectURL(audioBlob);
     dispatch({ type: "SET_AUDIO", payload: audioUrl });
     dispatch({ type: "SET_AUDIO_CHUNKS", payload: [] });
   };
 }, [state.audioChunks]);

 useEffect(() => {
   getMicrophonePermission();
 }, [getMicrophonePermission]);

 return (
   <main>
     <button onClick={startRecording}>Start</button>
     <button onClick={stopRecording}>Stop</button>
     <audio controls src={state.audio}></audio>
   </main>
 );
};

export default AudioRecorderComponent;

//export socket https://www.phind.com/search?cache=lywc5xtspj0gwhgdwkuoohbt

