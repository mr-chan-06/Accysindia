import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { CompanyDocument } from "@/models/CompanyDocument";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const documents = await CompanyDocument.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(documents, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
