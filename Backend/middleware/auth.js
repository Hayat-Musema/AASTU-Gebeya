const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * protect — verifies the JWT in the Authorization header.
 * Attaches req.user (without password) on success.
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorised — no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User no longer exists' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorised — invalid token' });
  }
};

/**
 * requireRole(...roles) — must be used after protect.
 * Restricts access to users whose role is in the allowed list.
 */
const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `Role '${req.user.role}' is not allowed to perform this action`,
    });
  }
  next();
};

module.exports = { protect, requireRole };
