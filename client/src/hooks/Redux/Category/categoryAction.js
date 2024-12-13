import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createCategoryApi,
    deleteCategoryApi,
    getCategoriesApi,
} from "../../../apis/category.api";
import { tryCatchWrapper } from "../../../utils/asyncHelper";

export const getCategoriesAction = createAsyncThunk(
    "category/getCategoriesAction",
    async (_, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(getCategoriesApi);
        if (error) {
            return thunkAPI.rejectWithValue(error);
        }
        return result.data;
    }
);

export const createCategoryAction = createAsyncThunk(
    "category/createCategoryAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(
            createCategoryApi,
            data
        );
        if (error) {
            return thunkAPI.rejectWithValue(error);
        }
        return result.data;
    }
);

export const deleteCategoryAction = createAsyncThunk(
    "category/deleteCategoryAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(
            deleteCategoryApi,
            data
        );
        if (error) {
            return thunkAPI.rejectWithValue(error);
        }
        return result.data;
    }
);
