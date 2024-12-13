import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BillSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    require: true,
                },
                quantity: {
                    type: String,
                    require: true,
                    min: 1,
                },
            },
        ],
        total: {
            type: String,
            required: true,
            min: 1,
        },
        paymentMethod: {
            type: String,
            enum: ["momo", "cash", "vnpay"],
        },
        status: {
            type: String,
            enum: ["", "delivering"],
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
const BillModel = mongoose.model("Bill", BillSchema);

export default BillModel;
