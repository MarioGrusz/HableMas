import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';



const AudioRecorderComponent = () => {
    
    const recorderControls = useAudioRecorder();

    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
    };

    return (
        
        <div>
          <AudioRecorder 
            onRecordingComplete={(blob) => addAudioElement(blob)}
            recorderControls={recorderControls}
            onNotAllowedOrFound={() => console.log('User did not give permission to access the microphone')}
          />
          <button onClick={recorderControls.stopRecording}>Stop recording</button>
        </div>

    );
};


export default AudioRecorderComponent