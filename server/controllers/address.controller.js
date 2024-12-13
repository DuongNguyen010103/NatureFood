import AddressModel from "../models/address.model.js";
import { statusCode } from "../config/statusCode.config.js";
import { BaseResponse } from "../config/BaseResponse.config.js";

const AddressController = {
    async updateAddress(req, res) {
        const address = await AddressModel.findByIdAndUpdate(req.body, {
            new: true,
        });
        return res
            .status(statusCode.OK)
            .json(BaseResponse.success("Cập nhật địa chỉ thành công", address));
    },
};

export default AddressController;
