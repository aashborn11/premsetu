/**
 * Razorpay checkout helpers.
 *
 * loadRazorpayScript  — lazy-loads checkout.js once per page session.
 * openRazorpayCheckout — opens the modal, resolves on success, rejects on
 *                        dismiss ("dismissed") or payment failure.
 *
 * The key NEVER lives in this file — it always comes from the
 * create-order backend response.
 */

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

export function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    // Idempotent: if already loaded, resolve immediately
    if (document.querySelector(`script[src="${RAZORPAY_SCRIPT}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT;
    script.onload = resolve;
    script.onerror = () =>
      reject(new Error("Could not load Razorpay. Please check your internet connection."));
    document.body.appendChild(script);
  });
}

/**
 * Open Razorpay checkout modal.
 * @param {Object} options  — merged with Razorpay constructor options
 * @returns {Promise<Object>} resolves with { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 */
export function openRazorpayCheckout(options) {
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      ...options,
      handler: (response) => resolve(response),
      modal: {
        ondismiss: () => reject(new Error("dismissed"))
      }
    });
    rzp.on("payment.failed", (response) =>
      reject(new Error(response.error?.description || "Payment fail ho gaya."))
    );
    rzp.open();
  });
}
