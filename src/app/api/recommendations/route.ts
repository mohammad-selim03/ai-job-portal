import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import User from "@/models/User"; // Assuming user data is stored here

export async function GET(req: NextRequest) {
  try {
    await dbConnect(); // Connect to DB
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get logged-in user's email
    const userEmail = session.user?.email;

    // Fetch user data
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Extract user skills & interests
    const userSkills = user.skills || []; // Example: ["React", "Node.js"]
    const userInterests = user.interests || []; // Example: ["Frontend", "AI"]

    // Fetch all jobs
    const jobs = await Job.find();

    // Simple AI-based filtering
    const recommendedJobs = jobs
      .map((job) => {
        // Calculate match score based on skills & interests
        let matchScore = 0;

        if (job.skillsRequired) {
          matchScore += job.skillsRequired.filter((skill) => userSkills.includes(skill)).length;
        }

        if (job.category && userInterests.includes(job.category)) {
          matchScore += 2; // Give extra weight for category match
        }

        return { job, matchScore };
      })
      .filter((item) => item.matchScore > 0) // Only keep jobs with a match score
      .sort((a, b) => b.matchScore - a.matchScore) // Sort by highest match
      .map((item) => item.job) // Extract job details

      .slice(0, 5); // Return top 5 matches

    return NextResponse.json({ recommendedJobs });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
