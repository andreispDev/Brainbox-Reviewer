import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const subjectColors = {
  Analytical: { bg: "#E8F0FE", color: "#2C4EA5", dot: "#4A6FD4" },
  "General Info": { bg: "#F3E8FE", color: "#6B35A5", dot: "#9B59D0" },
  "Verbal Ability & Numerical": {
    bg: "#E8F8F1",
    color: "#1B7A4A",
    dot: "#2EAD6A",
  },
  "Numerical Ability": { bg: "#FFF3E0", color: "#B55A00", dot: "#E07B1A" },
};

function SubjectTag({ subject }) {
  const style = subjectColors[subject] || {
    bg: "#EDE4D8",
    color: "#7A5C44",
    dot: "#B09880",
  };
  const label =
    subject === "Verbal Ability & Numerical"
      ? "Verbal"
      : subject === "Numerical Ability"
        ? "Numerical"
        : subject || "General";
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: style.dot }}
      />
      {label}
    </span>
  );
}

export function ReviewList({ reviews = [] }) {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const pageSize = 5;

  const totalPages = Math.ceil(reviews.length / pageSize);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return reviews.slice(start, start + pageSize);
  }, [reviews, page]);

  return (
    <>
      {/* Card list */}
      <div className="space-y-2.5">
        {paginated.length === 0 ? (
          <div
            className="rounded-2xl py-16 text-center"
            style={{ backgroundColor: "#fff", border: "1.5px dashed #DDD0C4" }}
          >
            <div className="text-3xl mb-3">📭</div>
            <p className="text-sm font-medium" style={{ color: "#9C8270" }}>
              No review items yet
            </p>
            <p className="text-xs mt-1" style={{ color: "#B09880" }}>
              Tap "Add" to create your first topic
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {paginated.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, delay: i * 0.03 }}
                onClick={() => setSelected(item)}
                className="w-full text-left rounded-2xl p-4 flex items-start gap-3 transition-colors active:scale-[0.99]"
                style={{
                  backgroundColor: "#fff",
                  border: "1.5px solid #EDE4D8",
                }}
              >
                {/* Day badge */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex flex-col items-center justify-center"
                  style={{ backgroundColor: "#EDE4D8" }}
                >
                  <span
                    className="text-sm font-bold leading-none"
                    style={{ color: "#4A3728" }}
                  >
                    {item.day_name?.replace(/\D/g, "") || "—"}
                  </span>
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wide mt-0.5"
                    style={{ color: "#9C8270" }}
                  >
                    {item.day_name?.replace(/\d/g, "").trim().slice(0, 3) ||
                      "Day"}
                  </span>
                </div>

                {/* Left accent stripe */}
                <div
                  className="self-stretch w-0.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor:
                      subjectColors[item.subject]?.dot || "#C9B39E",
                  }}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className="text-sm font-semibold truncate leading-snug"
                      style={{ color: "#2C1E14" }}
                    >
                      {item.title}
                    </p>
                    <span
                      className="flex-shrink-0 text-base"
                      style={{ color: "#C9B39E" }}
                    >
                      ›
                    </span>
                  </div>
                  <p
                    className="text-xs mt-1 line-clamp-2 leading-relaxed"
                    style={{ color: "#7A5C44" }}
                  >
                    {item.description}
                  </p>
                  <div className="mt-2">
                    <SubjectTag subject={item.subject || item.title} />
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="flex items-center justify-between mt-4 px-4 py-3 rounded-2xl"
          style={{ backgroundColor: "#fff", border: "1.5px solid #EDE4D8" }}
        >
          <span className="text-xs" style={{ color: "#9C8270" }}>
            {`${(page - 1) * pageSize + 1}–${Math.min(
              page * pageSize,
              reviews.length,
            )} of ${reviews.length}`}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 text-xs font-medium rounded-xl border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                borderColor: "#DDD0C4",
                color: "#7A5C44",
                backgroundColor: "#FBF8F3",
              }}
            >
              ← Prev
            </button>
            <span className="text-xs font-medium" style={{ color: "#4A3728" }}>
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 text-xs font-medium rounded-xl border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                borderColor: "#DDD0C4",
                color: "#7A5C44",
                backgroundColor: "#FBF8F3",
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(44, 30, 20, 0.35)" }}
              onClick={() => setSelected(null)}
            />

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative w-full max-w-md z-10 rounded-2xl p-5 sm:p-6"
              style={{
                backgroundColor: "#FBF8F3",
                border: "1.5px solid #DDD0C4",
              }}
            >
              {/* Modal header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ backgroundColor: "#4A3728" }}
                  >
                    📖
                  </div>
                  <div className="min-w-0">
                    <h2
                      className="text-sm font-semibold leading-snug truncate"
                      style={{ color: "#2C1E14" }}
                    >
                      {selected.title}
                    </h2>
                    <div className="mt-1">
                      <SubjectTag
                        subject={selected.subject || selected.title}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-base leading-none transition-colors"
                  style={{
                    border: "1.5px solid #DDD0C4",
                    color: "#9C8270",
                    backgroundColor: "#fff",
                  }}
                >
                  ×
                </button>
              </div>

              <div
                className="mb-4"
                style={{ height: "1px", backgroundColor: "#EDE4D8" }}
              />

              {/* Day row */}
              {selected.day_name && (
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "#9C8270", letterSpacing: "0.06em" }}
                  >
                    Day
                  </span>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "#EDE4D8", color: "#4A3728" }}
                  >
                    {selected.day_name}
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="mb-3">
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-1.5"
                  style={{ color: "#9C8270", letterSpacing: "0.06em" }}
                >
                  Topic
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#3D2A1E" }}
                >
                  {selected.description || (
                    <span className="italic" style={{ color: "#B09880" }}>
                      No description provided.
                    </span>
                  )}
                </p>
              </div>

              {/* Link */}
              {selected.link && (
                <div
                  className="rounded-xl px-3 py-2.5 flex items-center gap-2"
                  style={{ backgroundColor: "#EDE4D8" }}
                >
                  <span className="text-sm">🔗</span>
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium truncate underline underline-offset-2 transition-opacity hover:opacity-70"
                    style={{ color: "#4A3728" }}
                  >
                    {selected.link}
                  </a>
                  <span
                    className="text-xs ml-auto flex-shrink-0"
                    style={{ color: "#9C8270" }}
                  >
                    ↗
                  </span>
                </div>
              )}

              <div
                className="mt-4 mb-3"
                style={{ height: "1px", backgroundColor: "#EDE4D8" }}
              />

              <div className="flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 text-sm font-medium rounded-xl border transition-colors"
                  style={{
                    borderColor: "#DDD0C4",
                    color: "#7A5C44",
                    backgroundColor: "#fff",
                  }}
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
