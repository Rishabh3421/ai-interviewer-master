import Image from 'next/image'
import React from 'react'

const header = () => {
  return (
    <div className='p-4 shadow-md'>
      <Image src="/chatGPT.png" alt="logo" width={200} height={200} className='w-[100px] object-cover' />
      
    </div>
  )
}

export default header
