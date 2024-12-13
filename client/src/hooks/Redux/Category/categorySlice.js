import { createSlice } from "@reduxjs/toolkit";
import {
    getCategoriesAction,
    deleteCategoryAction,
    createCategoryAction,
} from "./categoryAction";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        data: { categories: [], total: 0 },
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            //get categories
            .addCase(getCategoriesAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategoriesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCategoriesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //create categories
            .addCase(createCategoryAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategoryAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = {
                    categories: [...state.data.categories, action.payload],
                    total: state.data.total + 1,
                };
            })
            .addCase(createCategoryAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //delete category
            .addCase(deleteCategoryAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategoryAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = {
                    categories: state.data.categories.filter(
                        (category) => category._id != action?.payload?._id
                    ),
                    total: state.data.total - 1,
                };
            })
            .addCase(deleteCategoryAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
