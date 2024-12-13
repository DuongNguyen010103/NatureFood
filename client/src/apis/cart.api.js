import { CartV1 } from "../constants/endpoints.const";
import { apiClient } from "./config.api";

export const createCartItemApi = async (data) => {
    const response = await apiClient.post(CartV1.CREATE, data);
    return response.data;
};

export const getCartItemsApi = async (params) => {
    const response = await apiClient.get(CartV1.GET_ALL, { params });
    return response.data;
};

export const adjustmentCartItemApi = async (data) => {
    const response = await apiClient.patch(CartV1.UPDATE_ITEM + data.id, {
        quantity: data.quantity,
    });
    return response.data;
};

export const deleteCartItemApi = async (cartId) => {
    const response = await apiClient.delete(CartV1.DELETE + cartId);
    return response.data;
};
