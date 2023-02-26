import logo from './logo.svg';
import './App.css';
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import React, { Suspense, useState, useEffect } from 'react';


import Cat from './components/Cat4';
import Timer from './components/Timer';
const { Configuration, OpenAIApi } = require("openai")

function countSyllables(sentence) {
  // Remove all non-alphabetic characters and split the sentence into words
  const words = sentence.toLowerCase().replace(/[^a-z]/g, '').split(' ');

  // Count the number of vowels in each word
  const numSyllables = words.map(word => {
    let count = 0;
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
        count++;
        if (i > 0 && vowels.includes(word[i - 1])) {
          // Exclude dipthongs and tripthongs
          count--;
        }
      }
    }
    return count;
  });

  // Sum the number of syllables for all words in the sentence
  const totalSyllables = numSyllables.reduce((acc, val) => acc + val, 0);

  return totalSyllables;
}





function splitSentence(sentence) {
  const regex = /([\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/g;
  return sentence.split(regex).filter(word => word !== '' && word !== ' ');
}
function Cube() {
  return (
    <mesh>
      <boxBufferGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

function App() {
  const [action, setAction] = useState("pause");

  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(false);


    const configuration = new Configuration({
      apiKey: "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",
    });
  
    const openai = new OpenAIApi(configuration);
    const [prompt, setPrompt] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [loading, setLoading] = useState(false);
    //const [syllables, setSyllables] = useState(0);
    //const [phonemes, setPhonemes] = useState([]);
    const [stop, setStop] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const result = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 0.5,
          max_tokens: 4000,
        });
        //console.log("response", result.data.choices[0].text);
        setApiResponse(result.data.choices[0].text);
        //setPhonemes(splitSentence(result.data.choices[0].text))
        //setStartTime(true)
      } catch (e) {
        //console.log(e);
        setApiResponse("Something is going wrong, Please try again.");
      }
      
      setLoading(false);
    };
/*
    useEffect(() => {
      if(startTime){
      
      
      // Start the timer
      const intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
        //action=="pause"?setAction("close"):setAction("pause");
        setAction("close")
        if (time >countSyllables(apiResponse)){
          setAction("pause")
          setStartTime(false)
          setTime(0)
        }
      }, 200);
    
      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
    
    }, [startTime, time, apiResponse]);
  
 const [delay, setDelay] = useState(100);
    useEffect(() => {
      if (startTime) {
        console.log(phonemes)
          const interval = setInterval(() => {
              //count < 9 ? setDelay(100) : setDelay(1000)
              phonemes[time] == "." ? setDelay(500) : setDelay(250)
              setTime(time + 1)
              console.log(phonemes[time])
              if (time >= phonemes.length - 1) {
                  setTime(0);
                  setStartTime(false);
                  setAction("pause")
              }
              if (phonemes[time] != ".") {
                  setAction("close");//set action to phoneme at current count
              } else {
                  setAction("pause")
              }
          }, delay);
          return () => clearInterval(interval);
      }
  }, [startTime, time, apiResponse]);*/

    useEffect(() => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(apiResponse);
      synth.speak(utterance);
      utterance.onboundary = function(event) {
        console.log(event.name + ' boundary reached after ' + event.elapsedTime + ' milliseconds.');
        setTime(event.elapsedTime/1000)
        setAction("longspeak")
        console.log(time)
      } 
    }, [apiResponse, time, action]);
  return (
    <div className="text-center h-screen">
      <header className="header">
      </header>
      <body >
        <div className='flex flex-row space-x-5 px-5'>
          <div className="viewer w-1/2">
            <div className="text-container w-full">
              <h1>Meow</h1>
              <div className='button'>
                <button onClick={()=>window.location.href="https://www.youtube.com/results?search_query=cat+videos"}>Click for cats</button>
              </div>
            </div>
            <div className='cat-container w-full'>
              <Canvas>
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                  <Cat action={action} time={time} />
                </Suspense>
              </Canvas>
            </div>
          </div>
          <div className='chat flex flex-col space-y-10'>
          <div className='chat-container h-1/2 bg-primary rounded-3xl mt-5 py-3'>
             <h3 className='text-3xl'> Hi there! I'm CatGPT. </h3>
              <h3 className=''> I'm a cat that can talk. </h3>
              <h3>I am definitely not ChatGPT in a cute cat costume. </h3> 
              <h3 className=''> Ask me anything! </h3>
            </div>
            <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: '20vh',
            width:"50vw",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-row">
            <textarea
              type="text"
              value={prompt}
              placeholder="Type your prompt here..."
              onChange={(e) => setPrompt(e.target.value)}
              className='w-1/2 bg-secondary rounded-3xl px-5 py-5'
            ></textarea>
            <button
              disabled={loading || prompt.length === 0}
              type="submit"
              className='button w-1/2 bg-primary hover:bg-primary-light font-bold py-5 px-5 rounded-full'
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </form>
        </div>
        {apiResponse && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <strong>CatGPT:</strong>
              <div className="w-full bg-secondary">
              {apiResponse}
              </div>
            </div>
          </div>
        )}
      </>
            
            <button className="button bg-primary rounded-3xl mx-auto" onClick={()=>window.speechSynthesis.cancel()}>Stop Speech</button>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
