import { httpClient } from "@/services/httpClient";
import type { PaginationParams } from "@/types/models";
import type { Post } from "../interfaces/Post";
import type { ApiResponse } from "@/types/api";

const baseUrl = import.meta.env.API_URL || "/api";

export const getPosts = async (
  params: PaginationParams
): Promise<ApiResponse<Post[]>> => {
  const response = await httpClient.get<ApiResponse<Post[]>>(
    `${baseUrl}/post/get-posts`,
    { params }
  );
  return response;
};

export const deletePost = async (id: string): Promise<ApiResponse> => {
  const response = await httpClient.delete<ApiResponse>(`${baseUrl}/post/${id}`);
  return response;
};

export const createPost = async (formData: FormData): Promise<ApiResponse> => {
  const response = await httpClient.post<ApiResponse>(`${baseUrl}/post/createPost`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getPostById = async (id: string): Promise<ApiResponse<Post>> => {
  const response = await httpClient.get<ApiResponse<Post>>(`${baseUrl}/post/getById/${id}`);
  return response;
};

export const updatePost = async (id: string, formData: FormData): Promise<ApiResponse> => {
  const response = await httpClient.put<ApiResponse>(`${baseUrl}/post/updatePost/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};