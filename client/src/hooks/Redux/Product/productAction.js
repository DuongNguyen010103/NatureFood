import { createProductApi, getNewestProducts, getProductsApi } from "../../../apis/product.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { tryCatchWrapper } from "../../../utils/asyncHelper";

//getProducts
export const getProductsAction = createAsyncThunk("product/getProductsAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getProductsApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

//create product
export const createProductAction = createAsyncThunk("product/createProductAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(createProductApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

// newest product
export const getNewestProductsAction = createAsyncThunk("newestProducts/getNewestProductsAction", async () => {
    const result = await getNewestProducts();
    return result;
});
