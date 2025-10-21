/**
 * Package Management Routes
 * Package CRUD operations
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const Package = require('../models/Package');
const { requireAdmin, requirePermission } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/packages
// @desc    Get all packages (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const serviceType = req.query.serviceType || '';
    const search = req.query.search || '';
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Infinity;

    // Build filter query
    const filterQuery = {
      isActive: true,
      ...(serviceType && { serviceType }),
      ...(search && {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { 'destination.country': { $regex: search, $options: 'i' } },
          { 'destination.city': { $regex: search, $options: 'i' } }
        ]
      }),
      price: { $gte: minPrice, $lte: maxPrice }
    };

    const packages = await Package.find(filterQuery)
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPackages = await Package.countDocuments(filterQuery);

    res.json({
      status: 'success',
      data: {
        packages,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalPackages / limit),
          totalPackages,
          hasNext: page < Math.ceil(totalPackages / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get packages error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch packages'
    });
  }
});

// @route   GET /api/packages/:id
// @desc    Get package by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    
    if (!package || !package.isActive) {
      return res.status(404).json({
        status: 'error',
        message: 'Package not found'
      });
    }

    res.json({
      status: 'success',
      data: package
    });
  } catch (error) {
    console.error('Get package error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch package'
    });
  }
});

// @route   POST /api/packages
// @desc    Create new package
// @access  Private (Admin)
router.post('/', requireAdmin, [
  body('name').trim().isLength({ min: 1 }).withMessage('Package name is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('serviceType').isIn(['hajj', 'umrah', 'global-tourism']).withMessage('Invalid service type'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 day'),
  body('destination.country').trim().isLength({ min: 1 }).withMessage('Country is required'),
  body('destination.city').trim().isLength({ min: 1 }).withMessage('City is required')
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

    const package = new Package(req.body);
    await package.save();

    res.status(201).json({
      status: 'success',
      message: 'Package created successfully',
      data: package
    });
  } catch (error) {
    console.error('Create package error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create package'
    });
  }
});

// @route   PUT /api/packages/:id
// @desc    Update package
// @access  Private (Admin)
router.put('/:id', requireAdmin, [
  body('name').optional().trim().isLength({ min: 1 }).withMessage('Package name cannot be empty'),
  body('description').optional().trim().isLength({ min: 1 }).withMessage('Description cannot be empty'),
  body('serviceType').optional().isIn(['hajj', 'umrah', 'global-tourism']).withMessage('Invalid service type'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be at least 1 day')
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

    const package = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!package) {
      return res.status(404).json({
        status: 'error',
        message: 'Package not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Package updated successfully',
      data: package
    });
  } catch (error) {
    console.error('Update package error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update package'
    });
  }
});

// @route   DELETE /api/packages/:id
// @desc    Delete package
// @access  Private (Admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({
        status: 'error',
        message: 'Package not found'
      });
    }

    await Package.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      message: 'Package deleted successfully'
    });
  } catch (error) {
    console.error('Delete package error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete package'
    });
  }
});

// @route   PUT /api/packages/:id/status
// @desc    Toggle package active status
// @access  Private (Admin)
router.put('/:id/status', requireAdmin, [
  body('isActive').isBoolean().withMessage('isActive must be a boolean')
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

    const { isActive } = req.body;

    const package = await Package.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    if (!package) {
      return res.status(404).json({
        status: 'error',
        message: 'Package not found'
      });
    }

    res.json({
      status: 'success',
      message: `Package ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: package
    });
  } catch (error) {
    console.error('Toggle package status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update package status'
    });
  }
});

module.exports = router;
