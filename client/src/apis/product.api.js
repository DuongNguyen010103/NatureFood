import { ProductV1, StoreProductV1 } from "../constants/endpoints.const";
import { apiClient } from "./config.api";

export const getNewestProducts = async () => {
    const products = await apiClient.get(ProductV1.PRODUCT_NEWEST);
    return products.data;
};

export const getProductsApi = async (params) => {
    const response = await apiClient.get(ProductV1.GET_PRODUCTS, { params });
    return response.data;
};

export const getProductApi = async (productId) => {
    const response = await apiClient.get(ProductV1.GET_PRODUCT + productId);
    return response.data;
};

export const createProductApi = async (data) => {
    const response = await apiClient.post(ProductV1.PRODUCT_CREATE, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const createStoreProductsApi = async () => {
    const response = await apiClient.post(StoreProductV1.CREATE);
    return response.data;
};
