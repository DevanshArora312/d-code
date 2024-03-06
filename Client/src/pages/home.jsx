import React, {useState, useEffect, useRef} from 'react'
import HeadBar from '../components/HeadBar'
import Footer from '../components/Footer'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
const Home = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const fileInputRef = useRef(null);

    const [inLanguage, setInLanguage] = useState('en')
    const [outLanguage, setOutLanguage] = useState('en')

    const [pdf, setPdf] = useState('');
    
    

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
    };

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(()=>{
        setInput(transcript);
    }, [transcript]);

    const stop = () => {
        console.log(transcript);
        
        SpeechRecognition.stopListening()
        // setData(transcript);
    };

    const changeHandler = ((event)=>{
        setInput(event.target.value);
    })
  
    const submitHandler = (async()=>{
        const axiosInstance = axios.create({});
        console.log(pdf);
        if(pdf !== ''){
            const formData = new FormData();
            formData.append("pdfDocument", pdf);
            const response = await axiosInstance({
                method:  'POST',
                url: 'http://localhost:8080/pdf-parse',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: null
            });
            console.log(response);
            setInput(response?.data?.message)
        }
        const response = await axiosInstance({
            method:  'POST',
            url: 'http://localhost:8080/translate',
            data: {
                languageFrom: inLanguage,
                languageTo : outLanguage,
                text: [{
                    source: input
                }]
            },
            headers: null,
            params: null
        })

        setOutput(response?.data?.message)
    })
    return (
        <div className='w-screen h-screen overflow-hidden border-box m-0'>
            <HeadBar/>
            <main >
                <div className='w-full flex flex-col justify-center items-center py-10'>
                    Real-Time language translation website
                </div>
                <div id='languageBox' className='flex flex-col justify-center items-center gap-4'>
                    <div className="flex w-full h-auto py-4 justify-center items-center">
                        <select onChange={(event)=>{
                            setInLanguage(event.target.value);
                        }}>
                            <option value='en'>
                                English
                            </option>
                            <option value='hi'>
                                Hindi
                            </option>
                            <option value='bn'>
                                Bengali
                            </option>
                            <option value='kn'>
                                Kannada
                            </option>
                            <option value='as'>
                                Assamese
                            </option>
                            <option value='ta'>
                                Tamil
                            </option>
                        </select>
                    </div>
                    <div className="flex w-full h-auto py-4 justify-center items-center">
                        <select onChange={(event)=>{
                            setOutLanguage(event.target.value);
                        }}>
                            <option value='en'>
                                English
                            </option>
                            <option value='hi'>
                                Hindi
                            </option>
                            <option value='bn'>
                                Bengali
                            </option>
                            <option value='kn'>
                                Kannada
                            </option>
                            <option value='as'>
                                Assamese
                            </option>
                            <option value='ta'>
                                Tamil
                            </option>
                        </select>
                    </div>
                </div>
                <div id='textArea' className='w-full h-auto border-box flex max-sm:flex-col gap-4 items-center justify-around'>
                    <textarea className='w-[40%] bg-sky-300/70 h-[200px] border-2 p-2 rounded-md border-sky-500 outline-none' value={input} onChange={changeHandler}>

                    </textarea>
                    <textarea value={output} className='w-[40%] bg-sky-300/70 h-[200px] border-2 p-2 rounded-md border-sky-500 outline-none' readOnly>

                    </textarea>
                </div>
                <div id='submitArea' className='w-full h-auto border-box flex flex-col max-sm:flex-col gap-4 items-center justify-around px-5 py-10'>
                    <div className='w-[41%] bg-sky-300 border-2 border-sky-500 rounded-md px-10 py-2 flex items-center justify-center cursor-pointer duration-200 hover:scale-95'>
                        <label htmlFor='pdfDocument'>Upload a File</label>
                        <input type='file' id='pdfDocument' ref={fileInputRef} className='hidden' onChange={(event)=>{
                            const file = event.target.files[0];
                            setPdf(file);
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onloadend = ()=>{

                            }
                        }}/>
                    </div>
                    <button className='w-[41%] bg-sky-300 rounded-md border-sky-500 border-2 px-10 py-2 duration-200 hover:scale-95' onClick={submitHandler}>Translate</button>
                </div>
                <div>
                    <button onClick={startListening}>StartListening</button>
                    <button onClick={stop}>StopListening</button>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Home