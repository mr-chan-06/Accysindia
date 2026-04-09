import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Product } from "@/models/Product";
import { Plan } from "@/models/Plan";
import { Leader } from "@/models/Leader";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const [productsCount, plansCount, leadersCount] = await Promise.all([
      Product.countDocuments(),
      Plan.countDocuments(),
      Leader.countDocuments()
    ]);
    
    return NextResponse.json({
      productsCount,
      plansCount,
      leadersCount,
      chartData: [40, 60, 45, 80, 65, 90, 100],
    }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

