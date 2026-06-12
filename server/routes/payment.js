"use strict";

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
//  Manual UPI payment flow.
//
//  The user pays via UPI (QR code / PhonePe link shown on the Membership page,
//  configured in client/src/config.js) and then confirms on the site.
//  POST /confirm flips isPaid and records when + an optional UPI reference so
//  payments can be audited against the bank statement later.
// ─────────────────────────────────────────────────────────────────────────────

// POST /api/payment/confirm
router.post("/confirm", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("isPaid");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (user.isPaid) {
      return res.status(400).json({ success: false, message: "Already a member." });
    }

    // Optional UPI transaction / UTR reference typed by the user.
    const rawRef = typeof req.body?.txnId === "string" ? req.body.txnId : "";
    const paymentRef = rawRef.trim().slice(0, 60);

    user.isPaid = true;
    user.paidAt = new Date();
    user.paymentRef = paymentRef || "self-confirmed";
    await user.save();

    return res.json({
      success: true,
      message: "Membership activated. Welcome to PremSetu!"
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not activate membership." });
  }
});

module.exports = router;
