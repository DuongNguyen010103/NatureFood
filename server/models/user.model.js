import express from "express";
import mongoose from "mongoose";
//
import validator from "validator";
import uniqueValidator from "mongoose-unique-validator";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

//
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

const deliverySchema = new Schema({
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

const OtpSChema = new Schema({
    OTP: { type: String },
    createdAt: { type: Date, default: Date.now },
    // createdAt: { type: Date, default: Date.now, expires: "1m" },
});

const UserSchema = Schema(
    {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email address`,
            },
            required: true,
        },
        username: {
            type: String,
            required: [true, "UserName is required!"],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
            trim: true,
            validate: {
                validator(password) {
                    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password);
                },
                message: "{VALUE} is not a valid password!",
            },
        },
        phone: {
            type: String,
        },
        gender: {
            type: Number,
            enum: [0, 1, 2],
            default: 0,
        },
        birthday: {
            type: Date,
        },
        image: ImageSchema,
        role: {
            type: String,
            enum: ["admin", "seller", "user"],
            default: "user",
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: "Store",
        },
        emailVerify: {
            type: Boolean,
            default: false,
        },
        status: {
            type: Number,
            enum: [0, 1],
            default: 0,
        },
        delivery: [deliverySchema],
        OTP: String,
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", function (next) {
    this.updateAt = new Date();
    next();
});

//passport
UserSchema.plugin(uniqueValidator, {
    message: "{VALUE} already taken!",
});

UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        this.password = this._hashPassword(this.password);
    }
    return next();
});

UserSchema.methods = {
    _hashPassword(password) {
        return hashSync(password, 10);
    },

    authenticateUser(password) {
        return compareSync(password, this.password);
    },

    createToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            "thisisasecret"
        );
    },

    // toJSON() {
    //     return {
    //         data: this._doc,
    //         token: this.createToken(),
    //     };
    // },
};

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
