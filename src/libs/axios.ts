import axios from "axios";
import { getToken } from "../services/local-storage-service";
import { errorToast } from "../services/toast-service";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        common: {
            "Content-Type": "application/json",
        }
    }
});

axiosClient.interceptors.request.use(
    (config) => {
        let accessToken = getToken();
        if (accessToken) {
            config.headers = Object.assign({ Authorization: `Bearer ${accessToken}` }, config.headers);
        };
        return config;
    },
    (error) => {
        return error;
    },
);

axiosClient.interceptors.response.use((response) => response,
    async (error) => {
        try {
            if (error.response?.status === 401) {
                await errorToast(`No Token Provided! Please Re-Login`);
            } else if (error.response?.status === 403) {
                await errorToast(`Token Expire! Please Re-Login`);
            }
        } catch (err: any) {
            return Promise.reject(err);
        };
        return Promise.reject(error);
    },
);

export default axiosClient;