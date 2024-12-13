import { createSlice } from "@reduxjs/toolkit";
import { getNewestProductsAction } from "./productAction";

const newestProductsSlice = createSlice({
    name: "newestProducts",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get newest-products
            .addCase(getNewestProductsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNewestProductsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getNewestProductsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default newestProductsSlice.reducer;
