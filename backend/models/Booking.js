/**
 * Booking Model
 * Defines booking schema for travel bookings
 */

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  serviceType: {
    type: String,
    enum: ['hajj', 'umrah', 'global-tourism'],
    required: true
  },
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  travelDetails: {
    departureCity: { type: String, required: true },
    preferredDepartureDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    numberOfTravelers: { type: Number, required: true, min: 1 },
    roomType: { type: String, required: true },
    specialRequests: { type: String, default: '' }
  },
  additionalServices: [{
    service: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
  }],
  pricing: {
    basePrice: { type: Number, required: true },
    additionalServicesTotal: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: 'USD' }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit-card', 'debit-card', 'bank-transfer', 'installments']
  },
  notes: {
    type: String,
    default: ''
  },
  documents: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    this.bookingId = `TK${timestamp}${random}`;
  }
  next();
});

// Virtual for booking duration
bookingSchema.virtual('duration').get(function() {
  if (this.travelDetails.preferredDepartureDate && this.travelDetails.returnDate) {
    const diffTime = Math.abs(this.travelDetails.returnDate - this.travelDetails.preferredDepartureDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return 0;
});

// Index for performance
bookingSchema.index({ bookingId: 1 });
bookingSchema.index({ user: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);
