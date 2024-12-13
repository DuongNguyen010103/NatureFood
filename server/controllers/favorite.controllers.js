import express from "express";
import { statusCode } from "../config/statusCode.config.js";
import { BaseResponse } from "../config/BaseResponse.config.js";
import UserModel from "../models/user.model.js";
import StoreModel from "../models/store.models.js";
import ProductModel from "../models/product.model.js";
import FavoriteModel from "../models/favorite.model.js";
import StoreFavoriteModel from "../models/favorite.store.model.js";

const FavoriteController = {
    //************customer***********

    async addFavoriteStoreProduct(req, res) {
        const favorite = new FavoriteModel({
            user: req.user._id,
            storeProduct: req.params.storeProductId,
        });
        const newFavorite = await favorite.save();
        const returnValue = await FavoriteModel.findById(newFavorite._id).populate({
            path: "storeProduct",
            populate: [{ path: "productId" }, { path: "storeId" }],
        });
        return res.status(statusCode.CREATED).json(BaseResponse.success("Thêm yêu thích thành công", returnValue));
    },

    async deleteFavoriteStoreProduct(req, res) {
        const favorite = await FavoriteModel.findOneAndDelete({
            user: req.user._id,
            storeProduct: req.params.storeProductId,
        });
        console.log(favorite);

        return res.status(statusCode.OK).json(BaseResponse.success("Xóa yêu thích thành công", favorite));
    },

    async getFavoriteStoreProducts(req, res) {
        const { skip, take } = req.query;
        const products = await FavoriteModel.find({ user: req.user._id })
            .populate({
                path: "storeProduct",
                populate: [{ path: "productId" }, { path: "storeId" }],
            })
            .skip(skip)
            .limit(take);
        const total = await FavoriteModel.countDocuments({
            user: req.user._id,
        });
        return res.status(statusCode.OK).json(
            BaseResponse.success("Lấy danh sách yêu thích thành công", {
                products,
                total,
            })
        );
    },

    //************store**********

    async modifyStoreFavoriteItem(req, res) {
        const { productId } = req.params;
        const store = req.user.store;
        const existingItem = await StoreFavoriteModel.findOne({ store, product: productId });
        console.log(existingItem);

        let returnItem = null;
        if (existingItem) {
            returnItem = await StoreFavoriteModel.findByIdAndDelete(existingItem._id);
        } else {
            const item = new StoreFavoriteModel({ store, product: productId });
            returnItem = await item.save();
        }

        return res.status(statusCode.OK).json(BaseResponse.success("Đã cập nhật yêu thích", returnItem));
    },

    async getStoreFavoriteItems(req, res) {
        const store = req.user.store;
        const products = await StoreFavoriteModel.find({ store });
        const total = await StoreFavoriteModel.countDocuments({ store });
        return res.status(statusCode.OK).json(
            BaseResponse.success("Thành công", {
                products,
                total,
            })
        );
    },
};

export default FavoriteController;
