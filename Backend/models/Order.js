const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, default: 1 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerName: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [orderItemSchema],
      validate: [(arr) => arr.length > 0, 'Order must have at least one item'],
    },
    // Delivery / pickup address
    deliveryAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      campusLocation: { type: String, required: true }, // e.g. "Block 54, Room 202"
      additionalNotes: { type: String, default: '' },
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'telebirr', 'cbe_birr'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'failed'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['placed', 'confirmed', 'in_progress', 'completed', 'cancelled'],
      default: 'placed',
    },
    // Pricing breakdown
    itemsTotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 25 },
    totalAmount: { type: Number, required: true },

    // Human-readable order ID shown in UI (e.g. #AASTU-78291)
    orderRef: { type: String, unique: true },
  },
  { timestamps: true }
);

// Auto-generate a short order reference before saving
orderSchema.pre('save', function (next) {
  if (!this.orderRef) {
    const rand = Math.floor(10000 + Math.random() * 90000);
    this.orderRef = `#AASTU-${rand}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
