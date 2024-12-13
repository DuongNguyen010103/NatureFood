import { apiClient } from "./config.api";
import { TagV1 } from "../constants/endpoints.const";

export const getTags = async () => {
    const tags = await apiClient.get(TagV1.TAG_GET_ALL);
    return tags.data;
};
