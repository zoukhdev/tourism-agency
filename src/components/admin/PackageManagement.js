import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const PackageManagement = () => {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState('hajj');
  const [showAddModal, setShowAddModal] = useState(false);

  const packages = {
    hajj: [
      {
        id: 1,
        title: 'Premium Hajj Package 2024',
        price: 4500,
        originalPrice: 5200,
        duration: '14 days',
        status: 'active',
        bookings: 127,
        revenue: 571500
      },
      {
        id: 2,
        title: 'Standard Hajj Package 2024',
        price: 3200,
        originalPrice: 3800,
        duration: '14 days',
        status: 'active',
        bookings: 89,
        revenue: 284800
      },
      {
        id: 6,
        title: 'Economy Hajj Package 2024',
        price: 2500,
        originalPrice: 3000,
        duration: '14 days',
        status: 'active',
        bookings: 92,
        revenue: 230000
      }
    ],
    umrah: [
      {
        id: 3,
        title: 'Luxury Umrah Package',
        price: 2800,
        originalPrice: 3200,
        duration: '10 days',
        status: 'active',
        bookings: 156,
        revenue: 436800
      },
      {
        id: 4,
        title: 'Family Umrah Package',
        price: 2200,
        originalPrice: 2600,
        duration: '8 days',
        status: 'active',
        bookings: 73,
        revenue: 160600
      },
      {
        id: 5,
        title: 'Quick Umrah Package',
        price: 1800,
        originalPrice: 2100,
        duration: '5 days',
        status: 'active',
        bookings: 45,
        revenue: 81000
      }
    ],
    global: [
      {
        id: 7,
        title: 'European Cultural Heritage Tour',
        price: 3200,
        originalPrice: 3800,
        duration: '12 days',
        status: 'active',
        bookings: 156,
        revenue: 499200
      },
      {
        id: 8,
        title: 'Southeast Asia Adventure',
        price: 2800,
        originalPrice: 3200,
        duration: '10 days',
        status: 'active',
        bookings: 98,
        revenue: 274400
      },
      {
        id: 9,
        title: 'African Safari Experience',
        price: 4500,
        originalPrice: 5200,
        duration: '14 days',
        status: 'active',
        bookings: 67,
        revenue: 301500
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const tabs = [
    { id: 'hajj', label: t('hajjPackages'), count: packages.hajj.length },
    { id: 'umrah', label: t('umrahPackages'), count: packages.umrah.length },
    { id: 'global', label: t('globalTourism'), count: packages.global.length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                {t('packageManagement')}
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300">
                {t('manageYourTravelPackages')}
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {t('addNewPackage')}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Packages Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Mobile Card View */}
          <div className="block sm:hidden">
            {packages[activeTab].map((pkg) => (
              <div key={pkg.id} className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white leading-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ID: {pkg.id}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getStatusColor(pkg.status)}`}>
                    {pkg.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('duration')}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{pkg.duration}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('bookings')}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{pkg.bookings}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('price')}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">${pkg.price}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-through">${pkg.originalPrice}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('revenue')}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">${pkg.revenue.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 text-xs font-medium py-2 px-3 rounded-md border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                    {t('edit')}
                  </button>
                  <button className="flex-1 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 text-xs font-medium py-2 px-3 rounded-md border border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                    {t('view')}
                  </button>
                  <button className="flex-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-xs font-medium py-2 px-3 rounded-md border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    {t('delete')}
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
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('package')}
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('duration')}
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('price')}
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                    {t('bookings')}
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                    {t('revenue')}
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('status')}
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {packages[activeTab].map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          {pkg.title}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          ID: {pkg.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-white">
                      {pkg.duration}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        ${pkg.price}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${pkg.originalPrice}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell text-xs sm:text-sm text-gray-900 dark:text-white">
                      {pkg.bookings}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                      ${pkg.revenue.toLocaleString()}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className={`inline-flex px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${getStatusColor(pkg.status)}`}>
                        {pkg.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">
                      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                        <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 text-xs sm:text-sm">
                          {t('edit')}
                        </button>
                        <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 text-xs sm:text-sm">
                          {t('view')}
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-xs sm:text-sm">
                          {t('delete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Package Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('addNewPackage')}</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('packageTitle')}
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder={t('packageTitle')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('packageType')}
                    </label>
                    <select className="input-field">
                      <option value="hajj">{t('hajjPackages')}</option>
                      <option value="umrah">{t('umrahPackages')}</option>
                      <option value="global">{t('globalTourism')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('price')}
                    </label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('originalPrice')}
                    </label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('duration')}
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g., 14 days"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('description')}
                  </label>
                  <textarea
                    rows={4}
                    className="input-field"
                    placeholder={t('description')}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn-outline"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    {t('addPackage')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default PackageManagement;
