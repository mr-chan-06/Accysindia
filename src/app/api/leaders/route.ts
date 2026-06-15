import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Leader } from "@/models/Leader";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page"); // "eagles" | "company" | null (all)

    await dbConnect();
    const query = page ? { page } : {};
    const leaders = await Leader.find(query).lean();
    
    // Sort in-memory to avoid MongoDB's 32MB sort limit when documents contain large base64 images
    leaders.sort((a: any, b: any) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return aTime - bTime;
    });

    return NextResponse.json(leaders, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
