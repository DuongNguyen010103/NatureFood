import mongoose from "mongoose";

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

const BannerSchema = new Schema(
    {
        image: ImageSchema,
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        exprired: {
            type: Boolean,
            default: false,
        },
        url: {
            type: String,
            required: true,
        },
        status: {
            type: Number,
            enum: [0, 1],
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const BannerModel = mongoose.model("Banner", BannerSchema);
export default BannerModel;
