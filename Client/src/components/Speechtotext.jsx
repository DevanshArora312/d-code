// import React from 'react'
// import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';

// const Speechtotext = () => {
//     const startListening=()=>{ SpeechRecognition.startListening({continuous:true, language:'en-IN'})};
//     const stop= ()=>{ SpeechRecognition.stopListening()};

//     const {transcript,browserSupportsSpeechRecognition}= useSpeechRecognition();

//     if(!browserSupportsSpeechRecognition){
//         return NULL;
//     }
//   return (
//     // {transcript}
//     <div>
//         <div>{transcript}</div>
//         <div>
//             <button onClick={startListening}>StartListening</button>
//             <button onClick={stop}>StopListening</button>
//         </div>
//     </div>
//   )
// }

// export default Speechtotext;