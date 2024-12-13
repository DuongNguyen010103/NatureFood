import { createSlice } from "@reduxjs/toolkit";
import { createReviewAction, deleteReviewAction, getReviewsAction, updateReviewAction } from "./reviewAction";

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        data: { reviews: [], total: 0 },
        loading: false,
        errorProduct: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get reviews
            .addCase(getReviewsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReviewsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getReviewsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //create review
            .addCase(createReviewAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReviewAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data.reviews.unshift(action.payload);
                state.data.total += 1;
            })
            .addCase(createReviewAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //update review
            .addCase(updateReviewAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReviewAction.fulfilled, (state, action) => {
                state.loading = false;
                const existingIndex = state.data.reviews.findIndex((r) => r._id == action.payload._id);
                if (existingIndex) {
                    state.data.reviews[existingIndex] = action.payload;
                }
            })
            .addCase(updateReviewAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //delete review
            .addCase(deleteReviewAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReviewAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data.reviews = state.data.reviews.filter((r) => r._id != action.payload._id);
                state.data.total -= 1;
            })
            .addCase(deleteReviewAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export default reviewSlice.reducer;
