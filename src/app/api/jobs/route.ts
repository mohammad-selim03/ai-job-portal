import { NextRequest, NextResponse } from "next/server"; 
import Job from "@/models/Job";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "../../lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== "employer") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await connectDB();
    const data = await req.json();
    const newJob = await Job.create({ ...data, postedBy: session?.user?.email });
console.log("new job00", newJob);
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.log("job posting error", error)
    return NextResponse.json({ error: "Error posting job" }, { status: 500 });
  }
}


export async function GET() {
    try {
      await connectDB();
      const jobs = await Job.find().sort({ createdAt: -1 });
  
      return NextResponse.json(jobs);
    } catch (error) {
      return NextResponse.json({ error: "Error fetching jobs" }, { status: 500 });
    }
  }
  