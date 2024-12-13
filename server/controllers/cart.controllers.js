import { BaseResponse } from "../config/BaseResponse.config.js";
import { statusCode } from "../config/statusCode.config.js";
import CartModel from "../models/cart.model.js";

const CartController = {
    async getCartItems(req, res) {
        const { skip, take } = req.query;
        const products = await CartModel.find({ user: req.user._id })
            .populate({
                path: "storeProduct",
                populate: "productId",
            })
            .skip(skip)
            .limit(take);
        const total = await CartModel.countDocuments({ user: req.user._id });
        return res.status(statusCode.OK).json(
            BaseResponse.success("Lấy giỏ hàng thành công", {
                products,
                total,
            })
        );
    },

    async createCartItem(req, res) {
        const userId = req.user._id;
        const { storeProduct, quantity } = req.body;
        const existCart = await CartModel.findOne({
            user: userId,
            storeProduct: storeProduct,
        });

        let newCart = null;
        if (existCart) {
            existCart.quantity += quantity;
            newCart = await existCart.save();
        } else {
            const cart = new CartModel({
                user: userId,
                storeProduct: storeProduct,
                quantity: quantity,
            });
            newCart = await cart.save();
        }
        newCart = await CartModel.findById(newCart._id).populate({ path: "storeProduct", populate: "productId" });
        return res.status(statusCode.OK).json(BaseResponse.success("Thêm vào giỏ hàng thành công", newCart));
    },

    async adjustmentCartItem(req, res) {
        const { id } = req.params;
        const { quantity } = req.body;
        const cart = await CartModel.findByIdAndUpdate(id, { $inc: { quantity } }, { new: true }).populate({
            path: "storeProduct",
            populate: "productId",
        });
        return res.status(statusCode.OK).json(BaseResponse.success("Cập nhật giỏ hàng thành công", cart));
    },

    async deleteCartItem(req, res) {
        const item = await CartModel.findByIdAndDelete(req.params.id);
        return res.status(statusCode.OK).json(BaseResponse.success("Xóa khỏi giỏ hàng thành công", item));
    },
};

export default CartController;
