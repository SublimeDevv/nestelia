import { Edit, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  emptyMessage?: string;
  loading?: boolean;
  showActions?: boolean;
  getRowId?: (item: T) => string | number;
}

export default function Table<T>({
  data,
  columns,
  onEdit,
  onDelete,
  emptyMessage = "No hay elementos para mostrar",
  loading = false,
  showActions = true,
  getRowId,
}: TableProps<T>) {
  const hasActions = showActions && (onEdit || onDelete);

  if (loading) {
    return (
      <div className="bg-gray-900/40 border border-gray-800/60 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
                {hasActions && (
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4">
                      <div className="h-5 bg-gray-800/50 rounded w-3/4" />
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <div className="h-8 w-16 bg-gray-800/50 rounded" />
                        <div className="h-8 w-16 bg-gray-800/50 rounded" />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-gray-900/40 border border-gray-800/60 rounded-lg p-12">
        <p className="text-gray-400 text-center text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/40 border border-gray-800/60 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-${column.align || "left"} text-xs font-medium text-gray-400 uppercase tracking-wider`}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.label}
                </th>
              ))}
              {hasActions && (
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {data.map((item, index) => {
              const rowId = getRowId ? getRowId(item) : index;
              return (
                <tr
                  key={rowId}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 text-sm text-gray-300 text-${column.align || "left"}`}
                    >
                      {column.render
                        ? column.render(item)
                        : (item as any)[column.key]}
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="px-3 py-1.5 bg-blue-600/90 text-white text-sm font-medium rounded hover:bg-blue-600 flex items-center gap-1.5 transition-colors"
                            title="Editar"
                          >
                            <Edit size={14} />
                            <span>Editar</span>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="px-3 py-1.5 bg-red-600/90 text-white text-sm font-medium rounded hover:bg-red-600 flex items-center gap-1.5 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                            <span>Eliminar</span>
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

