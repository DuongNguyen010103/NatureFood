import express from "express";
import UserController from "../controllers/user.controllers.js";
import { authLocal, authJwt } from "../services/auth.services.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";

import { storage } from "../config/cloudinary.config.js";
import multer from "multer";
import StoreControllers from "../controllers/store.controllers.js";
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/current", authJwt, asyncHandler(StoreControllers.getCurrentStore));
router.get("/:storeId", asyncHandler(StoreControllers.getStoreById));

router.post("/new", authJwt, upload.single("image"), asyncHandler(StoreControllers.createStore));

router.put("/update-status", asyncHandler(StoreControllers.updateStoreStatus));

export default router;
