import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const GlobalTourism = () => {
  const { t } = useApp();
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  const packages = [
    {
      id: 7,
      destination: 'europe',
      interest: 'cultural',
      title: 'European Cultural Heritage Tour',
      duration: '12 days',
      price: 3200,
      originalPrice: 3800,
      description: 'Explore the rich cultural heritage of Europe including Paris, Rome, and Barcelona',
      features: [
        'Round-trip flights',
        '4-star accommodations',
        'All breakfasts included',
        'Professional tour guide',
        'Entrance to major attractions',
        'Transportation between cities'
      ],
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.8,
      reviews: 156,
      countries: ['France', 'Italy', 'Spain']
    },
    {
      id: 8,
      destination: 'asia',
      interest: 'adventure',
      title: 'Southeast Asia Adventure',
      duration: '15 days',
      price: 2800,
      originalPrice: 3200,
      description: 'Thrilling adventure through Thailand, Vietnam, and Cambodia',
      features: [
        'Round-trip flights',
        '3-4 star accommodations',
        'All meals included',
        'Adventure activities',
        'Local guides',
        'Internal transportation'
      ],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.7,
      reviews: 89,
      countries: ['Thailand', 'Vietnam', 'Cambodia']
    },
    {
      id: 9,
      destination: 'africa',
      interest: 'wildlife',
      title: 'African Safari Experience',
      duration: '10 days',
      price: 4500,
      originalPrice: 5200,
      description: 'Unforgettable wildlife safari in Kenya and Tanzania',
      features: [
        'Round-trip flights',
        'Luxury safari lodges',
        'All meals included',
        'Game drives',
        'Professional safari guide',
        'Airport transfers'
      ],
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.9,
      reviews: 127,
      countries: ['Kenya', 'Tanzania']
    },
    {
      id: 10,
      destination: 'americas',
      interest: 'nature',
      title: 'Costa Rica Nature & Wildlife',
      duration: '8 days',
      price: 2200,
      originalPrice: 2600,
      description: 'Explore Costa Rica\'s incredible biodiversity and natural beauty',
      features: [
        'Round-trip flights',
        'Eco-lodges',
        'All meals included',
        'Nature tours',
        'Wildlife spotting',
        'Transportation included'
      ],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.6,
      reviews: 73,
      countries: ['Costa Rica']
    },
    {
      id: 11,
      destination: 'middle-east',
      interest: 'cultural',
      title: 'Middle East Cultural Journey',
      duration: '10 days',
      price: 3500,
      originalPrice: 4000,
      description: 'Discover the rich history and culture of the Middle East',
      features: [
        'Round-trip flights',
        '5-star accommodations',
        'All meals included',
        'Cultural tours',
        'Historical sites',
        'Private guide'
      ],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.8,
      reviews: 94,
      countries: ['UAE', 'Jordan', 'Egypt']
    },
    {
      id: 12,
      destination: 'oceania',
      interest: 'relaxation',
      title: 'Fiji Paradise Retreat',
      duration: '7 days',
      price: 3800,
      originalPrice: 4200,
      description: 'Relax in the tropical paradise of Fiji with luxury beach resorts',
      features: [
        'Round-trip flights',
        'Luxury beach resort',
        'All meals included',
        'Water activities',
        'Spa treatments',
        'Airport transfers'
      ],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.9,
      reviews: 68,
      countries: ['Fiji']
    },
    {
      id: 13,
      destination: 'europe',
      interest: 'relaxation',
      title: 'Mediterranean Cruise',
      duration: '14 days',
      price: 4200,
      originalPrice: 4800,
      description: 'Luxury cruise through the Mediterranean with stops in iconic cities',
      features: [
        'Luxury cruise ship',
        'All meals included',
        'Shore excursions',
        'Entertainment shows',
        'Spa access',
        'Port transfers'
      ],
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.7,
      reviews: 112,
      countries: ['Italy', 'Greece', 'Spain', 'France']
    },
    {
      id: 14,
      destination: 'asia',
      interest: 'cultural',
      title: 'Japan Cultural Experience',
      duration: '10 days',
      price: 3600,
      originalPrice: 4000,
      description: 'Immerse yourself in Japanese culture, traditions, and modern life',
      features: [
        'Round-trip flights',
        'Traditional ryokan stays',
        'All meals included',
        'Cultural activities',
        'Bullet train passes',
        'Local guides'
      ],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.8,
      reviews: 145,
      countries: ['Japan']
    }
  ];

  const filteredPackages = packages.filter(pkg => {
    const destinationMatch = selectedDestination === 'all' || pkg.destination === selectedDestination;
    const interestMatch = selectedInterest === 'all' || pkg.interest === selectedInterest;
    const durationMatch = selectedDuration === 'all' || 
      (selectedDuration === 'short' && parseInt(pkg.duration) <= 7) ||
      (selectedDuration === 'medium' && parseInt(pkg.duration) > 7 && parseInt(pkg.duration) <= 12) ||
      (selectedDuration === 'long' && parseInt(pkg.duration) > 12);
    const priceMatch = selectedPrice === 'all' || 
      (selectedPrice === 'budget' && pkg.price <= 2500) ||
      (selectedPrice === 'mid' && pkg.price > 2500 && pkg.price <= 4000) ||
      (selectedPrice === 'premium' && pkg.price > 4000);
    
    return destinationMatch && interestMatch && durationMatch && priceMatch;
  });

  const destinations = [
    { value: 'all', label: t('allDestinations') },
    { value: 'europe', label: t('europe') },
    { value: 'asia', label: t('asia') },
    { value: 'africa', label: t('africa') },
    { value: 'americas', label: t('americas') },
    { value: 'middle-east', label: t('middleEast') },
    { value: 'oceania', label: t('oceania') }
  ];

  const interests = [
    { value: 'all', label: t('allInterests') },
    { value: 'cultural', label: t('cultural') },
    { value: 'adventure', label: t('adventure') },
    { value: 'wildlife', label: t('wildlife') },
    { value: 'nature', label: t('nature') },
    { value: 'relaxation', label: t('relaxation') }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-500 to-secondary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('globalTourismTitle')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {t('globalTourismSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Destination Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('destination')}</label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="input-field"
              >
                {destinations.map(dest => (
                  <option key={dest.value} value={dest.value}>{dest.label}</option>
                ))}
              </select>
            </div>

            {/* Interest Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('interest')}</label>
              <select
                value={selectedInterest}
                onChange={(e) => setSelectedInterest(e.target.value)}
                className="input-field"
              >
                {interests.map(interest => (
                  <option key={interest.value} value={interest.value}>{interest.label}</option>
                ))}
              </select>
            </div>

            {/* Duration Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('duration')}</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="input-field"
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
                className="input-field"
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
              {t('chooseGlobalPackages')}
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
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-secondary-500 text-white">
                        {pkg.destination.charAt(0).toUpperCase() + pkg.destination.slice(1)}
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
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Countries:</span>
                        <span className="text-sm font-medium dark:text-white">{pkg.countries.join(', ')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Price:</span>
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-secondary-600">${pkg.price}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">${pkg.originalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Package includes:</h4>
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
                          <li className="text-secondary-600 dark:text-secondary-400 text-sm">
                            +{pkg.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/package/${pkg.id}`}
                        className="flex-1 btn-outline text-center"
                      >
                        View Details
                      </Link>
                      <Link
                        to="/booking"
                        className="flex-1 btn-secondary text-center"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('popularDestinations')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('popularDestinationsSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: t('europe'), image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', packages: 12 },
              { name: t('asia'), image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', packages: 8 },
              { name: t('africa'), image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', packages: 6 },
              { name: t('americas'), image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', packages: 10 }
            ].map((destination, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm">{destination.packages} {t('packagesAvailable')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('whyChooseGlobalTours')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('whyChooseGlobalToursSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('expertLocalGuides')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('expertLocalGuidesDesc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('curatedExperiences')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('curatedExperiencesDesc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('support247Global')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('support247GlobalDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalTourism;
