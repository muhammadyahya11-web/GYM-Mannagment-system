import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/Dbconfig.js";
import userrouter from "./Router/UserRoutes.js";
import cors from "cors";
import ownerRouter from "./Owner/OwnerRouter.js";
const app = express();
import gymrouter from "./Router/GymRoutes.js";
import membershipPlansRoute from "./Router/MembershipRoutes.js";
import trainerrouter from "./Router/TrainerRouter.js";
import memberRouter from "./Router/MembersRouter.js";
import AttendenceRouter from "./Router/AttendenceRouter.js";
import paymentRouter from "./Router/PaymentRouter.js";


//========================= dotenv config================
dotenv.config();
// ===============cors=======================
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
    origin : true,
  })
);
//===================== middleware=======================
app.use(express.json());
app.use("/api/user", userrouter);
app.use("/api/user", ownerRouter); 
app.use("/api/gym", gymrouter);
app.use("/api/plans",membershipPlansRoute );
app.use("/api/trainer",trainerrouter );
app.use("/api/member",memberRouter );
app.use("/api/attendence",AttendenceRouter );
app.use("/api/payment", paymentRouter);

//=============== test route================================
app.get("/", (req, res) => {
  res.send("Server is running...");
});

//============== connect database FIRST=====================
connectDB();

//================= start server===========================
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
