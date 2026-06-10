import express from "express";
import { SaveProfile , saveGymInfo } from "./OwnerController";





const ownerRouter = express.Router();

ownerRouter.post("/owner/saveprfile", SaveProfile );
ownerRouter.post("/owner/savegyminfo", saveGymInfo );



export default ownerRouter;
