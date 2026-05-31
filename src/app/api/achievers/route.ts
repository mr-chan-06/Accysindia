import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Achiever } from "@/models/Achiever";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const achievers = await Achiever.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(achievers, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
