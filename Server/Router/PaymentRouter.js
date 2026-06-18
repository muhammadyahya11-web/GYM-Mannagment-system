import express from "express";
import isAuth from "../Middlerware/isAuth.js";
import isOwner from "../Middlerware/isOwner.js";
import { createCashPayment, createStripeCheckout, getMemberPayments, getGymPayments, getPendingPayments, markPaymentPaid, getMonthlyReport, getDashboardData } from "../Controller/PaymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/cash", isAuth, createCashPayment);
paymentRouter.post("/stripe/checkout", isAuth, createStripeCheckout);
paymentRouter.get("/my-payments", isAuth, getMemberPayments);
paymentRouter.get("/gym-payments", isOwner, getGymPayments);
paymentRouter.get("/pending", isOwner, getPendingPayments);
paymentRouter.put("/mark-paid/:id", isOwner, markPaymentPaid);
paymentRouter.get("/monthly-report", isOwner, getMonthlyReport);
paymentRouter.get("/dashboard", isOwner, getDashboardData);

export default paymentRouter;