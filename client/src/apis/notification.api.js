import { apiClient } from "./config.api";
import { NotificationV1 } from "../constants/endpoints.const";

export const getNotificationsApi = async (params) => {
    const result = await apiClient.get(NotificationV1.GET_ALL, { params });
    return result.data;
};

export const getUnreadNotificationsToalApi = async () => {
    const result = await apiClient.get(NotificationV1.GET_UNREAD_TOTAL);
    return result.data;
};

export const updateNotificationApi = async (notificationId) => {
    const result = await apiClient.patch(NotificationV1.UPDATE + notificationId);
    return result.data;
};

export const updateNotificationsApi = async () => {
    const result = await apiClient.patch(NotificationV1.UPDATE);
    return result.data;
};
