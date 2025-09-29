import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const PackageDetails = () => {
  const { id } = useParams();
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in a real app, this would come from an API
  const packageData = {
    1: {
      id: 1,
      type: 'hajj',
      title: 'Premium Hajj Package 2024',
      duration: '14 days',
      price: 4500,
      originalPrice: 5200,
      description: 'Complete Hajj experience with 5-star accommodation in Makkah and Madinah. This premium package offers the ultimate spiritual journey with luxury accommodations, expert guidance, and comprehensive services.',
      features: [
        'Round-trip flights from major cities',
        '5-star hotel in Makkah (5 nights) - Walking distance to Haram',
        '5-star hotel in Madinah (5 nights) - Close to Prophet\'s Mosque',
        'All meals included (Halal certified)',
        'Expert Islamic guide throughout the journey',
        'Air-conditioned transportation',
        'Hajj visa processing assistance',
        'Travel insurance included',
        '24/7 support team',
        'Group size: Maximum 25 people'
      ],
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.9,
      reviews: 127,
      itinerary: [
        {
          day: 1,
          title: 'Departure',
          description: 'Depart from your home city to Jeddah, Saudi Arabia. Arrive and transfer to Makkah hotel.',
          activities: ['Airport pickup', 'Hotel check-in', 'Rest and refresh']
        },
        {
          day: 2,
          title: 'Makkah Arrival',
          description: 'Arrive in Makkah and perform Umrah. Check into your hotel near the Haram.',
          activities: ['Umrah performance', 'Hotel check-in', 'Evening prayers at Haram']
        },
        {
          day: 3,
          title: 'Makkah Stay',
          description: 'Spend the day in Makkah performing prayers and visiting holy sites.',
          activities: ['Fajr prayer at Haram', 'Visit to Mount Arafat', 'Evening prayers']
        },
        {
          day: 4,
          title: 'Hajj Begins',
          description: 'Start of Hajj rituals. Move to Mina for the first day of Hajj.',
          activities: ['Move to Mina', 'Stay in Mina tents', 'Evening prayers']
        },
        {
          day: 5,
          title: 'Day of Arafat',
          description: 'The most important day of Hajj. Spend the day in Arafat in prayer and supplication.',
          activities: ['Move to Arafat', 'Wuquf at Arafat', 'Evening prayers']
        },
        {
          day: 6,
          title: 'Muzdalifah & Mina',
          description: 'Move to Muzdalifah for the night, then return to Mina for stoning rituals.',
          activities: ['Move to Muzdalifah', 'Collect pebbles', 'Return to Mina']
        },
        {
          day: 7,
          title: 'Eid al-Adha',
          description: 'Celebrate Eid al-Adha and perform the sacrifice. Complete remaining Hajj rituals.',
          activities: ['Eid prayers', 'Animal sacrifice', 'Stoning rituals', 'Tawaf al-Ifadah']
        },
        {
          day: 8,
          title: 'Makkah Return',
          description: 'Return to Makkah and perform final Tawaf and Sa\'i.',
          activities: ['Return to Makkah', 'Final Tawaf', 'Sa\'i completion']
        },
        {
          day: 9,
          title: 'Makkah Stay',
          description: 'Spend additional days in Makkah for prayers and reflection.',
          activities: ['Prayers at Haram', 'Shopping', 'Rest and reflection']
        },
        {
          day: 10,
          title: 'Madinah Transfer',
          description: 'Travel to Madinah and visit the Prophet\'s Mosque.',
          activities: ['Travel to Madinah', 'Hotel check-in', 'Visit to Prophet\'s Mosque']
        },
        {
          day: 11,
          title: 'Madinah Stay',
          description: 'Spend time in Madinah visiting historical sites and praying at the Prophet\'s Mosque.',
          activities: ['Prayers at Prophet\'s Mosque', 'Visit to historical sites', 'Shopping']
        },
        {
          day: 12,
          title: 'Madinah Stay',
          description: 'Continue exploring Madinah and its holy sites.',
          activities: ['Visit to Quba Mosque', 'Visit to Uhud Mountain', 'Evening prayers']
        },
        {
          day: 13,
          title: 'Final Day',
          description: 'Last day in Madinah. Prepare for departure.',
          activities: ['Final prayers', 'Shopping', 'Packing']
        },
        {
          day: 14,
          title: 'Departure',
          description: 'Transfer to airport and depart for home.',
          activities: ['Airport transfer', 'Departure']
        }
      ],
      inclusions: [
        'Round-trip economy class flights',
        '5-star hotel accommodation in Makkah and Madinah',
        'All meals (breakfast, lunch, dinner)',
        'Air-conditioned transportation throughout',
        'Expert Islamic guide',
        'Hajj visa processing',
        'Travel insurance',
        'All entrance fees and taxes',
        '24/7 support team',
        'Group size limited to 25 people'
      ],
      exclusions: [
        'Personal expenses and shopping',
        'Additional meals not mentioned',
        'Tips and gratuities',
        'Visa fees (if applicable)',
        'Any services not mentioned in inclusions'
      ],
      requirements: [
        'Valid passport with at least 6 months validity',
        'Hajj visa from Saudi Arabia',
        'COVID-19 vaccination certificate',
        'Meningitis vaccination certificate',
        'Physical fitness certificate',
        'Travel insurance (if not included)'
      ]
    },
    7: {
      id: 7,
      type: 'global',
      title: 'European Cultural Heritage Tour',
      duration: '12 days',
      price: 3200,
      originalPrice: 3800,
      description: 'Explore the rich cultural heritage of Europe including Paris, Rome, and Barcelona. This comprehensive tour takes you through the most iconic cities and landmarks of Europe.',
      features: [
        'Round-trip flights from major cities',
        '4-star hotel accommodations',
        'All breakfasts included',
        'Professional tour guide',
        'Entrance to major attractions',
        'Transportation between cities',
        'City tours and walking tours',
        'Travel insurance included',
        '24/7 support team',
        'Group size: Maximum 30 people'
      ],
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.8,
      reviews: 156,
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Paris',
          description: 'Arrive in Paris and transfer to hotel. Evening at leisure.',
          activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner']
        },
        {
          day: 2,
          title: 'Paris City Tour',
          description: 'Full day city tour of Paris including Eiffel Tower, Louvre, and Notre Dame.',
          activities: ['Eiffel Tower visit', 'Louvre Museum', 'Notre Dame Cathedral', 'Seine River cruise']
        },
        {
          day: 3,
          title: 'Paris - Versailles',
          description: 'Day trip to Palace of Versailles.',
          activities: ['Palace of Versailles tour', 'Gardens exploration', 'Return to Paris']
        },
        {
          day: 4,
          title: 'Paris to Rome',
          description: 'Travel to Rome by flight. Transfer to hotel.',
          activities: ['Flight to Rome', 'Hotel check-in', 'Evening at leisure']
        },
        {
          day: 5,
          title: 'Rome City Tour',
          description: 'Explore ancient Rome including Colosseum and Roman Forum.',
          activities: ['Colosseum tour', 'Roman Forum', 'Palatine Hill', 'Trevi Fountain']
        },
        {
          day: 6,
          title: 'Vatican City',
          description: 'Visit Vatican City and St. Peter\'s Basilica.',
          activities: ['Vatican Museums', 'Sistine Chapel', 'St. Peter\'s Basilica']
        },
        {
          day: 7,
          title: 'Rome to Barcelona',
          description: 'Travel to Barcelona by flight. Transfer to hotel.',
          activities: ['Flight to Barcelona', 'Hotel check-in', 'Evening at leisure']
        },
        {
          day: 8,
          title: 'Barcelona City Tour',
          description: 'Explore Barcelona including Sagrada Familia and Park Güell.',
          activities: ['Sagrada Familia', 'Park Güell', 'Gothic Quarter', 'Las Ramblas']
        },
        {
          day: 9,
          title: 'Barcelona - Gaudi Tour',
          description: 'Full day dedicated to Antoni Gaudi\'s masterpieces.',
          activities: ['Casa Batlló', 'Casa Milà', 'Gaudi House Museum']
        },
        {
          day: 10,
          title: 'Barcelona Free Day',
          description: 'Free day to explore Barcelona at your own pace.',
          activities: ['Free time', 'Shopping', 'Beach visit (optional)']
        },
        {
          day: 11,
          title: 'Barcelona to Paris',
          description: 'Return to Paris by flight.',
          activities: ['Flight to Paris', 'Hotel check-in', 'Farewell dinner']
        },
        {
          day: 12,
          title: 'Departure',
          description: 'Transfer to airport and depart for home.',
          activities: ['Airport transfer', 'Departure']
        }
      ],
      inclusions: [
        'Round-trip economy class flights',
        '4-star hotel accommodations',
        'Daily breakfast',
        'Professional tour guide',
        'Entrance fees to all attractions',
        'Transportation between cities',
        'City tours and walking tours',
        'Travel insurance',
        '24/7 support team'
      ],
      exclusions: [
        'Lunch and dinner (except welcome and farewell dinners)',
        'Personal expenses and shopping',
        'Tips and gratuities',
        'Optional activities',
        'Any services not mentioned in inclusions'
      ],
      requirements: [
        'Valid passport with at least 6 months validity',
        'Schengen visa (if required)',
        'Travel insurance',
        'COVID-19 vaccination certificate (if required)'
      ]
    }
  };

  const packageInfo = packageData[id] || packageData[1];

  const tabs = [
    { id: 'overview', label: t('overview') },
    { id: 'itinerary', label: t('itinerary') },
    { id: 'inclusions', label: t('inclusions') },
    { id: 'requirements', label: t('requirements') }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  packageInfo.type === 'hajj' 
                    ? 'bg-green-500 text-white' 
                    : packageInfo.type === 'umrah'
                    ? 'bg-blue-500 text-white'
                    : 'bg-secondary-500 text-white'
                }`}>
                  {packageInfo.type === 'hajj' ? 'Hajj' : packageInfo.type === 'umrah' ? 'Umrah' : 'Global Tourism'}
                </span>
                <span className="ml-3 text-sm">{packageInfo.duration}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {packageInfo.title}
              </h1>
              <p className="text-xl mb-6">
                {packageInfo.description}
              </p>
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-6">
                  <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-lg">{packageInfo.rating} ({packageInfo.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={packageInfo.image}
                alt={packageInfo.title}
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Price Section */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-primary-600">${packageInfo.price}</span>
                <span className="text-xl text-gray-500 dark:text-gray-400 line-through ml-3">${packageInfo.originalPrice}</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold ml-3">
                  {t('save')} ${packageInfo.originalPrice - packageInfo.price}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{t('perPersonDoubleOccupancy')}</p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/contact"
                className="btn-outline"
              >
                {t('askQuestion')}
              </Link>
              <Link
                to="/booking"
                className="btn-primary"
              >
                {t('bookNow')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('packageOverview')}</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {packageInfo.description}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('keyFeatures')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {packageInfo.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="card p-6 sticky top-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('quickFacts')}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t('duration')}:</span>
                      <span className="font-medium dark:text-white">{packageInfo.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t('rating')}:</span>
                      <span className="font-medium dark:text-white">{packageInfo.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t('reviews')}:</span>
                      <span className="font-medium dark:text-white">{packageInfo.reviews}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t('type')}:</span>
                      <span className="font-medium dark:text-white capitalize">{packageInfo.type}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600 mb-2">${packageInfo.price}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('perPerson')}</div>
                      <Link
                        to="/booking"
                        className="w-full btn-primary text-center block"
                      >
                        {t('bookThisPackage')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('detailedItinerary')}</h2>
              <div className="space-y-6">
                {packageInfo.itinerary.map((day, index) => (
                  <div key={index} className="card p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-primary-600 font-bold">{t('day')} {day.day}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{day.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{day.description}</p>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t('activities')}:</h4>
                          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                            {day.activities.map((activity, actIndex) => (
                              <li key={actIndex}>{activity}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('whatsIncluded')}</h2>
                <div className="space-y-3">
                  {packageInfo.inclusions.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('whatsNotIncluded')}</h2>
                <div className="space-y-3">
                  {packageInfo.exclusions.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('travelRequirements')}</h2>
              <div className="card p-6">
                <div className="space-y-4">
                  {packageInfo.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{requirement}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex">
                    <svg className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">{t('importantNote')}</h3>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        {t('requirementsNote')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Packages */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('youMightAlsoLike')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('exploreOtherPackages')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* This would typically show related packages */}
            <div className="card p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Standard Hajj Package</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Comfortable Hajj journey with quality accommodation</p>
              <div className="text-2xl font-bold text-primary-600 mb-4">$3,200</div>
              <Link to="/package/2" className="btn-outline">View Details</Link>
            </div>
            
            <div className="card p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Luxury Umrah Package</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Premium Umrah experience with luxury accommodations</p>
              <div className="text-2xl font-bold text-primary-600 mb-4">$2,800</div>
              <Link to="/package/3" className="btn-outline">View Details</Link>
            </div>
            
            <div className="card p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Southeast Asia Adventure</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Thrilling adventure through Thailand, Vietnam, and Cambodia</p>
              <div className="text-2xl font-bold text-primary-600 mb-4">$2,800</div>
              <Link to="/package/8" className="btn-outline">View Details</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageDetails;
