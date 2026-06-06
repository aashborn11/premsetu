import { Link } from "react-router-dom";

const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return "--";
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age -= 1;
  return age;
};

const ProfileCard = ({ profile, onInterest, actionLabel = "Send Interest", actionDisabled = false }) => {
  // Paid users: full profile has dateOfBirth → compute age. Teaser: age is pre-computed.
  const age = typeof profile.age === "number" ? profile.age : calculateAge(profile.dateOfBirth);
  const location = [profile.city, profile.state].filter(Boolean).join(", ") || "India";

  // Only show facts that actually exist; location always shows.
  const facts = [
    profile.religion   && { icon: "🛕", text: profile.religion },
    profile.education  && { icon: "🎓", text: profile.education },
    profile.profession && { icon: "💼", text: profile.profession },
    { icon: "📍", text: location }
  ].filter(Boolean);

  return (
    <article className="profile-card">
      <div className="profile-card-media">
        <img
          src={profile.profilePhoto || "https://placehold.co/700x880/fdeef4/c2185b?text=PremSetu"}
          alt={profile.fullName}
        />
        <span className={`profile-card-badge${profile.isProfileComplete ? " is-verified" : ""}`}>
          {profile.isProfileComplete ? "✓ Verified" : "New"}
        </span>
        <div className="profile-card-overlay">
          <h3>{profile.fullName}</h3>
          <p>{age === "--" ? "Age —" : `${age} years`}</p>
        </div>
      </div>

      <div className="profile-card-content">
        <ul className="profile-facts">
          {facts.map((f, i) => (
            <li key={i}>
              <span className="profile-fact-icon">{f.icon}</span>
              <span className="profile-fact-text">{f.text}</span>
            </li>
          ))}
        </ul>

        <div className="card-actions">
          <button
            className="primary-button"
            onClick={() => onInterest?.(profile._id)}
            disabled={actionDisabled}
          >
            ♥ {actionLabel}
          </button>
          <Link className="ghost-button" to={`/profile/${profile._id}`}>
            View
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProfileCard;
