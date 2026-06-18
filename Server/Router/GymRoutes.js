import express from "express";
import { getGym, updateGym, deleteGym, aiChat } from "../Controller/GymController.js";
import isOwner from "../Middlerware/isOwner.js";
import isAuth from "../Middlerware/isAuth.js";

const gymrouter = express.Router();

gymrouter.get("/getGym", isOwner, getGym);
gymrouter.put("/updateGym", isOwner, updateGym);
gymrouter.delete("/deleteGym", isOwner, deleteGym);
gymrouter.post("/ai-chat", isAuth, aiChat);
export default gymrouter;