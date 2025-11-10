import type { ApiResponse } from "@/types/api";
import type { Category } from "../interfaces/Category";
import { httpClient } from "@/services/httpClient";

const baseUrl = import.meta.env.API_URL || "/api";

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await httpClient.get<ApiResponse<Category[]>>(
    `${baseUrl}/category/list-categories`
  );
  return response;
};

export const getCategoryById = async (
  id: string
): Promise<ApiResponse<Category>> => {
  const response = await httpClient.get<ApiResponse<Category>>(
    `${baseUrl}/category/getbyid/${id}`
  );
  return response;
};

export const createCategory = async (
  FormData: FormData
): Promise<ApiResponse<Category>> => {
  const response = await httpClient.post<ApiResponse<Category>>(
    `${baseUrl}/category/create-category`,
    FormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const updateCategory = async (
  id: string,
  FormData: FormData
): Promise<ApiResponse<Category>> => {
  const response = await httpClient.put<ApiResponse<Category>>(
    `${baseUrl}/category/update-category/${id}`,
    FormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

export const deleteCategory = async (
  id: string
): Promise<ApiResponse<void>> => {
  const response = await httpClient.delete<ApiResponse<void>>(
    `${baseUrl}/category/${id}`
  );
  return response;
};
