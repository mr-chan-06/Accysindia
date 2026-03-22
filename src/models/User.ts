import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  referrer?: mongoose.Types.ObjectId;
  referredUsers: mongoose.Types.ObjectId[];
  walletBalance: number;
  activePlan?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    referrer: { type: Schema.Types.ObjectId, ref: "User", default: null },
    referredUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    walletBalance: { type: Number, default: 0 },
    activePlan: { type: Schema.Types.ObjectId, ref: "Plan", default: null },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
