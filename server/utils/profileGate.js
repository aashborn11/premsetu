/**
 * Profile gating helpers.
 *
 * LOCKED_FIELDS  — fields hidden from unauthenticated and unpaid users.
 * toPublicProfile — returns only the 7 public fields; DOB is replaced by computed age.
 */

"use strict";

// Fields that require isPaid === true to view on another user's profile.
// When this list changes, update it here only — matches.js and profile.js
// import this array directly.
const LOCKED_FIELDS = [
  "phone",
  "email",
  "dateOfBirth",
  "religion",
  "caste",
  "motherTongue",
  "education",
  "profession",
  "annualIncome",
  "height",
  "maritalStatus",
  "bio",
  "gotra",
  "diet",
  "familyType",
  "familyValues",
  "parentsOccupation",
  "siblings",
  "manglikStatus",
  "birthTime",
  "birthPlace",
  "photos"
];

/**
 * Compute age in years from a Date or ISO date string.
 * Returns null if dob is falsy or invalid.
 */
function computeAge(dob) {
  if (!dob) return null;
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

/**
 * Strip a user document / plain object down to the 7 public fields.
 * dateOfBirth is NOT included — replaced by computed age (number).
 * Safe to call on mongoose documents or plain objects.
 *
 * Public fields: _id, fullName, age, city, state, gender, profilePhoto
 */
function toPublicProfile(userDoc) {
  const u = typeof userDoc.toObject === "function" ? userDoc.toObject() : userDoc;
  return {
    _id: u._id,
    fullName: u.fullName,
    age: computeAge(u.dateOfBirth),
    city: u.city || "",
    state: u.state || "",
    gender: u.gender,
    profilePhoto: u.profilePhoto || ""
  };
}

module.exports = { LOCKED_FIELDS, toPublicProfile };
