import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Leader } from "@/models/Leader";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const leaders = await Leader.find({}).sort({ createdAt: 1 }).lean();
    return NextResponse.json(leaders, { status: 200 });
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
    const role = formData.get('role') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;

    if (!name || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let imageUrl = "1560250097-0b93528c311a"; // Default mock image fallback

    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64Data = buffer.toString('base64');
      const mimeType = imageFile.type || 'image/jpeg';
      imageUrl = `data:${mimeType};base64,${base64Data}`;
    }

    await dbConnect();
    
    const newLeader = await Leader.create({
      name,
      role,
      description: description || "",
      image: imageUrl,
    });

    return NextResponse.json({ message: "Leader added", leader: newLeader }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
