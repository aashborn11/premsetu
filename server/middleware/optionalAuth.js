/**
 * Optional JWT middleware.
 * Sets req.userId if a valid Bearer token is present; otherwise sets req.userId = null.
 * Never blocks the request — callers decide how to respond to unauthenticated access.
 */

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.userId = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
  } catch {
    // Expired or malformed token — treat as unauthenticated, don't block
    req.userId = null;
  }

  return next();
};
