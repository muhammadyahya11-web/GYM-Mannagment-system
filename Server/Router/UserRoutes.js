import express from "express";
import { Login, Register, verifyOtp } from "../Controller/UserController.js";


const userrouter = express.Router();
// ===========Register route=========================

userrouter.post("/verify", verifyOtp)
userrouter.post("/reg", Register)
userrouter.post("/login", Login)

export default userrouter
