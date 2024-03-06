import type { AxiosRequestConfig, AxiosInstance } from 'axios';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const httpService: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

httpService.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = async <T>(url: string, params: AxiosRequestConfig = {}) => {
  try {
    const response = await httpService.get<T>(url, { params });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      handleRequestError(error.response.data.message);
    } else if (error.request) {
      handleRequestError(error.request);
    } else {
      handleRequestError(error.message);
    }
  }
};

export const post = async <T>(url: string, data = {}, params: AxiosRequestConfig = {}) => {
  try {
    console.log({ url, data, params });

    const response = await httpService.post<T>(url, data, params);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      handleRequestError(error.response.data.message);
    } else if (error.request) {
      handleRequestError(error.request);
    } else {
      handleRequestError(error.message);
    }
  }
};

export const put = async <T>(url: string, data = {}, params: AxiosRequestConfig = {}) => {
  try {
    const response = await httpService.put<T>(url, data, params);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      handleRequestError(error.response.data.message);
    } else if (error.request) {
      handleRequestError(error.request);
    } else {
      handleRequestError(error.message);
    }
  }
};

export const remove = async <T>(url: string, params: AxiosRequestConfig = {}) => {
  try {
    const response = await httpService.delete<T>(url, params);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      handleRequestError(error.response.data.message);
    } else if (error.request) {
      handleRequestError(error.request);
    } else {
      handleRequestError(error.message);
    }
  }
};

const handleRequestError = (error: any) => {
  throw new Error(error);
};
