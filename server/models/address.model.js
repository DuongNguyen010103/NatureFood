import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AddressSchema = new Schema(
    {
        city: {
            type: String,
            min: 2,
            required: true,
        },
        district: {
            type: String,
            min: 2,
            required: true,
        },
        ward: {
            type: String,
            min: 2,
            required: true,
        },
        street: {
            type: String,
            min: 2,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const AddressModel = mongoose.model("Address", AddressSchema);
export default AddressModel;
