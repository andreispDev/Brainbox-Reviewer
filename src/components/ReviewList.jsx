import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ReviewList({ reviews = [] }) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(reviews.length / pageSize);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return reviews.slice(start, start + pageSize);
  }, [reviews, page]);

  return (
    <div className="rounded-lg border border-neutral-200 overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-neutral-50 border-b border-neutral-200">
            <th className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide w-28">
              Day
            </th>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide w-48">
              Category
            </th>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide">
              Topics
            </th>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide w-20">
              Link
            </th>
          </tr>
        </thead>

        <tbody>
          <AnimatePresence>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-16 text-neutral-300">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-3-3v6M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0z"
                      />
                    </svg>
                    <span className="text-xs">No reviews yet</span>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 border border-blue-100 font-medium">
                      {item.day_name}
                    </span>
                  </td>

                  <td className="px-4 py-3 font-medium text-neutral-800">
                    {item.title}
                  </td>

                  <td className="px-4 py-3 text-neutral-400 max-w-xs truncate">
                    {item.description}
                  </td>

                  <td className="px-4 py-3">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-neutral-500 hover:text-neutral-800 underline underline-offset-2 transition-colors"
                      >
                        Open ↗
                      </a>
                    ) : (
                      <span className="text-xs text-neutral-200">—</span>
                    )}
                  </td>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-neutral-100 bg-neutral-50">
        <span className="text-xs text-neutral-400">
          {reviews.length === 0
            ? "No results"
            : `${(page - 1) * pageSize + 1}–${Math.min(
                page * pageSize,
                reviews.length,
              )} of ${reviews.length}`}
        </span>

        <div className="flex items-center gap-1">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-2.5 py-1 text-xs rounded-md border border-neutral-200 text-neutral-500 hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <span className="text-xs text-neutral-400 px-2">
            {page} / {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
            className="px-2.5 py-1 text-xs rounded-md border border-neutral-200 text-neutral-500 hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
