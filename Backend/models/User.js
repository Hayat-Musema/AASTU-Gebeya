const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // never returned in queries by default
    },
    role: {
      type: String,
      enum: ['buyer', 'seller'],
      default: 'buyer',
    },
    // Seller-specific profile fields
    department: {
      type: String,
      trim: true,
      default: '',
    },
    yearOfStudy: {
      type: Number,
      min: 1,
      max: 6,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    campusBlock: {
      type: String,
      trim: true,
      default: '',
    },
    avatarInitials: {
      type: String,
      default: '',
    },
    sellerRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Password reset
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  // Auto-generate initials from full name
  if (this.isModified('fullName') || this.isNew) {
    const parts = this.fullName.trim().split(' ');
    this.avatarInitials = parts
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join('');
  }
  next();
});

// Compare plain password with hashed
userSchema.methods.matchPassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
