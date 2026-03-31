import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Leader } from "@/models/Leader";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await dbConnect();

    // Ideally, we'd also delete the image from the /public/uploads/leaders using the fs module,
    // but for the sake of simplicity and mimicking the current products setup, we simply delete the DB document.
    const deletedLeader = await Leader.findByIdAndDelete(id);

    if (!deletedLeader) {
      return NextResponse.json({ message: "Leader not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Leader deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;

    if (!name || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    const existingLeader = await Leader.findById(id);
    if (!existingLeader) {
      return NextResponse.json({ message: "Leader not found" }, { status: 404 });
    }

    let imageUrl = existingLeader.image;

    if (imageFile && imageFile.name && imageFile.name !== "undefined") {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads/leaders");
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {}

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = uniqueSuffix + '-' + imageFile.name.replace(/[^a-zA-Z0-9.]/g, "_");
      const filepath = path.join(uploadDir, filename);

      await writeFile(filepath, buffer);
      imageUrl = `/uploads/leaders/${filename}`;
    }

    existingLeader.name = name;
    existingLeader.role = role;
    existingLeader.description = description || "";
    existingLeader.image = imageUrl;

    await existingLeader.save();

    return NextResponse.json({ message: "Leader updated", leader: existingLeader }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
