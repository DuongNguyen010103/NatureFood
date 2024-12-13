import express from "express";
import TagModel from "../models/tag.model.js";
import { statusCode } from "../config/statusCode.config.js";
import { BaseResponse } from "../config/BaseResponse.config.js";
import ProductModel from "../models/product.model.js";

const TagController = {
    async getAll(req, res) {
        const tags = await TagModel.find();
        const total = await TagModel.countDocuments();
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy thẻ tags thành công", { tags, total }));
    },

    async getProductsByTagId(req, res) {
        try {
            const products = await ProductModel.find({ tags: req.params.id });
            return res.status(statusCode.OK).json(BaseResponse.success("Lấy sản phẩm thành công", products));
        } catch (error) {
            console.log("GET products by TAG id: ", error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error("Lấy sản phẩm thất bại", error));
        }
    },

    async createTags(req, res) {
        try {
            const { names } = req.body;
            const newTags = await TagModel.insertMany(names);
            return res.status(statusCode.OK).json(BaseResponse.success("Thêm thẻ tags thành công", newTags));
        } catch (error) {
            console.log("CREATE TAG: ", error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error("Tạo thẻ tags thất bại", error));
        }
    },

    async addTagsToProduct(req, res) {
        try {
            const { tags } = req.body;
            const { productId } = req.params;
            const product = await ProductModel.findByIdAndUpdate(productId, { $addToSet: { tags: { $each: tags } } }, { new: true });
            return res.status(statusCode.OK).json(BaseResponse.success("Thêm thẻ tags vào sp thành công", product));
        } catch (error) {
            console.log("ADD TAGs: ", error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error("Thêm thẻ tags vào sp thất bại", error));
        }
    },

    async deleteTag(req, res) {
        try {
            const tag = await TagModel.findByIdAndDelete(req.params.id);
            return res.status(statusCode.OK).json(BaseResponse.success("Xóa tag thành công", null));
        } catch (error) {
            console.log("Delete TAGs: ", error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error("Xóa tag thất bại", error));
        }
    },
};

export default TagController;
