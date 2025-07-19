import axios from "axios";
import type { AxiosInstance } from "axios";

/*
    Экземпляр axios с пользовательской конфигурацией
*/
export const instance: AxiosInstance = axios.create({
  // baseURL: `http://${
  //   import.meta.env.DEV
  //     ? import.meta.env.VITE_DEV_SERV
  //     : window.location.hostname
  // }:3000/api`,
  baseURL: `http://https://taskmanagerbackend-t1.onrender.com/api`,
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
