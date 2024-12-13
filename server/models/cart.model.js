import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    storeProduct: {
        type: Schema.Types.ObjectId,
        ref: "StoreProduct",
        required: true,
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0,
    },
});

const CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;
