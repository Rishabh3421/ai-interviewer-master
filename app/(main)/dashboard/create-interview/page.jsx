"use client";
import { MoveLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Form from "./_components/Form";
import Questions from "./_components/Questions";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";

const CreateInterview = () => {
  const router = useRouter();
  const [steps, setSteps] = useState(1);
  const [formData, setFormData] = useState({});
  const [interviewLink, setInterviewLink] = useState(null);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onGoToNextStep = () => {
    const { jobRole, jobDescription, interviewDuration, interviewType } = formData;

    if (
      !jobRole?.trim() ||
      !jobDescription?.trim() ||
      !interviewDuration?.trim() ||
      !Array.isArray(interviewType) || interviewType.length === 0
    ) {
      toast.error("Please fill in all the required fields before proceeding.");
      return;
    }

    setSteps(steps + 1);
    toast.success("Step completed successfully.");
  };

  // Renamed to avoid conflict with potential prop
  const handleCreateInterviewLink = (interview_id) => {
    setInterviewLink(interview_id);
    setSteps(steps + 1);
  };

  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex gap-4 items-center">
        <span title="Go back">
          <MoveLeft className="cursor-pointer" onClick={() => router.back()} />
        </span>
        <h2 className="font-bold text-xl">Create New Interview</h2>
      </div>

      <Progress value={steps * 33.33} className="my-5" />

      {steps === 1 ? (
        <Form
          onHandleInputChange={handleInputChange}
          GoToNextStep={onGoToNextStep}
          formData={formData}
        />
      ) : steps === 2 ? (
        <Questions
          formData={formData}
          onCreateInterviewLink={handleCreateInterviewLink}
        />
      ) : steps === 3 ? (
        <InterviewLink interviewLink={interviewLink} formData={formData} />
      ) : null}
    </div>
  );
};

export default CreateInterview;
