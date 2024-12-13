import { statusCode } from "../config/statusCode.config.js";
import { BaseResponse } from "../config/BaseResponse.config.js";
import RefundModel from "../models/refund.model.js";

const RefundController = {
    async createRefund(req, res) {
        const refund = new RefundModel(req.body);
        refund.userId = req.user._id;
        refund.images = req.files.map((f) => ({
            url: f.path,
            filename: f.filename,
        }));
        const newRefund = await refund.save();
        return res
            .status(statusCode.OK)
            .json(
                BaseResponse.success(
                    "Đã tạo yêu cầu hoàn trả thành công",
                    newRefund
                )
            );
    },

    async updateRefund(req, res) {
        const { id } = req.params;
        const refund = await RefundModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        return res
            .status(statusCode.OK)
            .json(BaseResponse.success("Đã cập nhật yêu cầu hoàn trả", refund));
    },
};

export default RefundController;
