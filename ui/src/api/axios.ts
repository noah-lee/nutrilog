import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL! as string;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other headers here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error.response?.data ?? error);
  }
);

export type ApiError = {
  message: string;
  status?: number;
};

export async function api<T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    return await axiosInstance(endpoint, config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      } as ApiError;
    }
    throw {
      message: (error as Error).message || "Unknown error",
    } as ApiError;
  }
}
