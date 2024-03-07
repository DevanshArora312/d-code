import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
const HeadBar = () => {
  return (
    <div className='w-full h-auto bg-white/20 flex justify-start border-box p-4'>
        <RxHamburgerMenu className='text-white text-[30px]'/>
    </div>
  )
}

export default HeadBar