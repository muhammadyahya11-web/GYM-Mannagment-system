import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true },

  password: { type: String, required: true },

  role: { type: String, required: true },

  otp: { type: String, required: true, },

  expiresAt: { type: Date, required: true, },
});


OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model("Otp", OtpSchema);

export default Otp;
