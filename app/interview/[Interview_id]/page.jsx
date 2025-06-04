  "use client";
  import { Input } from "@/components/ui/input";
  import { InterviewContext } from "@/context/InterviewContext";
  import { supabase } from "@/services/superbaseClient";
  import { Clock, InfoIcon, Video } from "lucide-react";
  import Image from "next/image";
  import { useParams } from "next/navigation";
import { useRouter } from "next/router";
  import React, { useContext, useEffect, useState } from "react";
  const page = () => {
    const { interview_id } = useParams();
    console.log(interview_id);
    const [interviewData, setInterviewData] = useState();
    const [userName, setUserName] = useState();
    const [loading, setLoading] = useState(false);
    const { interviewInfo, setInterviewInfo } = useContext(InterviewContext);
    const router = useRouter();
    useEffect(() => {
      interview_id && GetInterviewDetails();
    }, [interview_id]);
    
    useEffect(() => {
      if (interview_id) {
        console.log("Interview ID:", interview_id);
        GetInterviewDetails();
      }
    }, [interview_id]);

    const GetInterviewDetails = async () => {
      try {
        setLoading(true);
        let { data: InterviewQuestions, error } = await supabase
          .from("InterviewQuestions")
          .select("jobRole, duration, jobDescription")
          .eq("interview_id", interview_id);
        if (error) {
          throw new Error(error.message);
        }
        setInterviewData(InterviewQuestions[0]);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    const OnJoinInterview = async () => {
      setLoading(true)
      let { data: InterviewQuestions, error } = await supabase
        .from("InterviewQuestions")
        .select("*")
        .eq("interview_id", interview_id);

      setInterviewInfo(InterviewQuestions[0]);
      router.push("/interview/"+interview_id+"/start")
      setLoading(false)
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
            alt="logo"
            width={200}
            height={200}
            className="h-[200px]"
          />
          <h2 className="text-2xl mt-5">{interviewData?.jobRole}</h2>
          <p className="text-md text-gray-500 mt-2 flex gap-2 ">
            <Clock /> {interviewData?.duration} minutes
          </p>
          <div className="w-[80%] ">
            <h2 className="mb-2 text-md">Enter Your Full Name</h2>
            <Input
              placeholder="eg. Jhon Doe"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="bg-purple-400 p-4 rounded-lg mt-5">
            <h3 className="text-white text-lg font-semibold flex items-center">
              <InfoIcon className="mr-2" />
              Before you begin
            </h3>
            <ul className="list-disc pl-5 mt-2 text-white">
              <li>Test your camera and microphone is working correctly.</li>
              <li>Find a Quiet place before giving Interview.</li>
              <li>Ensure you have stable Internet Connection.</li>
            </ul>
          </div>
          <button
            className={`mt-5 ${
              userName
                ? "bg-purple-500 hover:bg-purple-600 hover:scale-110 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            } w-[50%] text-white font-bold py-2 px-4 rounded-md transition-transform duration-500 flex items-center justify-center gap-3`}
            onClick={() => onJoinInterview()}
          >
            <Video />
            Join Interview
          </button>
        </div>
      </div>
    );
  };

  export default page;
