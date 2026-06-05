import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/axios";
import ProfileCard from "../components/ProfileCard";

const initialFilters = {
  religion: "",
  maritalStatus: "",
  minAge: "21",
  maxAge: "35",
  state: "",
  caste: "",
  motherTongue: "",
  diet: "",
  manglikStatus: "",
  familyType: "",
  city: "",
  education: "",
  profession: ""
};

// Always-visible filters
const primaryFilterDefs = [
  { key: "religion", label: "Religion", type: "text", hint: "Leave blank for any" },
  {
    key: "maritalStatus",
    label: "Marital Status",
    type: "select",
    options: [
      { value: "", label: "Any" },
      { value: "never married", label: "Never Married" },
      { value: "divorced", label: "Divorced" },
      { value: "widowed", label: "Widowed" },
      { value: "awaiting divorce", label: "Awaiting Divorce" }
    ]
  },
  { key: "minAge", label: "Min Age", type: "text", hint: "Min: 18" },
  { key: "maxAge", label: "Max Age", type: "text", hint: "Max: 80" },
  { key: "state", label: "State", type: "text" }
];

// Collapsible extra filters
const moreFilterDefs = [
  { key: "caste", label: "Caste / Community", type: "text" },
  {
    key: "motherTongue",
    label: "Mother Tongue",
    type: "select",
    options: [
      { value: "", label: "Any" },
      { value: "Hindi", label: "Hindi" },
      { value: "Bengali", label: "Bengali" },
      { value: "Telugu", label: "Telugu" },
      { value: "Marathi", label: "Marathi" },
      { value: "Tamil", label: "Tamil" },
      { value: "Gujarati", label: "Gujarati" },
      { value: "Kannada", label: "Kannada" },
      { value: "Malayalam", label: "Malayalam" },
      { value: "Punjabi", label: "Punjabi" },
      { value: "Odia", label: "Odia" },
      { value: "Assamese", label: "Assamese" },
      { value: "Urdu", label: "Urdu" },
      { value: "Maithili", label: "Maithili" },
      { value: "Bhojpuri", label: "Bhojpuri" },
      { value: "Rajasthani", label: "Rajasthani" },
      { value: "Sindhi", label: "Sindhi" },
      { value: "Tulu", label: "Tulu" },
      { value: "Konkani", label: "Konkani" },
      { value: "Nepali", label: "Nepali" }
    ]
  },
  {
    key: "diet",
    label: "Diet",
    type: "select",
    options: [
      { value: "", label: "Any" },
      { value: "veg", label: "Vegetarian" },
      { value: "non-veg", label: "Non-Vegetarian" },
      { value: "eggetarian", label: "Eggetarian" },
      { value: "vegan", label: "Vegan" }
    ]
  },
  {
    key: "manglikStatus",
    label: "Manglik Status",
    type: "select",
    options: [
      { value: "", label: "Any" },
      { value: "manglik", label: "Manglik" },
      { value: "non-manglik", label: "Non-Manglik" },
      { value: "dont know", label: "Don't Know" }
    ]
  },
  {
    key: "familyType",
    label: "Family Type",
    type: "select",
    options: [
      { value: "", label: "Any" },
      { value: "nuclear", label: "Nuclear Family" },
      { value: "joint", label: "Joint Family" }
    ]
  },
  { key: "city", label: "City", type: "text" },
  { key: "education", label: "Education", type: "text" },
  { key: "profession", label: "Profession", type: "text" }
];

const Matches = () => {
  const [profiles, setProfiles] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [interestingIds, setInterestingIds] = useState(new Set());
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const activeMoreCount = moreFilterDefs.filter((f) => filters[f.key]).length;

  const fetchProfiles = async (selectedPage = page, selectedFilters = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ ...selectedFilters, page: selectedPage, limit: 10 });
      const { data } = await api.get(`/matches/suggestions?${params.toString()}`);
      setProfiles(data.users || []);
      setPagination(data.pagination);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialProfiles = async () => {
      const params = new URLSearchParams({ ...initialFilters, page: 1, limit: 10 });
      const { data } = await api.get(`/matches/suggestions?${params.toString()}`);
      setProfiles(data.users || []);
      setPagination(data.pagination);
    };

    loadInitialProfiles().catch(() => null).finally(() => setLoading(false));
  }, []);

  const handleInterest = async (id) => {
    setInterestingIds((prev) => new Set([...prev, id]));
    try {
      const { data } = await api.post(`/matches/interest/${id}`);
      toast.success(data.message);
      setProfiles((prev) => prev.filter((p) => p._id !== id));
      setPagination((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send interest.");
    } finally {
      setInterestingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleApply = async () => {
    setPage(1);
    await fetchProfiles(1, filters);
  };

  const handleReset = async () => {
    setFilters(initialFilters);
    setShowMoreFilters(false);
    setPage(1);
    await fetchProfiles(1, initialFilters);
  };

  const renderField = (field) => {
    if (field.type === "select") {
      return (
        <label key={field.key} className="field-stack">
          <span>{field.label}</span>
          <select
            value={filters[field.key]}
            onChange={(e) => setFilters({ ...filters, [field.key]: e.target.value })}
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      );
    }

    return (
      <label key={field.key} className="field-stack">
        <span>{field.label}</span>
        {field.hint && <small>{field.hint}</small>}
        <input
          placeholder={field.label}
          value={filters[field.key]}
          onChange={(e) => setFilters({ ...filters, [field.key]: e.target.value })}
        />
      </label>
    );
  };

  return (
    <section className="page-shell">
      <div className="page-banner">
        <div className="section-heading inline-heading">
          <div>
            <span>Find Matches</span>
            <h1>Search for someone who genuinely fits your life and values.</h1>
            <p className="section-copy">
              Use filters thoughtfully. Don't narrow too much on the first try — let good profiles appear first.
            </p>
          </div>
          <span className="status-pill">{pagination.total} profiles found</span>
        </div>
      </div>

      <div className="filter-panel">
        <div className="section-heading">
          <span>Smart Filters</span>
          <h2>Refine your search slowly and clearly.</h2>
        </div>

        <div className="filter-grid">
          {primaryFilterDefs.map(renderField)}
        </div>

        <button
          type="button"
          className="filter-more-toggle"
          onClick={() => setShowMoreFilters((v) => !v)}
        >
          {showMoreFilters ? "− Hide filters" : "+ More filters"}
          {activeMoreCount > 0 && !showMoreFilters && (
            <span className="nav-badge">{activeMoreCount}</span>
          )}
        </button>

        {showMoreFilters && (
          <div className="filter-grid filter-more-section">
            {moreFilterDefs.map(renderField)}
          </div>
        )}

        <div className="helper-ribbon">
          Tip: start broad with age and religion, then add diet or marital status only if it matters to you.
        </div>

        <div className="filter-actions">
          <button className="primary-button" onClick={handleApply}>
            Apply Filters
          </button>
          <button className="secondary-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">Loading profiles...</div>
      ) : profiles.length ? (
        <div className="cards-grid">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile._id}
              profile={profile}
              onInterest={handleInterest}
              actionDisabled={interestingIds.has(profile._id)}
              actionLabel={interestingIds.has(profile._id) ? "Sending..." : "Send Interest"}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">No profiles matched your current filters. Try a broader search.</div>
      )}

      <div className="pagination-row">
        <button
          className="secondary-button"
          onClick={() => {
            const nextPage = Math.max(1, page - 1);
            setPage(nextPage);
            fetchProfiles(nextPage).catch(() => null);
          }}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="status-pill">
          Page {pagination.page} of {pagination.pages}
        </span>

        <button
          className="secondary-button"
          onClick={() => {
            const nextPage = Math.min(pagination.pages, page + 1);
            setPage(nextPage);
            fetchProfiles(nextPage).catch(() => null);
          }}
          disabled={page === pagination.pages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Matches;
