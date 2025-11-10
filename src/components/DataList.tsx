import { Edit, Trash2, Calendar, User } from "lucide-react";

export interface DataListItem {
  id?: string | number;
  title: string;
  description: string;
  author: string;
  coverImageUrl: string;
  publishedAt: string | Date;
}

interface DataListProps {
  items: DataListItem[];
  onEdit?: (item: DataListItem) => void;
  onDelete?: (item: DataListItem) => void;
  onItemClick?: (item: DataListItem) => void;
  emptyMessage?: string;
  loading?: boolean;
}

export default function DataList({
  items,
  onEdit,
  onDelete,
  onItemClick,
  emptyMessage = "No hay elementos para mostrar",
  loading = false,
}: DataListProps) {
  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-900/40 border border-gray-800/60 rounded-lg overflow-hidden animate-pulse"
          >
            <div className="flex gap-5 p-4">
              <div className="w-72 h-36 bg-gray-800/50 rounded shrink-0" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="space-y-3">
                  <div className="h-6 bg-gray-800/50 rounded w-2/3" />
                  <div className="h-4 bg-gray-800/50 rounded w-full" />
                  <div className="h-4 bg-gray-800/50 rounded w-5/6" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-800/50 rounded w-24" />
                    <div className="h-4 bg-gray-800/50 rounded w-24" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-9 w-20 bg-gray-800/50 rounded" />
                    <div className="h-9 w-20 bg-gray-800/50 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-gray-900/40 border border-gray-800/60 rounded-lg p-12">
        <p className="text-gray-400 text-center text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="bg-gray-900/40 border border-gray-800/60 rounded-lg overflow-hidden"
        >
          <div className="flex gap-5 p-4">
            {/* Cover Image */}
            <div 
              className={`relative w-72 h-36 overflow-hidden rounded bg-gray-800/30 shrink-0 ${onItemClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
              onClick={() => onItemClick?.(item)}
            >
              {item.coverImageUrl ? (
                <img
                  src={item.coverImageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/288x144?text=Sin+Imagen";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Sin imagen</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
              <div 
                className={`space-y-2 ${onItemClick ? 'cursor-pointer' : ''}`}
                onClick={() => onItemClick?.(item)}
              >
                {/* Title */}
                <h3 className={`text-xl font-semibold text-white line-clamp-1 ${onItemClick ? 'hover:text-purple-400 transition-colors' : ''}`}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800/60">
                <div className="flex gap-5 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-gray-600" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-gray-600" />
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="px-4 py-2 bg-blue-600/90 text-white text-sm font-medium rounded hover:bg-blue-600 flex items-center gap-1.5"
                      title="Editar"
                    >
                      <Edit size={14} />
                      <span>Editar</span>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item)}
                      className="px-4 py-2 bg-red-600/90 text-white text-sm font-medium rounded hover:bg-red-600 flex items-center gap-1.5"
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                      <span>Eliminar</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
