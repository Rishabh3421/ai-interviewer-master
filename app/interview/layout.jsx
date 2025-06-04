"use client"
import React, { useState } from 'react'
import Header from './_components/header'
import { InterviewContext } from '@/context/InterviewContext'
const layout = ({children}) => {
  const [interviewInfo,setInterviewInfo] = useState();
  return (
    <InterviewContext.Provider value={{interviewInfo,setInterviewInfo}}>
    <div className='bg-secondary h-screen'  >
        <Header/>
        {children}
    </div>
    </InterviewContext.Provider>
  )
}

export default layout
