import { useRef, useEffect, useCallback, useReducer } from "react";
import { BASE_URL } from "../../constant/apiConstants";
import './index.scss';
import axios from 'axios';
import FormData from 'form-data';
import socket from "../../socket/socket";
import RecordIcon from "../RecordIcon/RecordIcon";
import { useState } from "react";

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

const AudioRecorderComponent = ({ setIsLoading, isRecordingEnabled, setIsRecordingEnabled }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isRecording, setIsRecording] = useState(false);
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

    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(state.audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      dispatch({ type: "SET_AUDIO", payload: audioUrl });
      dispatch({ type: "SET_AUDIO_CHUNKS", payload: [] });

      const headers = {
        'Content-Type': 'audio/wav'
      };

      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.wav');
      setIsLoading(true);

      try {
        const response = await axios.post(`${BASE_URL}/audio`, formData, { headers });
        
        setIsRecordingEnabled(false)
        socket.emit('get-transcription');
      } catch (error) {
        console.error(error);
      }
    };   

  }, [state.audioChunks]);

  useEffect(() => {
    getMicrophonePermission();
  }, [getMicrophonePermission]);

  const handleStartRecording = () => {
    if (!isRecordingEnabled) {
      return; 
    }
    startRecording();
    setIsRecording(true); 
  };

  const handleStopRecording = () => {
    stopRecording();
    setIsRecording(false);
  };



  return (
    
    <div className='icon-wrapper'>
      <button
        onMouseDown={handleStartRecording}
        onTouchStart={handleStartRecording}
        onMouseUp={handleStopRecording}
        onTouchEnd={handleStopRecording}
        className={`record-button recording mic-icon-pulse ${isRecording ? 'recording' : 'reset-animation'}`}
      >
      <RecordIcon />
      </button>
    </div>
  
  );
};

export default AudioRecorderComponent;


