export interface SSEChunksData {
  chunks: Array<{
    fileName: string;
    content: string;
    distance: number;
  }>;
  count: number;
}

export interface SSETokenData {
  content: string;
}

export interface SSEDoneData {
  processingTimeMs: number;
  chunkCount: number;
  timestamp: string;
}

export interface SSEErrorData {
  message: string;
  details?: string;
}