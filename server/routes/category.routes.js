import express from "express";
const router = express.Router();
import CategoryController from "../controllers/category.controllers.js";
import { storage } from "../config/cloudinary.config.js";
import multer from "multer";
import asyncHandler from "../middlewares/async-handler.middleware.js";
const upload = multer({ storage: storage });

router.get("/all", asyncHandler(CategoryController.getCategories));
router.get("/products-each-category", asyncHandler(CategoryController.getProductsEachCategory));
router.get("/:id", CategoryController.getCategoryById);

router.post("/create", upload.single("image"), CategoryController.createCategory);

router.put("/:id/image", upload.single("image"), CategoryController.updateImageCategory);
router.put("/:id", CategoryController.updateCategory);

router.delete("/:id", asyncHandler(CategoryController.deleteCategory));
export default router;
