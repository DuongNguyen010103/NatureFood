import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createStoreApi,
    getCurrentStoreApi,
    getStoreById,
} from "../../../apis/store.api";
import { tryCatchWrapper } from "../../../utils/asyncHelper";

export const getStoreByIdAction = createAsyncThunk(
    "store/getStoreByIdAction",
    async (storeId) => {
        const result = await getStoreById(storeId);
        return result;
    }
);

export const getCurrentStoreAction = createAsyncThunk(
    "store/getCurrentStoreAction",
    async (_, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(getCurrentStoreApi);
        if (error) {
            return thunkAPI.rejectWithValue(error);
        }
        return result.data;
    }
);

export const createStoreAction = createAsyncThunk(
    "store/createStoreAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(createStoreApi, data);
        if (error) {
            return thunkAPI.rejectWithValue(error);
        }
        return result.data;
    }
);
