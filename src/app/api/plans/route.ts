import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Plan } from "@/models/Plan";

export async function GET() {
  try {
    await dbConnect();
    // Sort by price ascending, or custom logic
    const plans = await Plan.find({}).sort({ price: 1 }).lean();
    return NextResponse.json(plans, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
