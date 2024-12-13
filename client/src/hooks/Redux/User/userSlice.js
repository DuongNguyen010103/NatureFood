import { createSlice } from "@reduxjs/toolkit";
import {
    getcurrentUserAction,
    loginAction,
    registerAction,
    getPeopleAction,
    updateUserByIdAction,
    createDeliveryAction,
    getCurrentUserDeliveryAction,
    updateCurrentUserAction,
} from "./userAction";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: { user: [], total: 0 },
        token: localStorage.getItem("token") || "",
        currentUser: null,
        delivery: { delivery: [], total: 0 },
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.data = { user: [], total: 0 };
            localStorage.setItem("token", "");
            state.token = "";
            state.currentUser = null;
            state.delivery = { delivery: [], total: 0 };
        },
    },
    extraReducers: (builder) => {
        builder
            //post login
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //post register
            .addCase(registerAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAction.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(registerAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get current user
            .addCase(getcurrentUserAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getcurrentUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(getcurrentUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get current user delivery
            .addCase(getCurrentUserDeliveryAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentUserDeliveryAction.fulfilled, (state, action) => {
                state.loading = false;
                state.delivery = action.payload;
            })
            .addCase(getCurrentUserDeliveryAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get people
            .addCase(getPeopleAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPeopleAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getPeopleAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //update user by id
            .addCase(updateUserByIdAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserByIdAction.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.users.findIndex((user) => user._id == action.payload._id);
                state.data.users[index] = action.payload;
            })
            .addCase(updateUserByIdAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //update current user
            .addCase(updateCurrentUserAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCurrentUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(updateCurrentUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //create delivery
            .addCase(createDeliveryAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDeliveryAction.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = {
                    ...state.currentUser,
                    delivery: action.payload,
                };
            })
            .addCase(createDeliveryAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
