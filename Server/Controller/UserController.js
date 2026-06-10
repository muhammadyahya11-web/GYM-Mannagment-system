import bcrypt from "bcryptjs";
import User from "../Model/UserModel.js";
import Otp from "../Model/Otp.js";
import { Sendcode } from "../Middlerware/Sendcode.js";
import generateToken from "../Config/Token.js";

// ---------------- Register (send OTP) --------------------------------
const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("Received registration data:", { name, email, role });
    // -------------------data checking --------------------------------------
    if (!name) {
      return res.status(400).json({ message: "Name are required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email are required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password are required" });
    }
    if (!role) {
      return res.status(400).json({ message: "role are required" });
    }
    //  --------------------check user exist-----------------------------------------------
     const userExist = await User.findOne({ email });
     if (userExist) return res.status(409).json({ message: "Email already registered" });

    // ----------------------genrate  verification code--------------------------------------

    const otpCode = Math.floor(100000 + Math.random() * 900000);

    // -------------------opt send fuction call-------------------------------------------------
    await Sendcode(email, otpCode);

    //--------------------------- save OTP temporarily--------------------------------------
    await Otp.create({
      name, email, password, role, otp: otpCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    res.status(200).json({ message: "OTP sent to email", email });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

//================================Verify OTP (save user)=================================================
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log("EMAIL:", email, "OTP:", otp);

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const otpData = await Otp.findOne({ email, otp });
    if (!otpData) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpData.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(otpData.password, 10);

    // ---------- Create verified user ----------
    const newUser = await User.create({
      name: otpData.name,
      email: otpData.email,
      image: "",
      phone: "",
      password: hashedPassword,
      role: otpData.role,
      isVerified: true,
    });

    await Otp.deleteOne({ email });

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: "OTP verified, registration complete",
      token,
      user: {
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    return res.status(500).json({
      message: "OTP verification failed",
      error: error.message,
    });
  }
};






// ===========================Logig========================================================
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { userId: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export { Register, verifyOtp, Login };
