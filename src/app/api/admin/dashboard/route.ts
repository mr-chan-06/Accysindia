import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Query active members count
    const totalUsers = await User.countDocuments({ role: "user" });

    // In a production scenario, you would calculate real revenue from Sales schema
    const revenue = "₹45,23,100";
    
    return NextResponse.json({
      revenue,
      activeMembers: totalUsers,
      productsSold: "8,340",
      monthlyGrowth: "+24.5%",
      chartData: [40, 60, 45, 80, 65, 90, 100],
      recentMembers: await User.find({ role: "user" }).sort({ createdAt: -1 }).limit(5).lean()
    }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
