import { StoreV1 } from "../constants/endpoints.const";
import { apiClient } from "./config.api";

export const getStoreById = async (data) => {
    const response = await apiClient.get(StoreV1.STORE_GET_STORE_BY_ID + data.storeId, { params: data.params });
    return response.data;
};

export const getCurrentStoreApi = async () => {
    const response = await apiClient.get(StoreV1.GET_CURRENT);
    return response.data;
};

export const createStoreApi = async (data) => {
    const response = await apiClient.post(StoreV1.STORE_CREATE, data.data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
