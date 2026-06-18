import bcrypt from "bcryptjs";
import User from "../Model/UserModel.js";
import Otp from "../Model/Otp.js";
import { Sendcode } from "../Middlerware/Sendcode.js";
import generateToken from "../Config/Token.js";
import jwt from "jsonwebtoken";
import Gym from "../Model/GymModule.js";

// ---------------- Register (send OTP) --------------------------------
const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("Received registration data:", { name, email, role });
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

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(409).json({ message: "Email already registered" });

    const otpCode = Math.floor(100000 + Math.random() * 900000);

    await Sendcode(email, otpCode);

    await Otp.create({
      name, email, password, role, otp: otpCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    res.status(200).json({ message: "OTP sent to email", email });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

//================================Verify OTP (save user)==========================================
const verifyOtp = async (req, res) => {
  try {
    const { email, otp, isReset } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const emailNormalized = email.trim().toLowerCase();

    const otpData = await Otp.findOne({
      email: emailNormalized,
      otp,
    });

    if (!otpData) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpData.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(otpData.password, salt);

    const newUser = await User.create({
      name: otpData.name,
      email: emailNormalized,
      password: hashedPassword,
      role: otpData.role,
      isVerified: true,
    });

    let newGym = null;

    if (otpData.role === "owner") {
      newGym = await Gym.create({
        owner: newUser._id,
        gymName: "",
        gymbio: "",
        email: emailNormalized,
        gymadress: "",
        phone: "",
        openingtime: "",
        closingtime: "",
        gymabanner: "",
        gymlogo: "",
        facilities: "",
      });

      newUser.gymId = newGym._id;
      await newUser.save();
    }

    await Otp.deleteOne({ email: emailNormalized });

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user: {
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        gym: newGym,
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


// =================================================================

const forgotPassword = async (req, res) => {
  try {

    const { Email } = req.body;

    if (!Email) { return res.status(400).json({ message: "Email required" }); }

    const user = await User.findOne({ email: Email });

    if (!user) { return res.status(404).json({ message: "User not found" }); }

    const otpCode = Math.floor(100000 + Math.random() * 900000);

    await Sendcode(Email, otpCode);

    await Otp.create({
      email: Email, otp: otpCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    res.status(200).json({ message: "OTP sent to email", email: Email });

  }
  catch (error) {

    res.status(500).json({ message: "Forgot password failed", error: error.message });
  }
}

//  ================================================================

const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    if (!token) {
      return res.status(400).json({ message: "Token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not  found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.isReset = false;

    await user.save();

    const newToken = generateToken(user);

    return res.status(200).json({
      message: "Password updated successfully",
      token: newToken,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isReset: user.isReset,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Password update failed",
      error: error.message,
    });
  }
};

// =================================================================
const resendOtp = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000);

    await Sendcode(email, otpCode);

    await Otp.findOneAndUpdate(
      { email },
      {
        otp: otpCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      },
      { new: true }
    );

    res.status(200).json({ message: "OTP resent to email", email });

  } catch (error) {
    res.status(500).json({ message: "Resend OTP failed", error: error.message });

  }


}


// ===================== MEMBER FUNCTIONS =====================

const addMember = async (req, res) => {
  try {
    const {
      name,
      password,
      email,
      phone,
      age,
      joinDate,
      membershipType,
      status,
    } = req.body;

    const owner = await User.findById(req.user._id || req.user.id);
    const gymId = owner?.gymId;

    if (!gymId) {
      return res.status(404).json({
        message: "Owner gym not found",
      });
    }

    const existingMember = await User.findOne({ email, role: "client" });

    if (existingMember) {
      return res.status(400).json({
        message: "Member already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = await User.create({
      gymId,
      name,
      password: hashedPassword,
      email,
      whatsapp: phone,
      age,
      joinDate,
      subscribePlan: membershipType,
      status,
      role: "client",
      isVerified: true,
    });

    return res.status(201).json({
      message: "Member successfully created",
      member: newMember,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error, member cannot be created",
      error: error.message,
    });
  }
};

const getMembers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user.id);
    if (!user || !user.gymId) {
      return res.status(404).json({
        message: "Gym not found",
      });
    }

    const members = await User.find({ gymId: user.gymId, role: "client" });

    return res.status(200).json({
      message: "Members fetched successfully",
      members,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching members",
      error: error.message,
    });
  }
};

const getSingleMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await User.findOne({ _id: id, role: "client" });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    return res.status(200).json({
      message: "Member fetched successfully",
      member,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching member",
      error: error.message,
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      password,
      email,
      phone,
      age,
      membershipType,
      status,
    } = req.body;

    const member = await User.findOne({ _id: id, role: "client" });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    let hashedPassword = member.password;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedMember = await User.findByIdAndUpdate(
      id,
      {
        name,
        password: hashedPassword,
        email,
        whatsapp: phone,
        age,
        subscribePlan: membershipType,
        status,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Member updated successfully",
      member: updatedMember,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error updating member",
      error: error.message,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await User.findOne({ _id: id, role: "client" });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Member deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting member",
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscribePlan: user.subscribePlan,
        status: user.status,
        age: user.age,
        joinDate: user.joinDate
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch user",
      error: error.message
    });
  }
};

export { Register, verifyOtp, Login, forgotPassword, updatePassword, resendOtp, addMember, getMembers, getSingleMember, updateMember, deleteMember, getMe };