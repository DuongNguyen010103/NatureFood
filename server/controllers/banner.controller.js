import { statusCode } from "../config/statusCode.config.js";
import { BaseResponse } from "../config/BaseResponse.config.js";
import BannerModel from "../models/banner.model.js";

const BannerController = {
    async getBannersByCurrentUser(req, res) {
        const banners = await BannerModel.find({ storeId: req.user.store });
        return res
            .status(statusCode.OK)
            .json(BaseResponse.success("Lấy banners thành công", banners));
    },

    async getBanners(req, res) {
        const { skip, take, type } = req.query;
        let banners = null;
        let total = 0;
        if (type == "disable") {
            banners = await BannerModel.find({ status: 1 })
                .skip(skip)
                .limit(take);
            total = await BannerModel.countDocuments({ status: 1 });
        } else if (type == "enable") {
            banners = await BannerModel.find({ status: 0 })
                .skip(skip)
                .limit(take);
            total = await BannerModel.countDocuments({ status: 0 });
        } else {
            banners = await BannerModel.find().skip(skip).limit(take);
            total = await BannerModel.countDocuments();
        }
        return res.status(statusCode.OK).json(
            BaseResponse.success("Lấy banners thành công", {
                banners,
                total,
            })
        );
    },

    async create(req, res) {
        const banner = new BannerModel(req.body);
        banner.image = { url: req.file.path, filename: req.file.filename };
        const newBanner = await banner.save();
        return res
            .status(statusCode.CREATED)
            .json(BaseResponse.success("Tạo mới banner thành công", newBanner));
    },

    async updateBanner(req, res) {
        const banner = await BannerModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res
            .status(statusCode.OK)
            .json(BaseResponse.success("Cập nhật banner thành công", banner));
    },

    async deleteBanner(req, res) {
        const banner = await BannerModel.findByIdAndDelete(req.params.id);
        return res
            .status(statusCode.OK)
            .json(BaseResponse.success("Đã xóa banner", banner));
    },
};

export default BannerController;
