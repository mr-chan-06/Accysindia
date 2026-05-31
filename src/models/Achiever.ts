import mongoose, { Schema, Document } from "mongoose";

export interface IAchiever extends Document {
  name: string;
  role: string;
  description?: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const AchieverSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Achiever = mongoose.models.Achiever || mongoose.model<IAchiever>("Achiever", AchieverSchema);
