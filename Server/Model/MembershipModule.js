import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
      required: true,
      enum: ["1 Month", "3 Months", "6 Months", "1 Year"],
    },

    features: 
      {
        type: [String],
        required: true,
      },
    

    isActive: {
      type: Boolean,
      default: true,
    },

    gym: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
      required: true,
    },
  },
  {
    timestamps: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
);

const MembershipPlan = mongoose.model("MembershipPlan", membershipSchema);

export default MembershipPlan;