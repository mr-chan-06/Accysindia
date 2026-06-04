import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { TicketRegistration } from "@/models/TicketRegistration";
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
    const deleted = await TicketRegistration.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ message: "Ticket registration not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ticket registration deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
