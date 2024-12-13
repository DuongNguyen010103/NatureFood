import { createAsyncThunk } from "@reduxjs/toolkit";
import { tryCatchWrapper } from "../../../utils/asyncHelper";
import {
    addFavoriteStoreProductApi,
    getFavoriteStoreProductsApi,
    deleteFavoriteStoreProductsApi,
    modifyStoreFavoriteItemApi,
    getStoreFavoriteItemsApi,
} from "../../../apis/favorite.api";

//*********** customer ************
export const addFavoriteStoreProductAction = createAsyncThunk("user/addFavoriteStoreProductAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(addFavoriteStoreProductApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
    return result.data;
});

export const getFavoriteStoreProductsAction = createAsyncThunk("user/getFavoriteStoreProductsAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getFavoriteStoreProductsApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
    return result.data;
});

export const deleteFavoriteStoreProductAction = createAsyncThunk("user/deleteFavoriteStoreProductAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(deleteFavoriteStoreProductsApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
    return result.data;
});

//*********** store ************
export const getStoreFavoriteItemsAction = createAsyncThunk("user/getStoreFavoriteItemsAction", async (_, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getStoreFavoriteItemsApi);
    if (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
    return result.data;
});

export const modifyStoreFavoriteItemAction = createAsyncThunk("user/modifyStoreFavoriteItemAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(modifyStoreFavoriteItemApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
    return result.data;
});
