import { useEffect, useState } from "react";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewList } from "./components/ReviewList";
import { Toaster } from "react-hot-toast";
import { getReviews, createReview } from "./services/reviewService";

const SUBJECTS = [
  "All",
  "Analytical",
  "General Info",
  "Verbal",
  "Verbal & Numerical",
  "Numerical",
];

export default function App() {
  const [reviews, setReviews] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [week, setWeek] = useState("All");

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
      review.category?.toLowerCase().includes(searchTerm) ||
      review.description?.toLowerCase().includes(searchTerm) ||
      review.day_name?.toLowerCase().includes(searchTerm);
    const matchesSubject = subject === "All" || review.category === subject;
    const matchesWeek = week === "All" || String(review.week) === week;
    return matchesSearch && matchesSubject && matchesWeek;
  });

  const weekOptions = [
    ...new Set(reviews.map((r) => r.week).filter(Boolean)),
  ].sort((a, b) => Number(a) - Number(b));

  const selectClass = `
    h-[38px] border-[1.5px] border-[#EDE4D8] rounded-xl px-3 text-sm
    bg-[#FBF8F3] outline-none appearance-none cursor-pointer transition-colors
    focus:border-[#C9B39E] focus:bg-white
  `;

  return (
    <div
      className="min-h-screen px-4 py-6"
      style={{ backgroundColor: "#FBF8F3" }}
    >
      <div className="max-w-xl mx-auto">
        <Toaster position="top-right" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
              style={{ backgroundColor: "#4A3728" }}
            >
              🧠
            </div>
            <div className="min-w-0">
              <h1
                className="text-[15px] font-semibold leading-tight tracking-tight truncate"
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

        {/* Filter bar */}
        <div
          className="flex items-center gap-2 p-2.5 rounded-2xl mb-5"
          style={{ backgroundColor: "#fff", border: "1.5px solid #DDD0C4" }}
        >
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
              style={{ color: "#B09880" }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search topics…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[38px] pl-8 pr-3 text-sm rounded-xl border-[1.5px] outline-none transition-colors"
              style={{
                backgroundColor: "#FBF8F3",
                borderColor: "#EDE4D8",
                color: "#2C1E14",
              }}
            />
          </div>

          <div
            className="w-px h-6 flex-shrink-0"
            style={{ backgroundColor: "#EDE4D8" }}
          />

          {/* Week */}
          <select
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            className={selectClass}
            style={{ color: week === "All" ? "#B09880" : "#2C1E14" }}
          >
            <option value="All">All weeks</option>
            {weekOptions.map((w) => (
              <option key={w} value={String(w)}>
                Week {w}
              </option>
            ))}
          </select>

          {/* Subject */}
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={selectClass}
            style={{ color: subject === "All" ? "#B09880" : "#2C1E14" }}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All subjects" : s}
              </option>
            ))}
          </select>

          <div
            className="w-px h-6 flex-shrink-0"
            style={{ backgroundColor: "#EDE4D8" }}
          />

          {/* Add */}
          <button
            onClick={() => setOpenForm(true)}
            className="flex-shrink-0 h-[38px] flex items-center gap-1.5 text-sm font-medium px-4 rounded-xl transition-opacity active:opacity-80"
            style={{ backgroundColor: "#4A3728", color: "#F5EDE4" }}
          >
            ＋ Add
          </button>
        </div>

        <p
          className="text-[10px] font-semibold uppercase tracking-widest mb-3"
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
