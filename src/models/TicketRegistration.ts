import mongoose, { Schema, Document } from "mongoose";

export interface ITicketRegistration extends Document {
  eventTitle: string;
  name: string;
  email?: string;
  phone: string;
  ticketsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const TicketRegistrationSchema: Schema = new Schema(
  {
    eventTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, default: "" },
    phone: { type: String, required: true },
    ticketsCount: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  }
);

export const TicketRegistration =
  mongoose.models.TicketRegistration ||
  mongoose.model<ITicketRegistration>("TicketRegistration", TicketRegistrationSchema);
