import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createBannerApi,
    getBannersByCurrentUser,
    getBannersApi,
    deleteBannerApi,
    updateBannerApi,
} from "../../../apis/banner.api";
import { tryCatchWrapper } from "../../../utils/asyncHelper";

export const getBannersByCurrentUserAction = createAsyncThunk(
    "banner/getBannersByCurrentUserAction",
    async () => {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        const result = await getBannersByCurrentUser();
        return result;
    }
);

export const getBannersAction = createAsyncThunk(
    "banner/getBannersAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(getBannersApi, data);
        if (error) {
            return thunkAPI.rejectWithValue(error);
        }
        return result.data;
    }
);

export const createBannerAction = createAsyncThunk(
    "banner/createBannerAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(createBannerApi, data);
        if (error) {
            return thunkAPI.rejectWithValue(error);
        }
        return result.data;
    }
);

export const updateBannerAction = createAsyncThunk(
    "banner/updateBannerAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(updateBannerApi, data);
        if (error) {
            return thunkAPI.rejectWithValue(error);
        }
        return result.data;
    }
);

export const deleteBannerAction = createAsyncThunk(
    "banner/deleteBannerAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(deleteBannerApi, data);
        if (error) {
            return thunkAPI.rejectWithValue(error);
        }
        return result.data;
    }
);
