import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ReviewList({ reviews = [] }) {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const pageSize = 10;

  const totalPages = Math.ceil(reviews.length / pageSize);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return reviews.slice(start, start + pageSize);
  }, [reviews, page]);

  return (
    <>
      <div className="rounded-lg border border-neutral-200 overflow-hidden bg-white">
        {/* Mobile card list */}
        <div className="block md:hidden divide-y divide-neutral-100">
          {paginated.length === 0 ? (
            <div className="py-10 text-center text-neutral-400 text-sm">
              No reviewers yet
            </div>
          ) : (
            paginated.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className="w-full text-left px-4 py-3.5 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-neutral-400 truncate mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 mt-0.5">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 border border-blue-100 font-medium">
                      {item.day_name}
                    </span>
                    <svg
                      className="w-3.5 h-3.5 text-neutral-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Desktop table */}
        <table className="hidden md:table w-full text-sm">
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
                  <td
                    colSpan={4}
                    className="text-center py-16 text-neutral-300"
                  >
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
                    onClick={() => setSelected(item)}
                    className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors cursor-pointer"
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
                        <span className="text-xs text-neutral-500 underline underline-offset-2">
                          Open ↗
                        </span>
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

        {/* Pagination footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-neutral-100 bg-neutral-50">
          <span className="text-xs text-neutral-400">
            {reviews.length === 0
              ? "No results"
              : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, reviews.length)} of ${reviews.length}`}
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

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setSelected(null)}
            />

            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 6 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              className="relative bg-white w-full max-w-md rounded-xl border border-neutral-200 p-6 z-10 text-sm"
            >
              {/* Modal header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <h2 className="text-sm font-medium text-neutral-900 leading-snug">
                    {selected.title}
                  </h2>
                  <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 border border-blue-100 font-medium">
                    {selected.day_name}
                  </span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md border border-neutral-200 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 transition-colors text-base leading-none"
                >
                  ×
                </button>
              </div>

              <div className="h-px bg-neutral-100 mb-4" />

              {/* Fields */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-neutral-400 mb-1">
                    Description
                  </p>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {selected.description || (
                      <span className="text-neutral-300 italic">
                        No description
                      </span>
                    )}
                  </p>
                </div>

                {selected.link && (
                  <div>
                    <p className="text-xs font-medium text-neutral-400 mb-1">
                      Link
                    </p>
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:text-blue-700 underline underline-offset-2 transition-colors break-all"
                    >
                      {selected.link} ↗
                    </a>
                  </div>
                )}
              </div>

              <div className="h-px bg-neutral-100 mt-4 mb-3" />

              <div className="flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-3.5 py-1.5 text-xs rounded-md border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
