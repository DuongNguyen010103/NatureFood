import ProductModel from "../models/product.model.js";
import { statusCode } from "../config/statusCode.config.js";
import { BaseResponse } from "../config/BaseResponse.config.js";
import { cloudinary } from "../config/cloudinary.config.js";
import StoreFavoriteModel from "../models/favorite.store.model.js";

const ProductController = {
    async getAllProduct(req, res) {
        const { skip, take, type } = req.query;
        const skipNumber = parseInt(skip) || 0;
        const takeNumber = parseInt(take) || 10;

        let products = null;
        let total = 0;
        if (type == "all") {
            products = await ProductModel.find({}).populate("category").skip(skipNumber).limit(takeNumber);
            total = await ProductModel.countDocuments({});
        } else if (type == "favorite") {
            const store = req.user.store;
            products = await StoreFavoriteModel.find({ store });
            total = await StoreFavoriteModel.countDocuments({ store });
        }
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy sản phẩm thành công", { products, total }));
    },

    async getProductById(req, res) {
        const product = await ProductModel.findById(req.params.id)
            .populate("store")
            .populate({
                path: "reviews",
                populate: { path: "author" },
                options: { sort: { createdAt: -1 } },
            });
        if (product) {
            return res.status(statusCode.OK).json(BaseResponse.success("Lấy sản phẩm thành công", product));
        } else {
            throw new Error("Không tìm thấy sản phẩm");
        }
    },

    async getProductByCategory(req, res) {
        try {
            const { idCategory } = req.params;
            const product = await ProductModel.find({ category: idCategory });
            if (product) {
                return res.status(statusCode.OK).json(BaseResponse.success("Lấy sản phẩm thành công", product));
            } else {
                return res.status(statusCode.NOT_FOUND).json(BaseResponse.success("Không tìm thấy sản phẩm", product));
            }
        } catch (error) {
            console.log(`get product by category: ${error}`);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
        }
    },

    async getNewestProduct(req, res) {
        const products = await ProductModel.find().sort({ createdAt: -1 }).limit(10);
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy sản phẩm thành công", products));
    },

    async createProduct(req, res) {
        const product = new ProductModel(req.body);
        product.images = req.files.map((f) => ({
            url: f.path,
            filename: f.filename,
        }));
        const newProduct = await product.save();
        return res.status(statusCode.CREATED).json(BaseResponse.success("Tạo mới sản phẩm thành công", newProduct));
    },

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            return res.status(statusCode.OK).json(BaseResponse.success("Cập nhật sản phẩm thành công", product));
        } catch (error) {
            console.log(`Update product: ${error}`);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
        }
    },

    async addImagesProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductModel.findById(id);
            const imgs = req.files.map((f) => ({
                url: f.path,
                filename: f.filename,
            }));
            product.images.push(...imgs);
            await product.save();
            return res.status(statusCode.OK).json(BaseResponse.success("Thêm ảnh vào sản phẩm thành công", product));
        } catch (error) {
            console.log(`Add images product: ${error}`);
            req.files.forEach(async (img) => await cloudinary.uploader.destroy(img.filename));
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
        }
    },

    async deleteImageProduct(req, res) {
        try {
            const { id, idImage } = req.params;
            const product = await ProductModel.findById(id);
            let filename = "";
            for (let img of product.images) {
                if (img.id === idImage) {
                    filename = img.filename;
                    break;
                }
            }
            console.log("filename: ", filename);
            const newProduct = await product.updateOne({ $pull: { images: { filename: filename } } }, { new: true });
            await cloudinary.uploader.destroy(filename);
            return res.status(statusCode.OK).json(BaseResponse.success("Xóa ảnh sản phẩm thành công", newProduct));
        } catch (error) {
            console.log(`Delete image product: ${error}`);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
        }
    },

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductModel.findById(id);
            product.images.forEach(async (img) => await cloudinary.uploader.destroy(img.filename));
            const deleted = await ProductModel.findByIdAndDelete(id);
            return res.status(statusCode.OK).json(BaseResponse.success("Xóa sản phẩm thành công", deleted));
        } catch (error) {
            console.log(`Delete product: ${error}`);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
        }
    },
};

export default ProductController;
