import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  description: string;
  category: string;
  skills: string[];
  salary: string;
  jobType: "Full-Time" | "Part-Time" | "Remote";
  postedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  skills: { type: [String], required: true },
  salary: { type: String, required: true },
  jobType: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: "User" },
  // createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
