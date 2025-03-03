import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import User from "@/models/User";
import Application from "@/models/Application";
import pdfParse from "pdf-parse";

// Function to extract skills from resume (dummy for now, replace with NLP later)
async function extractSkillsFromResume(pdfBuffer: Buffer) {
  const pdfData = await pdfParse(pdfBuffer);
  const text = pdfData.text.toLowerCase();
  const commonSkills = ["javascript", "react", "node.js", "python", "ai", "ml", "frontend", "backend"];
  return commonSkills.filter(skill => text.includes(skill));
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { userId, autoApply, resumeFile } = await req.json();
    
    // Fetch user profile
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // Extract skills from resume (if provided)
    let resumeSkills: string[] = [];
    if (resumeFile) {
      const pdfBuffer = Buffer.from(resumeFile, "base64");
      resumeSkills = await extractSkillsFromResume(pdfBuffer);
    }
    
    // Combine resume skills & profile skills
    const userSkills = new Set([...resumeSkills, ...user.skills]);
    
    // Find matching jobs
    const matchingJobs = await Job.find({ skillsRequired: { $in: Array.from(userSkills) } });
    
    // Auto-apply to matched jobs if enabled
    if (autoApply) {
      for (const job of matchingJobs) {
        await Application.create({ userId, jobId: job._id, status: "Applied" });
      }
    }
    
    return NextResponse.json({ matches: matchingJobs, autoApplied: autoApply });
  } catch (error) {
    console.error("Error in job matching:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}










// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import Job from "@/models/Job";
// import connectDB from "@/utils/connectDB"; // Ensure DB connection

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const { resumeSkills } = await req.json();

//     if (!resumeSkills || !Array.isArray(resumeSkills)) {
//       return NextResponse.json({ error: "Invalid resume skills" }, { status: 400 });
//     }

//     // Fetch all jobs from the database
//     const jobs = await Job.find();

//     // Use OpenAI to rank jobs based on skills match
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         { role: "system", content: "You are an AI that matches job listings to candidates based on required skills." },
//         { role: "user", content: `Here is the candidate's resume skills: ${resumeSkills.join(", ")}` },
//         { role: "user", content: `Here are available job listings: ${JSON.stringify(jobs)}` },
//         { role: "user", content: `Match the jobs to the candidate based on required skills and return the top 5 matches.` },
//       ],
//     });

//     const matchedJobs = JSON.parse(response.choices[0]?.message?.content || "[]");

//     return NextResponse.json({ matchedJobs }, { status: 200 });
//   } catch (error) {
//     console.error("Job Matching Error:", error);
//     return NextResponse.json({ error: "Failed to match jobs" }, { status: 500 });
//   }
// }
