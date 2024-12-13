import { createSlice } from "@reduxjs/toolkit";
import {
    createBannerAction,
    getBannersByCurrentUserAction,
    getBannersAction,
    deleteBannerAction,
    updateBannerAction,
} from "./bannerAction";

const bannerSlice = createSlice({
    name: "banner",
    initialState: {
        data: { banners: [], total: 0 },
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get Banners By Current User Action
            .addCase(getBannersByCurrentUserAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getBannersByCurrentUserAction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.data = action.payload.data;
                }
            )
            .addCase(
                getBannersByCurrentUserAction.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                }
            )

            //get Banners
            .addCase(getBannersAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBannersAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getBannersAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //create banner
            .addCase(createBannerAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBannerAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = {
                    banners: [...state.data.banners, action.payload],
                    total: state.data.total + 1,
                };
            })
            .addCase(createBannerAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //update banner
            .addCase(updateBannerAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBannerAction.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.banners.findIndex(
                    (banner) => banner._id == action.payload._id
                );
                state.data.banners[index] = action.payload;
            })
            .addCase(updateBannerAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //delete banner
            .addCase(deleteBannerAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBannerAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = {
                    banners: state.data.banners.filter(
                        (banner) => banner._id != action?.payload?._id
                    ),
                    total: state.data.total - 1,
                };
            })
            .addCase(deleteBannerAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default bannerSlice.reducer;
