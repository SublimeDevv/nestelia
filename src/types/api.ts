export interface ApiResponse<T = any> {
  isSuccess?: boolean;
  message?: string;
  data?: T;
  isFailure?: boolean;
  error?: {
    message: string;
  };
  pagination?: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
}

export interface HttpClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}
