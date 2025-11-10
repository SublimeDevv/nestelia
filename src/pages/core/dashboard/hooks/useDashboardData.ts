import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '../services/dashboardService';
import type { DashboardData } from '../interfaces/Dashboard';
import type { ApiResponse } from '@/types/api';

export const useDashboardData = () => {
  return useQuery<ApiResponse<DashboardData>>({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
    staleTime: 5 * 60 * 1000, 
    refetchOnMount: true,
  });
};

