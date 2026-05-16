const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { protect, requireRole } = require('../middleware/auth');

const SERVICE_FEE = 25; // ETB — fixed platform fee

// ── POST /api/orders ─────────────────────────────────────────────────────────
// Protected — any authenticated user (buyer or seller can buy).
// Creates a new order.
// Body: {
//   items: [{ productId, qty }],
//   deliveryAddress: { fullName, phone, campusLocation, additionalNotes? },
//   paymentMethod: 'cash' | 'telebirr' | 'cbe_birr'
// }
router.post(
  '/',
  protect,
  [
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*.productId').notEmpty().withMessage('Product ID is required'),
    body('items.*.qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('deliveryAddress.fullName').trim().notEmpty().withMessage('Full name is required'),
    body('deliveryAddress.phone').trim().notEmpty().withMessage('Phone number is required'),
    body('deliveryAddress.campusLocation').trim().notEmpty().withMessage('Campus location is required'),
    body('paymentMethod')
      .isIn(['cash', 'telebirr', 'cbe_birr'])
      .withMessage('Invalid payment method'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { items, deliveryAddress, paymentMethod } = req.body;

      // Resolve each product and build order items
      const resolvedItems = [];
      let itemsTotal = 0;

      for (const { productId, qty } of items) {
        const product = await Product.findById(productId).populate('seller', 'fullName');
        if (!product || product.status !== 'active') {
          return res.status(400).json({
            success: false,
            message: `Product ${productId} is not available`,
          });
        }
        const lineTotal = product.price * qty;
        itemsTotal += lineTotal;
        resolvedItems.push({
          product: product._id,
          name: product.name,
          price: product.price,
          qty,
          seller: product.seller._id,
          sellerName: product.seller.fullName,
        });
      }

      const deliveryFee = 0; // free campus delivery
      const totalAmount = itemsTotal + deliveryFee + SERVICE_FEE;

      const order = await Order.create({
        buyer: req.user._id,
        items: resolvedItems,
        deliveryAddress,
        paymentMethod,
        paymentStatus: paymentMethod === 'cash' ? 'pending' : 'pending',
        orderStatus: 'placed',
        itemsTotal,
        deliveryFee,
        serviceFee: SERVICE_FEE,
        totalAmount,
      });

      // Mark products as sold (single-item listings)
      for (const item of resolvedItems) {
        await Product.findByIdAndUpdate(item.product, { status: 'sold' });
      }

      res.status(201).json({ success: true, order });
    } catch (err) {
      next(err);
    }
  }
);

// ── GET /api/orders/my ───────────────────────────────────────────────────────
// Protected. Returns all orders placed by the logged-in buyer.
router.get('/my', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name images category');

    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/orders/seller ───────────────────────────────────────────────────
// Protected — sellers only. Returns orders that contain the seller's products.
router.get('/seller', protect, requireRole('seller'), async (req, res, next) => {
  try {
    const orders = await Order.find({ 'items.seller': req.user._id })
      .sort({ createdAt: -1 })
      .populate('buyer', 'fullName email phone campusBlock')
      .populate('items.product', 'name images');

    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/orders/:id ──────────────────────────────────────────────────────
// Protected. Returns a single order — accessible by the buyer or the seller of any item.
router.get('/:id', protect, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'fullName email phone')
      .populate('items.product', 'name images category');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const isBuyer = order.buyer._id.toString() === req.user._id.toString();
    const isSeller = order.items.some(
      (item) => item.seller.toString() === req.user._id.toString()
    );

    if (!isBuyer && !isSeller) {
      return res.status(403).json({ success: false, message: 'Not authorised to view this order' });
    }

    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
});

// ── PATCH /api/orders/:id/status ─────────────────────────────────────────────
// Protected — seller only. Updates the order status.
// Body: { orderStatus: 'confirmed' | 'in_progress' | 'completed' | 'cancelled' }
router.patch(
  '/:id/status',
  protect,
  requireRole('seller'),
  [
    body('orderStatus')
      .isIn(['confirmed', 'in_progress', 'completed', 'cancelled'])
      .withMessage('Invalid order status'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

      const isSeller = order.items.some(
        (item) => item.seller.toString() === req.user._id.toString()
      );
      if (!isSeller) {
        return res.status(403).json({ success: false, message: 'Not authorised to update this order' });
      }

      order.orderStatus = req.body.orderStatus;

      // When order is completed, increment seller's totalSales
      if (req.body.orderStatus === 'completed') {
        await User.findByIdAndUpdate(req.user._id, { $inc: { totalSales: 1 } });
      }

      await order.save();
      res.json({ success: true, order });
    } catch (err) {
      next(err);
    }
  }
);

// ── PATCH /api/orders/:id/payment ────────────────────────────────────────────
// Protected — buyer only. Confirms mobile payment (Telebirr / CBE Birr).
// Body: { paymentStatus: 'confirmed' | 'failed', mobileRef? }
router.patch(
  '/:id/payment',
  protect,
  [
    body('paymentStatus')
      .isIn(['confirmed', 'failed'])
      .withMessage('Invalid payment status'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      if (order.buyer.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorised' });
      }

      order.paymentStatus = req.body.paymentStatus;
      if (req.body.paymentStatus === 'confirmed') {
        order.orderStatus = 'confirmed';
      }
      await order.save();

      res.json({ success: true, order });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
