import { apiClient } from "./config.api";
import { BannerV1 } from "../constants/endpoints.const";

export const getBannersByCurrentUser = async () => {
    const result = await apiClient.get(BannerV1.BANNER_GET_BY_CURRENT_USER);
    return result.data;
};

export const getBannersApi = async (params) => {
    const result = await apiClient.get(BannerV1.GET_BANNERS, { params });
    return result.data;
};

export const createBannerApi = async (data) => {
    const result = await apiClient.post(BannerV1.CREATE, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return result.data;
};

export const updateBannerApi = async (data) => {
    const result = await apiClient.patch(BannerV1.UPDATE + data.id, data.data);
    return result.data;
};

export const deleteBannerApi = async (data) => {
    const result = await apiClient.delete(BannerV1.DELETE + data);
    return result.data;
};
