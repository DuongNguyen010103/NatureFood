import mongoose from "mongoose";
import { BaseResponse } from "../config/BaseResponse.config.js";
import { statusCode } from "../config/statusCode.config.js";
import AddressModel from "../models/address.model.js";
import CartModel from "../models/cart.model.js";
import StoreProductModel from "../models/product.store.model.js";
import StoreCartModel from "../models/store.cart.model.js";
import StoreModel from "../models/store.models.js";
import UserModel from "../models/user.model.js";

const StoreControllers = {
    async getCurrentStore(req, res) {
        const store = await StoreModel.findOne({ owner: req.user._id });
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy thông tin cửa hàng thành công", store));
    },

    async createStore(req, res) {
        //create address
        const { city, district, street, ward } = req.body;
        const address = new AddressModel({ city, district, street, ward });
        const newAddress = await address.save();

        //create store
        const store = new StoreModel(req.body);
        store.owner = req.user._id;
        store.image = { url: req.file.path, filename: req.file.filename };
        store.address = newAddress._id;
        const newStore = await store.save();

        //link store to user
        const user = await UserModel.findById(req.user._id);
        user.store = newStore._id;
        user.role = "seller";
        await user.save();
        return res.status(statusCode.CREATED).json(BaseResponse.success("Tạo cửa hàng thành công", newStore));
    },

    async getStoreById(req, res) {
        const { skip, take } = req.query;
        const { storeId } = req.params;
        const store = await StoreModel.findById(storeId).populate("address");
        if (store === null) {
            throw new Error("Không tìm thấy cửa hàng");
        }
        const products = await StoreProductModel.find({ storeId: new mongoose.Types.ObjectId(storeId) })
            .populate("productId")
            .populate("storeId")
            .skip(skip)
            .limit(take);
        const total = await StoreProductModel.countDocuments({ storeId: new mongoose.Types.ObjectId(storeId) });
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy thông tin cửa hàng thành công", { store, product: { products, total } }));
    },

    async updateStoreStatus(req, res) {
        const updatedStore = await StoreModel.findByIdAndUpdate(req.body.storeId, req.body, { new: true });
        return res.status(statusCode.OK).json(BaseResponse.success("Cập nhật trạng thái cửa hàng thành công", updatedStore));
    },
};

export default StoreControllers;
