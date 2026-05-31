import { NextResponse, NextRequest } from "next/server";
import { Buffer } from "buffer";
export const runtime = "nodejs";
import dbConnect from "@/lib/mongodb";
import { Achiever } from "@/models/Achiever";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();
    const achievers = await Achiever.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(achievers, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const description = (formData.get("description") as string) ?? "";
    const imageFile = formData.get("image") as any;
    if (!name || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    let imageUrl = "";
    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = imageFile.type || "image/jpeg";
      imageUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;
    }
    await dbConnect();
    const newAchiever = await Achiever.create({ name, role, description, image: imageUrl });
    return NextResponse.json({ message: "Achiever added", achiever: newAchiever }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const description = (formData.get("description") as string) ?? "";
    const imageFile = formData.get("image") as any;
    if (!id) {
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }
    let updateData: any = { name, role, description };
    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = imageFile.type || "image/jpeg";
      updateData.image = `data:${mimeType};base64,${buffer.toString("base64")}`;
    }
    await dbConnect();
    const updated = await Achiever.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ message: "Achiever updated", achiever: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }
    await dbConnect();
    await Achiever.findByIdAndDelete(id);
    return NextResponse.json({ message: "Achiever deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
