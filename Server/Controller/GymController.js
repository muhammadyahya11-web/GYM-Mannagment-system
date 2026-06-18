import Gym from "../Model/GymModule.js";
import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";

const getGym = async (req, res) => {
  try {
    const userId = req.user.id;

    const gym = await Gym.findOne({ owner: userId });

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    return res.status(200).json({
      message: "Gym retrieved successfully",
      gym,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const updateGym = async (req, res) => {
  try {
    const form = req.body.form;

    if (!form) {
      return res.status(400).json({ message: "Form required" });
    }

    const userId = req.user.id;

    const gym = await Gym.findOne({ owner: userId });

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    const updatedGym = await Gym.findByIdAndUpdate(
      gym._id,
      {
        gymName: form.gymName,
        phone: form.phone,
        email: form.email,
        gymadress: form.address,
        openingtime: form.open,
        closingtime: form.close,
        gymbio: form.about,
        facilities: form.facilities,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Gym updated successfully",
      gym: updatedGym,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteGym = async (req, res) => {
    try {
        const userId = req.user.id;

        const gym = await Gym.findOne({ owner: userId });
        
        if (!gym) {
            return res.status(404).json({ message: "Gym not found" });
        }

        await Gym.findByIdAndDelete(gym._id);

        const user = await User.findOne({ owner: userId });

        if(!user){
          return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(user._id);

        return res.status(200).json({
            message: "Gym deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

 const aiChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message required",
      });
    }

    const apiKey = process.env.AI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "GROQ API key missing",
      });
    }

    let reply = null;

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content:
                  "You are a professional gym trainer AI. Give short, practical workout, diet, and fitness advice.",
              },
              {
                role: "user",
                content: message,
              },
            ],
            temperature: 0.7,
            max_tokens: 200,
          }),
        }
      );
      console.log(response);
      
      if (response.ok) {
        const data = await response.json();

        reply =
          data?.choices?.[0]?.message?.content ||
          "Train consistently and stay disciplined.";
      } else {
        const errText = await response.text();
        console.log("Groq Error:", errText);
      }
    } catch (apiError) {
      console.log("AI API error:", apiError.message);
    }

    // fallback responses
    const mockResponses = [
      "Focus on compound lifts: squat, bench press, deadlift.",
      "Eat high protein (1.6–2.2g per kg body weight).",
      "Stay in calorie deficit for fat loss.",
      "Sleep 7–9 hours for recovery.",
      "Train 4–5 days/week for best results.",
      "Progressive overload = key to muscle growth.",
    ];

    return res.status(200).json({
      success: true,
      reply:
        reply ||
        mockResponses[Math.floor(Math.random() * mockResponses.length)],
    });
  } catch (error) {
    console.log("Server Error:", error.message);

    return res.status(200).json({
      success: true,
      reply: "Stay consistent, train hard, and improve daily!",
    });
  }
};
export { getGym, updateGym, deleteGym, aiChat };