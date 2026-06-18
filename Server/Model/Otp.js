import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  name: { type: String,  },

  email: { type: String, required: true, },

  password: { type: String,  },

  role: { type: String,  },

  otp: { type: String, required: true, },

  expiresAt: { type: Date, required: true, },

  isReset: { type: Boolean, default: false },
});


OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model("Otp", OtpSchema);

export default Otp;
