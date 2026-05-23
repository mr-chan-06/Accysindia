import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryPhoto extends Document {
  slot: number;
  image: string;
  title: string;
  description: string;
}

const GalleryPhotoSchema = new Schema(
  {
    slot: { type: Number, required: true, unique: true },
    image: { type: String, required: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export const GalleryPhoto = mongoose.models.GalleryPhoto || mongoose.model<IGalleryPhoto>("GalleryPhoto", GalleryPhotoSchema);
