import mongoose, { Schema, Document } from "mongoose";

export interface IPlan extends Document {
  name: string;
  price: number;
  description: string;
  benefits: string[];
  pv: number; // Point value given on purchase
  image?: string;
  popular: boolean;
}

const PlanSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    pv: { type: Number, required: true },
    image: { type: String },
    popular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Plan = mongoose.models.Plan || mongoose.model<IPlan>("Plan", PlanSchema);
