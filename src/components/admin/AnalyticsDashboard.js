import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const AnalyticsDashboard = () => {
  const { t } = useApp();
  const [activePeriod, setActivePeriod] = useState('30d');

  const analyticsData = {
    overview: {
      totalBookings: 1247,
      totalRevenue: 2456789,
      averageBookingValue: 1970,
      conversionRate: 3.2
    },
    bookings: {
      hajj: 456,
      umrah: 623,
      global: 168
    },
    revenue: {
      hajj: 1456000,
      umrah: 1246000,
      global: 537600
    },
    topPackages: [
      { name: 'Premium Hajj Package 2024', bookings: 127, revenue: 571500 },
      { name: 'Luxury Umrah Package', bookings: 156, revenue: 436800 },
      { name: 'European Cultural Heritage Tour', bookings: 98, revenue: 313600 },
      { name: 'Family Umrah Package', bookings: 73, revenue: 160600 },
      { name: 'Standard Hajj Package 2024', bookings: 89, revenue: 284800 }
    ],
    monthlyData: [
      { month: 'Jan', bookings: 98, revenue: 193060 },
      { month: 'Feb', bookings: 112, revenue: 220640 },
      { month: 'Mar', bookings: 134, revenue: 263980 },
      { month: 'Apr', bookings: 156, revenue: 307320 },
      { month: 'May', bookings: 189, revenue: 372330 },
      { month: 'Jun', bookings: 203, revenue: 399910 },
      { month: 'Jul', bookings: 178, revenue: 350660 },
      { month: 'Aug', bookings: 167, revenue: 328990 }
    ],
    customerInsights: {
      newCustomers: 234,
      returningCustomers: 1013,
      averageAge: 42,
      topCountries: ['Saudi Arabia', 'UAE', 'UK', 'USA', 'Canada']
    }
  };

  const periods = [
    { id: '7d', label: t('last7Days') },
    { id: '30d', label: t('last30Days') },
    { id: '90d', label: t('last90Days') },
    { id: '1y', label: t('lastYear') }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{t('analyticsReports')}</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{t('trackBusinessPerformance')}</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <select
            value={activePeriod}
            onChange={(e) => setActivePeriod(e.target.value)}
            className="input-field w-full sm:w-40"
          >
            {periods.map((period) => (
              <option key={period.id} value={period.id}>{period.label}</option>
            ))}
          </select>
          <button className="btn-outline flex items-center justify-center space-x-2 w-full sm:w-auto">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm sm:text-base">{t('exportReport')}</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{t('totalBookings')}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.overview.totalBookings.toLocaleString()}
              </p>
              <p className='text-xs sm:text-sm text-green-600'>+12% {t('fromLastPeriod')}</p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{t('totalRevenue')}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                ${analyticsData.overview.totalRevenue.toLocaleString()}
              </p>
              <p className='text-xs sm:text-sm text-green-600'>+8.2% {t('fromLastPeriod')}</p>
            </div>
            <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{t('avgBookingValue')}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                ${analyticsData.overview.averageBookingValue.toLocaleString()}
              </p>
              <p className='text-xs sm:text-sm text-red-600'>-2.1% {t('fromLastPeriod')}</p>
            </div>
            <div className="p-2 sm:p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{t('conversionRate')}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.overview.conversionRate}%
              </p>
              <p className='text-xs sm:text-sm text-green-600'>+0.5% {t('fromLastPeriod')}</p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('revenueTrend')}</h3>
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">Chart will be implemented with Chart.js</p>
            </div>
          </div>
        </div>

        {/* Bookings by Type */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('bookingsByType')}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-primary-500 rounded mr-3"></div>
                <span className='text-sm font-medium text-gray-900 dark:text-white'>{t('hajjPackages')}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {analyticsData.bookings.hajj}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {((analyticsData.bookings.hajj / analyticsData.overview.totalBookings) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-secondary-500 rounded mr-3"></div>
                <span className='text-sm font-medium text-gray-900 dark:text-white'>{t('umrahPackages')}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {analyticsData.bookings.umrah}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {((analyticsData.bookings.umrah / analyticsData.overview.totalBookings) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span className='text-sm font-medium text-gray-900 dark:text-white'>{t('globalTourism')}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {analyticsData.bookings.global}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {((analyticsData.bookings.global / analyticsData.overview.totalBookings) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Packages */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('topPerformingPackages')}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('package')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('bookings')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('revenue')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('avgValue')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {analyticsData.topPackages.map((pkg, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {pkg.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {pkg.bookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${pkg.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${Math.round(pkg.revenue / pkg.bookings).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('customerInsights')}</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('newCustomers')}</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {analyticsData.customerInsights.newCustomers}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('returningCustomers')}</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {analyticsData.customerInsights.returningCustomers}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('averageAge')}</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {analyticsData.customerInsights.averageAge} {t('years')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('topCountries')}</h3>
          <div className="space-y-3">
            {analyticsData.customerInsights.topCountries.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
                    #{index + 1}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">{country}</span>
                </div>
                <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${100 - (index * 15)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
