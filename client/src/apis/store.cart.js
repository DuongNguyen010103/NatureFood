import { StoreCartV1 } from "../constants/endpoints.const";
import { apiClient } from "./config.api";

export const addProductToStoreCartApi = async (data) => {
    const response = await apiClient.post(`${StoreCartV1.ADD}${data.productId}/create`, data);
    return response.data;
};

export const adjustmentStoreCartItemApi = async (data) => {
    const response = await apiClient.patch(`${StoreCartV1.ADJUSTMENT_ITEM}${data.id}/adjustment`, data);
    return response.data;
};

export const getStoreCartItemsApi = async () => {
    const response = await apiClient.get(StoreCartV1.GET_STORE_CART);
    return response.data;
};

export const deleteStoreCartItemApi = async (storeCartId) => {
    const response = await apiClient.delete(`${StoreCartV1.DELETE}${storeCartId}`);
    return response.data;
};
