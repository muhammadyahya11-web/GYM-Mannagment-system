import User from "../Model/UserModel.js";
import Gym from "../Model/GymModule.js";
import MembershipPlan from "../Model/MembershipModule.js";

const createMembershipPlan = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) { return res.status(404).json({ message: "User not found", }) }


        const gym = await Gym.findOne({ owner: userId });



        if (!gym) { return res.status(404).json({ message: "Gym not found", }); }

        const { planName, price, duration, features } = req.body;

        if (!planName || !price || !duration || !features) {

            return res.status(400).json({ message: "All fields are required", });
        }

        const newPlan = await MembershipPlan.create({
            planName,
            price,
            duration,
            features,
            gym: gym._id,
        });

        return res.status(201).json({
            message: "Plan successfully created",
            plan: newPlan,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Plan cannot be created",
            error: error.message,
        });
    }
};


// =================================================================================
 

const updatePlan = async (req, res) => {
  try {
    const userId = req.user.id;

    const { planName, price, duration, features , isActive } = req.body;

    const { planId } = req.params;

    const gym = await Gym.findOne({ owner: userId });
    
    if (!gym) {
      return res.status(404).json({
        message: "Gym not found",
      });
    }

    const updatedPlan = await MembershipPlan.findOneAndUpdate(
      {
        _id: planId,
        gym: gym._id,
      },
      {
        planName,
        price,
        duration,
        features,
        isActive ,
      },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({
        message: "Membership plan not found",
      });
    }

    return res.status(200).json({
      message: "Membership plan updated successfully",
      plan: updatedPlan,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =============================================================================


const getPlans = async (req, res) => {
  try {
    // Always fetch fresh user data to ensure gymId is populated
    const user = await User.findById(req.user._id || req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const gymId = user.gymId;
      console.log(gymId);
      
    if (!gymId) {
      return res.status(200).json({
        success: true,
        totalPlans: 0,
        plans: [],
        message: "No gym association found",
      });
    }
    
    const plans = await MembershipPlan.find({
      gym: gymId,
    });

    return res.status(200).json({
      success: true,
      totalPlans: plans.length,
      plans,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// ===============================================================

const deletePlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.params;

    // 1. Find owner gym
    const gym = await Gym.findOne({ owner: userId });

    if (!gym) {
      return res.status(404).json({
        message: "Gym not found",
      });
    }

    // 2. Find and delete plan (only if belongs to this gym)
    const deletedPlan = await MembershipPlan.findOneAndDelete({
      _id: planId,
      gym: gym._id,
    });

    if (!deletedPlan) {
      return res.status(404).json({
        message: "Membership plan not found",
      });
    }

    return res.status(200).json({
      message: "Membership plan deleted successfully",
      plan: deletedPlan,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================================================================


export { createMembershipPlan , updatePlan , deletePlan , getPlans };