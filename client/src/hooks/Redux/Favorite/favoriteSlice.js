import { createSlice } from "@reduxjs/toolkit";
import {
    addFavoriteStoreProductAction,
    getFavoriteStoreProductsAction,
    deleteFavoriteStoreProductAction,
    modifyStoreFavoriteItemAction,
    getStoreFavoriteItemsAction,
} from "./favoriteAction";

const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        data: { products: [], total: 0 },
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //*********** customer ************

            //add favorite store product
            .addCase(addFavoriteStoreProductAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFavoriteStoreProductAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data.products.push(action.payload);
                state.data.total += 1;
            })
            .addCase(addFavoriteStoreProductAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get favorite store products
            .addCase(getFavoriteStoreProductsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFavoriteStoreProductsAction.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(getFavoriteStoreProductsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = { products: [], total: 0 };
            })

            //delete favorite store product
            .addCase(deleteFavoriteStoreProductAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFavoriteStoreProductAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = {
                    products: state.data.products.filter((p) => p._id !== action.payload._id),
                    total: state.data.total - 1,
                };
            })
            .addCase(deleteFavoriteStoreProductAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //*********** store ************
            //modify store favorite item
            .addCase(modifyStoreFavoriteItemAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(modifyStoreFavoriteItemAction.fulfilled, (state, action) => {
                state.loading = false;
                const indexItem = state.data.products.findIndex((p) => p._id == action.payload._id);
                console.log(indexItem);

                if (indexItem != -1) {
                    state.data = {
                        products: state.data.products.filter((p) => p._id != action.payload._id),
                        total: state.data.total - 1,
                    };
                } else {
                    state.data.products.push(action.payload);
                    state.data.total += 1;
                }
            })
            .addCase(modifyStoreFavoriteItemAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get store favorite items
            .addCase(getStoreFavoriteItemsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStoreFavoriteItemsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getStoreFavoriteItemsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default favoriteSlice.reducer;
