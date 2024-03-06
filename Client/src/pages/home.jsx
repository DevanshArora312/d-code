import React from 'react'
import HeadBar from '../components/HeadBar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='w-screen h-screen overflow-hidden border-box m-0'>
        <HeadBar/>
        <main >
            <div className='w-full flex flex-col justify-center items-center py-10'>
                Real-Time language translation website
            </div>
            <div id='languageBox' className='flex flex-col justify-center items-center gap-4'>
                <div className="flex w-full h-auto py-4 justify-center items-center">
                    <select>
                        <option>
                            English
                        </option>
                        <option>
                            Hindi
                        </option>
                    </select>
                </div>
                <div className="flex w-full h-auto py-4 justify-center items-center">
                    <select>
                        <option>
                            English
                        </option>
                        <option>
                            Hindi
                        </option>
                    </select>
                </div>
            </div>
            <div id='textArea' className='w-full h-auto border-box flex max-sm:flex-col gap-4 items-center justify-around'>
                <textarea className='w-[40%] bg-orange-100 h-[200px] border-2 border-orange-200'>

                </textarea>
                <textarea className='w-[40%] bg-orange-100 h-[200px] border-2 border-orange-200'>
                    
                </textarea>
            </div>
            <div id='submitArea' className='w-full h-auto border-box flex max-sm:flex-col gap-4 items-center justify-around px-5 py-10'>
                <button className='w-[41%] bg-orange-300 border-yellow-200 px-10 py-2'>Translate</button>
                <div className='w-[43%]'>
                    Hello bhai
                </div>
            </div>
        </main>
        <Footer/>
    </div>
  )
}

export default Home