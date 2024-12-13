import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_DOMAIN + "/api/v1",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    timeout: 60000,
    withCredentials: true,
});

export { apiClient };
