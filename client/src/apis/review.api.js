import { ReviewV1 } from "../constants/endpoints.const";
import { apiClient } from "./config.api";

export const getReviewsApi = async (data) => {
    const response = await apiClient.get(ReviewV1.GET_ALL + data.storeProductId + "/all", {
        params: data.params,
    });
    return response.data;
};

export const createReviewApi = async (data) => {
    const response = await apiClient.post(ReviewV1.CREATE + data.storeProductId, data);
    return response.data;
};

export const updateReviewApi = async (data) => {
    const response = await apiClient.patch(ReviewV1.UPDATE + data.reviewId, data);
    return response.data;
};

export const deleteReviewApi = async (reviewId) => {
    const response = await apiClient.delete(ReviewV1.DELETE + reviewId);
    return response.data;
};

export const getReviewsByStoreApi = async (params) => {
    const response = await apiClient.get(ReviewV1.GET_REVIEWS_BY_STORE, { params });
    return response.data;
};
