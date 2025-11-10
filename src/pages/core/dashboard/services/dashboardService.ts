import { httpClient } from "@/services/httpClient";
import type { ApiResponse } from "@/types/api";
import type { DashboardData } from "../interfaces/Dashboard";

const baseUrl = import.meta.env.API_URL || "/api";

export const getDashboardData = async (): Promise<ApiResponse<DashboardData>> => {
  const response = await httpClient.get<ApiResponse<DashboardData>>(
    `${baseUrl}/auditlog/dashboard`
  );
  return response;
};

