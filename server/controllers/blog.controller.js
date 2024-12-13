import { statusCode } from "../config/statusCode.config.js";
import { BaseResponse } from "../config/BaseResponse.config.js";
import BlogModel from "../models/blog.model.js";

const BlogController = {
    async getBlogs(req, res) {
        const { skip = 0, take = 10, type = "enable", date = -1 } = req.query;
        const filter = { status: type == "enable" ? true : false };
        const sorts = { createdAt: parseInt(date) };
        const [blogs, total] = await Promise.all([BlogModel.find(filter).sort(sorts).skip(skip).limit(take), BlogModel.countDocuments(filter)]);

        return res.status(statusCode.OK).json(
            BaseResponse.success("Lấy danh sách bài viết thành công", {
                blogs,
                total,
            })
        );
    },

    async getBlog(req, res) {
        const { slug } = req.params;
        const blog = await BlogModel.findOne({ slug });
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy Blog thành công", blog));
    },

    async createBlog(req, res) {
        const blog = new BlogModel(req.body);
        blog.image = { url: req.file.path, filename: req.file.filename };
        const newBlog = await blog.save();
        return res.status(statusCode.OK).json(BaseResponse.success("Tạo Blog thành công", newBlog));
    },
};

export default BlogController;
