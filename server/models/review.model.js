import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = Schema(
    {
        storeProduct: {
            type: Schema.Types.ObjectId,
            ref: "StoreProduct",
            required: true,
        },
        body: String,
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        feedback: String,
    },
    {
        timestamps: true,
    }
);

const ReviewModel = mongoose.model("Review", ReviewSchema);
export default ReviewModel;
