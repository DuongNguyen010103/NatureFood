import { createAsyncThunk } from "@reduxjs/toolkit";
import { tryCatchWrapper } from "../../../utils/asyncHelper";
import {
    createCustomerOrderApi,
    getCustomerOrderApi,
    getCustomerOrdersApi,
    getCustomerOrdersMyStoreApi,
    updateCustomerOrderApi,
} from "../../../apis/order";

export const getCustomerOrderAction = createAsyncThunk("order/getCustomerOrderAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getCustomerOrderApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
    return result.data;
});

export const getCustomerOrdersAction = createAsyncThunk("order/getCustomerOrdersAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getCustomerOrdersApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
    return result.data;
});

export const getCustomerOrdersMyStoreAction = createAsyncThunk("order/getCustomerOrdersMyStoreAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getCustomerOrdersMyStoreApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
    return result.data;
});

export const createCustomerOrderAction = createAsyncThunk("order/createCustomerOrderAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(createCustomerOrderApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
    return result.data;
});

export const updateCustomerOrderAction = createAsyncThunk("order/updateCustomerOrderAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(updateCustomerOrderApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
    return result.data;
});
