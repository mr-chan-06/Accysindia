import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { TicketRegistration } from "@/models/TicketRegistration";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const registrations = await TicketRegistration.find({})
      .sort({ createdAt: -1 })
      .lean();
      
    return NextResponse.json(registrations, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
