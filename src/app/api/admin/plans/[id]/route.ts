import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Plan } from "@/models/Plan";
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

    const deletedPlan = await Plan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Plan deleted successfully" }, { status: 200 });
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
    const price = formData.get('price');
    const description = formData.get('description') as string;
    const benefitsString = formData.get('benefits') as string;
    const pv = formData.get('pv');
    const popular = formData.get('popular') === 'true';
    const imageFile = formData.get('image') as File | null;

    if (!name || !price || !pv || !benefitsString) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const benefits = benefitsString.split(/\n|,/).map(b => b.trim()).filter(b => b.length > 0);

    await dbConnect();

    const existingPlan = await Plan.findById(id);
    if (!existingPlan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    let imageUrl = existingPlan.image || "";

    if (imageFile && imageFile.name && imageFile.name !== "undefined") {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64Data = buffer.toString('base64');
      const mimeType = imageFile.type || 'image/jpeg';
      imageUrl = `data:${mimeType};base64,${base64Data}`;
    }

    existingPlan.name = name;
    existingPlan.price = Number(price);
    existingPlan.description = description || existingPlan.description;
    existingPlan.benefits = benefits;
    existingPlan.pv = Number(pv);
    existingPlan.popular = popular;
    existingPlan.image = imageUrl;

    await existingPlan.save();

    return NextResponse.json({ message: "Plan updated", plan: existingPlan }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
