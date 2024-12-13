import { createAsyncThunk } from "@reduxjs/toolkit";
import { tryCatchWrapper } from "../../../utils/asyncHelper";
import { createStoreProductsApi } from "../../../apis/product.api";
import {
    getBestSellerApi,
    getStoreProductsApi,
    getStoreProductsByStoreApi,
    searchCustomerApi,
    updateStoreProductApi,
} from "../../../apis/product.store";

//get store Products
export const getStoreProductsAction = createAsyncThunk("storeProduct/getStoreProductsAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getStoreProductsApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

export const getBestSellerAction = createAsyncThunk("storeProduct/getBestSellerAction", async (_, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getBestSellerApi);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

export const getStoreProductsByStoreAction = createAsyncThunk("storeProduct/getStoreProductsByStoreAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getStoreProductsByStoreApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

export const createStoreProductsAction = createAsyncThunk("storeProduct/createStoreProductsAction", async (_, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(createStoreProductsApi);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

export const searchCustomerAction = createAsyncThunk("storeProduct/searchCustomerAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(searchCustomerApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

export const updateStoreProductAction = createAsyncThunk("storeProduct/updateStoreProductAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(updateStoreProductApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});
