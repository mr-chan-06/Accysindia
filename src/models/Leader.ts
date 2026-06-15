import mongoose, { Schema, Document } from "mongoose";

export interface ILeader extends Document {
  name: string;
  role: string;
  image: string;
  description: string;
  page: "eagles" | "company";
}

const LeaderSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, default: "" },
    page: {
      type: String,
      enum: ["eagles", "company"],
      default: "eagles",
    },
  },
  { timestamps: true }
);

export const Leader = mongoose.models.Leader || mongoose.model<ILeader>("Leader", LeaderSchema);
