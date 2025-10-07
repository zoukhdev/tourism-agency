import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const BookingManagement = () => {
  const { t } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedBookings, setSelectedBookings] = useState([]);

  const bookings = [
    {
      id: 'BK-001',
      customer: {
        name: 'Ahmed Al-Rashid',
        email: 'ahmed@example.com',
        phone: '+966501234567'
      },
      package: {
        title: 'Premium Hajj Package 2024',
        type: 'hajj',
        duration: '14 days'
      },
      amount: 4500,
      status: 'confirmed',
      paymentStatus: 'paid',
      bookingDate: '2024-01-15',
      travelDate: '2024-06-15',
      travelers: 2,
      specialRequests: 'Wheelchair accessible room required'
    },
    {
      id: 'BK-002',
      customer: {
        name: 'Fatima Hassan',
        email: 'fatima@example.com',
        phone: '+966507654321'
      },
      package: {
        title: 'Luxury Umrah Package',
        type: 'umrah',
        duration: '10 days'
      },
      amount: 2800,
      status: 'pending',
      paymentStatus: 'pending',
      bookingDate: '2024-01-14',
      travelDate: '2024-03-20',
      travelers: 1,
      specialRequests: 'Vegetarian meals'
    },
    {
      id: 'BK-003',
      customer: {
        name: 'Mohammed Ali',
        email: 'mohammed@example.com',
        phone: '+966509876543'
      },
      package: {
        title: 'European Cultural Heritage Tour',
        type: 'global',
        duration: '12 days'
      },
      amount: 3200,
      status: 'confirmed',
      paymentStatus: 'paid',
      bookingDate: '2024-01-13',
      travelDate: '2024-05-10',
      travelers: 3,
      specialRequests: 'Family with children'
    },
    {
      id: 'BK-004',
      customer: {
        name: 'Aisha Khan',
        email: 'aisha@example.com',
        phone: '+966501112223'
      },
      package: {
        title: 'Family Umrah Package',
        type: 'umrah',
        duration: '8 days'
      },
      amount: 2200,
      status: 'cancelled',
      paymentStatus: 'refunded',
      bookingDate: '2024-01-12',
      travelDate: '2024-04-15',
      travelers: 4,
      specialRequests: 'Connecting rooms'
    },
    {
      id: 'BK-005',
      customer: {
        name: 'Omar Abdullah',
        email: 'omar@example.com',
        phone: '+966503334445'
      },
      package: {
        title: 'Standard Hajj Package 2024',
        type: 'hajj',
        duration: '14 days'
      },
      amount: 3200,
      status: 'confirmed',
      paymentStatus: 'paid',
      bookingDate: '2024-01-11',
      travelDate: '2024-06-20',
      travelers: 1,
      specialRequests: 'None'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'refunded':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeFilter === 'all') return true;
    return booking.status === activeFilter;
  });

  const handleSelectBooking = (bookingId) => {
    setSelectedBookings(prev => 
      prev.includes(bookingId) 
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const handleSelectAll = () => {
    setSelectedBookings(
      selectedBookings.length === filteredBookings.length 
        ? [] 
        : filteredBookings.map(booking => booking.id)
    );
  };

  const filters = [
    { id: 'all', label: t('allBookings'), count: bookings.length },
    { id: 'confirmed', label: t('confirmed'), count: bookings.filter(b => b.status === 'confirmed').length },
    { id: 'pending', label: t('pending'), count: bookings.filter(b => b.status === 'pending').length },
    { id: 'cancelled', label: t('cancelled'), count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t('bookingManagement')}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300">
                {t('manageCustomerBookings')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('export')}
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {t('newBooking')}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{t('totalBookings')}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{bookings.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{t('confirmed')}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {bookings.filter(b => b.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{t('pending')}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {bookings.filter(b => b.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{t('cancelled')}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {bookings.filter(b => b.status === 'cancelled').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedBookings.length > 0 && (
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {selectedBookings.length} {t('selectedBookings')}
            </span>
            <div className="flex space-x-2">
              <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                {t('confirmSelected')}
              </button>
              <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                {t('sendEmail')}
              </button>
              <button className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                {t('cancelSelected')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bookings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Mobile Card View */}
        <div className="block sm:hidden">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedBookings.includes(booking.id)}
                    onChange={() => handleSelectBooking(booking.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {booking.id}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{booking.bookingDate}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{booking.customer.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{booking.customer.email}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{booking.customer.phone}</p>
              </div>

              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">{booking.package.title}</h5>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {booking.package.duration} • {booking.travelers} {t('travelers')}
                </p>
              </div>

              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">${booking.amount.toLocaleString()}</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                    {booking.paymentStatus}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('travelDate')}</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{booking.travelDate}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 text-xs font-medium py-1">
                  {t('view')}
                </button>
                <button className="flex-1 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 text-xs font-medium py-1">
                  {t('edit')}
                </button>
                <button className="flex-1 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium py-1">
                  {t('email')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('bookingId')}
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('customer')}
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  {t('package')}
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('amount')}
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('status')}
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  {t('payment')}
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                  {t('travelDate')}
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => handleSelectBooking(booking.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      {booking.id}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {booking.bookingDate}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                        {booking.customer.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {booking.customer.email}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {booking.customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                        {booking.package.title}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {booking.package.duration} • {booking.travelers} {t('travelers')}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-white">
                    ${booking.amount.toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell text-xs sm:text-sm text-gray-900 dark:text-white">
                    {booking.travelDate}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">
                    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                      <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 text-xs sm:text-sm">
                        {t('view')}
                      </button>
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 text-xs sm:text-sm">
                        {t('edit')}
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm">
                        {t('email')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BookingManagement;
