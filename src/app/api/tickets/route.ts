import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { TicketRegistration } from "@/models/TicketRegistration";

export async function POST(req: Request) {
  try {
    const { eventTitle, name, email, phone, ticketsCount } = await req.json();

    if (!eventTitle || !name || !phone) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    const registration = await TicketRegistration.create({
      eventTitle,
      name,
      email: email || "",
      phone,
      ticketsCount: Number(ticketsCount) || 1,
    });

    return NextResponse.json(
      { message: "Ticket request queued successfully", registration },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
