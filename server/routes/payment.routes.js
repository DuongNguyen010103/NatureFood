import express from "express";
import asyncHandler from "../middlewares/async-handler.middleware.js";
import PaymentController from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/callback", asyncHandler(PaymentController.paymentCallback));
router.post("/", asyncHandler(PaymentController.createMoMoPaymentLink));

export default router;
