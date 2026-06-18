import express from "express";
import isOwner from "../Middlerware/isOwner.js";
import {
  createMembershipPlan,
  deletePlan,
  getPlans,
  updatePlan
} from "../Controller/MembershipController.js";
import isUser from "../Middlerware/UserMiddleware.js";

const membershipPlansRoute = express.Router();

membershipPlansRoute.post("/createmembership", isOwner, createMembershipPlan);

membershipPlansRoute.put("/updatemembership/:planId", isOwner, updatePlan);

membershipPlansRoute.delete("/deletmembership/:planId", isOwner, deletePlan);

membershipPlansRoute.get("/memberships", isUser, getPlans);

export default membershipPlansRoute;