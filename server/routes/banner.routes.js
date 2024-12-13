import express from "express";
import BannerController from "../controllers/banner.controller.js";
import { storage } from "../config/cloudinary.config.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";
import { authJwt } from "../services/auth.services.js";

import multer from "multer";
const upload = multer({ storage: storage });
const router = express.Router();

router.get(
    "/store",
    authJwt,
    asyncHandler(BannerController.getBannersByCurrentUser)
);
router.get("/all", asyncHandler(BannerController.getBanners));

router.post(
    "/create",
    upload.single("image"),
    asyncHandler(BannerController.create)
);

router.patch("/:id", asyncHandler(BannerController.updateBanner));

router.delete("/:id", asyncHandler(BannerController.deleteBanner));

export default router;
