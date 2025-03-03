import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import Application from "@/models/Application";
import Job from "@/models/Job";
import ConnectDB from "@/lib/db";

// ✅ PATCH Request: Update Application Status
export async function PATCH(req, { params }) {
  await ConnectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params; // Application ID
  const { status } = await req.json();

  if (!["pending", "reviewed", "accepted", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const application = await Application.findById(id).populate("jobId");

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // ✅ Ensure Only Employers Can Update Status
    if (application.jobId.postedBy.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    application.status = status;
    await application.save();

    return NextResponse.json({ message: "Application status updated", application }, { status: 200 });
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
