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

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            min: 5,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
            min: 5,
        },
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
        image: ImageSchema,
        status: {
            type: Number,
            enum: [0, 1],
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

const BlogModel = mongoose.model("Blog", BlogSchema);

export default BlogModel;
