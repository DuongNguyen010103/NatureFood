import { apiClient } from "./config.api";
import { BlogV1 } from "../constants/endpoints.const";

export const getBlogsApi = async (params) => {
    const result = await apiClient.get(BlogV1.GET_BLOGS, { params });
    return result.data;
};

export const getBlogApi = async (data) => {
    const result = await apiClient.get(BlogV1.GET_BLOG + data);
    return result.data;
};

export const createBlogApi = async (data) => {
    const result = await apiClient.post(BlogV1.CREATE, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return result.data;
};
