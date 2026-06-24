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

  const input =
    "w-full border border-neutral-200 rounded-md px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-neutral-300 transition";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />

          {/* Modal */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ scale: 0.98, opacity: 0, y: 6 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="relative bg-white w-full max-w-md rounded-xl border border-neutral-200 p-6 text-sm z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-medium text-neutral-900">
                  Add review
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Fill in the details below
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-md border border-neutral-200 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 transition text-base leading-none"
              >
                ×
              </button>
            </div>

            <div className="h-px bg-neutral-100 mb-4" />

            {/* Fields */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-500">
                    Day
                  </label>
                  <input
                    name="day_name"
                    placeholder="e.g. Monday"
                    value={form.day_name}
                    onChange={handleChange}
                    className={input}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-500">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="title"
                    placeholder="Review title"
                    value={form.title}
                    onChange={handleChange}
                    className={input}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-500">
                  Link
                </label>
                <input
                  name="link"
                  placeholder="https://"
                  value={form.link}
                  onChange={handleChange}
                  className={input}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-500">
                  Topic <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Write a brief description..."
                  value={form.description}
                  onChange={handleChange}
                  className={`${input} h-24 resize-none`}
                />
              </div>
            </div>

            <div className="h-px bg-neutral-100 my-4" />

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs rounded-md border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-3.5 py-1.5 text-xs rounded-md bg-neutral-900 text-white hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Adding…" : "Add review"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
