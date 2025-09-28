import { CONST } from "@/config/const";
import axios from "axios";

export const publicInstance = axios.create({
    baseURL: import.meta.env.VITE_PULSE_BE_URL,
    timeout: 10000
});

export const protectedInstance = axios.create({
    baseURL: import.meta.env.VITE_PULSE_BE_URL,
    withCredentials: true,
    timeout: 10000
});

protectedInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(CONST.AXIOS.ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);