import React from "react";
import type { Column } from "../types/patients.types";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

export interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  pageSiblingCount?: number;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

function buildPageRange(
  current: number,
  total: number,
  siblings: number,
): (number | "…")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);
  const pages: (number | "…")[] = [1];

  if (left > 2) pages.push("…");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("…");
  pages.push(total);

  return pages;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const pages = buildPageRange(currentPage, totalPages, siblingCount);

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-1.5 rounded border border-outline-variant/30 text-outline hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <MdOutlineChevronLeft className="text-[18px]" />
      </button>

      {pages.map((page, idx) =>
        page === "…" ? (
          <span
            key={`ellipsis-${idx}`}
            className="w-8 h-8 flex items-center justify-center text-on-surface-variant text-xs"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
              page === currentPage
                ? "bg-primary text-white font-bold"
                : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-1.5 rounded border border-outline-variant/30 text-outline hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <MdOutlineChevronRight className="text-[18px]" />
      </button>
    </div>
  );
};

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  totalCount,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  pageSiblingCount = 1,
}: TableProps<T>): React.ReactElement => {
  const alignClass = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-outline ${
                    alignClass[col.align ?? "left"]
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-surface-container">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-on-surface-variant"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="hover:bg-surface-container-low/30 transition-colors group"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`px-6 py-4 whitespace-nowrap ${
                        alignClass[col.align ?? "left"]
                      }`}
                    >
                      {col.render ? (
                        col.render(row)
                      ) : (
                        <span className="text-sm text-on-surface">
                          {String(row[col.key as keyof T] ?? "")}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-surface-container-low/20 flex items-center justify-between">
        <span className="text-xs text-on-surface-variant">
          {totalCount !== undefined
            ? `Showing ${data.length} of ${totalCount.toLocaleString()} records`
            : `Showing ${data.length} record${data.length !== 1 ? "s" : ""}`}
        </span>

        {onPageChange && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            siblingCount={pageSiblingCount}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
