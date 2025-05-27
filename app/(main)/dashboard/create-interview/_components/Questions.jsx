import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Questions = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

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

      // ✅ Directly assign if result.data.data is already an array
      setQuestions(result.data.data);
    } catch (error) {
      toast.error("Failed to generate interview questions");
      console.error("Failed to generate interview questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex flex-col justify-top items-center h-screen text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
          <p className="text-lg text-gray-600">
            Generating high-quality interview questions based on your selection. Please wait a moment...
          </p>
        </div>
      ) : (
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Generated Interview Questions</h2>
          {questions.length > 0 ? (
            <ul className="space-y-4">
              {questions.map((q, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-sm bg-white">
                  <p className="text-gray-800 font-medium">
                    Q{index + 1}: {q.question}
                  </p>
                  <p className="text-sm text-gray-500 italic">Type: {q.type || 'General'}</p>
                  {q.timeEstimate && (
                    <p className="text-sm text-gray-500">Time Estimate: {q.timeEstimate} min</p>
                  )}
                  {q.rationale && (
                    <p className="text-sm text-gray-500">Why this question: {q.rationale}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No questions generated yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
