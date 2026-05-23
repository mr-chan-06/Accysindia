import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { GalleryPhoto } from "@/models/GalleryPhoto";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const photos = await GalleryPhoto.find({}).sort({ slot: 1 }).lean();
    return NextResponse.json(photos, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const slotStr = formData.get('slot') as string;
    const title = formData.get('title') as string || "";
    const description = formData.get('description') as string || "";
    const imageFile = formData.get('image') as File | null;

    const slot = parseInt(slotStr, 10);
    if (isNaN(slot) || slot < 1 || slot > 8) {
      return NextResponse.json({ message: "Invalid slot number (must be 1-8)" }, { status: 400 });
    }

    await dbConnect();

    // Check if slot already exists
    const existingPhoto = await GalleryPhoto.findOne({ slot });

    let imageUrl = existingPhoto?.image || "";

    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = imageFile.type || 'image/jpeg';
      const base64Data = buffer.toString('base64');
      imageUrl = `data:${mimeType};base64,${base64Data}`;
    }

    if (!imageUrl) {
      return NextResponse.json({ message: "Image is required for this slot" }, { status: 400 });
    }

    // Upsert logic
    const updatedPhoto = await GalleryPhoto.findOneAndUpdate(
      { slot },
      { slot, image: imageUrl, title, description },
      { new: true, upsert: true }
    );

    return NextResponse.json({ message: `Slot ${slot} successfully updated`, photo: updatedPhoto }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const slotStr = url.searchParams.get("slot");
    if (!slotStr) {
      return NextResponse.json({ message: "Slot parameter is required" }, { status: 400 });
    }

    const slot = parseInt(slotStr, 10);
    if (isNaN(slot) || slot < 1 || slot > 8) {
      return NextResponse.json({ message: "Invalid slot number" }, { status: 400 });
    }

    await dbConnect();
    await GalleryPhoto.findOneAndDelete({ slot });

    return NextResponse.json({ message: `Slot ${slot} cleared successfully` }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
