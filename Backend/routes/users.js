const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// ── GET /api/users/profile ───────────────────────────────────────────────────
// Returns the logged-in user's full profile including their active listings
// and order history.
router.get('/profile', protect, async (req, res, next) => {
  try {
    const user = req.user;

    // Fetch this user's active listings (sellers only, but works for all)
    const listings = await Product.find({ seller: user._id, status: 'active' })
      .sort({ createdAt: -1 })
      .select('name price category condition images status views createdAt');

    // Fetch this user's orders as buyer
    const orders = await Order.find({ buyer: user._id })
      .sort({ createdAt: -1 })
      .select('orderRef orderStatus paymentMethod totalAmount createdAt items');

    res.json({
      success: true,
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
        createdAt: user.createdAt,
      },
      listings,
      orders,
    });
  } catch (err) {
    next(err);
  }
});

// ── PUT /api/users/profile ───────────────────────────────────────────────────
// Updates the logged-in user's editable profile fields.
// Body: { fullName?, phone?, department?, campusBlock?, yearOfStudy? }
router.put(
  '/profile',
  protect,
  [
    body('fullName').optional().trim().notEmpty().withMessage('Full name cannot be empty'),
    body('phone').optional().trim(),
    body('department').optional().trim(),
    body('campusBlock').optional().trim(),
    body('yearOfStudy').optional().isInt({ min: 1, max: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const allowed = ['fullName', 'phone', 'department', 'campusBlock', 'yearOfStudy'];
      const updates = {};
      allowed.forEach((field) => {
        if (req.body[field] !== undefined) updates[field] = req.body[field];
      });

      // Recalculate initials if name changed
      if (updates.fullName) {
        const parts = updates.fullName.trim().split(' ');
        updates.avatarInitials = parts
          .slice(0, 2)
          .map((p) => p[0].toUpperCase())
          .join('');
      }

      const user = await User.findByIdAndUpdate(req.user._id, updates, {
        new: true,
        runValidators: true,
      }).select('-password');

      res.json({ success: true, user });
    } catch (err) {
      next(err);
    }
  }
);

// ── PUT /api/users/change-password ──────────────────────────────────────────
// Changes the logged-in user's password.
// Body: { currentPassword, newPassword }
router.put(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user._id).select('+password');
      const match = await user.matchPassword(req.body.currentPassword);
      if (!match) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }

      user.password = req.body.newPassword;
      await user.save();

      res.json({ success: true, message: 'Password updated successfully' });
    } catch (err) {
      next(err);
    }
  }
);

// ── GET /api/users/:id/public ────────────────────────────────────────────────
// Returns a seller's public profile (name, rating, listings).
router.get('/:id/public', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      'fullName avatarInitials department campusBlock sellerRating totalSales isVerified createdAt'
    );
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const listings = await Product.find({ seller: req.params.id, status: 'active' })
      .sort({ createdAt: -1 })
      .select('name price category condition images views createdAt');

    res.json({ success: true, user, listings });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
