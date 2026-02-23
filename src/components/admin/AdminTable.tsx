"use client";

import { Pencil, Trash2 } from "lucide-react";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

interface AdminTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  onEdit: (row: T) => void;
  onDelete: (id: string) => void;
  emptyMessage?: string;
}

export default function AdminTable<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  emptyMessage = "No records found.",
}: AdminTableProps<T>) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide text-xs"
                >
                  {col.label}
                </th>
              ))}
              <th className="text-right px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide text-xs">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-border last:border-0 ${
                    idx % 2 === 0 ? "bg-background" : "bg-muted/20"
                  } hover:bg-primary/5 transition-colors`}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-foreground">
                      {col.render
                        ? col.render(row)
                        : String((row as any)[col.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(row)}
                        className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => onDelete(row.id)}
                        className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
