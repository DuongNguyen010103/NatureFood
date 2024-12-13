import ReviewModel from "../models/review.model.js";
import ProductModel from "../models/product.model.js";
import { statusCode } from "../config/statusCode.config.js";
import { BaseResponse } from "../config/BaseResponse.config.js";
import mongoose from "mongoose";

const ReviewController = {
    async getReviews(req, res) {
        const { storeProductId } = req.params;
        const { skip, take } = req.query;
        const reviews = await ReviewModel.find({ storeProduct: storeProductId }).populate("author").sort({ createdAt: -1 }).skip(skip).limit(take);
        const total = await ReviewModel.countDocuments({ storeProduct: storeProductId });
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy danh sách review thành công", { reviews, total }));
    },

    async createReview(req, res) {
        const { storeProductId } = req.params;
        const review = new ReviewModel({ ...req.body, author: req.user._id, storeProduct: storeProductId });
        const newReview = await review.save();
        const populatedReview = await ReviewModel.findById(newReview._id).populate("author");
        return res.status(statusCode.CREATED).json(BaseResponse.success("Tạo review thành công", populatedReview));
    },

    async updateReview(req, res) {
        const { reviewId } = req.params;
        const review = await ReviewModel.findByIdAndUpdate(reviewId, req.body, { new: true });
        return res.status(statusCode.OK).json(BaseResponse.success("Thêm feedback thành công", review));
    },

    async deleteReview(req, res) {
        const { reviewId } = req.params;
        const review = await ReviewModel.findByIdAndDelete(reviewId);
        return res.status(statusCode.OK).json(BaseResponse.success("Xóa đánh giá thành công", review));
    },

    async getReviewsByStore(req, res) {
        const storeId = req.user.store;
        const { skip, take } = req.query;
        const reviews = await ReviewModel.aggregate([
            // Nối (lookup) với collection StoreProduct để lấy thông tin và lọc theo storeId
            {
                $lookup: {
                    from: "storeproducts", // Tên collection StoreProduct trong database
                    localField: "storeProduct",
                    foreignField: "_id",
                    as: "storeProductInfo",
                },
            },
            // Giải nén mảng storeProductInfo thành một object để dễ thao tác
            { $unwind: "$storeProductInfo" },
            {
                $lookup: {
                    from: "products", // Tên collection của product
                    localField: "storeProductInfo.productId", // Giả sử bạn có trường productId trong storeProduct
                    foreignField: "_id",
                    as: "productInfo",
                },
            },
            {
                $unwind: "$productInfo", // Giải nén productInfo
            },
            // Lọc các review có storeProduct chứa storeId
            {
                $match: {
                    "storeProductInfo.storeId": new mongoose.Types.ObjectId(storeId),
                },
            },
            // Nối (lookup) với collection User để lấy thông tin tác giả của review
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorInfo",
                },
            },
            // Giải nén mảng authorInfo thành một object
            { $unwind: "$authorInfo" },
            // Sắp xếp theo thời gian tạo (createdAt), lấy các review gần nhất
            { $sort: { createdAt: -1 } },
            // Giới hạn kết quả chỉ lấy 10 review
            { $limit: 10 },
            // Chỉ lấy các trường cần thiết (nếu cần) để tối ưu kích thước dữ liệu
            {
                $project: {
                    _id: 1,
                    storeProduct: 1,
                    body: 1,
                    rating: 1,
                    feedback: 1,
                    createdAt: 1,
                    authorInfo: { _id: 1, username: 1, email: 1, image: 1 }, // Giả sử bạn muốn lấy các trường này từ tác giả
                    storeProductInfo: { _id: "$storeProductInfo._id", name: "$storeProductInfo.name", storeId: "$storeProductInfo.storeId" }, // Các trường cần từ storeProduct
                    productId: {
                        // Thêm các trường từ productId
                        _id: "$productInfo._id",
                        name: "$productInfo.name",
                        images: "$productInfo.images",
                    },
                },
            },
        ]);
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy đánh giá thành công", reviews));
    },
};

export default ReviewController;
