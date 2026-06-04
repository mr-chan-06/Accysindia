import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    await dbConnect();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: "Server error", error: e.message }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price');
    const category = formData.get('category') as string;
    const stock = formData.get('stock');
    const pv = formData.get('pv');
    const imageFile = formData.get('image') as File | null;

    if (!name || !price || !category) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    product.name = name;
    product.description = description || "Premium product description.";
    product.price = Number(price);
    product.category = category;
    product.stock = Number(stock) || 0;
    product.pv = Number(pv) || 0;

    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Data = buffer.toString('base64');
      const mimeType = imageFile.type || 'image/jpeg';
      product.image = `data:${mimeType};base64,${base64Data}`;
    }

    await product.save();

    return NextResponse.json({ message: "Product updated", product }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: "Server error", error: e.message }, { status: 500 });
  }
}
