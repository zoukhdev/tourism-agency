# Tourism Agency Backend API

A complete Node.js/Express backend API for the Tourism Agency Admin Dashboard.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete CRUD operations for users
- **Booking Management**: Handle travel bookings with status updates
- **Package Management**: Manage travel packages and services
- **Analytics Dashboard**: Revenue and booking analytics
- **Security**: Rate limiting, input validation, and security headers
- **Database**: MongoDB with Mongoose ODM

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp config.env.example config.env
   # Edit config.env with your settings
   ```

4. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in config.env
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## Default Admin Credentials

After starting the server, a default admin user will be created:

- **Email**: `admin@alhijrah.com`
- **Password**: `Admin123!`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Admin Dashboard
- `GET /api/admin/dashboard` - Dashboard overview data
- `GET /api/admin/analytics` - Analytics data

### User Management
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Booking Management
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/status` - Update booking status
- `PUT /api/bookings/:id/payment` - Update payment status
- `DELETE /api/bookings/:id` - Delete booking

### Package Management
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get package by ID
- `POST /api/packages` - Create new package
- `PUT /api/packages/:id` - Update package
- `DELETE /api/packages/:id` - Delete package

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/tourism-agency

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Admin Credentials
ADMIN_EMAIL=admin@alhijrah.com
ADMIN_PASSWORD=Admin123!

# CORS
FRONTEND_URL=http://localhost:3000
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Express-validator for request validation
- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **CORS Protection**: Configured for frontend origin
- **Security Headers**: Helmet.js for security headers
- **Account Locking**: Temporary lock after failed login attempts

## Database Models

### User Model
- Personal information (name, email, phone)
- Role-based permissions
- Account status and security
- Login attempt tracking

### Booking Model
- Travel details and personal information
- Package and pricing information
- Status tracking (pending, confirmed, cancelled)
- Payment status management

### Package Model
- Package information and pricing
- Service type categorization
- Availability and capacity
- Features and requirements

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

### Database Seeding
The server automatically creates a default admin user on startup if none exists.

## Production Deployment

1. **Set environment variables**
2. **Use a production MongoDB instance**
3. **Set secure JWT secrets**
4. **Configure CORS for production domain**
5. **Enable HTTPS**
6. **Set up monitoring and logging**

## API Documentation

The API follows RESTful conventions with JSON responses:

```json
{
  "status": "success|error",
  "message": "Response message",
  "data": "Response payload"
}
```

## Error Handling

All errors are handled globally with appropriate HTTP status codes and error messages.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License
