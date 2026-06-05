// ─── Feature Flags ────────────────────────────────────────────────────────────
// Flip these here only. No other file should contain feature-gate booleans.

// CHAT_ENABLED — client-to-client messaging.
//   false → hides "Messages" nav link, badge, and redirects /chat-* to /dashboard.
//   true  → fully restores the feature with no other changes needed.
export const CHAT_ENABLED = false;
