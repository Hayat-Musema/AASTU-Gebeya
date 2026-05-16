const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// ── Helper: sign a JWT ──────────────────────────────────────────────────────
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// ── Helper: send token response ─────────────────────────────────────────────
const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatarInitials: user.avatarInitials,
      department: user.department,
      phone: user.phone,
      campusBlock: user.campusBlock,
      isVerified: user.isVerified,
      sellerRating: user.sellerRating,
      totalSales: user.totalSales,
    },
  });
};

// ── Validation rules ─────────────────────────────────────────────────────────
const registerRules = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['buyer', 'seller'])
    .withMessage('Role must be buyer or seller'),
];

const loginRules = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

// ── POST /api/auth/register ──────────────────────────────────────────────────
// Creates a new buyer or seller account.
// Body: { fullName, email, password, role?, department?, phone?, campusBlock? }
router.post('/register', registerRules, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { fullName, email, password, role, department, phone, campusBlock } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role: role || 'buyer',
      department: department || '',
      phone: phone || '',
      campusBlock: campusBlock || '',
    });

    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
});

// ── POST /api/auth/login ─────────────────────────────────────────────────────
// Authenticates an existing user.
// Body: { email, password }
router.post('/login', loginRules, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Explicitly select password (it's excluded by default)
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
});

// ── GET /api/auth/me ─────────────────────────────────────────────────────────
// Returns the currently authenticated user's profile.
// Header: Authorization: Bearer <token>
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, user: req.user });
});

// ── POST /api/auth/logout ────────────────────────────────────────────────────
// Stateless JWT — client just discards the token.
// This endpoint exists so the frontend has a consistent API call to make.
router.post('/logout', protect, (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
