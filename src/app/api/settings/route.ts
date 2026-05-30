import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Setting } from "@/models/Setting";

export async function GET() {
  try {
    await dbConnect();
    let settings = await Setting.findOne().lean();
    if (!settings) {
      // Create new settings document which will populate with default values
      const newSettings = await Setting.create({});
      settings = newSettings.toObject();
    }
    return NextResponse.json(settings, { status: 200 });
  } catch (error: any) {
    console.error("API GET Settings Error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
