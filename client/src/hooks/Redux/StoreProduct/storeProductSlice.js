import { createSlice } from "@reduxjs/toolkit";
import {
    createStoreProductsAction,
    getBestSellerAction,
    getStoreProductsAction,
    getStoreProductsByStoreAction,
    searchCustomerAction,
    updateStoreProductAction,
} from "./storeProductAction";

const storeProductSlice = createSlice({
    name: "storeProduct",
    initialState: {
        data: { products: [], total: 0 },
        search: { product: { products: [], total: 0 } },
        bestSeller: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            //get store products
            .addCase(getStoreProductsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStoreProductsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getStoreProductsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get best seller
            .addCase(getBestSellerAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBestSellerAction.fulfilled, (state, action) => {
                state.loading = false;
                state.bestSeller = action.payload;
            })
            .addCase(getBestSellerAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get store products by store
            .addCase(getStoreProductsByStoreAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStoreProductsByStoreAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getStoreProductsByStoreAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //create store products
            .addCase(createStoreProductsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStoreProductsAction.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createStoreProductsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //search store products
            .addCase(searchCustomerAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchCustomerAction.fulfilled, (state, action) => {
                state.loading = false;
                state.search = action.payload;
            })
            .addCase(searchCustomerAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //update store product
            .addCase(updateStoreProductAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStoreProductAction.fulfilled, (state, action) => {
                state.loading = false;
                const existIndex = state.data.products.findIndex((p) => p._id == action.payload._id);
                state.data.products[existIndex] = action.payload;
            })
            .addCase(updateStoreProductAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default storeProductSlice.reducer;
