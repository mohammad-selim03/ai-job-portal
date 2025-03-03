import ConnectDB from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// import authOptions from "@/app/api/auth/authOptions";
import Message from "@/models/Message";
import authOptions from "../auth/[...nextauth]/authOptions";

export async function POST(req: Request) {
  try {
    await ConnectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { receiverId, jobId, message } = await req.json();

    if (!receiverId || !jobId || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newMessage = new Message({
      senderId: session.user.id,
      receiverId,
      jobId,
      message,
    });

    await newMessage.save();
    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await ConnectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");
    const receiverId = searchParams.get("receiverId");

    if (!jobId || !receiverId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const messages = await Message.find({
      jobId,
      $or: [
        { senderId: session.user.id, receiverId },
        { senderId: receiverId, receiverId: session.user.id },
      ],
    }).sort({ createdAt: 1 });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
