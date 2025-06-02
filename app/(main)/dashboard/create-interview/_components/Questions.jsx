import { useUser } from "@/app/provider";
import { supabase } from "@/services/superbaseClient";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
const Questions = ({ formData, onCreateInterviewLink }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false); 
  const [questions, setQuestions] = useState([]);
  const {user} = useUser();
  useEffect(() => {
    if (formData) {
      GenerateQuestions();
    }
  }, [formData]);

  const GenerateQuestions = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });

      let data = result.data?.data;
      // console.log("👉 Raw API response:", data);

      // Strip Markdown code block and variable assignment
      if (typeof data === "string") {
        data = data.trim();

        // Remove ```json and ```
        if (data.startsWith("```json")) {
          data = data
            .replace(/^```json/, "")
            .replace(/```$/, "")
            .trim();
        }

        // Remove variable assignment if present (e.g., "interviewQuestions = [ ... ]")
        const arrayMatch = data.match(/=\s*(\[[\s\S]*\])/);
        if (arrayMatch) {
          data = arrayMatch[1]; // It's just an array now
        }

        try {
          data = JSON.parse(data); // try parsing object or array
        } catch (e) {
          console.error("❌ Still failed to parse cleaned string:", e);
          toast.error("Failed to read questions. Please try again.");
          return;
        }
      }

      // At this point, `data` is either an array or an object with interviewQuestions
      if (Array.isArray(data)) {
        setQuestions(data);
      } else if (Array.isArray(data.interviewQuestions)) {
        setQuestions(data.interviewQuestions);
      } else {
        toast.error("AI returned unexpected format.");
        console.error("❌ Final parsed data is not usable:", data);
      }
    } catch (error) {
      toast.error("Failed to generate interview questions");
      console.error("❌ Error generating interview questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaving(true); 
    const interview_id = uuidv4();
  
    const payload = {
      jobRole: formData.jobRole,
      jobDescription: formData.jobDescription,
      duration: formData.duration || formData.interviewDuration || "default duration", 
      type: formData.type || formData.interviewType || "default type",          
      questionsList: JSON.stringify(questions), 
      user: user?.email || null,
      interview_id: interview_id,
    };
  
    console.log("Payload to insert:", payload);
  
    const { data, error } = await supabase
      .from("InterviewQuestions")
      .insert([payload])
      .select();
  
    if (error) {
      toast.error("Failed to save interview questions.");
      console.error("Supabase insert error:", error);
    } else {
      toast.success("Interview questions saved successfully.");
    }
    setSaving(false);

    onCreateInterviewLink(interview_id);
  };
  

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex flex-col justify-top items-center h-screen text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
          <p className="text-lg text-gray-600">
            Generating high-quality interview questions based on your selection.
            Please wait a moment...
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Generated Interview Questions
          </h2>

          {questions.length > 0 ? (
            <>
              <ul className="space-y-4">
                {questions.map((q, index) => (
                  <li
                    key={index}
                    className="p-4 border rounded-lg shadow-sm bg-white"
                  >
                    <p className="text-gray-800 font-medium">
                      Q{index + 1}: {q.question}
                    </p>
                    {/* <p className="text-sm text-gray-500 italic">
                      Type: {q.type || "General"}
                    </p> */}
                    {q.timeAllotment && (
                      <p className="text-sm text-gray-500">
                        Time Allotment: {q.timeAllotment}
                      </p>
                    )}
                    {/* {q.rationale && (
                      <p className="text-sm text-gray-500">
                        Why this question: {q.rationale}
                      </p>
                    )} */}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={onFinish}
                  disabled={saving}
                  className={`px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition cursor-pointer flex items-center gap-2 ${
                    saving ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {saving && <Loader2 className="w-5 h-5 animate-spin" />}
                  {saving ? "Saving..." : "Generate Interview Link"}
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">
              No questions generated yet. Please provide form data and try
              again.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
