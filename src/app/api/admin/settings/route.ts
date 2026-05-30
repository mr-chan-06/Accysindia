import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Setting } from "@/models/Setting";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    await dbConnect();
    
    // Find the single settings document and update, create if it doesn't exist (upsert)
    const updatedSettings = await Setting.findOneAndUpdate(
      {},
      { $set: body },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({ message: "Settings updated successfully", settings: updatedSettings }, { status: 200 });
  } catch (error: any) {
    console.error("Admin Settings PUT Error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
