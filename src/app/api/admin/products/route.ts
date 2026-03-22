import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Product } from "@/models/Product";
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
    const products = await Product.find({}).lean();
    return NextResponse.json(products, { status: 200 });
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
    const description = formData.get('description') as string;
    const price = formData.get('price');
    const category = formData.get('category') as string;
    const stock = formData.get('stock');
    const pv = formData.get('pv');
    const imageFile = formData.get('image') as File | null;

    if (!name || !price || !category) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let imageUrl = "1586201375761-83865001e31c"; // Default mock image placeholder

    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads/products");
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        // Directory already exists or cannot be created
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = uniqueSuffix + '-' + imageFile.name.replace(/[^a-zA-Z0-9.]/g, "_");
      const filepath = path.join(uploadDir, filename);

      await writeFile(filepath, buffer);
      imageUrl = `/uploads/products/${filename}`;
    }

    await dbConnect();
    
    const newProduct = await Product.create({
      name,
      description: description || "Premium product description.",
      price: Number(price),
      category,
      image: imageUrl,
      stock: Number(stock) || 0,
      pv: Number(pv) || 0
    });

    return NextResponse.json({ message: "Product added", product: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
