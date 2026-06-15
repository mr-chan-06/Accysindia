import { Buffer } from "buffer";
import dbConnect from "@/lib/mongodb";
import { Leader } from "@/models/Leader";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const description = formData.get("description") as string;
    const page = (formData.get("page") as string) || "eagles";
    const imageFile = formData.get("image") as File | null;

    if (!name || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let imageUrl = "/founder.jpg"; // safe default

    if (imageFile && imageFile.name) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        let binary = '';
        for (let i = 0; i < uint8Array.length; i++) {
          binary += String.fromCharCode(uint8Array[i]);
        }
        const base64Data = btoa(binary);
        const mimeType = imageFile.type || "image/jpeg";
        imageUrl = `data:${mimeType};base64,${base64Data}`;
      }

    await dbConnect();

    const newLeader = await Leader.create({
      name,
      role,
      description: description || "",
      image: imageUrl,
      page,
    });

    return NextResponse.json({ message: "Leader added", leader: newLeader }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
