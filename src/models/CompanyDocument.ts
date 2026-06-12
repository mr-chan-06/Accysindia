import mongoose, { Schema, Document } from "mongoose";

export interface ICompanyDocument extends Document {
  name: string;
  url: string;
  size: number;
  type: string;
}

const CompanyDocumentSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export const CompanyDocument = mongoose.models.CompanyDocument || mongoose.model<ICompanyDocument>("CompanyDocument", CompanyDocumentSchema);
