/*global chrome*/
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const onclick= async() => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
    target: { tabId : tab.id },
      func: () => { 
        alert('Hello from my extension!');
      }
    });
  }
  return (
    <div className='w-full h-full'>
      <article>
        Welcome to website translator wizard.<br/>
        Just Choose the language of your page and choose the desired language and click on Translate!
      </article>
      <div className='flex justify-around w-full items-center'>
          <select>
            <option>
              English
            </option>
            <option>
              Hindi
            </option>
          </select>
          <select>
            <option>
              English
            </option>
            <option>
              Hindi
            </option>
          </select>
      </div>
      <div className='w-full flex justify-center items-center'>
        <button className='bg-pink-300 text-black'>
          Translate
        </button>
      </div>
    </div>
  )
}

export default App
