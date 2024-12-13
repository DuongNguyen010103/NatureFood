import { createAsyncThunk } from "@reduxjs/toolkit";
import { tryCatchWrapper } from "../../../utils/asyncHelper";
import { createBlogApi, getBlogsApi } from "../../../apis/blog.api";

export const getBlogsAction = createAsyncThunk(
    "blog/getBlogsAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(getBlogsApi, data);
        if (error) {
            return thunkAPI.rejectWithValue(error);
        }
        return result.data;
    }
);

export const createBlogAction = createAsyncThunk(
    "blog/createBlogAction",
    async (data, thunkAPI) => {
        const { result, error } = await tryCatchWrapper(createBlogApi, data);
        if (error) {
            return thunkAPI.rejectWithValue(error);
        }
        return result.data;
    }
);
