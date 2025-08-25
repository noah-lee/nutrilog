import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL! as string;

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
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
  status: string;
  statusCode: number;
  details?: string;
};

export async function api<T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    return await axiosInstance(endpoint, config);
  } catch (error: unknown) {
    throw {
      message: (error as Error).message || "Unknown error",
      status: (error as ApiError).status || "error",
      statusCode: (error as ApiError).statusCode || 500,
      details: (error as ApiError).details,
    } as ApiError;
  }
}
