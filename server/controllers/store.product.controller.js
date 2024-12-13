import mongoose from "mongoose";
import { BaseResponse } from "../config/BaseResponse.config.js";
import { statusCode } from "../config/statusCode.config.js";
import StoreProductModel from "../models/product.store.model.js";
import StoreCartModel from "../models/store.cart.model.js";
import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js";
import StoreModel from "../models/store.models.js";

const StoreProductController = {
    async getStoreProducts(req, res) {
        const { skip = 0, take = 10, date, price, discount } = req.query;

        const filter = { status: true, ...(discount == "1" && { discountPrice: { $gt: 0 } }) };
        const sortOptions = {};
        if (date) sortOptions.createdAt = parseInt(date); // -1 (giảm dần) hoặc 1 (tăng dần)

        let [products, total] = await Promise.all([
            StoreProductModel.find(filter)
                .populate("productId")
                .populate({ path: "storeId", populate: "address" })
                .sort(sortOptions)
                .skip(parseInt(skip))
                .limit(parseInt(take)),
            StoreProductModel.countDocuments(filter),
        ]);

        if (price) {
            const sortOrder = parseInt(price); // -1 hoặc 1
            products = products.sort((a, b) => {
                return (a.productId.salePrice * (1 - a.discountPrice) - b.productId.salePrice * (1 - b.discountPrice)) * sortOrder;
            });
        }

        return res.status(statusCode.OK).json(
            BaseResponse.success("Lấy sản phẩm sale thành công", {
                products,
                total,
            })
        );
    },

    async getBestSeller(req, res) {
        const products = await StoreProductModel.find({ status: true })
            .populate("productId")
            .populate({ path: "storeId", populate: "address" })
            .sort({ sold: -1 })
            .skip(parseInt(0))
            .limit(parseInt(20));
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy sản phẩm bán chạy thành công", products));
    },

    async getStoreProductsByStore(req, res) {
        const { skip, take, type } = req.query;
        const products = await StoreProductModel.find({ storeId: req.user.store }).populate("productId").skip(skip).limit(take);
        const total = await StoreProductModel.countDocuments({ storeId: req.user.store });
        return res.status(statusCode.OK).json(
            BaseResponse.success("Lấy sản phẩm của cửa hàng thành công", {
                products,
                total,
            })
        );
    },

    async getStoreProduct(req, res) {
        const { storeProductId } = req.params;
        const product = await StoreProductModel.findById(storeProductId).populate("productId").populate("storeId");
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy thông tin sản phẩm thành công", product));
    },

    async getStoreProductsByCategory(req, res) {
        const { categoryId } = req.params;
        const { skip, take } = req.query;
        const storeProducts = await StoreProductModel.aggregate([
            {
                $lookup: {
                    from: "products", // Tên collection products
                    localField: "productId", // Trường tham chiếu trong storeProduct
                    foreignField: "_id", // Trường _id của product
                    as: "rootProduct", // Tên cho kết quả nối
                },
            },
            {
                $unwind: "$rootProduct", // Tách mảng rootProduct thành các object riêng biệt
            },
            {
                $lookup: {
                    from: "stores",
                    localField: "storeId",
                    foreignField: "_id",
                    as: "store",
                },
            },

            {
                $unwind: "$store",
            },
            {
                $match: {
                    "rootProduct.category": new mongoose.Types.ObjectId(categoryId), // Lọc theo category của Product
                },
            },
            {
                $skip: parseInt(skip), // Bỏ qua số tài liệu đã chỉ định
            },
            {
                $limit: parseInt(take), // Giới hạn số tài liệu trả về
            },
        ]);
        const category = await CategoryModel.findById(categoryId);
        return res.status(statusCode.OK).json(
            BaseResponse.success("Lấy sản phẩm theo danh mục thành công", {
                category,
                products: storeProducts,
                total: storeProducts.length,
            })
        );
    },

    async getStoreProductsByProduct(req, res) {
        const { productId } = req.params;
        const { skip, take } = req.query;
        const products = await StoreProductModel.find({ productId }).populate("productId").populate("storeId");
        const total = await StoreProductModel.countDocuments({ productId });
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy sản phẩm thành công", { products, total }));
    },

    async createStoreProducts(req, res) {
        const store = req.user.store;
        const storeCart = await StoreCartModel.find({ store });
        for (let item of storeCart) {
            const existingProduct = await StoreProductModel.findOne({ storeId: store, productId: item.product });
            if (existingProduct) {
                await StoreProductModel.findByIdAndUpdate(existingProduct._id, { $inc: { stock: item.quantity } });
            } else {
                const data = {
                    productId: item.product,
                    storeId: store,
                    stock: item.quantity,
                };
                const product = new StoreProductModel(data);
                await product.save();
            }
        }
        await StoreCartModel.deleteMany({ store });
        return res.status(statusCode.OK).json(BaseResponse.success("Thêm sản phẩm cửa hàng thành công", null));
    },

    async searchCustomer(req, res) {
        const { keyword, skip, take, date, price, discount } = req.query;
        const products = await ProductModel.find({ name: { $regex: keyword, $options: "i" } });
        const productIds = products.map((product) => product._id);

        // Xây dựng bộ lọc cho StoreProduct
        const storeProductFilter = {
            productId: { $in: productIds },
        };
        if (parseInt(discount) === 1) {
            storeProductFilter.discountPrice = { $gt: 0 };
        }
        let storeProducts = await StoreProductModel.find(storeProductFilter)
            .populate("productId")
            .populate("storeId")
            .sort({ createdAt: parseInt(date) })
            .skip(parseInt(skip))
            .limit(parseInt(take));
        const total = await StoreProductModel.countDocuments(storeProductFilter);
        if (price) {
            const sortOrder = parseInt(price); // -1 hoặc 1
            storeProducts = storeProducts.sort((a, b) => {
                return (a.productId.salePrice * (1 - a.discountPrice) - b.productId.salePrice * (1 - b.discountPrice)) * sortOrder;
            });
        }

        //search category
        let categories = await CategoryModel.find({ name: { $regex: keyword, $options: "i" } })
            .sort({ createdAt: parseInt(date) })
            .skip(parseInt(skip))
            .limit(parseInt(take));

        //search store
        let stores = await StoreModel.find({ name: { $regex: keyword, $options: "i" } })
            .sort({ createdAt: parseInt(date) })
            .skip(parseInt(skip))
            .limit(parseInt(take));

        return res.status(statusCode.OK).json(
            BaseResponse.success("Tìm sản phẩm thành công", {
                product: { products: storeProducts, total },
                categories,
                stores,
            })
        );
    },

    async updateStoreProduct(req, res) {
        const { storeProductId } = req.params;
        const storeProduct = await StoreProductModel.findByIdAndUpdate(storeProductId, req.body, { new: true }).populate("productId");
        return res.status(statusCode.OK).json(BaseResponse.success("Cập nhật sản phẩm thành công", storeProduct));
    },
};

export default StoreProductController;
