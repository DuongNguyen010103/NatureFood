import { apiClient } from "./config.api";
import { OrderV1 } from "../constants/endpoints.const";
export const getCustomerOrderApi = async (orderId) => {
    const result = await apiClient.get(OrderV1.GET_CUSTOMER_ORDER + orderId);
    return result.data;
};

export const getCustomerOrdersApi = async (params) => {
    const result = await apiClient.get(OrderV1.GET_CUSTOMER_ORDERS, { params });
    return result.data;
};

export const getCustomerOrdersMyStoreApi = async (params) => {
    const result = await apiClient.get(OrderV1.GET_CUSTOMER_ORDERS_MY_STORE, { params });
    return result.data;
};

export const createCustomerOrderApi = async (data) => {
    const result = await apiClient.post(OrderV1.CREATE_CUSTOMER_ORDER, data);
    return result.data;
};

export const updateCustomerOrderApi = async (data) => {
    const result = await apiClient.patch(OrderV1.UPDATE + data.orderId, data.data);
    return result.data;
};

export const getOrdersCountByDayApi = async (data) => {
    const result = await apiClient.get(OrderV1.GET_COUNT_ORDER_BY_DAY);
    return result.data;
};
