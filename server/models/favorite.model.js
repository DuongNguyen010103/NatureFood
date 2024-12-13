import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
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
});
const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);

export default FavoriteModel;
