import express from "express";
import ProductController from "../controllers/product.controllers.js";
import ReviewController from "../controllers/review.controllers.js";
import { storage } from "../config/cloudinary.config.js";
import { authJwt } from "../services/auth.services.js";

import multer from "multer";
import asyncHandler from "../middlewares/async-handler.middleware.js";
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/category/:idCategory", ProductController.getProductByCategory);
router.get("/newest", asyncHandler(ProductController.getNewestProduct));
router.get("/all", authJwt, ProductController.getAllProduct);
router.get("/:id", ProductController.getProductById);

router.post(
    "/create",
    upload.array("images"),
    asyncHandler(ProductController.createProduct)
);

router.put("/:id/image/:idImage", ProductController.deleteImageProduct);
router.put(
    "/:id/image",
    upload.array("images"),
    ProductController.addImagesProduct
);
router.put("/:id", ProductController.updateProduct);

router.delete("/:id", ProductController.deleteProduct);
export default router;
