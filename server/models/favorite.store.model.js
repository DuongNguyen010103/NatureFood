import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StoreFavoriteSchema = new Schema({
    store: {
        type: Schema.Types.ObjectId,
        ref: "Store",
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
});
const StoreFavoriteModel = mongoose.model("StoreFavorite", StoreFavoriteSchema);

export default StoreFavoriteModel;
