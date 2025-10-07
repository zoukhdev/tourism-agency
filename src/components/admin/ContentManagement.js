import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const ContentManagement = () => {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState('translations');
  const [showAddModal, setShowAddModal] = useState(false);

  const translations = [
    {
      key: 'heroTitle',
      english: 'Your Journey Begins Here',
      arabic: 'رحلتك تبدأ من هنا',
      french: 'Votre Voyage Commence Ici',
      lastModified: '2024-01-15',
      modifiedBy: 'Admin User'
    },
    {
      key: 'hajjUmrahTitle',
      english: 'Hajj & Umrah Programs',
      arabic: 'برامج الحج والعمرة',
      french: 'Programmes Hajj & Omra',
      lastModified: '2024-01-14',
      modifiedBy: 'Admin User'
    },
    {
      key: 'globalTourismTitle',
      english: 'Global Tourism Packages',
      arabic: 'حزم السياحة العالمية',
      french: 'Forfaits Tourisme Mondial',
      lastModified: '2024-01-13',
      modifiedBy: 'Admin User'
    },
    {
      key: 'contactTitle',
      english: 'Contact Us',
      arabic: 'اتصل بنا',
      french: 'Nous Contacter',
      lastModified: '2024-01-12',
      modifiedBy: 'Admin User'
    }
  ];

  const pages = [
    {
      id: 1,
      title: 'Homepage',
      slug: '/',
      status: 'published',
      lastModified: '2024-01-15',
      modifiedBy: 'Admin User',
      views: 15420
    },
    {
      id: 2,
      title: 'Hajj & Umrah',
      slug: '/hajj-umrah',
      status: 'published',
      lastModified: '2024-01-14',
      modifiedBy: 'Admin User',
      views: 8930
    },
    {
      id: 3,
      title: 'Global Tourism',
      slug: '/global-tourism',
      status: 'published',
      lastModified: '2024-01-13',
      modifiedBy: 'Admin User',
      views: 6720
    },
    {
      id: 4,
      title: 'Contact',
      slug: '/contact',
      status: 'published',
      lastModified: '2024-01-12',
      modifiedBy: 'Admin User',
      views: 3450
    },
    {
      id: 5,
      title: 'About Us',
      slug: '/about',
      status: 'draft',
      lastModified: '2024-01-10',
      modifiedBy: 'Admin User',
      views: 0
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const tabs = [
    { id: 'translations', label: t('translations'), count: translations.length },
    { id: 'pages', label: t('pages'), count: pages.length },
    { id: 'media', label: t('mediaLibrary'), count: 0 }
  ];

  const renderTranslationsTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('translationKey')}
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
              {t('english')}
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
              {t('arabic')}
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
              {t('french')}
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
              {t('lastModified')}
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('actions')}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {translations.map((translation) => (
            <tr key={translation.key} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-3 sm:px-6 py-4">
                <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                  {translation.key}
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
                <div className="text-xs sm:text-sm text-gray-900 dark:text-white max-w-xs truncate">
                  {translation.english}
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 hidden md:table-cell">
                <div className="text-xs sm:text-sm text-gray-900 dark:text-white max-w-xs truncate">
                  {translation.arabic}
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 hidden lg:table-cell">
                <div className="text-xs sm:text-sm text-gray-900 dark:text-white max-w-xs truncate">
                  {translation.french}
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 hidden md:table-cell">
                <div className="text-xs sm:text-sm text-gray-900 dark:text-white">
                  {translation.lastModified}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {t('modifiedBy')} {translation.modifiedBy}
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm font-medium">
                <div className="flex space-x-2">
                  <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                    {t('edit')}
                  </button>
                  <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                    {t('copy')}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPagesTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('pages')}
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
              {t('slug')}
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('status')}
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
              {t('views')}
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
              {t('lastModified')}
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('actions')}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {pages.map((page) => (
            <tr key={page.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-3 sm:px-6 py-4">
                <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                  {page.title}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  ID: {page.id}
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
                <div className="text-xs sm:text-sm text-gray-900 dark:text-white">
                  {page.slug}
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4">
                <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${getStatusColor(page.status)}`}>
                  {page.status}
                </span>
              </td>
              <td className="px-3 sm:px-6 py-4 hidden md:table-cell text-xs sm:text-sm text-gray-900 dark:text-white">
                {page.views.toLocaleString()}
              </td>
              <td className="px-3 sm:px-6 py-4 hidden md:table-cell">
                <div className="text-xs sm:text-sm text-gray-900 dark:text-white">
                  {page.lastModified}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {t('modifiedBy')} {page.modifiedBy}
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm font-medium">
                <div className="flex space-x-2">
                  <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                    {t('edit')}
                  </button>
                  <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                    {t('view')}
                  </button>
                  <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    {t('duplicate')}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMediaLibrary = () => (
    <div className="p-8 text-center">
      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('mediaLibrary')}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Upload and manage your images, videos, and documents</p>
      <button className="btn-primary">
        {t('uploadMedia')}
      </button>
    </div>
  );

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <div>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{t('contentManagement')}</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">{t('manageTranslationsPagesMedia')}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="text-sm sm:text-base">{t('addContent')}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{t('translationKeys')}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{translations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{t('publishedPages')}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {pages.filter(p => p.status === 'published').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{t('draftPages')}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {pages.filter(p => p.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{t('totalPageViews')}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {pages.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex flex-wrap gap-1 sm:gap-2 md:space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
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

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {activeTab === 'translations' && renderTranslationsTable()}
        {activeTab === 'pages' && renderPagesTable()}
        {activeTab === 'media' && renderMediaLibrary()}
      </div>

      {/* Add Content Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('addContent')}</h3>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contentType')}
                  </label>
                  <select className="input-field">
                    <option value="translation">{t('translationKey')}</option>
                    <option value="page">{t('pages')}</option>
                    <option value="media">{t('uploadMedia')}</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('title')}/{t('translationKey')}
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder={t('title')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('language')}
                    </label>
                    <select className="input-field">
                      <option value="en">{t('english')}</option>
                      <option value="ar">{t('arabic')}</option>
                      <option value="fr">{t('french')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('content')}
                  </label>
                  <textarea
                    rows={4}
                    className="input-field"
                    placeholder={t('content')}
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
                    {t('addContent')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
