import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { CompanyDocument } from "@/models/CompanyDocument";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const documents = await CompanyDocument.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(documents, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const file = formData.get('file') as File | null;

    if (!name || !file) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');
    const mimeType = file.type || 'application/pdf';
    const fileUrl = `data:${mimeType};base64,${base64Data}`;

    await dbConnect();
    
    const newDoc = await CompanyDocument.create({
      name,
      url: fileUrl,
      size: file.size,
      type: mimeType
    });

    return NextResponse.json({ message: "Document uploaded", document: newDoc }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
