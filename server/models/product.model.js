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

const ProductSchema = mongoose.Schema(
    {
        name: String,
        price: Number,
        salePrice: Number,
        description: String,
        weight: Number,
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        inventory: Number,
        images: [ImageSchema],
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
