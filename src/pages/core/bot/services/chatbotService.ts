import { fetchEventSource } from '@microsoft/fetch-event-source';
import type { QueryModel } from "../models/queryModel";
import type { QueryResponse, RelevantChunk } from "../schemas/chatbot.schema";
import type { SSEChunksData, SSEDoneData, SSEErrorData, SSETokenData } from "../interfaces/SSE/data";

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

export { queryChatbot, queryChatbotStream };