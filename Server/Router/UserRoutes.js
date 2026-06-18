import express from "express";
import { forgotPassword, Login, updatePassword, Register, verifyOtp, resendOtp, getMe } from "../Controller/UserController.js";
import isAuth from "../Middlerware/isAuth.js";

const userrouter = express.Router();
userrouter.post("/verify", verifyOtp);
userrouter.post("/reg", Register);
userrouter.post("/login", Login);
userrouter.post("/forgotPassword", forgotPassword);
userrouter.post("/updatePassword/:token", updatePassword);
userrouter.post("/resendOtp", resendOtp);
userrouter.get("/me", isAuth, getMe);

export default userrouter;