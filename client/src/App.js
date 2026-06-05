import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HelpBot from "./components/HelpBot";
import ProtectedRoute from "./components/ProtectedRoute";
import PaidRoute from "./components/PaidRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Matches from "./pages/Matches";
import Membership from "./pages/Membership";
import ViewProfile from "./pages/ViewProfile";
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";
import NotFound from "./pages/NotFound";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ContactUs from "./pages/ContactUs";
import { CHAT_ENABLED } from "./config";

const App = () => (
  <div className="app-shell">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/membership"
        element={
          <ProtectedRoute>
            <Membership />
          </ProtectedRoute>
        }
      />
      <Route
        path="/matches"
        element={
          <PaidRoute>
            <Matches />
          </PaidRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <ViewProfile />
          </ProtectedRoute>
        }
      />

      {/* ── Chat routes — hidden when CHAT_ENABLED = false ── */}
      <Route
        path="/chat-list"
        element={
          CHAT_ENABLED ? (
            <ProtectedRoute><ChatList /></ProtectedRoute>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route
        path="/chat/:userId"
        element={
          CHAT_ENABLED ? (
            <ProtectedRoute><Chat /></ProtectedRoute>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />

      <Route path="/terms"   element={<TermsAndConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/refund"  element={<RefundPolicy />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />

    {/* ── Global floating help widget — always visible ── */}
    <HelpBot />
  </div>
);

export default App;
