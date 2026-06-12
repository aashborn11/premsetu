// ─── Feature Flags ────────────────────────────────────────────────────────────
// Flip these here only. No other file should contain feature-gate booleans.

// CHAT_ENABLED — client-to-client messaging.
//   false → hides "Messages" nav link, badge, and redirects /chat-* to /dashboard.
//   true  → fully restores the feature with no other changes needed.
export const CHAT_ENABLED = false;

// ─── Payment (manual UPI) ─────────────────────────────────────────────────────
// The Membership page generates a scannable UPI QR code from UPI_ID below and
// shows a tap-to-pay button on mobile. Replace the placeholder values with your
// real details before launch — this file is the ONLY place they live.
//
//   UPI_ID        → your real UPI ID (PhonePe / GPay / Paytm), e.g. "name@ybl"
//   PAYEE_NAME    → the name shown in the payer's UPI app
//   PHONEPE_LINK  → optional PhonePe payment-page link (from PhonePe Business
//                   "Payment Link"); leave "" to hide the button
//   QR_IMAGE      → optional: drop your own QR image at client/public/payment-qr.png
//                   and set this to "/payment-qr.png" to show it INSTEAD of the
//                   generated QR; leave "" to use the generated one
export const PAYMENT = {
  AMOUNT_RUPEES: 499,
  UPI_ID: "7409868966@axl", // PhonePe / SBI account of Karmveer Singh
  PAYEE_NAME: "PremSetu",
  PHONEPE_LINK: "", // optional PhonePe payment-page link; "" hides the button
  QR_IMAGE: ""
};

// True while the placeholder UPI ID is still in place — shows a warning banner
// on the Membership page so a launch with dummy details can't go unnoticed.
export const PAYMENT_IS_PLACEHOLDER = PAYMENT.UPI_ID === "premsetu@upi";

// Standard UPI deep link — opens PhonePe / GPay / Paytm / any UPI app on mobile.
export const UPI_PAY_LINK =
  `upi://pay?pa=${encodeURIComponent(PAYMENT.UPI_ID)}` +
  `&pn=${encodeURIComponent(PAYMENT.PAYEE_NAME)}` +
  `&am=${PAYMENT.AMOUNT_RUPEES}&cu=INR` +
  `&tn=${encodeURIComponent("PremSetu Membership")}`;
