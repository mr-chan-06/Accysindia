import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { GalleryPhoto } from "@/models/GalleryPhoto";

export async function GET() {
  try {
    await dbConnect();
    const photos = await GalleryPhoto.find({}).sort({ slot: 1 }).lean();
    return NextResponse.json(photos, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
