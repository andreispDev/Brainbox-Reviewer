import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export function ReviewForm({ onAdd, open, onClose }) {
  const [form, setForm] = useState({
    day_name: "",
    title: "",
    link: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const resetForm = () =>
    setForm({ day_name: "", title: "", link: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error("Title and description are required");
      return;
    }
    try {
      setLoading(true);
      await onAdd(form);
      toast.success("Review added");
      resetForm();
      onClose();
    } catch {
      toast.error("Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(44, 30, 20, 0.35)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.form
            onSubmit={handleSubmit}
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
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ backgroundColor: "#4A3728" }}
                >
                  📝
                </div>
                <div>
                  <h2
                    className="text-sm font-semibold leading-tight"
                    style={{ color: "#2C1E14" }}
                  >
                    Add review item
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: "#9C8270" }}>
                    Fill in the topic details below
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
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

            {/* Fields */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "#9C8270", letterSpacing: "0.06em" }}
                  >
                    Day
                  </label>
                  <input
                    name="day_name"
                    placeholder="e.g. Monday"
                    value={form.day_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm rounded-xl outline-none transition-colors"
                    style={{
                      backgroundColor: "#fff",
                      border: "1.5px solid #DDD0C4",
                      color: "#2C1E14",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "#9C8270", letterSpacing: "0.06em" }}
                  >
                    Subject <span style={{ color: "#C0705A" }}>*</span>
                  </label>
                  <select
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm rounded-xl outline-none transition-colors appearance-none"
                    style={{
                      backgroundColor: "#fff",
                      border: "1.5px solid #DDD0C4",
                      color: form.title ? "#2C1E14" : "#B09880",
                    }}
                  >
                    <option value="" disabled>
                      Pick subject…
                    </option>
                    <option value="Analytical">Analytical</option>
                    <option value="General Info">General Info</option>
                    <option value="Verbal Ability & Numerical">
                      Verbal Ability
                    </option>
                    <option value="Numerical Ability">Numerical</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#9C8270", letterSpacing: "0.06em" }}
                >
                  Link
                </label>
                <input
                  name="link"
                  placeholder="https://"
                  value={form.link}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none transition-colors"
                  style={{
                    backgroundColor: "#fff",
                    border: "1.5px solid #DDD0C4",
                    color: "#2C1E14",
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#9C8270", letterSpacing: "0.06em" }}
                >
                  Topic <span style={{ color: "#C0705A" }}>*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Write a brief description of what to review…"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: "#fff",
                    border: "1.5px solid #DDD0C4",
                    color: "#2C1E14",
                  }}
                />
              </div>
            </div>

            <div
              className="mt-4 mb-4"
              style={{ height: "1px", backgroundColor: "#EDE4D8" }}
            />

            {/* Actions */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors"
                style={{
                  borderColor: "#DDD0C4",
                  color: "#7A5C44",
                  backgroundColor: "#fff",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "#4A3728",
                  color: "#F5EDE4",
                }}
              >
                {loading ? "Adding…" : "Add review ✓"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
