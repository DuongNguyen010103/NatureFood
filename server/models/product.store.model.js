import mongoose from "mongoose";
import ReviewModel from "../models/review.model.js";
import CartModel from "./cart.model.js";
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
});

const StoreProductSchema = mongoose.Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        storeId: {
            type: Schema.Types.ObjectId,
            ref: "Store",
            require: true,
        },
        discountPrice: {
            type: Number,
            default: 0,
            min: 0.0,
            max: 0.99,
        },
        stock: Number,
        status: {
            type: Boolean,
            default: true,
        },
        sold: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

//xóa liên quan đến sản phẩm (reviews)
StoreProductSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await CartModel.deleteMany({ productId: _id });
    }
});

const StoreProductModel = mongoose.model("StoreProduct", StoreProductSchema);
export default StoreProductModel;
