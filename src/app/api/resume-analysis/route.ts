import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import OpenAI from "openai"; // Use OpenAI for NLP
import fs from "fs";
import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import { promisify } from "util";

// Initialize OpenAI API
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Convert fs.readFile into a promise
const readFile = promisify(fs.readFile);

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Parse form data (resume file upload)
    const form = new formidable.IncomingForm();
    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    if (!files.resume) {
      return NextResponse.json({ message: "Resume file is required" }, { status: 400 });
    }

    // Read the uploaded resume file
    const resumePath = files.resume.filepath;
    const resumeContent = await readFile(resumePath, "utf-8");

    // Send resume content to OpenAI for analysis
    const aiResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Extract key skills, experience, and job-related keywords from the given resume text."
        },
        { role: "user", content: resumeContent }
      ],
      model: "gpt-4"
    });

    // Extract AI-analyzed skills
    const aiExtractedSkills = aiResponse.choices[0].message?.content.split(",");

    // Match extracted skills with jobs
    const matchingJobs = await Job.find({ skillsRequired: { $in: aiExtractedSkills } });

    return NextResponse.json({ extractedSkills: aiExtractedSkills, matchingJobs });
  } catch (error) {
    console.error("Resume analysis failed:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false // Required for formidable file parsing
  }
};
