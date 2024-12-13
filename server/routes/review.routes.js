import express from "express";
import ReviewController from "../controllers/review.controllers.js";
import { authJwt } from "../services/auth.services.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";

const router = express.Router();
router.get("/store", authJwt, asyncHandler(ReviewController.getReviewsByStore));

router.get("/:storeProductId/all", asyncHandler(ReviewController.getReviews));
router.post("/:storeProductId", authJwt, asyncHandler(ReviewController.createReview));

router.patch("/:reviewId", authJwt, asyncHandler(ReviewController.updateReview));
router.delete("/:reviewId", authJwt, asyncHandler(ReviewController.deleteReview));
export default router;
