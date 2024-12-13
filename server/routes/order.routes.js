import express from "express";
import { authJwt } from "../services/auth.services.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";
import OrderController from "../controllers/order.controller.js";

const router = express.Router();

router.get("/customer/all", authJwt, asyncHandler(OrderController.getCustomerOrders));
router.get("/my-store/total-sells", authJwt, asyncHandler(OrderController.getOrdersCountByDay));
router.get("/my-store", authJwt, asyncHandler(OrderController.getCustomerOrdersByStore));
router.get("/customer/:orderId", authJwt, asyncHandler(OrderController.getCustomerOrder));

router.post("/customer/create", authJwt, asyncHandler(OrderController.createCustomerOrders));
router.post("/new", authJwt, asyncHandler(OrderController.createSellerOrders));

router.patch("/:orderId", authJwt, asyncHandler(OrderController.updateCustomerOrder));

export default router;
