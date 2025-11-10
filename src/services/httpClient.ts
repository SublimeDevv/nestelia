import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import {
  type ApiResponse,
  type ApiError,
  type HttpClientOptions,
  type RequestConfig,
  type BaseModel,
  type PaginationParams,
  type PaginatedResponse,
} from "@/types";

export class HttpClient {
  private instance: AxiosInstance;

  constructor(options: HttpClientOptions = {}) {
    this.instance = axios.create({
      baseURL: options.baseURL || import.meta.env.API_URL || "/api",
      timeout: options.timeout || 30000,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.instance.post("/auth/refresh");

            return this.instance(originalRequest);
          } catch (refreshError) {
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }

        const apiError: ApiError = {
          message: error.response?.data.error?.message,
          status: error.response?.status,
          code: error.response?.data?.code || error.code,
          details: error.response?.data,
        };
        return Promise.reject(apiError);
      }
    );
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      data,
      headers: config?.headers,
      params: config?.params,
      timeout: config?.timeout,
      withCredentials: true,
    };

    try {
      const response: AxiosResponse<ApiResponse<T>> =
        await this.instance.request(axiosConfig);
      return response.data as T;
    } catch (error) {
      throw error;
    }
  }

  async get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("GET", url, undefined, config);
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>("POST", url, data, config);
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>("PUT", url, data, config);
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>("PATCH", url, data, config);
  }

  async delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("DELETE", url, undefined, config);
  }

  async getById<T extends BaseModel>(
    endpoint: string,
    id: string | number
  ): Promise<T> {
    return this.get<T>(`${endpoint}/${id}`);
  }

  async getAll<T extends BaseModel>(
    endpoint: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<T>> {
    return this.get<PaginatedResponse<T>>(endpoint, { params });
  }

  async create<T extends BaseModel>(
    endpoint: string,
    data: Omit<T, "id">
  ): Promise<T> {
    return this.post<T>(endpoint, data);
  }

  async update<T extends BaseModel>(
    endpoint: string,
    id: string | number,
    data: Partial<Omit<T, "id">>
  ): Promise<T> {
    return this.put<T>(`${endpoint}/${id}`, data);
  }

  async remove<T = any>(endpoint: string, id: string | number): Promise<T> {
    return this.delete<T>(`${endpoint}/${id}`);
  }

  setBaseURL(baseURL: string): void {
    this.instance.defaults.baseURL = baseURL;
  }

  setDefaultHeaders(headers: Record<string, string>): void {
    Object.assign(this.instance.defaults.headers, headers);
  }
}

export const httpClient = new HttpClient();
