import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Plan } from "@/models/Plan";
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
    const plans = await Plan.find({}).sort({ price: 1 }).lean();
    return NextResponse.json(plans, { status: 200 });
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
    const price = formData.get('price');
    const description = formData.get('description') as string;
    const benefitsString = formData.get('benefits') as string;
    const pv = formData.get('pv');
    const popular = formData.get('popular') === 'true';
    const imageFile = formData.get('image') as File | null;

    if (!name || !price || !pv || !benefitsString) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Process benefits (comma separated or newline separated)
    const benefits = benefitsString.split(/\n|,/).map(b => b.trim()).filter(b => b.length > 0);

    let imageUrl = ""; // Plans might not need images initially, but supporting it

    if (imageFile && imageFile.name && imageFile.name !== "undefined") {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64Data = buffer.toString('base64');
      const mimeType = imageFile.type || 'image/jpeg';
      imageUrl = `data:${mimeType};base64,${base64Data}`;
    }

    await dbConnect();
    
    const newPlan = await Plan.create({
      name,
      price: Number(price),
      description: description || "Premium membership plan.",
      benefits,
      pv: Number(pv),
      image: imageUrl,
      popular
    });

    return NextResponse.json({ message: "Plan added", plan: newPlan }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
