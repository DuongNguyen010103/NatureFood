import { createSlice } from "@reduxjs/toolkit";
import { createBlogAction, getBlogsAction } from "./blogAction";

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        data: { blogs: [], total: 0 },
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get blogs
            .addCase(getBlogsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBlogsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getBlogsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //create blog
            .addCase(createBlogAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBlogAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data.blogs.push(action.payload);
                state.data.total += 1;
            })
            .addCase(createBlogAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export default blogSlice.reducer;
