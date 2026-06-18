import express from "express";
import { addTrainer ,  getTrainers,updateTrainer, deleteTrainer, getsingletrainer} from "../Controller/TrainerController.js";
import isOwner from "../Middlerware/isOwner.js";
import  isUser from "./../Middlerware/UserMiddleware.js"
const trainerrouter = express.Router();
trainerrouter.post("/add", isOwner, addTrainer);
trainerrouter.get("/get",isUser, getTrainers);
trainerrouter.get("/get/:id",isOwner, getsingletrainer);
trainerrouter.put("/update/:id",isOwner, updateTrainer);
trainerrouter.delete("/delete/:id",isOwner, deleteTrainer);


export default trainerrouter;