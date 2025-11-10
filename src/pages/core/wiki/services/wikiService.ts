import type { WikiEntry } from "../interfaces/WikiEntry";
import { httpClient } from "@/services/httpClient";
import type { PaginationParams } from "@/types";
import type { ApiResponse } from "@/types/api";

const baseUrl = import.meta.env.API_URL || "/api";

export const getWikiEntries = async (
  params: PaginationParams
): Promise<ApiResponse<WikiEntry[]>> => {
  const response = await httpClient.get<ApiResponse<WikiEntry[]>>(
    `${baseUrl}/wikientry/get-entries-by-category`,
    { params }
  );
  return response;
};

export const getWikiEntryById = async (
  id: string
): Promise<ApiResponse<WikiEntry>> => {
  const response = await httpClient.get<ApiResponse<WikiEntry>>(
    `${baseUrl}/wikientry/getbyid/${id}`
  );
  return response;
};

export const createWikiEntry = async (
  formData: FormData
): Promise<ApiResponse<WikiEntry>> => {
  const response = await httpClient.post<ApiResponse<WikiEntry>>(
    `${baseUrl}/wikientry/create-wiki-entry`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const updateWikiEntry = async (
  id: string,
  formData: FormData
): Promise<ApiResponse<WikiEntry>> => {
  const response = await httpClient.put<ApiResponse<WikiEntry>>(
    `${baseUrl}/wikientry/update-wiki-entry/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const deleteWikiEntry = async (
  id: string
): Promise<ApiResponse<void>> => {
  const response = await httpClient.delete<ApiResponse<void>>(
    `${baseUrl}/wikientry/${id}`
  );
  return response;
};

export const getRelatedWikiEntries = async (params: {
  categoryId: string;
  currentEntryId: string;
  limit?: number;
}): Promise<ApiResponse<WikiEntry[]>> => {
  const { categoryId, currentEntryId, limit = 10 } = params;
  const response = await httpClient.get<ApiResponse<WikiEntry[]>>(
    `${baseUrl}/wikientry/get-entries-by-category`,
    {
      params: {
        categoryId,
        limit,
      },
    }
  );
  // Filter out the current entry from the results
  if (response.data) {
    response.data = response.data.filter(entry => entry.id !== currentEntryId);
  }
  return response;
};