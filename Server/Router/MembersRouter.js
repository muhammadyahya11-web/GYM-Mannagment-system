import express from "express";
import {
  addMember,
  getMembers,
  getSingleMember,
  updateMember,
  deleteMember
} from "../Controller/UserController.js";
import isOwner from "../Middlerware/isOwner.js";


const memberRouter = express.Router();

memberRouter.post("/add",isOwner , addMember);
memberRouter.get("/get",isOwner , getMembers);
memberRouter.get("/get/:id",isOwner , getSingleMember);
memberRouter.put("/update/:id",isOwner , updateMember);
memberRouter.delete("/delete/:id",isOwner , deleteMember);

export default memberRouter;