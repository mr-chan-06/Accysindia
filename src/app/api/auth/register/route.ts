import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, sponsorId } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle optional sponsor checking
    let referrerId = null;
    if (sponsorId) {
      // Check sponsor by email or mock ID
      const sponsor = await User.findOne({ email: sponsorId });
      if (sponsor) {
        referrerId = sponsor._id;
      }
    }

    const newUser = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      referrer: referrerId,
    });

    // If there is a referrer, push this user to their downline
    if (referrerId) {
      await User.findByIdAndUpdate(referrerId, {
        $push: { referredUsers: newUser._id }
      });
    }

    return NextResponse.json({ message: "User created successfully", userId: newUser._id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
