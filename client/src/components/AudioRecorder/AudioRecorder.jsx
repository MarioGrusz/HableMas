
import { useState, useRef, useEffect, useCallback, useReducer } from "react";

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























// import { useState, useRef, useEffect } from "react";


// const AudioRecorderComponent = () => {
//     const [permission, setPermission] = useState(false);
//     const [stream, setStream] = useState(null);


//     const mediaRecorder = useRef(null);
//     const [recordingStatus, setRecordingStatus] = useState("inactive");
//     const [audioChunks, setAudioChunks] = useState([]);
//     const [audio, setAudio] = useState(null);

//     console.log('audio', audioChunks)


//     const getMicrophonePermission = async () => {
//         if ("MediaRecorder" in window) {
//             try {
//                 const streamData = await navigator.mediaDevices.getUserMedia({
//                     audio: true,
//                     video: false,
//                 });
//                 setPermission(true);
//                 setStream(streamData);
//             } catch (err) {
//                 alert(err.message);
//             }
//         } else {
//             alert("The MediaRecorder API is not supported in your browser.");
//         }
//     };

//     const startRecording = async () => {
//         setRecordingStatus("recording");
//         //create new Media recorder instance using the stream
//         const media = new MediaRecorder(stream, { type: 'audio/wav' });
//         //set the MediaRecorder instance to the mediaRecorder ref
//         mediaRecorder.current = media;
//         //invokes the start method to start the recording process
//         mediaRecorder.current.start();
//         let localAudioChunks = [];
//         mediaRecorder.current.ondataavailable = (event) => {
//            if (typeof event.data === "undefined") return;
//            if (event.data.size === 0) return;
//            localAudioChunks.push(event.data);
//         };
//         setAudioChunks(localAudioChunks);
//     };

//     const stopRecording = () => {
//         setRecordingStatus("inactive");
//         //stops the recording instance
//         mediaRecorder.current.stop();
//         mediaRecorder.current.onstop = () => {
//           //creates a blob file from the audiochunks data
//            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//           //creates a playable URL from the blob file.
//            const audioUrl = URL.createObjectURL(audioBlob);
//            setAudio(audioUrl);
//            setAudioChunks([]);
//         };
//     }

//     useEffect(() => {

//         getMicrophonePermission()

//     }, [])


//     return (
//         <main>
//             <button onClick={startRecording}>Start</button>
//             <button onClick={stopRecording}>Stop</button>
//             <audio controls></audio>
//         </main>
//     )
// }

// export default AudioRecorderComponent





















// import { useState, useRef, useEffect } from 'react';

// const AudioRecorderComponent = () => {

//    const [canRecord, setCanRecord] = useState(false)
//    const [isRecording, setIsRecording] = useState(false)

//    const playback = useRef(null);
//    let recorder = null;
//    let chunks = [];

//    const setupStream = (stream) => {
//        recorder = new MediaRecorder(stream);


//        console.log(recorder.state)

//        recorder.ondataavailable = (e) => {
//            chunks.push(e.data);
//        };

//        recorder.onstop = (e) => {
//            const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus'});
//            chunks = []
//            const audioURL = window.URL.createObjectURL(blob)
//            playback.current.src = audioURL;
//            console.log(audioURL)
//        }

//        setCanRecord(true)
//    };


//    const setupAudio = async () => {
//     if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({audio: true});
//             console.log('stream', stream)
//             setupStream(stream);
//         } catch (err) {
//             if (err.name === "NotAllowedError") {
//                 console.error("Permission to access microphone was denied.");
//             } else if (err.name === "NotFoundError") {
//                 console.error("No suitable media devices were found.");
//             } else {
//                 console.error(err);
//             }
//         }
//     }
//  };

//    const toggleRecording = () => {
//     if(!canRecord) return
 
//     if(!isRecording) {
       
//         recorder.start()
//         console.log(recorder.state); // Log the state of the MediaRecorder
//         setIsRecording(true)

//     } else {

//         recorder.stop()
//         console.log(recorder.state); // Log the state of the MediaRecorder
//         setIsRecording(false)
        
//     }
//  }
 

//    useEffect(() => {
//        setupAudio()

//    }, [])

//    return (
//        <main>
//            <button onClick={toggleRecording} disabled={!canRecord}>MIC</button>


//            <audio ref={playback} controls></audio>
//        </main>
//    )
// }

// export default AudioRecorderComponent

