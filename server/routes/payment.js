"use strict";

const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

/**
 * Build a Razorpay instance only when needed.
 * This keeps the server booting cleanly even when the keys are not yet
 * configured (e.g. local dev without real credentials).
 */
function buildRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set.");
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

// ─────────────────────────────────────────────────────────────────────────────
//  POST /api/payment/create-order
//  Creates a Razorpay order for the membership fee.
// ─────────────────────────────────────────────────────────────────────────────
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("isPaid");
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.isPaid) {
      return res.status(400).json({ message: "Already a member." });
    }

    const amount = Number(process.env.MEMBERSHIP_AMOUNT_PAISE) || 49900;
    const receipt = `ps_${req.userId}_${Date.now()}`.slice(0, 40); // Razorpay max 40 chars

    const razorpay = buildRazorpay();
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt
    });

    return res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    const message =
      error.message === "RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set."
        ? error.message
        : "Could not create payment order.";
    return res.status(500).json({ message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
//  POST /api/payment/verify
//  Verifies the Razorpay HMAC-SHA256 signature.
//  NEVER marks isPaid on a failed or missing signature.
// ─────────────────────────────────────────────────────────────────────────────
router.post("/verify", authMiddleware, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment fields: razorpay_order_id, razorpay_payment_id, razorpay_signature are all required."
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return res.status(500).json({ success: false, message: "Payment configuration missing." });
    }

    // Razorpay signature = HMAC-SHA256("<order_id>|<payment_id>", key_secret)
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      // Do NOT set isPaid. Log for fraud monitoring.
      return res.status(400).json({
        success: false,
        message: "Payment verification failed."
      });
    }

    // Signature valid — mark user as paid
    const user = await User.findByIdAndUpdate(
      req.userId,
      { isPaid: true },
      { new: true }
    ).select("isPaid");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.json({ success: true, message: "Payment verified. Welcome to PremSetu!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Payment verification failed." });
  }
});

module.exports = router;
