import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "../components/ProfileCard";
import MatchCard from "../components/MatchCard";
import { Mandala } from "../components/Festive";

/* Circular profile-strength ring (SVG, brand gradient) */
const ProgressRing = ({ value = 0, size = 116 }) => {
  const stroke = 9;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(100, Math.max(0, value)) / 100) * circ;
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="ring-svg" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d81b60" />
            <stop offset="1" stopColor="#f57c00" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke="rgba(194,24,91,0.12)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke="url(#ringGrad)" strokeWidth={stroke} strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)" }} />
      </svg>
      <span className="ring-label">{value}<small>%</small></span>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [completion, setCompletion] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [stats, setStats] = useState({ sent: 0, received: 0, matches: 0 });
  const [interestingIds, setInterestingIds] = useState(new Set());

  useEffect(() => {
    const loadDashboard = async () => {
      const [profileRes, suggestionRes, sentRes, receivedRes, matchRes] = await Promise.all([
        api.get("/profile/me"),
        api.get("/matches/suggestions?limit=4"),
        api.get("/matches/interests-sent"),
        api.get("/matches/interests-received"),
        api.get("/matches/my-matches")
      ]);

      setCompletion(profileRes.data.completionPercentage || 0);
      setSuggestions(suggestionRes.data.users || []);
      const matchUsers = matchRes.data.users || [];
      setMatches(matchUsers);
      setStats({
        sent: sentRes.data.users.length,
        received: receivedRes.data.users.length,
        matches: matchUsers.length
      });
    };

    loadDashboard().catch(() => null).finally(() => setLoading(false));
  }, []);

  const handleInterest = async (id) => {
    setInterestingIds((prev) => new Set([...prev, id]));
    try {
      const { data } = await api.post(`/matches/interest/${id}`);
      toast.success(data.message);
      setSuggestions((prev) => prev.filter((p) => p._id !== id));
      if (data.matched) {
        setStats((prev) => ({ ...prev, sent: prev.sent + 1, matches: prev.matches + 1 }));
      } else {
        setStats((prev) => ({ ...prev, sent: prev.sent + 1 }));
      }
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

  const firstName = user?.fullName?.split(" ")?.[0] || "there";

  const dashboardTip = useMemo(() => {
    if (completion < 50) {
      return "Complete your profile details first. A fuller profile gets better replies.";
    }
    if (!user?.profilePhoto) {
      return "Add a profile photo next. Profiles with photos get more interest.";
    }
    if (!stats.sent) {
      return "Send a couple of thoughtful interests. Quality beats quantity here.";
    }
    return "You're all set. Keep your profile fresh and reply warmly to good matches.";
  }, [completion, stats.sent, user?.profilePhoto]);

  return (
    <section className="page-shell">
      <div className="dashboard-hero">
        <div className="dashboard-hero-card">
          <Mandala className="dashboard-hero-mandala" />
          <span className="eyebrow">🪔 Your Dashboard</span>
          <h1>Namaste, {firstName}</h1>
          <p className="support-copy">
            Track your profile and respond to interests — all in one place.
          </p>
          <div className="dashboard-actions">
            <Link className="primary-button" to="/edit-profile">
              Improve Profile
            </Link>
            <Link className="secondary-button" to="/matches">
              See Matches
            </Link>
          </div>
          <div className="dashboard-tags">
            <span className="badge">Verified community</span>
            <span className="badge">Made for serious intent</span>
          </div>
        </div>

        <aside className="dashboard-side-panel">
          <span className="eyebrow">Profile Strength</span>
          <div className="ring-row">
            <ProgressRing value={completion} />
            <p className="muted-copy">A complete profile earns more trust and better replies.</p>
          </div>
          <div className="helper-ribbon">{dashboardTip}</div>
        </aside>
      </div>

      {user && !user.isPaid && (
        <div className="dashboard-upgrade-banner">
          <div className="dashboard-upgrade-text">
            <strong>✨ Unlock full profiles &amp; contact details</strong>
            <span>
              One-time ₹499 · lifetime access · see religion, education,
              profession and phone numbers of every match.
            </span>
          </div>
          <Link to="/membership" className="primary-button dashboard-upgrade-btn">
            Become a Member
          </Link>
        </div>
      )}

      <div className="stats-grid small fest-stagger">
        <article className="stat-card">
          <span className="stat-icon">✉️</span>
          <div className="stat-body"><h2>{stats.sent}</h2><p>Interests Sent</p></div>
        </article>
        <article className="stat-card">
          <span className="stat-icon">💌</span>
          <div className="stat-body"><h2>{stats.received}</h2><p>Interests Received</p></div>
        </article>
        <article className="stat-card">
          <span className="stat-icon">💞</span>
          <div className="stat-body"><h2>{stats.matches}</h2><p>Mutual Matches</p></div>
        </article>
        <article className="stat-card">
          <span className="stat-icon">⭐</span>
          <div className="stat-body"><h2>{completion}%</h2><p>Profile Strength</p></div>
        </article>
      </div>

      <div className="section-heading inline-heading">
        <div>
          <span>Suggested Profiles</span>
          <h2>Picked for you</h2>
        </div>
        <Link to="/matches">See all</Link>
      </div>

      {loading ? (
        <div className="empty-state">Loading suggestions...</div>
      ) : suggestions.length ? (
        <div className="cards-grid fest-stagger">
          {suggestions.map((profile) => (
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
        <div className="empty-state">No new suggestions yet. Complete your profile to see more.</div>
      )}

      <div className="section-heading inline-heading">
        <div>
          <span>Recent Activity</span>
          <h2>Your matches</h2>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">Loading matches...</div>
      ) : matches.length ? (
        <div className="match-list">
          {matches.slice(0, 4).map((profile) => (
            <MatchCard key={profile._id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          No mutual matches yet. Keep your profile complete and warm — the right people respond to that.
        </div>
      )}
    </section>
  );
};

export default Dashboard;
