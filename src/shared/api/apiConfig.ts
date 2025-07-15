import axios from "axios";
import type { AxiosInstance } from "axios";

/*
    Экземпляр axios с пользовательской конфигурацией
*/
export const instance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_DEV_SERV || window.location.hostname,
});

//Перехватчик запросов
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
