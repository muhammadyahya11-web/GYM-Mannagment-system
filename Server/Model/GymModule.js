import mongoose from "mongoose";

const gymSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    gymName: {
      type: String,
      trim: true,
      default: "",
    },

    gymbio: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
      unique: true,
    },

    gymadress: {
      type: String,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    openingtime: {
      type: String,
      default: "",
    },

    closingtime: {
      type: String,
      default: "",
    },

    gymabanner: {
      type: String,
      default: "",
    },

    gymlogo: {
      type: String,
      default: "",
    },

    facilities: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Gym = mongoose.model("Gym", gymSchema);

export default Gym;