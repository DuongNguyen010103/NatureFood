import express from "express";
import asyncHandler from "../middlewares/async-handler.middleware.js";
import { authJwt } from "../services/auth.services.js";
import BlogController from "../controllers/blog.controller.js";
import { storage } from "../config/cloudinary.config.js";
import multer from "multer";
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/list", asyncHandler(BlogController.getBlogs));
router.get("/:slug", asyncHandler(BlogController.getBlog));

router.post("/create", upload.single("image"), asyncHandler(BlogController.createBlog));

export default router;
