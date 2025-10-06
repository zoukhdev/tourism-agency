/**
 * Homepage Component - Main landing page of the tourism website
 * 
 * Features:
 * - Hero section with rotating background images
 * - Services overview section
 * - Special offers showcase
 * - Why choose us section
 * - Call-to-action section
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import DebugPanel from '../components/DebugPanel';
import { debugLog, performanceMonitor, lifecycleLogger } from '../utils/debug';

const Homepage = () => {
  const { t } = useApp();
  
  // Debug logging using debug utilities (reduced frequency)
  useEffect(() => {
    debugLog.info('Homepage component mounted', { language: t('home') }, 'Homepage');
  }, []);
  
  // ===========================================
  // HERO SLIDER STATE AND CONFIGURATION
  // ===========================================
  
  // Background slider state - tracks current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Background images for the hero slider - using local images from src/images folder
  const backgroundImages = [
    require("../images/pexels-burak-karaduman-712806-1549326.jpg"), // Grand mosque with bridge
    require("../images/pexels-rushdi-fatani-782816372-19042360.jpg"), // Kaaba close-up
    require("../images/pexels-w4ed-3742589.jpg"), // Grand mosque panoramic view
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"  // Travel destination
  ];

  // Auto-rotate background images every 5 seconds with smooth transitions
  useEffect(() => {
    debugLog.info('Hero slider effect initialized', null, 'Homepage');
    performanceMonitor.start('hero-slider-setup');
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1;
        // Only log every 4th change to reduce console spam
        if (newIndex === 0) {
          debugLog.debug('Hero slider completed full cycle', { totalImages: backgroundImages.length }, 'Homepage');
        }
        return newIndex;
      });
    }, 5000);

    performanceMonitor.end('hero-slider-setup');

    return () => {
      debugLog.info('Hero slider effect cleaned up', null, 'Homepage');
      clearInterval(interval);
    };
  }, [backgroundImages.length]);

  // ===========================================
  // DATA ARRAYS FOR PAGE CONTENT
  // ===========================================
  
  // Special offers data - promotional packages with discounts
  const specialOffers = [
    {
      id: 1,
      title: "Early Bird Hajj 2024",
      description: "Book your Hajj journey now and save up to 15% on premium packages",
      discount: "15% OFF",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      validUntil: "March 31, 2024"
    },
    {
      id: 2,
      title: "Umrah Special Package",
      description: "Complete Umrah experience with 5-star accommodation and guided tours",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      validUntil: "April 15, 2024"
    },
    {
      id: 3,
      title: "European Summer Tour",
      description: "Explore the beauty of Europe with our curated summer packages",
      discount: "25% OFF",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      validUntil: "May 30, 2024"
    }
  ];

  // Services data - main service offerings with icons and descriptions
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('hajjUmrahService'),
      description: t('hajjUmrahDesc')
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t('globalTourismService'),
      description: t('globalTourismDesc')
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('expertGuidance'),
      description: t('expertGuidanceDesc')
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: t('bestPrices'),
      description: t('bestPricesDesc')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* ===========================================
          HERO SECTION
          Main banner with rotating background images
      =========================================== */}
      <section className="relative text-white overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
          ))}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-80"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-44 md:py-52">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/hajj-umrah" className="btn-secondary text-lg px-8 py-4">
                {t('exploreHajjUmrah')}
              </Link>
              <Link to="/global-tourism" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600">
                {t('discoverGlobalTours')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================
          SERVICES SECTION
          Overview of main service offerings
      =========================================== */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('ourServices')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('servicesSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 card">
                <div className="text-primary-600 mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================================
          SPECIAL OFFERS SECTION
          Promotional packages with discounts
      =========================================== */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('specialOffers')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('specialOffersSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialOffers.map((offer) => (
              <div key={offer.id} className="card overflow-hidden">
                <div className="relative">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {offer.discount}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {offer.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Valid until {offer.validUntil}
                    </span>
                    <Link
                      to="/booking"
                      className="btn-primary"
                    >
                      {t('bookNow')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================================
          WHY CHOOSE US SECTION
          Key features and benefits
      =========================================== */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('whyChooseUs')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t('expertGuidanceFeature')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('expertGuidanceFeatureDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t('premiumAccommodations')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('premiumAccommodationsDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t('support247')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('support247Desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Travel experience"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================
          CALL-TO-ACTION SECTION
          Final conversion section with booking links
      =========================================== */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('readyToStart')}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t('readyToStartSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="btn-secondary text-lg px-8 py-4">
                {t('bookYourTrip')}
              </Link>
              <Link to="/contact" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600">
                {t('getInTouch')}
              </Link>
            </div>
        </div>
      </section>
      
      {/* Debug Panel - Only visible in development */}
      <DebugPanel 
        componentName="Homepage" 
        props={{ 
          currentImageIndex, 
          backgroundImagesCount: backgroundImages.length,
          specialOffersCount: specialOffers.length,
          servicesCount: services.length
        }} 
      />
    </div>
  );
};

export default Homepage;
