import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema(
  {
    profile: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      phone: {
        type: String,
        default: "+923XXXXXXXXX",
      },
      avatar: {
        type: String,
        default: "",
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },
      age: {
        type: Number,
      },
    },

    professional: {
      specialization: {
        type: [String], // e.g. ["Weight Loss", "Strength", "CrossFit"]
        required: true,
      },
      experienceYears: {
        type: Number,
        required: true,
      },
      certifications: {
        type: [String],
        default: [],
      },
      bio: {
        type: String,
        maxlength: 500,
      },
    },

    gym: {
      gymId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true,
      },
      gymName: {
        type: String,
      },
    },

    availability: {
      days: {
        type: [String], // ["Mon", "Tue", "Wed"]
        default: [],
      },
      timeSlots: {
        type: [String], // ["6AM-8AM", "5PM-8PM"]
        default: [],
      },
    },

    salary: {
      type: Number,
      required: true,
    },

    ratings: {
      average: {
        type: Number,
        default: 0,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    role: {
      type: String,
      default: "trainer",
    },
  },
  { timestamps: true }
);

const Trainer = mongoose.model("Trainer", TrainerSchema);

export default Trainer;
