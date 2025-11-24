import { useState, useRef, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { queryChatbotStream } from "./services/chatbotService";
import {
  querySchema,
  type QueryFormData,
  type Message,
} from "./schemas/chatbot.schema";

interface ChatbotProps {
  onClose?: () => void;
}

export default function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingMessageId = useRef<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QueryFormData>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      question: "",
      maxResults: 5,
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit: SubmitHandler<QueryFormData> = async (data) => {
    if (isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: data.question,
      sender: "user",
      timestamp: new Date(),
      isStreaming: false,
    };

    setMessages((prev) => [...prev, userMessage]);

    const botMessageId = (Date.now() + 1).toString();
    streamingMessageId.current = botMessageId;

    const botMessage: Message = {
      id: botMessageId,
      text: "",
      sender: "bot",
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, botMessage]);
    reset();
    setIsLoading(true);

    try {
      const response = await queryChatbotStream(
        {
          question: data.question,
          maxResults: data.maxResults,
          useModelVps: false,
        },
        (chunk) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, text: msg.text + chunk } : msg
            )
          );
        }
      );

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: response.answer,
                isStreaming: false,
              }
            : msg
        )
      );

      console.log("Stream completado:", {
        answerLength: response.answer.length,
        chunks: response.relevantChunks.length,
        time: response.processingTimeMs,
      });
    } catch (error) {
      console.error("Error en el chat:", error);

      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== botMessageId);
        return [
          ...filtered,
          {
            id: Date.now().toString(),
            text: "Por el momento, esta funcionalidad no está disponible para el público.",
            sender: "bot",
            timestamp: new Date(),
            isStreaming: false,
          },
        ];
      });
    } finally {
      setIsLoading(false);
      streamingMessageId.current = null;
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="w-full bg-gray-800 rounded-2xl overflow-hidden flex flex-col h-[75vh]">
      {/* Header */}
      <div className="bg-gray-900 p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
              <img
                src="/images/bubot.webp"
                alt="BuBot"
                className="w-full h-full object-cover object-left"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">BuBot</h1>
              <p className="text-sm text-gray-400">Soy el reemplazo de Bubo</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
              aria-label="Cerrar chatbot"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

        {/* Messages Container */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-800"
          style={{ overflowY: messages.length > 0 ? "auto" : "hidden" }}
        >
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-800 shadow-md">
                  <img
                    src="/images/bubot.webp"
                    alt="BuBot"
                    className="w-full h-full object-cover object-left opacity-90"
                  />
                </div>
                <p className="text-lg font-medium text-gray-300">
                  ¡Hola! Soy BuBot
                </p>
                <p className="text-sm mt-2">¿En qué puedo ayudarte hoy?</p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center overflow-hidden ${
                  message.sender === "user"
                    ? "bg-purple-800"
                    : "bg-gray-800 border-2 border-gray-600"
                }`}
              >
                {message.sender === "user" ? (
                  <img
                    src="/images/bubo_question.webp"
                    alt="Usuario"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/images/bubot.webp"
                    alt="BuBot"
                    className="w-full h-full object-cover object-left"
                  />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`flex-1 max-w-[70%] ${
                  message.sender === "user" ? "items-end" : "items-start"
                } flex flex-col`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-purple-800 text-white rounded-tr-none"
                      : "bg-gray-800 border border-gray-600 text-gray-100 rounded-tl-none shadow-sm"
                  }`}
                >
                  {message.text ? (
                    <div className="text-sm leading-relaxed whitespace-pre-wrap prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                          li: ({ children }) => <li className="mb-1">{children}</li>,
                          code: ({ children }) => <code className="bg-gray-900 px-1.5 py-0.5 rounded text-purple-300">{children}</code>,
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                      {message.isStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 bg-gray-300 animate-pulse" />
                      )}
                    </div>
                  ) : (
                    <Loader className="animate-spin text-gray-300" size={20} />
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-1 px-2">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 p-4 bg-gray-900">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex space-x-3">
              <div className="flex-1">
                <input
                  type="text"
                  {...register("question")}
                  placeholder="Escribe tu mensaje..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  disabled={isLoading}
                  autoComplete="off"
                />
                {errors.question && (
                  <p className="text-red-400 text-xs mt-1 px-2">
                    {errors.question.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-purple-800 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer text-white rounded-xl transition-colors flex items-center space-x-2"
              >
                {isLoading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <>
                    <Send size={20} />
                    <span className="hidden sm:inline">Enviar</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}
