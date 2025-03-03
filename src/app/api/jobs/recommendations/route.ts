import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import Job from "@/models/Job";
import { connectDB } from "@/lib/mongoose";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is in your .env file
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { skills } = await req.json();
    if (!skills || skills.length === 0) {
      return NextResponse.json({ message: "Skills are required" }, { status: 400 });
    }

    // Fetch jobs from DB
    const jobs = await Job.find({}, "title description skills");

    // Prepare job descriptions for AI processing
    const jobDescriptions = jobs.map(job => ({
      id: job._id,
      title: job.title,
      description: job.description,
      requiredSkills: job.skills,
    }));

    // AI Prompt
    const prompt = `Given the following user skills: ${skills.join(", ")}, recommend the most suitable job(s) from the following list: ${JSON.stringify(jobDescriptions)}. Return only the job IDs.`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
    });

    // Extract job recommendations
    const recommendedJobs = JSON.parse(response.choices[0]?.message?.content || "[]");

    // Fetch job details
    const recommendedJobDetails = await Job.find({ _id: { $in: recommendedJobs } });

    return NextResponse.json(recommendedJobDetails, { status: 200 });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
