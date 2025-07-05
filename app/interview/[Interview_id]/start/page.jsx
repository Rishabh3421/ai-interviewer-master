"use client";
import { InterviewContext } from "@/context/InterviewContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Mic, MicOff, PhoneOff, Sun, Moon } from "lucide-react";
import Vapi from "@vapi-ai/web";
const StartInterview = () => {
  const { interviewInfo } = useContext(InterviewContext);
  const [isMuted, setIsMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const vapi = new Vapi({
    apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY,
  });

  const 


  const intervalRef = useRef(null);

  // Interview Timer
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60).toString().padStart(2, "0");
    const secs = (sec % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleMuteToggle = () => setIsMuted((prev) => !prev);
  const handleThemeToggle = () => setDarkMode((prev) => !prev);
  const handleEndInterview = () => {
    clearInterval(intervalRef.current);
    alert("Interview ended.");
  };

  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} w-full h-screen flex flex-col justify-between`}>
      {/* Header */}
      <div className={`p-5 flex justify-between items-center shadow-md ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>

      <h1 className="text-xl uppercase text-purple-400">IntelliHire</h1>

        <p className="text-xl text-gray-600 uppercase">{interviewInfo?.jobRole || "Interview"}</p>
        <div className="flex gap-4 items-center">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full hover:scale-105 transition"
            title="Toggle Theme"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <p className={`text-sm px-3 py-1 rounded-full ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
            {formatTime(seconds)}
          </p>
        </div>
      </div>

      {/* Video Section */}
      <div className={`flex flex-1 p-4 gap-10 justify-center items-center transition-all ${darkMode ? "bg-gradient-to-r from-gray-900 to-gray-800" : "bg-gradient-to-r from-gray-100 to-gray-200"}`}>
        {/* User */}
        <div className={`w-[45%] h-[80%] rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg ${darkMode ? "bg-gray-700" : "bg-white border border-gray-300"}`}>
          <div className="bg-gray-500 w-40 h-40 rounded-full flex items-center justify-center text-3xl font-semibold mb-4">
            {interviewInfo?.userName?.split(" ")[0][0] || "U"}
          </div>
          <p className="text-lg">{interviewInfo?.userName || "User"}</p>
        </div>

        {/* AI Interviewer */}
        <div className={`w-[45%] h-[80%] rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg ${darkMode ? "bg-gray-700" : "bg-white border border-gray-300"}`}>
          <div className="bg-purple-600 w-40 h-40 rounded-full flex items-center justify-center text-3xl font-semibold mb-4">
            🤖
          </div>
          <p className="text-lg">AI Interviewer</p>
        </div>
      </div>

      {/* Footer Controls */}
      <div className={`flex justify-center items-center gap-6 p-6 border-t ${darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"}`}>
        <button
          onClick={handleMuteToggle}
          className={`px-6 py-3 rounded-full flex items-center gap-2 font-medium transition ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-black hover:bg-gray-300"}`}
        >
          {isMuted ? <MicOff /> : <Mic />}
          {isMuted ? "Unmute" : "Mute"}
        </button>

        <button
          onClick={handleEndInterview}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full flex items-center gap-2 text-white font-medium"
        >
          <PhoneOff />
          End Interview
        </button>
      </div>
    </div>
  );
};

export default StartInterview;
