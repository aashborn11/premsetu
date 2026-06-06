import { Link } from "react-router-dom";
import { CHAT_ENABLED } from "../config";

const MatchCard = ({ profile, type = "match" }) => {
  // Chat is gated behind CHAT_ENABLED. When off, a mutual match should open the
  // profile (not a dead /chat route that redirects to the dashboard).
  const isChat = type === "match" && CHAT_ENABLED;
  const to = isChat ? `/chat/${profile._id}` : `/profile/${profile._id}`;
  const cta = isChat ? "Open Chat" : "View Profile";

  return (
    <article className="match-card">
      <div className="match-card-media">
        <img
          src={profile.profilePhoto || "https://placehold.co/400x400/fdeef4/c2185b?text=PS"}
          alt={profile.fullName}
        />
      </div>

      <div>
        <div className="chip-row">
          <span className="status-pill">{type === "match" ? "Mutual match" : "Profile view"}</span>
        </div>
        <h4>{profile.fullName}</h4>
        <p className="match-subline">
          {profile.city || "India"} | {profile.profession || "Profession pending"}
        </p>
        <div className="chip-row">
          <span className="chip">{profile.religion || "Any religion"}</span>
          <span className="chip">{profile.education || "Profile building"}</span>
          <span className="chip">{profile.motherTongue || "Language pending"}</span>
        </div>
      </div>

      <Link className="secondary-button" to={to}>{cta}</Link>
    </article>
  );
};

export default MatchCard;
