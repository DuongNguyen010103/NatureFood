import { createSlice } from "@reduxjs/toolkit";
import {
    createCustomerOrderAction,
    getCustomerOrderAction,
    getCustomerOrdersAction,
    getCustomerOrdersMyStoreAction,
    updateCustomerOrderAction,
} from "./orderAction";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        data: { orders: [], total: 0 },
        order: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //*********** customer ************
            //get customer order
            .addCase(getCustomerOrderAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCustomerOrderAction.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getCustomerOrderAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get customer orders
            .addCase(getCustomerOrdersAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCustomerOrdersAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCustomerOrdersAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get customer orders my store
            .addCase(getCustomerOrdersMyStoreAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCustomerOrdersMyStoreAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCustomerOrdersMyStoreAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //create customer order
            .addCase(createCustomerOrderAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCustomerOrderAction.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createCustomerOrderAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //update customer order
            .addCase(updateCustomerOrderAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCustomerOrderAction.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.orders.findIndex((ord) => ord._id == action.payload._id);
                state.data.orders[index] = action.payload;
            })
            .addCase(updateCustomerOrderAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default orderSlice.reducer;
