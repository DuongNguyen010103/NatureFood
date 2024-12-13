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

const CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: ImageSchema,
    },
    {
        timestamps: true,
    }
);

// CategorySchema.pre('save', function(next){
//     this.updateAt = new Date();
//     next();
// });

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
