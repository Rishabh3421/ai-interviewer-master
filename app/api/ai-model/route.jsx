import { PROMPT } from "@/services/constants";
import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { jobRole, jobDescription, interviewDuration, interviewType } =
      await req.json();

    const QUESTION_PROMPT = PROMPT
      .replace("{{jobTitle}}", jobRole)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", interviewDuration)
      .replace("{{type}}", interviewType);

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "google/gemma-3n-e4b-it:free",
      messages: [
        {
          role: "user",
          content: QUESTION_PROMPT,
        },
      ],
    });

    const aiMessage = response.choices[0]?.message?.content;

    console.log("✅ AI Response:", aiMessage);

    return NextResponse.json({
      success: true,
      message: "Interview questions generated successfully",
      data: aiMessage,
    });

  } catch (error) {
    console.error("❌ Failed to generate interview questions:", error);

    return NextResponse.json({
      success: false,
      message: "Failed to generate interview questions",
      error: error.message,
    }, { status: 500 });
  }
}
