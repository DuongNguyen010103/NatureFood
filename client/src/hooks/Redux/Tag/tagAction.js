import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTags } from "../../../apis/tag.api";
import { tryCatchWrapper } from "../../../utils/asyncHelper";

export const getTagsAction = createAsyncThunk("category/getTagsAction", async (_, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getTags);
    if (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
    return result.data;
});
