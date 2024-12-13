import express from "express";
import { authJwt } from "../services/auth.services.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";
import NotificationController from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/all", authJwt, asyncHandler(NotificationController.getNotifications));
router.get("/unread", authJwt, asyncHandler(NotificationController.getUnreadNotificationsTotal));

router.post("/", asyncHandler(NotificationController.createNotification));

router.patch("/", authJwt, asyncHandler(NotificationController.updateNotifications));
router.patch("/:notificationId", asyncHandler(NotificationController.updateNotification));

export default router;
