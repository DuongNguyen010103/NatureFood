import { UserV1 } from "../constants/endpoints.const";
import { apiClient } from "./config.api";

export const loginApi = async (data) => {
    const response = await apiClient.post(UserV1.USER_LOGIN, data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        return response.data;
    }
    return response;
};

export const registerApi = async (data) => {
    const response = await apiClient.post(UserV1.USER_REGISTER, data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        return response.data;
    }
    return response;
};

export const getCurrentUserApi = async (data) => {
    const response = await apiClient.get(UserV1.USER_CURRENT, {
        headers: {
            Authorization: `Bearer ${data}`,
        },
    });
    return response.data;
};

export const getPeopleApi = async (params) => {
    const response = await apiClient.get(UserV1.GET_PEOPLE, {
        params,
    });
    return response.data;
};

export const verifyEmail = async (data) => {
    try {
        const result = await apiClient.post(UserV1.USER_SEND_OTP, data);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateUserByIdApi = async (data) => {
    const user = await apiClient.patch(UserV1.UPDATE_USER_BY_ID + data.id, data.data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    return user.data;
};

export const createDeliveryApi = async (data) => {
    const response = await apiClient.post(UserV1.CREATE_DELIVERY, data);
    return response.data;
};

export const getCurrentUserDeliveryApi = async (data) => {
    const response = await apiClient.get(UserV1.GET_DELIVERY);
    return response.data;
};

export const changePasswordApi = async (data) => {
    const response = await apiClient.patch(UserV1.CHANGE_PASSWORD, data);
    return response.data;
};

export const updateCurrentUserApi = async (data) => {
    const response = await apiClient.put(UserV1.USER_UPDATE, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const forgotPasswordApi = async (data) => {
    const response = await apiClient.patch(UserV1.FORGOT_PASSWORD, data);
    return response.data;
};
export const forgotPasswordConfirmOTPApi = async (data) => {
    const response = await apiClient.patch(UserV1.FORGOT_PASSWORD_CONFIRM, data);
    return response.data;
};
