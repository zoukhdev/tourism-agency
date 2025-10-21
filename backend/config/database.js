/**
 * Database Configuration
 * MongoDB connection setup with Mongoose
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    
    // Create default admin user if it doesn't exist
    await createDefaultAdmin();
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

// Create default admin user
const createDefaultAdmin = async () => {
  try {
    const User = require('../models/User');
    const bcrypt = require('bcryptjs');
    
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
      
      const adminUser = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        isEmailVerified: true,
        permissions: {
          canManageUsers: true,
          canManageBookings: true,
          canManagePackages: true,
          canManageContent: true,
          canViewAnalytics: true,
          canManageSettings: true
        }
      });
      
      await adminUser.save();
      console.log('👤 Default admin user created successfully');
      console.log(`📧 Email: ${process.env.ADMIN_EMAIL}`);
      console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD}`);
    } else {
      console.log('👤 Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error.message);
  }
};

module.exports = connectDB;
