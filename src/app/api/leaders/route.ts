import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Leader } from "@/models/Leader";

export async function GET() {
  try {
    await dbConnect();
    // Sort by role if needed or by creation date
    const leaders = await Leader.find({}).sort({ createdAt: 1 }).lean();
    return NextResponse.json(leaders, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
