import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  role: "jobseeker" | "employer" | "admin";
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  role: { type: String, default: "jobseeker" },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
