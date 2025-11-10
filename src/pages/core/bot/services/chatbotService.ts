import { fetchEventSource } from '@microsoft/fetch-event-source';
import { httpClient } from "@/services/httpClient";
import type { QueryModel } from "../models/queryModel";
import type { QueryResponse, RelevantChunk } from "../schemas/chatbot.schema";
import type { SSEChunksData, SSEDoneData, SSEErrorData, SSETokenData } from "../interfaces/SSE/data";
import type { BotApiResponse, BotDto, HealthResponse, UploadResponse } from '../interfaces/configuration';

async function queryChatbotStream(
  query: QueryModel,
  onStream?: (chunk: string) => void
): Promise<QueryResponse> {
  query.maxResults = 5;
  
  const baseURL = import.meta.env.API_URL || "/api";
  const url = `${baseURL}/bot/query-stream`;

  return new Promise((resolve, reject) => {
    let accumulatedAnswer = '';
    let relevantChunks: RelevantChunk[] = [];
    let processingTimeMs = 0;
    let isComplete = false;
    
    const ctrl = new AbortController();

    fetchEventSource(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
      signal: ctrl.signal,
      
      async onopen(response) {

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP ${response.status}: ${text}`);
        }
        
        if (!response.headers.get('content-type')?.includes('text/event-stream')) {
          throw new Error('Respuesta no es SSE');
        }
      },
      
      onmessage(event) {        
        try {
          const data = JSON.parse(event.data);
          
          switch (event.event) {
            case 'chunks':
              const chunksData = data as SSEChunksData;
              console.log('Chunks recibidos:', chunksData.count);
              relevantChunks = chunksData.chunks.map((chunk, index) => ({
                content: chunk.content,
                fileName: chunk.fileName,
                distance: chunk.distance,
                similarity: 1 / (1 + chunk.distance),
                chunkIndex: index,
              }));
              break;
            
            case 'start':
              console.log('El servidor ha comenzado a procesar la consulta');
              break;
            
            case 'token':
              const tokenData = data as SSETokenData;
              accumulatedAnswer += tokenData.content;
              
              if (onStream) {
                try {
                  onStream(tokenData.content);
                } catch (e) {
                  console.warn('Error en callback:', e);
                }
              }
              break;
            
            case 'done':
              console.log('Stream completado');
              console.log('   - Longitud respuesta:', accumulatedAnswer.length);
              console.log('   - Chunks:', relevantChunks.length);
              
              const doneData = data as SSEDoneData;
              processingTimeMs = doneData.processingTimeMs;
              isComplete = true;
              
              ctrl.abort();
              resolve({
                answer: accumulatedAnswer,
                relevantChunks,
                processingTimeMs,
              });
              break;
            
            case 'error':
              console.error('Error del servidor:', data);
              const errorData = data as SSEErrorData;
              isComplete = true;
              ctrl.abort();
              reject(new Error(errorData.message || 'Error del servidor'));
              break;
            
            default:
              console.warn('Evento desconocido:', event.event);
          }
        } catch (error) {
          console.error('Error parseando evento:', error);
          console.error('Datos raw:', event.data);
        }
      },
      
      onclose() {
        console.log('Conexión cerrada, isComplete:', isComplete);
        
        if (!isComplete) {
          console.warn('Stream cerrado inesperadamente');
          console.warn('Respuesta acumulada:', accumulatedAnswer.substring(0, 100) + '...');
          
          resolve({
            answer: accumulatedAnswer,
            relevantChunks,
            processingTimeMs,
          });
        }
      },
      
      onerror(error) {
        console.error('Error SSE:', error);
        
        if (!isComplete) {
          ctrl.abort();
          reject(error);
        }
        
        throw error;
      },
    });
  });
}

async function queryChatbot(query: QueryModel) {
  return queryChatbotStream(query);
}

async function getHealth(): Promise<HealthResponse> {
  return httpClient.get<HealthResponse>('/bot/health');
}

async function uploadPdf(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  return httpClient.post<UploadResponse>('/bot/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 300000,
  });
}

async function clearChromaDb(): Promise<{ message: string }> {
  return httpClient.delete<{ message: string }>('/bot/clear-chromadb');
}

async function createApiKey(botDto: BotDto): Promise<BotApiResponse> {
  return httpClient.post<BotApiResponse>('/bot/createApiKey', botDto);
}

async function updateApiKey(botDto: BotDto): Promise<BotApiResponse> {
  return httpClient.put<BotApiResponse>('/bot/updateApiKey', botDto);
}

async function getModelName(): Promise<BotApiResponse> {
  return httpClient.get<BotApiResponse>('/bot/getModelName');
}

async function createModelName(botDto: BotDto): Promise<BotApiResponse> {
  return httpClient.post<BotApiResponse>('/bot/createModelName', botDto);
}

async function updateModelName(botDto: BotDto): Promise<BotApiResponse> {
  return httpClient.put<BotApiResponse>('/bot/updateModelName', botDto);
}

export { 
  queryChatbot, 
  queryChatbotStream,
  getHealth,
  uploadPdf,
  clearChromaDb,
  createApiKey,
  updateApiKey,
  getModelName,
  createModelName,
  updateModelName
};