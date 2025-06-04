import Image from 'next/image'
import React from 'react'

const header = () => {
  return (
    <div className='p-4 shadow-md h-[80px]'>
      <Image src="/chatGPT.png" alt="logo" width={200} height={100} className='w-[140px] -mt-[40px]'/>
      
    </div>
  )
}

export default header
