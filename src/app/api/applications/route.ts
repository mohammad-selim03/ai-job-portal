import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import JobApplication from "@/models/JobApplication";
import Job from "@/models/Job";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

// 📌 Apply for a Job
export async function POST(req: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { jobId, resume, coverLetter } = await req.json();

    // Validate job existence
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Create job application
    const newApplication = new JobApplication({
      jobId,
      applicantId: session.user.id,
      resume,
      coverLetter,
    });

    await newApplication.save();
    return NextResponse.json({ message: "Application submitted successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error submitting application" }, { status: 500 });
  }
}

// 📌 Fetch Applications for a Job (Employer View)
export async function GET(req: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const jobId = url.searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const applications = await JobApplication.find({ jobId }).populate("applicantId", "name email");
    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching applications" }, { status: 500 });
  }
}

// 📌 Update Application Status (Accept/Reject)
export async function PUT(req: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { applicationId, status } = await req.json();

    if (!["pending", "reviewed", "rejected", "accepted"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const application = await JobApplication.findById(applicationId);
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    application.status = status;
    await application.save();

    return NextResponse.json({ message: "Application status updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating application status" }, { status: 500 });
  }
}
