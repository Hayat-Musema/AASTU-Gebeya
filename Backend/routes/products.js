const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const { protect, requireRole } = require('../middleware/auth');

// ── Multer config — store uploads in /uploads folder ────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) return cb(null, true);
  cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
});

// ── GET /api/products ────────────────────────────────────────────────────────
// Public. Returns paginated product listings with optional filters.
// Query: ?page=1&limit=12&category=Books&condition=Used&search=calculator&sort=recent
router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 12);
    const skip = (page - 1) * limit;

    const filter = { status: 'active' };

    if (req.query.category) filter.category = req.query.category;
    if (req.query.condition) filter.condition = req.query.condition;
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    const sortMap = {
      recent: { createdAt: -1 },
      'price-low': { price: 1 },
      'price-high': { price: -1 },
      popular: { views: -1 },
    };
    const sort = sortMap[req.query.sort] || sortMap.recent;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .populate('seller', 'fullName avatarInitials sellerRating isVerified campusBlock'),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/products/featured ───────────────────────────────────────────────
// Public. Returns the 8 most-viewed active products for the home page.
router.get('/featured', async (req, res, next) => {
  try {
    const products = await Product.find({ status: 'active' })
      .sort({ views: -1 })
      .limit(8)
      .select('name price category condition images sellerName sellerRating views createdAt')
      .populate('seller', 'fullName avatarInitials isVerified');

    res.json({ success: true, products });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/products/recent ─────────────────────────────────────────────────
// Public. Returns the 8 most recently listed active products.
router.get('/recent', async (req, res, next) => {
  try {
    const products = await Product.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .limit(8)
      .select('name price category condition images sellerName views createdAt')
      .populate('seller', 'fullName avatarInitials isVerified campusBlock');

    res.json({ success: true, products });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/products/:id ────────────────────────────────────────────────────
// Public. Returns a single product and increments its view count.
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'fullName avatarInitials department campusBlock phone sellerRating isVerified createdAt');

    if (!product || product.status === 'removed') {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Increment views (fire-and-forget)
    Product.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }).exec();

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/products ───────────────────────────────────────────────────────
// Protected — sellers only. Creates a new product listing.
// Multipart form: name, description, price, category, condition, campusBlock + up to 3 images
router.post(
  '/',
  protect,
  requireRole('seller'),
  upload.array('images', 3),
  [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category')
      .isIn(['Dorm Gear', 'Books', 'Electronics', 'Stationary', 'Cloths', 'Accessories'])
      .withMessage('Invalid category'),
    body('condition')
      .isIn(['New', 'Used', 'Like New', 'Good', 'Refurbished'])
      .withMessage('Invalid condition'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const images = (req.files || []).map((f) => ({
        url: `/uploads/${f.filename}`,
        filename: f.filename,
      }));

      const product = await Product.create({
        seller: req.user._id,
        name: req.body.name,
        description: req.body.description,
        price: parseFloat(req.body.price),
        category: req.body.category,
        condition: req.body.condition,
        campusBlock: req.body.campusBlock || req.user.campusBlock || '',
        images,
        // Denormalise seller info
        sellerName: req.user.fullName,
        sellerInitials: req.user.avatarInitials,
        sellerRating: req.user.sellerRating,
        isVerifiedSeller: req.user.isVerified,
      });

      res.status(201).json({ success: true, product });
    } catch (err) {
      next(err);
    }
  }
);

// ── PUT /api/products/:id ────────────────────────────────────────────────────
// Protected — the listing's seller only. Updates product details.
router.put(
  '/:id',
  protect,
  requireRole('seller'),
  upload.array('images', 3),
  async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      if (product.seller.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorised to edit this listing' });
      }

      const allowed = ['name', 'description', 'price', 'category', 'condition', 'campusBlock', 'status'];
      allowed.forEach((field) => {
        if (req.body[field] !== undefined) product[field] = req.body[field];
      });

      if (req.files && req.files.length > 0) {
        const newImages = req.files.map((f) => ({
          url: `/uploads/${f.filename}`,
          filename: f.filename,
        }));
        product.images = [...product.images, ...newImages].slice(0, 3);
      }

      await product.save();
      res.json({ success: true, product });
    } catch (err) {
      next(err);
    }
  }
);

// ── DELETE /api/products/:id ─────────────────────────────────────────────────
// Protected — the listing's seller only. Soft-deletes by setting status to 'removed'.
router.delete('/:id', protect, requireRole('seller'), async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorised to delete this listing' });
    }

    product.status = 'removed';
    await product.save();

    res.json({ success: true, message: 'Listing removed successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
