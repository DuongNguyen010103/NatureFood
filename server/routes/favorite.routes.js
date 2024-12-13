import express from "express";
import { authJwt } from "../services/auth.services.js";
import FavoriteController from "../controllers/favorite.controllers.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";

const router = express.Router();

router.get("/store-product/all", authJwt, asyncHandler(FavoriteController.getFavoriteStoreProducts));
router.get("/product/all", authJwt, asyncHandler(FavoriteController.getStoreFavoriteItems));

router.post("/store-product/:storeProductId/add", authJwt, asyncHandler(FavoriteController.addFavoriteStoreProduct));

router.post("/product/:productId/modify", authJwt, asyncHandler(FavoriteController.modifyStoreFavoriteItem));

router.delete("/store-product/:storeProductId", authJwt, asyncHandler(FavoriteController.deleteFavoriteStoreProduct));

export default router;
