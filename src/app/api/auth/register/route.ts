import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";
import { Plan } from "@/models/Plan";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, sponsorId, planId } = await req.json();

    if (!firstName || !lastName || !email || !password || !planId) {
      return NextResponse.json({ message: "Missing required fields or plan" }, { status: 400 });
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

    // Fetch the selected plan
    const selectedPlan = await Plan.findById(planId);
    if (!selectedPlan) {
      return NextResponse.json({ message: "Invalid plan selected" }, { status: 400 });
    }

    const newUser = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      referrer: referrerId,
      activePlan: selectedPlan._id,
      walletBalance: selectedPlan.pv, // Setup initial PV
    });

    // If there is a referrer, push this user to their downline and add 10 PV
    if (referrerId) {
      const sponsorNode = await User.findByIdAndUpdate(referrerId, {
        $push: { referredUsers: newUser._id },
        $inc: { walletBalance: 10 }
      });

      // If the sponsor also has a referrer (2nd level), award them 10 PV too
      if (sponsorNode && sponsorNode.referrer) {
        await User.findByIdAndUpdate(sponsorNode.referrer, {
          $inc: { walletBalance: 10 }
        });
      }
    }

    return NextResponse.json({ message: "User created successfully", userId: newUser._id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
