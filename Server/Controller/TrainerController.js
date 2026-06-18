
import Trainer from "../Model/TrainerModule.js";
import bcrypt from "bcryptjs";
import Gym from "../Model/GymModule.js";
import mongoose from "mongoose";

const addTrainer = async (req, res) => {
    try {
        const {
            logo,
            name,
            email,
            password,
            specialization,
            experience,
            phone,
            isActive,
        } = req.body;

        // ================= VALIDATION =================
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                message: "Name, email, password and phone are required",
            });
        }

        // ================= CHECK EXIST =================
        const existingTrainer = await Trainer.findOne({ email });

        if (existingTrainer) {
            return res.status(400).json({
                message: "Trainer already exists",
            });
        }

        // ================= HASH PASSWORD =================
        const hashedPassword = await bcrypt.hash(password, 10);
        // ===============finding gym========================

         const userId = req.user.id;

             const gym = await Gym.findOne({ owner: userId });
             
             if (!gym) {
               return res.status(404).json({
                 message: "Gym not found",
               });
             }

            

        // ================= CREATE TRAINER =================
        const trainer = await Trainer.create({
            logo,
            name,
            email,
            password: hashedPassword,
            specialization,
            experience,
            phone,
            isActive: isActive ?? true,
            gymId: gym._id, 
        });

        return res.status(201).json({
            message: "Trainer added successfully",
            trainer,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// =======================================================

 const getTrainers = async (req, res) => {
  try { console.log("gym" );
           const userId = req.user.id;

             const gym = await Gym.findOne({ owner: userId });

             console.log("gym" ,gym);
             
             
             if (!gym) {
               return res.status(404).json({
                 message: "Gym not found",
               });
             } 

             console.log(gym._id)


    const trainers = await Trainer.find({ gymId :gym._id });

    return res.status(200).json({
      message: "Trainers fetched successfully",
      trainers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// ==============================================


 const updateTrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;

    const {
      name,
      email,
      specialization,
      experience,
      phone,
      isActive,
    } = req.body;

    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({
        message: "Trainer not found",
      });
    }

    const updatedTrainer = await Trainer.findByIdAndUpdate(
      trainerId,
      {
        name,
        email,
        specialization,
        experience,
        phone,
        isActive,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Trainer updated successfully",
      trainer: updatedTrainer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// ==================================================


const deleteTrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;

    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({
        message: "Trainer not found",
      });
    }

    await Trainer.findByIdAndDelete(trainerId);

    return res.status(200).json({
      message: "Trainer deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// ============get trainer by id =============================



const getsingletrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(trainerId)) {
      return res.status(400).json({
        message: "Invalid trainer ID",
      });
    }

    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({
        message: "Trainer not found",
      });
    }

    return res.status(200).json({
      message: "Trainer fetched successfully",
      trainer,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export {addTrainer , getTrainers , updateTrainer ,deleteTrainer , getsingletrainer};