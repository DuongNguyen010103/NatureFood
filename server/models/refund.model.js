import mongoose from "mongoose";
const { Schema } = mongoose;

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

const RefundSchema = new Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        images: [ImageSchema],
        status: {
            type: Number,
            enum: [0, 1, 2, 3],
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Tạo model
const RefundModel = mongoose.model("Refund", RefundSchema);
export default RefundModel;
