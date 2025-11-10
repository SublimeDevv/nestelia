export interface HealthResponse {
  status: string;
  ollamaAvailable: boolean;
  chunksInStore: number;
  message: string;
}

export interface UploadResponse {
  documentId: string;
  fileName: string;
  chunksProcessed: number;
  totalDocumentsInChroma: number;
  processingTimeSeconds: number;
  message: string;
}

export interface BotDto {
  key?: string;
  value?: string;
}

export interface BotApiResponse {
  data?: {
    apiKey?: string | null;
    modelName?: string | null;
  };
  isSuccess: boolean;
  message?: string;
  isFailure?: boolean;
  error?: {
    message: string | null;
  };
  value?: any; 
}
