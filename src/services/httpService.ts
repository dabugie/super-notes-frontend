import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const baseURL = 'https://nestjs-backend-test.onrender.com/api';

const httpService = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const get = async <T>(url: string, params: AxiosRequestConfig = {}) => {
  try {
    const response = await httpService.get<T>(url, { params });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const post = async <T>(url: string, data = {}, params: AxiosRequestConfig = {}) => {
  try {
    const response = await httpService.post<T>(url, data, params);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const put = async <T>(url: string, data = {}, params: AxiosRequestConfig = {}) => {
  try {
    const response = await httpService.put<T>(url, data, params);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const remove = async <T>(url: string, params: AxiosRequestConfig = {}) => {
  try {
    const response = await httpService.delete<T>(url, params);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const handleRequestError = (error: any) => {
  console.error('Error en la solicitud HTTP:', error.message);
  throw error;
};
