import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },
        products: [
            {
                storeProduct: {
                    type: Schema.Types.ObjectId,
                    ref: "StoreProduct",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, "Quantity can not be less than 1."],
                    default: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5],
            default: 0,
        },
        paymentMethod: {
            type: Number,
            enum: [0, 1, 2, 3],
            required: true,
        },
        deliveryMethod: {
            type: Number,
            enum: [0, 1, 2, 3],
            required: true,
        },
        delivery: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
