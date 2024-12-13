import { apiClient } from "./config.api";
import { PaymentV1 } from "../constants/endpoints.const";

export const createLinkMoMoPaymentApi = async (data) => {
    const result = await apiClient.post(PaymentV1.CREATE_LINK_MOMO, data);
    return result.data;
};
