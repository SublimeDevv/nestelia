import { z } from 'zod';

export const querySchema = z.object({
  question: z.string().min(1, 'La pregunta no puede estar vacía').max(500, 'La pregunta es demasiado larga'),
  maxResults: z.number().int().positive(),
});

export type QueryFormData = z.infer<typeof querySchema>;

export const relevantChunkSchema = z.object({
  content: z.string(),
  similarity: z.number(),
  distance: z.number(),
  fileName: z.string(),
  chunkIndex: z.number(),
});

export const queryResponseSchema = z.object({
  answer: z.string(),
  relevantChunks: z.array(relevantChunkSchema),
  processingTimeMs: z.number(),
});

export type QueryResponse = z.infer<typeof queryResponseSchema>;
export type RelevantChunk = z.infer<typeof relevantChunkSchema>;

export const messageSchema = z.object({
  id: z.string(),
  text: z.string(),
  sender: z.enum(['user', 'bot']),
  timestamp: z.date(),
  isStreaming: z.boolean().optional(),
});

export type Message = z.infer<typeof messageSchema>;

