import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";

export async function GET(req: NextRequest) {
  try {
    await dbConnect(); // Connect to DB

    // Get query parameters
    const { search, category, skills, location, minSalary, maxSalary, page = 1, limit = 10 } =
      Object.fromEntries(new URL(req.url).searchParams);

    const query: any = {}; // Store filters dynamically

    // Apply search filter (title or description match)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Filter by category
    if (category) query.category = category;

    // Filter by location
    if (location) query.location = { $regex: location, $options: "i" };

    // Filter by skills (array-based match)
    if (skills) {
      const skillArray = skills.split(","); // Convert string to array
      query.skillsRequired = { $in: skillArray };
    }

    // Salary filter
    if (minSalary) query.salary = { $gte: parseInt(minSalary) };
    if (maxSalary) query.salary = { ...query.salary, $lte: parseInt(maxSalary) };

    // Pagination logic
    const jobs = await Job.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
