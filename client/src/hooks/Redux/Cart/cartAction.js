import { createAsyncThunk } from "@reduxjs/toolkit";
import { tryCatchWrapper } from "../../../utils/asyncHelper";
import {
    addProductToStoreCartApi,
    getStoreCartItemsApi,
    deleteStoreCartItemApi,
    adjustmentStoreCartItemApi,
} from "../../../apis/store.cart";
import {
    adjustmentCartItemApi,
    createCartItemApi,
    deleteCartItemApi,
    getCartItemsApi,
} from "../../../apis/cart.api";

//*********** customer ***********
export const createCartItemAction = createAsyncThunk(
    "cart/createCartItemAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(
            createCartItemApi,
            data
        );
        if (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
        return result.data;
    }
);

export const getCartItemsAction = createAsyncThunk(
    "cart/getCartItemsAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(getCartItemsApi, data);
        if (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
        return result.data;
    }
);

export const adjustmentCartItemAction = createAsyncThunk(
    "cart/adjustmentCartItemAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(
            adjustmentCartItemApi,
            data
        );
        if (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
        return result.data;
    }
);

export const deleteCartItemAction = createAsyncThunk(
    "cart/deleteCartItemAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(
            deleteCartItemApi,
            data
        );
        if (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
        return result.data;
    }
);

//*********** store ***********
export const addProductToStoreCartAction = createAsyncThunk(
    "cart/addProductToStoreCartAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(
            addProductToStoreCartApi,
            data
        );
        if (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
        return result.data;
    }
);

export const deleteStoreCartItemAction = createAsyncThunk(
    "cart/deleteStoreCartItemAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(
            deleteStoreCartItemApi,
            data
        );
        if (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
        return result.data;
    }
);

export const adjustmentStoreCartItemAction = createAsyncThunk(
    "cart/adjustmentStoreCartItemAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(
            adjustmentStoreCartItemApi,
            data
        );
        if (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
        return result.data;
    }
);

export const getStoreCartItemsAction = createAsyncThunk(
    "cart/getStoreCartItemsAction",
    async (_, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(getStoreCartItemsApi);
        if (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
        return result.data;
    }
);
