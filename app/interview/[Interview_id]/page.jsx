"use client";

import { Input } from "@/components/ui/input";
import { InterviewContext } from "@/context/InterviewContext";
import { supabase } from "@/services/superbaseClient";
import { Clock, InfoIcon, Loader2Icon, Video } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const interview_id = params.interview_id;
  const router = useRouter();

  const [interviewData, setInterviewData] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const { setInterviewInfo } = useContext(InterviewContext);

  useEffect(() => {
    if (interview_id) {
      console.log("🔍 Loaded interview_id from params:", interview_id);
      GetInterviewDetails();
    }
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("InterviewQuestions")
        .select("jobRole, duration, jobDescription, questionsList, type")
        .eq("interview_id", interview_id);

      if (error) throw error;

      if (data?.length > 0) {
        const raw = data[0];

        // Safely parse JSON strings
        const parsedQuestions = JSON.parse(raw.questionsList || "[]");
        const parsedType = JSON.parse(raw.type || "[]");

        const parsedData = {
          ...raw,
          questionsList: parsedQuestions,
          type: parsedType,
        };

        console.log("✅ Interview Data parsed:", parsedData);
        setInterviewData(parsedData);
      } else {
        console.warn("⚠️ No data found for this interview ID.");
      }
    } catch (error) {
      console.error("❌ Supabase error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const OnJoinInterview = async () => {
    if (!userName) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("InterviewQuestions")
        .select("*")
        .eq("interview_id", interview_id);

      if (error) throw error;

      if (data?.length > 0) {
        const raw = data[0];
        const parsedQuestions = JSON.parse(raw.questionsList || "[]");
        const parsedType = JSON.parse(raw.type || "[]");

        const parsedData = {
          ...raw,
          questionsList: parsedQuestions,
          type: parsedType,
        };

        setInterviewInfo({ ...parsedData, userName });
        router.push(`/interview/${interview_id}/start`);
      } else {
        console.error("No interview found with that ID.");
      }
    } catch (error) {
      console.error("Error joining interview:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 md:px-28 lg:px-64 mt-10 overflow-auto max-h-screen">
      <div className="flex flex-col justify-center items-center border rounded-2xl bg-white p-7 lg:px-33 xl:px-52">
        <Image
          src="/chatGPT.png"
          alt="logo"
          width={100}
          height={200}
          className="w-[110px]"
        />
        <h2 className="text-xl -mt-5">AI-Powered Interview Platform</h2>
        <Image
          src="/Consulting.png"
          alt="interview"
          width={200}
          height={200}
          className="h-[200px]"
        />

        {/* <pre className="text-xs text-gray-400 mt-4 max-h-32 overflow-auto">
          {JSON.stringify(interviewData, null, 2)}
        </pre> */}

        <h2 className="text-2xl mt-5">
          {interviewData?.jobRole || "Loading..."}
        </h2>

        <p className="text-md text-gray-500 mt-2 flex gap-2">
          <Clock />
          {interviewData?.duration
            ? `${interviewData.duration} minutes`
            : "-- minutes"}
        </p>

        {/* <p className="mt-2 text-sm text-gray-600 text-center">
          {interviewData?.jobDescription || "No description provided."}
        </p> */}

        <div className="w-[80%] mt-4">
          <h2 className="mb-2 text-md">Enter Your Full Name</h2>
          <Input
            placeholder="e.g. John Doe"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="bg-purple-400 p-4 rounded-lg mt-5">
          <h3 className="text-white text-lg font-semibold flex items-center">
            <InfoIcon className="mr-2" />
            Before you begin
          </h3>
          <ul className="list-disc pl-5 mt-2 text-white">
            <li>Ensure your camera and microphone are working.</li>
            <li>Find a quiet space before the interview.</li>
            <li>Make sure you have a stable internet connection.</li>
          </ul>
        </div>

        <button
          className={`mt-5 ${
            userName
              ? "bg-purple-500 hover:bg-purple-600 hover:scale-110 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          } w-[50%] text-white font-bold py-2 px-4 rounded-md transition-transform duration-500 flex items-center justify-center gap-3`}
          onClick={OnJoinInterview}
          disabled={!userName || loading}
        >
          <Video />
          {loading && <Loader2Icon className="animate-spin" />}
          Join Interview
        </button>
      </div>
    </div>
  );
};

export default Page;
