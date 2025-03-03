import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import Job from "@/models/Job";
import Application from "@/models/Application";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { jobId, resume, coverLetter } = await req.json();

    if (!jobId || !resume || !coverLetter) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      jobId,
      userId: session.user.id,
    });

    if (existingApplication) {
      return NextResponse.json({ message: "You have already applied for this job." }, { status: 400 });
    }

    // Save application to database
    const application = new Application({
      jobId,
      userId: session.user.id,
      resume,
      coverLetter,
      status: "pending",
    });

    await application.save();
    return NextResponse.json({ message: "Application submitted successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error applying for job:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
