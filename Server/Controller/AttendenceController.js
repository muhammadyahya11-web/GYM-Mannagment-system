import Attendance from "../Model/AttendenceModule.js";
import User from "../Model/UserModel.js";

const createAttendance = async (req, res) => {
  try {
    const { memberId, attendance } = req.body;
    
    // Fetch fresh user data
    const user = await User.findById(req.user._id || req.user.id);
    if (!user || !user.gymId) {
      return res.status(401).json({
        message: "Gym not found",
      });
    }
    const gymId = user.gymId;

    if (!memberId || !attendance) {
      return res.status(400).json({
        message: "Member ID and attendance are required",
      });
    }

    // Member find (now using User model with role:client)
    const member = await User.findOne({
      _id: memberId,
      gymId,
      role: "client",
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    // Prevent duplicate attendance for same day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const alreadyMarked = await Attendance.findOne({
      memberId,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (alreadyMarked) {
      return res.status(400).json({
        message: "Attendance already marked today",
      });
    }

    const newAttendance = await Attendance.create({
      memberId: member._id,
      memberName: member.name,
      phone: member.whatsapp,
      subscribePlan: member.subscribePlan,
      attendance,
      gymId,
    });

    return res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      attendance: newAttendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Attendance cannot be created",
      error: error.message,
    });
  }
};

const scanAttendance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User record not found",
      });
    }

    const gymId = user.gymId;

    if (!gymId) {
      return res.status(404).json({
        message: "No gym association found",
      });
    }

    // Prevent duplicate attendance for same day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const alreadyMarked = await Attendance.findOne({
      memberId: user._id,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (alreadyMarked) {
      return res.status(400).json({
        message: "Attendance already marked today",
      });
    }

    const newAttendance = await Attendance.create({
      memberId: user._id,
      memberName: user.name,
      phone: user.whatsapp,
      subscribePlan: user.subscribePlan,
      attendance: "Present",
      gymId,
    });

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      attendance: newAttendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to mark attendance",
      error: error.message,
    });
  }
};

// =============================================================

const getGymAttendance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user.id);
    if (!user || !user.gymId) {
      return res.status(401).json({
        message: "Gym not found in token",
      });
    }

    const attendance = await Attendance.find({ gymId: user.gymId })
      .sort({ createdAt: -1 }); // latest first

    return res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

const getUserAttendance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const attendance = await Attendance.find({ memberId: user._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

const generateGymQRCode = async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user.id);
    if (!user || !user.gymId) {
      return res.status(404).json({
        message: "Gym not found",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateStr = today.toISOString().split("T")[0];
    
    const qrData = {
      type: "gym-attendance",
      gymId: user.gymId,
      date: dateStr,
      token: Buffer.from(`${user._id}:${dateStr}`).toString("base64")
    };

    return res.status(200).json({
      success: true,
      qrData: qrData.token,
      gymId: user.gymId,
      date: dateStr
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate QR code",
      error: error.message,
    });
  }
};

export { createAttendance, getGymAttendance, scanAttendance, getUserAttendance, generateGymQRCode };