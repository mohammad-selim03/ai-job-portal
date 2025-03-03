import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in .env
});

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json();

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
    }

    // OpenAI API call to extract skills
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a professional HR assistant. Extract key skills from resumes." },
        { role: "user", content: `Extract key skills from this resume: ${resumeText}` },
      ],
    });

    const skills = response.choices[0]?.message?.content?.split(",").map(skill => skill.trim()) || [];

    return NextResponse.json({ skills }, { status: 200 });
  } catch (error) {
    console.error("Resume Analysis Error:", error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}
