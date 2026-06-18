import express from "express";
import isOwner from "../Middlerware/isOwner.js";
import isAuth from "../Middlerware/isAuth.js";
import { createAttendance, getGymAttendance, scanAttendance, getUserAttendance, generateGymQRCode } from "../Controller/AttendenceController.js";

const AttendenceRouter = express.Router();

AttendenceRouter.post("/create", isOwner, createAttendance);
AttendenceRouter.get("/get", isOwner, getGymAttendance);
AttendenceRouter.get("/scan", isAuth, scanAttendance);
AttendenceRouter.get("/my-attendance", isAuth, getUserAttendance);
AttendenceRouter.get("/gym-qr", isOwner, generateGymQRCode);

export default AttendenceRouter;