import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios";
import { getSocket } from "../utils/socket";
import { LogoA } from "./Logo";
import { CHAT_ENABLED } from "../config";

const Navbar = () => {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  /* Elevate navbar once the page is scrolled */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Fetch unread count + live socket updates — skipped when chat is disabled */
  useEffect(() => {
    if (!CHAT_ENABLED || !user) { setUnreadCount(0); return undefined; }

    const fetchUnread = async () => {
      try {
        const { data } = await api.get("/chat/unread-count");
        setUnreadCount(data.count || 0);
      } catch { /* silently ignore */ }
    };
    fetchUnread();

    const socket = getSocket();
    if (!socket) return undefined;

    const handleNewMessage = (msg) => {
      if (msg.receiver._id === user?._id && !location.pathname.startsWith("/chat/")) {
        setUnreadCount((prev) => prev + 1);
      }
    };
    socket.on("chat:new-message", handleNewMessage);
    return () => socket.off("chat:new-message", handleNewMessage);
  }, [user, location.pathname]);

  /* Clear badge when inside chat */
  useEffect(() => {
    if (CHAT_ENABLED && location.pathname.startsWith("/chat/")) setUnreadCount(0);
  }, [location.pathname]);

  const handleLogout = () => { logout(); navigate("/login"); };
  const navCls = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <header className="navbar-shell">
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>

        {/* ── Logo ── */}
        <Link to="/" className="brand-mark">
          <LogoA height={34} />
        </Link>

        {/* ── Mobile hamburger ── */}
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* ── Nav groups ── */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>

          {/* PRIMARY NAV — left group */}
          <div className="nav-primary">
            <NavLink to="/" className={navCls}>Home</NavLink>
            {/* Browse Profiles visible to everyone — PaidRoute on the route handles gating */}
            <NavLink to="/matches" className={navCls}>Browse Profiles</NavLink>
            {user && (
              <>
                {CHAT_ENABLED && (
                  <NavLink
                    to="/chat-list"
                    className={navCls}
                    style={{ position: "relative" }}
                  >
                    Messages
                    {unreadCount > 0 && (
                      <span className="nav-badge">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </NavLink>
                )}
                {/* Dashboard is always last */}
                <NavLink to="/dashboard" className={navCls}>Dashboard</NavLink>
              </>
            )}
          </div>

          {/* USER / AUTH GROUP — right */}
          <div className="nav-user-group">
            {user ? (
              <>
                <NavLink to="/profile" className={navCls}>My Profile</NavLink>
                <button type="button" className="nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login"    className={navCls}>Login</NavLink>
                <NavLink to="/register" className="primary-button small">Register</NavLink>
              </>
            )}
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
