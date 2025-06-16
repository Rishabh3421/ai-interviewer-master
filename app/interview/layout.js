
"use client";

import React, { useState } from "react";
import Header from "./_components/header";
import { InterviewContext } from "@/context/InterviewContext";

export default function Layout({ children }) {
  const [interviewInfo, setInterviewInfo] = useState(null);

  return (
    <InterviewContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      <div className="bg-secondary min-h-screen">
        <Header />
        {children}
      </div>
    </InterviewContext.Provider>
  );
}
