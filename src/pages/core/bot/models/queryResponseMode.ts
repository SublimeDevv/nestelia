export interface RelevantChunksModel {
  content: string;
  similarity: number;
  distance: number;
  fileName: string;
  chunkIndex: number;
}

export interface QueryResponseModel {
  answer: string;
  relevantChunks: RelevantChunksModel[];
  processingTimeMs: number;
}
