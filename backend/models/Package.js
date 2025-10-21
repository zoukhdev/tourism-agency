/**
 * Package Model
 * Defines package schema for travel packages
 */

const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Package name is required'],
    trim: true,
    maxlength: [100, 'Package name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Package description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  serviceType: {
    type: String,
    enum: ['hajj', 'umrah', 'global-tourism'],
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'SAR', 'EUR', 'GBP']
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'Duration must be at least 1 day']
  },
  maxTravelers: {
    type: Number,
    default: 50,
    min: [1, 'Max travelers must be at least 1']
  },
  inclusions: [{
    type: String,
    required: true
  }],
  exclusions: [{
    type: String,
    required: true
  }],
  itinerary: [{
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    activities: [String],
    meals: [String],
    accommodation: String
  }],
  images: [{
    url: { type: String, required: true },
    alt: { type: String, default: '' },
    isPrimary: { type: Boolean, default: false }
  }],
  features: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: '' }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  destination: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  requirements: {
    minAge: { type: Number, default: 0 },
    maxAge: { type: Number, default: 100 },
    visaRequired: { type: Boolean, default: false },
    passportRequired: { type: Boolean, default: true },
    vaccinationRequired: { type: Boolean, default: false }
  },
  availability: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    maxBookings: { type: Number, default: 100 },
    currentBookings: { type: Number, default: 0 }
  },
  pricing: {
    basePrice: { type: Number, required: true },
    singleSupplement: { type: Number, default: 0 },
    childDiscount: { type: Number, default: 0 },
    groupDiscount: { type: Number, default: 0 }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for availability status
packageSchema.virtual('isAvailable').get(function() {
  const now = new Date();
  return this.availability.startDate <= now && 
         this.availability.endDate >= now && 
         this.availability.currentBookings < this.availability.maxBookings &&
         this.isActive;
});

// Virtual for remaining spots
packageSchema.virtual('remainingSpots').get(function() {
  return this.availability.maxBookings - this.availability.currentBookings;
});

// Index for performance
packageSchema.index({ serviceType: 1 });
packageSchema.index({ isActive: 1 });
packageSchema.index({ isFeatured: 1 });
packageSchema.index({ 'destination.country': 1 });
packageSchema.index({ price: 1 });

module.exports = mongoose.model('Package', packageSchema);
