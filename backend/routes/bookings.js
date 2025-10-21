/**
 * Booking Management Routes
 * Booking CRUD operations
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Package = require('../models/Package');
const { requireAdmin, requirePermission } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/bookings
// @desc    Get all bookings
// @access  Private (Admin/Staff)
router.get('/', requirePermission('canManageBookings'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status || '';
    const serviceType = req.query.serviceType || '';

    // Build filter query
    const filterQuery = {
      ...(status && { status }),
      ...(serviceType && { serviceType })
    };

    const bookings = await Booking.find(filterQuery)
      .populate('user', 'firstName lastName email phone')
      .populate('package', 'name price serviceType')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBookings = await Booking.countDocuments(filterQuery);

    res.json({
      status: 'success',
      data: {
        bookings,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalBookings / limit),
          totalBookings,
          hasNext: page < Math.ceil(totalBookings / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookings'
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private (Admin/Staff)
router.get('/:id', requirePermission('canManageBookings'), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'firstName lastName email phone')
      .populate('package', 'name price serviceType description');
    
    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    res.json({
      status: 'success',
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch booking'
    });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private (Admin/Staff)
router.put('/:id/status', requirePermission('canManageBookings'), [
  body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Invalid status'),
  body('notes').optional().isString().withMessage('Notes must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status, notes } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        ...(notes && { notes })
      },
      { new: true }
    ).populate('user', 'firstName lastName email phone')
     .populate('package', 'name price serviceType');

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Booking status updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update booking status'
    });
  }
});

// @route   PUT /api/bookings/:id/payment
// @desc    Update booking payment status
// @access  Private (Admin/Staff)
router.put('/:id/payment', requirePermission('canManageBookings'), [
  body('paymentStatus').isIn(['pending', 'paid', 'refunded', 'failed']).withMessage('Invalid payment status'),
  body('paymentMethod').optional().isIn(['credit-card', 'debit-card', 'bank-transfer', 'installments']).withMessage('Invalid payment method')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { paymentStatus, paymentMethod } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { 
        paymentStatus,
        ...(paymentMethod && { paymentMethod })
      },
      { new: true }
    ).populate('user', 'firstName lastName email phone')
     .populate('package', 'name price serviceType');

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Payment status updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update payment status'
    });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Delete booking
// @access  Private (Admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete booking'
    });
  }
});

// @route   GET /api/bookings/analytics/overview
// @desc    Get booking analytics overview
// @access  Private (Admin/Staff)
router.get('/analytics/overview', requirePermission('canViewAnalytics'), async (req, res) => {
  try {
    const { period = '6months' } = req.query;
    
    let startDate = new Date();
    switch (period) {
      case '1month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case '3months':
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case '1year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 6);
    }

    // Total bookings and revenue
    const totalBookings = await Booking.countDocuments({
      createdAt: { $gte: startDate }
    });

    const totalRevenue = await Booking.aggregate([
      {
        $match: {
          status: 'confirmed',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$pricing.totalAmount' }
        }
      }
    ]);

    // Booking status distribution
    const statusDistribution = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Service type distribution
    const serviceDistribution = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$serviceType',
          count: { $sum: 1 }
        }
      }
    ]);

    // Monthly revenue trend
    const monthlyRevenue = await Booking.aggregate([
      {
        $match: {
          status: 'confirmed',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$pricing.totalAmount' },
          bookings: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json({
      status: 'success',
      data: {
        totalBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
        statusDistribution,
        serviceDistribution,
        monthlyRevenue
      }
    });
  } catch (error) {
    console.error('Booking analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch booking analytics'
    });
  }
});

module.exports = router;
