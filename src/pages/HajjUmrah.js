import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const HajjUmrah = () => {
  const { t } = useApp();
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const packages = [
    {
      id: 1,
      type: 'hajj',
      title: t('premiumHajjPackage'),
      duration: '14 days',
      price: 4500,
      originalPrice: 5200,
      description: t('premiumHajjDesc'),
      features: [
        t('roundTripFlights'),
        t('fiveStarMakkah'),
        t('fiveStarMadinah'),
        t('allMealsIncluded'),
        t('expertGuide'),
        t('transportationIncluded')
      ],
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.9,
      reviews: 127
    },
    {
      id: 2,
      type: 'hajj',
      title: t('standardHajjPackage'),
      duration: '14 days',
      price: 3200,
      originalPrice: 3800,
      description: t('standardHajjDesc'),
      features: [
        t('roundTripFlights'),
        t('fourStarMakkah'),
        t('fourStarMadinah'),
        t('breakfastIncluded'),
        t('expertGuideBasic'),
        t('transportationIncluded')
      ],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.7,
      reviews: 89
    },
    {
      id: 3,
      type: 'umrah',
      title: t('luxuryUmrahPackage'),
      duration: '10 days',
      price: 2800,
      originalPrice: 3200,
      description: t('luxuryUmrahDesc'),
      features: [
        t('roundTripFlights'),
        t('fiveStarMakkah'),
        t('fiveStarMadinah'),
        t('allMealsIncluded'),
        t('privateGuide'),
        t('vipTransportation')
      ],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.8,
      reviews: 156
    },
    {
      id: 4,
      type: 'umrah',
      title: t('familyUmrahPackage'),
      duration: '8 days',
      price: 2200,
      originalPrice: 2600,
      description: t('familyUmrahDesc'),
      features: [
        t('roundTripFlights'),
        t('familyFriendlyMakkah'),
        t('familyFriendlyMadinah'),
        t('breakfastIncluded'),
        t('familyGuide'),
        t('transportationIncluded')
      ],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.6,
      reviews: 73
    },
    {
      id: 5,
      type: 'umrah',
      title: t('quickUmrahPackage'),
      duration: '5 days',
      price: 1800,
      originalPrice: 2100,
      description: t('quickUmrahDesc'),
      features: [
        t('roundTripFlights'),
        t('threeStarMakkah'),
        t('threeStarMadinah'),
        t('breakfastIncluded'),
        t('groupGuide'),
        t('transportationIncluded')
      ],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.5,
      reviews: 45
    },
    {
      id: 6,
      type: 'hajj',
      title: t('economyHajjPackage'),
      duration: '14 days',
      price: 2500,
      originalPrice: 3000,
      description: t('economyHajjDesc'),
      features: [
        t('roundTripFlights'),
        t('threeStarMakkah'),
        t('threeStarMadinah'),
        t('breakfastIncluded'),
        t('groupGuide'),
        t('transportationIncluded')
      ],
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.4,
      reviews: 92
    }
  ];

  const filteredPackages = packages.filter(pkg => {
    const typeMatch = selectedType === 'all' || pkg.type === selectedType;
    const durationMatch = selectedDuration === 'all' || 
      (selectedDuration === 'short' && parseInt(pkg.duration) <= 7) ||
      (selectedDuration === 'medium' && parseInt(pkg.duration) > 7 && parseInt(pkg.duration) <= 10) ||
      (selectedDuration === 'long' && parseInt(pkg.duration) > 10);
    const priceMatch = selectedPrice === 'all' || 
      (selectedPrice === 'budget' && pkg.price <= 2000) ||
      (selectedPrice === 'mid' && pkg.price > 2000 && pkg.price <= 3500) ||
      (selectedPrice === 'premium' && pkg.price > 3500);
    
    return typeMatch && durationMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('hajjUmrahTitle')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {t('hajjUmrahSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Type Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('packageType')}</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input-field w-40"
              >
                <option value="all">{t('allTypes')}</option>
                <option value="hajj">{t('hajj')}</option>
                <option value="umrah">{t('umrah')}</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('duration')}</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="input-field w-40"
              >
                <option value="all">{t('allDurations')}</option>
                <option value="short">{t('shortDuration')}</option>
                <option value="medium">{t('mediumDuration')}</option>
                <option value="long">{t('longDuration')}</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('priceRange')}</label>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="input-field w-40"
              >
                <option value="all">{t('allPrices')}</option>
                <option value="budget">{t('budgetPrice')}</option>
                <option value="mid">{t('midPrice')}</option>
                <option value="premium">{t('premiumPrice')}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('availablePackages')} ({filteredPackages.length})
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('choosePackages')}
            </p>
          </div>

          {filteredPackages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('noPackagesFound')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('tryAdjustingFilters')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="card overflow-hidden">
                  <div className="relative">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        pkg.type === 'hajj' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-500 text-white'
                      }`}>
                        {pkg.type === 'hajj' ? 'Hajj' : 'Umrah'}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      Save ${pkg.originalPrice - pkg.price}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {pkg.title}
                    </h3>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{pkg.rating} ({pkg.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Duration:</span>
                        <span className="text-sm font-medium dark:text-white">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Price:</span>
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-primary-600">${pkg.price}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">${pkg.originalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t('packageIncludes')}</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {pkg.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                        {pkg.features.length > 3 && (
                          <li className="text-primary-600 text-sm">
                            +{pkg.features.length - 3} {t('moreFeatures')}
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/package/${pkg.id}`}
                        className="flex-1 btn-outline text-center"
                      >
                        {t('viewDetails')}
                      </Link>
                      <Link
                        to="/booking"
                        className="flex-1 btn-primary text-center"
                      >
                        {t('bookNow')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t('importantInformation')}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('hajjRequirements')}</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Valid passport with at least 6 months validity</li>
                    <li>• Hajj visa from Saudi Arabia</li>
                    <li>• Vaccination certificates (COVID-19, Meningitis)</li>
                    <li>• Physical fitness certificate</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('umrahRequirements')}</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Valid passport with at least 6 months validity</li>
                    <li>• Umrah visa from Saudi Arabia</li>
                    <li>• COVID-19 vaccination certificate</li>
                    <li>• Travel insurance</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t('whyChooseOurPackages')}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Expert Guidance</h3>
                    <p className="text-gray-600 dark:text-gray-300">Experienced guides who understand the spiritual significance of your journey</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Premium Accommodations</h3>
                    <p className="text-gray-600 dark:text-gray-300">Carefully selected hotels close to the Holy Mosques</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">24/7 Support</h3>
                    <p className="text-gray-600 dark:text-gray-300">Round-the-clock assistance throughout your journey</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HajjUmrah;
