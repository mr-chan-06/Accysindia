import mongoose, { Schema, Document } from "mongoose";

export interface ISetting extends Document {
  // Contact details
  phone1: string;
  phone2: string;
  whatsapp: string;
  email1: string;
  email2: string;
  officeAddress: string;

  // Social Links
  instagram: string;
  facebook: string;
  youtube: string;
  twitter: string;

  // Home Page details
  tickerAnnouncement: string;
  statTurnover: number;
  statProducts: number;
  statCenters: number;
  statMembers: number;

  // Vision & Mission
  visionStatement: string;
  missionPoints: string[];

  // Rebranding Page info
  rebrandingDescription1: string;
  rebrandingDescription2: string;

  // Dispatch Centers & Upcoming Events
  dispatchCenters: {
    city: string;
    address: string;
    phone: string;
  }[];

  upcomingEvents: {
    title: string;
    date: string;
    location: string;
    price: number;
    description: string;
  }[];
}

const SettingSchema = new Schema(
  {
    phone1: { type: String, default: "+91 98765 43210" },
    phone2: { type: String, default: "+91 91234 56789" },
    whatsapp: { type: String, default: "919876543210" },
    email1: { type: String, default: "support@accsysindia.com" },
    email2: { type: String, default: "info@accsysindia.com" },
    officeAddress: { type: String, default: "123 Business Avenue, Tech Hub, Silicon City, IN 560001" },

    instagram: { type: String, default: "https://www.instagram.com/accsyseagles?igsh=MWt3ZWxkYTNuamU5aA==" },
    facebook: { type: String, default: "https://www.facebook.com/share/18k296XrUx/" },
    youtube: { type: String, default: "https://youtube.com/@accsyseagles?si=6790zQYvn1-d2L3o" },
    twitter: { type: String, default: "https://x.com/accsyseagles?t=6GNm-35cdibikI6LPp0GoA&s=09" },

    tickerAnnouncement: { type: String, default: "HISTORIC 2026 MILESTONE: ACCSYSINDIA has officially rebranded to the EAGLES TEAM! Accelerating passive income & professional direct selling formats." },
    statTurnover: { type: Number, default: 5000 },
    statProducts: { type: Number, default: 10000 },
    statCenters: { type: Number, default: 300 },
    statMembers: { type: Number, default: 100 },

    visionStatement: { type: String, default: "To become the most trusted and fastest-growing digital commerce platform in India. We aim to create a network of self-reliant entrepreneurs operating across every corner of the country, powered by ethical business practices and modern technology." },
    missionPoints: {
      type: [String],
      default: [
        "Provide premium quality products at the most competitive prices.",
        "Offer a transparent, compliant, and highly profitable referral income model.",
        "Build a strong, educated community of motivated leaders.",
        "Ensure 100% customer and distributor satisfaction at all times."
      ]
    },

    rebrandingDescription1: { type: String, default: "Originally established as ACCSYSINDIA, our direct selling model scaled rapidly across Southern and Western India. In 2026, recognizing the need to accelerate leadership growth and prioritize advanced digital commerce channels, the organization proudly transitioned to the EAGLES TEAM brand." },
    rebrandingDescription2: { type: String, default: "This shift introduced high Point Values (60PV standard kits), priority dispatch warehouses, and advanced matching pairings systems, scaling passive income payouts to hundreds of new earners monthly." },

    dispatchCenters: {
      type: [
        {
          city: { type: String, required: true },
          address: { type: String, required: true },
          phone: { type: String, required: true }
        }
      ],
      default: [
        { city: "Bengaluru Hub", address: "45 Prime Corporate Ring Road, Silicon Hub", phone: "+91 98765 00101" },
        { city: "Chennai Depot", address: "12 Logistics Lane, Guindy Industrial Area", phone: "+91 98765 00102" },
        { city: "Erode Active Center #48", address: "78 Farmers Market Road, Near Main Terminal", phone: "+91 98765 00103" },
        { city: "Mumbai Distribution", address: "90 Seaport Warehousing Complex, Panvel", phone: "+91 98765 00104" }
      ]
    },

    upcomingEvents: {
      type: [
        {
          title: { type: String, required: true },
          date: { type: String, required: true },
          location: { type: String, required: true },
          price: { type: Number, required: true },
          description: { type: String, required: true }
        }
      ],
      default: [
        {
          title: "Eagles Annual Leadership Summit 2026",
          date: "July 24, 2026",
          location: "Grand Palace Arena, Bengaluru",
          price: 499,
          description: "Our massive annual celebration. Felicitating matching pair qualifiers, car winners, and hosting elite keynote lectures."
        },
        {
          title: "Direct Commerce & PV Bootcamp",
          date: "September 12, 2026",
          location: "Le Meridien Convention, Chennai",
          price: 250,
          description: "Intense classroom training on marketing strategies, binary structure alignments, and direct selling guidelines."
        }
      ]
    }
  },
  { timestamps: true }
);

export const Setting = mongoose.models.Setting || mongoose.model<ISetting>("Setting", SettingSchema);
