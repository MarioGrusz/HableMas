import { useState } from "react";
import AudioRecorderComponent from "./components/AudioRecorder/AudioRecorder";
import ChatController from "./components/ChatController/ChatController";



function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [isRecordingEnabled, setIsRecordingEnabled] = useState(true)

  return (
    <>
     <ChatController 
        isLoading={isLoading} 
        setIsLoading={setIsLoading} 
        setIsRecordingEnabled={setIsRecordingEnabled} 
     />
     <div className="mic-wrapper">
        <AudioRecorderComponent 
            setIsLoading={setIsLoading} 
            isRecordingEnabled={isRecordingEnabled} 
            setIsRecordingEnabled={setIsRecordingEnabled} 
        />
     </div>
    </>
  )
}

export default App

