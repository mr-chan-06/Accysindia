import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const revenue = "₹45,23,100";
    
    return NextResponse.json({
      revenue,
      activeMembers: 0,
      totalPV: 0,
      productsSold: "8,340",
      monthlyGrowth: "+24.5%",
      chartData: [40, 60, 45, 80, 65, 90, 100],
      recentMembers: []
    }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

