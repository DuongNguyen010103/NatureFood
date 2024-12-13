import { createSlice } from "@reduxjs/toolkit";
import { getNotificationsAction, getUnreadNotificationsAction, updateNotificationAction, updateNotificationsAction } from "./notificationAction";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        data: { notifications: [], total: 0 },
        unreadNotificationsTotal: 0,
        loading: false,
        error: null,
    },
    reducers: {
        increaseUnreadNotificationsTotal: (state) => {
            state.unreadNotificationsTotal += 1;
        },
        decreaseUnreadNotificationsTotal: (state) => {
            state.unreadNotificationsTotal = Math.max(0, state.unreadNotificationsTotal - 1);
        },
    },
    extraReducers: (builder) => {
        builder
            //get notifications
            .addCase(getNotificationsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNotificationsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getNotificationsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get unread notifications
            .addCase(getUnreadNotificationsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUnreadNotificationsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.unreadNotificationsTotal = action.payload;
            })
            .addCase(getUnreadNotificationsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //update notification
            .addCase(updateNotificationAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNotificationAction.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.notifications.findIndex((n) => n._id == action.payload._id);
                state.data.notifications[index] = action.payload;
                state.unreadNotificationsTotal -= 1;
            })
            .addCase(updateNotificationAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //update notifications
            .addCase(updateNotificationsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNotificationsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data.notifications.forEach((n) => (n.isRead = true));
                state.unreadNotificationsTotal = 0;
            })
            .addCase(updateNotificationsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { increaseUnreadNotificationsTotal, decreaseUnreadNotificationsTotal } = notificationSlice.actions;
export default notificationSlice.reducer;
