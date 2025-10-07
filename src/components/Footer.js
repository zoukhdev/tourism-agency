/**
 * Footer Component - Website footer with links and information
 * 
 * Features:
 * - Company information and branding
 * - Quick navigation links
 * - Contact information
 * - Social media links
 * - Copyright notice
 * - Newsletter subscription
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const { t } = useApp();
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AH</span>
              </div>
              <span className="ml-3 text-xl font-bold">Al-Hijrah Tourism</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('footerDescription')}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/alhijrahtourism" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">{t('facebook')}</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com/alhijrahtourism" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">{t('instagram')}</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281H7.83c-.49 0-.875.385-.875.875v7.83c0 .49.385.875.875.875h8.449c.49 0 .875-.385.875-.875v-7.83c0-.49-.385-.875-.875-.875z"/>
                </svg>
              </a>
              <a href="https://twitter.com/alhijrahtourism" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">{t('twitter')}</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.1-2.827-.444a4.92 4.92 0 00-1.808-1.8 4.924 4.924 0 00-2.827-.444 4.958 4.958 0 00-2.163 2.723 10 10 0 01-2.825-.775 10 10 0 01-2.825.775 4.958 4.958 0 00-2.163-2.723c-.951.555-2.005.1-2.827-.444a4.924 4.924 0 00-2.827-.444 4.958 4.958 0 00-2.163 2.723 10 10 0 01-2.825.775 10 10 0 01-2.825-.775 4.958 4.958 0 002.163-2.723c-.951-.555-2.005-.1-2.827.444a4.924 4.924 0 00-2.827.444 4.958 4.958 0 00-2.163 2.723 10 10 0 01-2.825.775 10 10 0 01-2.825-.775z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/hajj-umrah" className="text-gray-300 hover:text-white transition-colors">
                  {t('hajjUmrah')}
                </Link>
              </li>
              <li>
                <Link to="/global-tourism" className="text-gray-300 hover:text-white transition-colors">
                  {t('globalTourism')}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-white transition-colors">
                  {t('bookNow')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contactInfo')}</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{t('phoneNumber')}</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{t('emailAddress')}</span>
              </div>
              <div className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{t('address')}<br />{t('addressLine2')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t('copyright')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('privacyPolicy')}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
