import { useEffect, useState } from "react";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewList } from "./components/ReviewList";
import { Toaster } from "react-hot-toast";
import { getReviews, createReview } from "./services/reviewService";

export default function App() {
  const [reviews, setReviews] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleAdd(data) {
    try {
      await createReview(data);
      await loadReviews();
      setOpenForm(false);
    } catch (e) {
      console.error(e);
    }
  }

  const filteredReviews = reviews.filter((review) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      review.title?.toLowerCase().includes(searchTerm) ||
      review.description?.toLowerCase().includes(searchTerm) ||
      review.day_name?.toLowerCase().includes(searchTerm);

    const matchesSubject =
      subject === "All" ||
      review.subject === subject ||
      review.title === subject;

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 text-sm">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-neutral-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-base font-medium text-neutral-900 leading-tight">
              BrainBox Reviewer
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Computer Science Engineering &amp; General Review
            </p>
          </div>
        </div>

        <span className="text-xs text-neutral-400 bg-neutral-50 border border-neutral-200 rounded-md px-2.5 py-1">
          {filteredReviews.length} reviewer
          {filteredReviews.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-sm border border-neutral-200 rounded-md bg-white text-neutral-800 placeholder-neutral-400 outline-none focus:ring-1 focus:ring-neutral-300 w-56"
            />
          </div>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="text-sm border border-neutral-200 rounded-md px-2.5 py-1.5 bg-white text-neutral-700 outline-none focus:ring-1 focus:ring-neutral-300"
          >
            <option value="All">All</option>
            <option value="CSE">CSE</option>
            <option value="Mathematics">Mathematics</option>
            <option value="General Engineering">General Engineering</option>
          </select>
        </div>

        <button
          onClick={() => setOpenForm(true)}
          className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Review
        </button>
      </div>

      <hr className="border-t border-neutral-100 mb-4" />

      <ReviewForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onAdd={handleAdd}
      />

      <ReviewList reviews={filteredReviews} />
    </div>
  );
}
