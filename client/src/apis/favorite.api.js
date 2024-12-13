import { apiClient } from "./config.api";
import { StoreFavoriteV1, FavoriteV1 } from "../constants/endpoints.const";

//******** customer ********
export const addFavoriteStoreProductApi = async (storeProductId) => {
    const result = await apiClient.post(`${FavoriteV1.ADD_STORE_PRODUCT}${storeProductId}/add`);
    return result.data;
};

export const getFavoriteStoreProductsApi = async (params) => {
    const result = await apiClient.get(FavoriteV1.GET_FAVORITE_STORE_PRODUCT, { params });
    return result.data;
};

export const deleteFavoriteStoreProductsApi = async (storeProductId) => {
    const result = await apiClient.delete(FavoriteV1.DELETE_FAVORITE_STORE_PRODUCT + storeProductId);
    return result.data;
};

//******** store ************
export const getStoreFavoriteItemsApi = async () => {
    const result = await apiClient.get(StoreFavoriteV1.GET_ITEMS);
    return result.data;
};

export const modifyStoreFavoriteItemApi = async (data) => {
    const result = await apiClient.post(`${StoreFavoriteV1.MODIFY}${data}/modify`);
    return result.data;
};

export const removeFavoriteProductApi = async (data) => {
    const result = await apiClient.patch(FavoriteV1.REMOVE_PRODUCT + data);
    return result.data;
};
