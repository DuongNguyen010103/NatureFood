import express from "express";
import ProductModel from "../models/product.model.js";
import StoreCart from "../models/store.cart.model.js";
import StoreModel from "../models/store.models.js";
import { statusCode } from "../config/statusCode.config.js";
import { BaseResponse } from "../config/BaseResponse.config.js";
import StoreCartModel from "../models/store.cart.model.js";

const StoreCartController = {
    async createStoreCartItem(req, res) {
        const { quantity } = req.body;
        const { productId } = req.params;
        const store = req.user.store;
        const existingCart = await StoreCart.findOne({ store, product: productId });
        let newItem = null;
        if (existingCart) {
            existingCart.quantity += quantity;
            newItem = await existingCart.save();
        } else {
            const item = new StoreCartModel({ store, product: productId, quantity });
            newItem = await item.save();
        }
        return res.status(statusCode.OK).json(BaseResponse.success("Thêm vào giỏ hàng thành công", newItem));
    },

    async deleteStoreCartItem(req, res) {
        const { storeCartId } = req.params;
        const deletedItem = await StoreCartModel.findByIdAndDelete(storeCartId);
        return res.status(statusCode.OK).json(BaseResponse.success("Xóa item giỏ hàng thành công", deletedItem));
    },

    async getStoreCartItems(req, res) {
        const store = req.user.store;
        const products = await StoreCartModel.find({ store }).populate("product");
        const total = await StoreCartModel.countDocuments({ store });
        return res.status(statusCode.OK).json(
            BaseResponse.success("Lấy giỏ hàng thành công", {
                products,
                total,
            })
        );
    },

    async adjustmentStoreCartItem(req, res) {
        const { storeCartId } = req.params;
        const { quantity } = req.body;
        const updatedItem = await StoreCartModel.findByIdAndUpdate(storeCartId, { $inc: { quantity } }, { new: true }).populate("product");
        return res.status(statusCode.OK).json(BaseResponse.success("Cập nhật số lượng thành công", updatedItem));
    },
};

export default StoreCartController;
