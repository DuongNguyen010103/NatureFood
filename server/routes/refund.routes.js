import express from "express";
import { authJwt } from "../services/auth.services.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";
import RefundController from "../controllers/refund.controller.js";
import { storage } from "../config/cloudinary.config.js";
import multer from "multer";
const upload = multer({ storage: storage });

const router = express.Router();

router.post(
    "/",
    authJwt,
    upload.array("images"),
    asyncHandler(RefundController.createRefund)
);

router.patch("/:id", authJwt, asyncHandler(RefundController.updateRefund));
export default router;
