const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [150, 'Product name cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Dorm Gear', 'Books', 'Electronics', 'Stationary', 'Cloths', 'Accessories'],
    },
    condition: {
      type: String,
      required: [true, 'Condition is required'],
      enum: ['New', 'Used', 'Like New', 'Good', 'Refurbished'],
    },
    images: [
      {
        url: { type: String, required: true },
        filename: { type: String },
      },
    ],
    campusBlock: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'sold', 'removed'],
      default: 'active',
    },
    views: {
      type: Number,
      default: 0,
    },
    // Denormalised seller info for fast listing display
    sellerName: { type: String },
    sellerInitials: { type: String },
    sellerRating: { type: Number, default: 0 },
    isVerifiedSeller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Text index for search
productSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);
