/**
 * Admin Routes
 * Admin dashboard API endpoints
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Package = require('../models/Package');
const { requireAdmin, requirePermission } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get dashboard overview data
// @access  Private (Admin)
router.get('/dashboard', requireAdmin, async (req, res) => {
  try {
    // Get statistics
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalBookings = await Booking.countDocuments();
    const totalPackages = await Package.countDocuments({ isActive: true });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });

    // Get recent bookings
    const recentBookings = await Booking.find()
      .populate('user', 'firstName lastName email')
      .populate('package', 'name price')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('bookingId user package status totalAmount createdAt');

    // Get revenue data (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const revenueData = await Booking.aggregate([
      {
        $match: {
          status: 'confirmed',
          createdAt: { $gte: sixMonthsAgo }
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

    // Get popular packages
    const popularPackages = await Package.aggregate([
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'package',
          as: 'bookings'
        }
      },
      {
        $project: {
          name: 1,
          price: 1,
          bookingCount: { $size: '$bookings' }
        }
      },
      {
        $sort: { bookingCount: -1 }
      },
      {
        $limit: 5
      }
    ]);

    res.json({
      status: 'success',
      data: {
        statistics: {
          totalUsers,
          totalBookings,
          totalPackages,
          pendingBookings
        },
        recentBookings,
        revenueData,
        popularPackages
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch dashboard data'
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with pagination
// @access  Private (Admin)
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    // Build search query
    const searchQuery = search ? {
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const users = await User.find(searchQuery)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments(searchQuery);

    res.json({
      status: 'success',
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalUsers / limit),
          totalUsers,
          hasNext: page < Math.ceil(totalUsers / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users'
    });
  }
});

// @route   GET /api/admin/bookings
// @desc    Get all bookings with pagination
// @access  Private (Admin)
router.get('/bookings', requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status || '';

    // Build filter query
    const filterQuery = status ? { status } : {};

    const bookings = await Booking.find(filterQuery)
      .populate('user', 'firstName lastName email')
      .populate('package', 'name price')
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

// @route   PUT /api/admin/bookings/:id/status
// @desc    Update booking status
// @access  Private (Admin)
router.put('/bookings/:id/status', requireAdmin, [
  body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Invalid status')
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

    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'firstName lastName email')
     .populate('package', 'name price');

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

// @route   GET /api/admin/analytics
// @desc    Get analytics data
// @access  Private (Admin)
router.get('/analytics', requireAdmin, async (req, res) => {
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

    // Revenue analytics
    const revenueData = await Booking.aggregate([
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

    // Booking status distribution
    const statusDistribution = await Booking.aggregate([
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
        $group: {
          _id: '$serviceType',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      status: 'success',
      data: {
        revenueData,
        statusDistribution,
        serviceDistribution
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch analytics data'
    });
  }
});

module.exports = router;
