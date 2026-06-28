import { useEffect, useState } from "react";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewList } from "./components/ReviewList";
import { Toaster } from "react-hot-toast";
import { getReviews, createReview } from "./services/reviewService";

const SUBJECTS = [
  "All",
  "Analytical",
  "General Info",
  "Verbal Ability & Numerical",
  "Numerical Ability",
];

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
    <div
      className="min-h-screen px-4 py-6"
      style={{ backgroundColor: "#FBF8F3" }}
    >
      <div className="max-w-xl mx-auto">
        <Toaster position="top-right" />

        {/* Header */}
        <div className="flex items-start justify-between mb-6 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
              style={{ backgroundColor: "#4A3728" }}
            >
              🧠
            </div>
            <div className="min-w-0">
              <h1
                className="text-base font-semibold leading-tight tracking-tight truncate"
                style={{ color: "#2C1E14" }}
              >
                BrainBox Reviewer
              </h1>
              <p
                className="text-xs mt-0.5 truncate"
                style={{ color: "#9C8270" }}
              >
                CS Engineering &amp; General Review
              </p>
            </div>
          </div>
          <span
            className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border whitespace-nowrap"
            style={{
              backgroundColor: "#EDE4D8",
              borderColor: "#D9CABC",
              color: "#7A5C44",
            }}
          >
            {filteredReviews.length} topic
            {filteredReviews.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Subject chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className="flex-shrink-0 text-xs font-medium px-4 py-1.5 rounded-full border-2 transition-all duration-150 whitespace-nowrap"
              style={
                subject === s
                  ? {
                      backgroundColor: "#4A3728",
                      color: "#F5EDE4",
                      borderColor: "#4A3728",
                    }
                  : {
                      backgroundColor: "#fff",
                      color: "#7A5C44",
                      borderColor: "#DDD0C4",
                    }
              }
            >
              {s === "Verbal Ability & Numerical"
                ? "Verbal"
                : s === "Numerical Ability"
                  ? "Numerical"
                  : s}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex gap-2 mb-5 items-center">
          <div className="relative flex-1">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
              style={{ color: "#B09880" }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search topics…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border-2 outline-none transition-colors"
              style={{
                backgroundColor: "#fff",
                borderColor: "#DDD0C4",
                color: "#2C1E14",
              }}
            />
          </div>
          <button
            onClick={() => setOpenForm(true)}
            className="flex-shrink-0 flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-xl transition-opacity active:opacity-80"
            style={{ backgroundColor: "#4A3728", color: "#F5EDE4" }}
          >
            ＋ Add
          </button>
        </div>

        {/* Section label */}
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "#B09880", letterSpacing: "0.07em" }}
        >
          Review items
        </p>

        <ReviewForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onAdd={handleAdd}
        />
        <ReviewList reviews={filteredReviews} />
      </div>
    </div>
  );
}
