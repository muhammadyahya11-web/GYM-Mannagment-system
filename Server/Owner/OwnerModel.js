import mongoose from "mongoose";
// ----------------- Owner Schema -----------------
const OwnerSchema = new mongoose.Schema(
  {
    profile: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, unique: true, lowercase: true },
      publicemail: { type: String, unique: true, lowercase: true }, // optional
      phone: { type: String, default: "+923XXXXXXXXX" },
    },

    gymInfo: {
      gymName: { type: String, trim: true },
      city: { type: String },
      membershipRangeMonths: { type: Number },
      gymAddress: { type: String },
    },

    security: {
      password: { type: String, required: true },
    },

    notifications: {
      paymentAlert: { type: Boolean, default: true },
      newMemberRegistration: { type: Boolean, default: true },
      monthlyReport: { type: Boolean, default: true },
    },

    role: { type: String, default: "owner" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

 export const Owner = mongoose.model("Owner", OwnerSchema);