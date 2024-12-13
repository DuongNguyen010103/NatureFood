import express from "express";
import asyncHandler from "../middlewares/async-handler.middleware.js";

const router = express.Router();

//get all bill
router.get("/");

//get bills by user id
router.get("/user/:userId");

//get bill by id
router.get("/:id");

//create bill

//update bill by id
router.put("/:id");

//delete bill by id
router.delete("/:id");

export default router;
