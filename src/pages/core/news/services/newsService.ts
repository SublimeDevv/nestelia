import { httpClient } from "@/services/httpClient";
import type { PaginationParams } from "@/types/models";
import type { News } from "../interfaces/News";
import type { ApiResponse } from "@/types/api";

const baseUrl = import.meta.env.API_URL || "/api";

export const getNews = async (
  params: PaginationParams
): Promise<ApiResponse<News[]>> => {
  const response = await httpClient.get<ApiResponse<News[]>>(
    `${baseUrl}/new/get-news`,
    { params }
  );
  return response;
};

export const deleteNews = async (id: string): Promise<ApiResponse> => {
  const response = await httpClient.delete<ApiResponse>(`${baseUrl}/new/${id}`);
  return response;
};

export const createNews = async (formData: FormData): Promise<ApiResponse> => {
  const response = await httpClient.post<ApiResponse>(`${baseUrl}/new/createNewPost`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getNewsById = async (id: string): Promise<ApiResponse<News>> => {
  const response = await httpClient.get<ApiResponse<News>>(`${baseUrl}/new/getById/${id}`);
  return response;
};

export const updateNews = async (id: string, formData: FormData): Promise<ApiResponse> => {
  const response = await httpClient.put<ApiResponse>(`${baseUrl}/new/updateNewPost/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};