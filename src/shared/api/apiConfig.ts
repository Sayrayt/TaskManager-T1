import axios from "axios";
import type { AxiosInstance } from "axios";

/*
    Экземпляр axios с пользовательской конфигурацией
*/
export const instance: AxiosInstance = axios.create({
  baseURL: "https://6875711f814c0dfa653891a4.mockapi.io/api/v1",
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
