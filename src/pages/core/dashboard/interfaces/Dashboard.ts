export interface DashboardData {
  totalCategories: number;
  totalEntries: number;
  totalPosts: number;
  totalNews: number;
  totalUsers: number;
  totalRoles: number;
  modelName: string;
  listCategories: CategorySummary[];
  listEntries: EntrySummary[];
}

export interface CategorySummary {
  categoryId: string;
  categoryName: string;
  entriesCount: number;
}

export interface EntrySummary {
  id: string;
  title: string;
  categoryName?: string;
  createdAt?: string;
}

