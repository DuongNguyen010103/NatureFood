import { createSlice } from "@reduxjs/toolkit";
import {
    getStoreByIdAction,
    createStoreAction,
    getCurrentStoreAction,
} from "./storeAction";

const storeSlice = createSlice({
    name: "store",
    initialState: {
        data: { stores: [], total: 0 },
        currentStore: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get data store
            .addCase(getStoreByIdAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStoreByIdAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getStoreByIdAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get current store
            .addCase(getCurrentStoreAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentStoreAction.fulfilled, (state, action) => {
                state.loading = false;
                state.currentStore = action.payload;
            })
            .addCase(getCurrentStoreAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //create store
            .addCase(createStoreAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStoreAction.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createStoreAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default storeSlice.reducer;
