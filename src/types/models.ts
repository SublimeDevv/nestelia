export interface BaseModel {
	id: string | number;
	createdAt?: string | Date;
	updatedAt?: string | Date;
	deletedAt?: string | Date;
	isDeleted?: boolean;
}

export interface PaginationParams {
	page?: number;
	size?: number;
	param?: string;
	category?: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}
