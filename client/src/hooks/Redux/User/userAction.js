import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createDeliveryApi,
    getCurrentUserApi,
    getCurrentUserDeliveryApi,
    getPeopleApi,
    loginApi,
    registerApi,
    updateCurrentUserApi,
    updateUserByIdApi,
} from "../../../apis/user.apis";
import { tryCatchWrapper } from "../../../utils/asyncHelper";

export const loginAction = createAsyncThunk("user/loginAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(loginApi, data);

    if (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
    return result.data;
});

export const registerAction = createAsyncThunk("user/registerAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(registerApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

export const getcurrentUserAction = createAsyncThunk("user/getcurrentUserAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getCurrentUserApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

export const getCurrentUserDeliveryAction = createAsyncThunk("user/getCurrentUserDeliveryAction", async (_, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getCurrentUserDeliveryApi);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

export const getPeopleAction = createAsyncThunk("user/getPeopleAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(getPeopleApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

export const updateUserByIdAction = createAsyncThunk("user/updateUserByIdAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(updateUserByIdApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

export const updateEmailVerify = createAsyncThunk("user/updateEmailVerify", async (data) => {
    const result = await updateUser(data);
    return result.data.data.data;
});

export const updateCurrentUserAction = createAsyncThunk("user/updateCurrentUserAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(updateCurrentUserApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});

export const createDeliveryAction = createAsyncThunk("user/createDeliveryAction", async (data, thunkAPI) => {
    const { result, error } = await tryCatchWrapper(createDeliveryApi, data);
    if (error) {
        return thunkAPI.rejectWithValue(error);
    }
    return result.data;
});
