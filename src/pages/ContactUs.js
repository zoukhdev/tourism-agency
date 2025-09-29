import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const ContactUs = () => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: '',
    preferredContact: 'email'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    { value: 'hajj', label: t('hajjInquiry') },
    { value: 'umrah', label: t('umrahInquiry') },
    { value: 'global-tourism', label: t('globalTourismInquiry') },
    { value: 'booking', label: t('bookingSupport') },
    { value: 'general', label: t('generalInquiry') },
    { value: 'complaint', label: t('complaint') },
    { value: 'other', label: t('other') }
  ];

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: t('phone'),
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t('email'),
      details: 'info@alhijrahtourism.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t('address'),
      details: '123 Tourism Street',
      description: 'Travel City, TC 12345'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('businessHours'),
      details: 'Monday - Friday',
      description: '9:00 AM - 6:00 PM EST'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="card p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('messageSentSuccessfully')}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('messageSentDesc')}
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  subject: '',
                  message: '',
                  inquiryType: '',
                  preferredContact: 'email'
                });
              }}
              className="btn-primary"
            >
              {t('sendAnotherMessage')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('contactTitle')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {t('contactSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary-600">
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium mb-1">{method.details}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('sendMessage')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('fullName')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('emailAddress')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('inquiryType')} *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="">{t('inquiryType')}</option>
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.inquiryType && <p className="text-red-500 text-sm mt-1">{errors.inquiryType}</p>}
                  </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('subject')} *
                    </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Brief description of your inquiry"
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('message')} *
                    </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="input-field"
                    placeholder="Please provide details about your inquiry..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('preferredContactMethod')}
                    </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{t('email')}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{t('phone')}</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                    isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {isSubmitting ? t('sending') : t('sendMessageBtn')}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('visitOurOffice')}</h2>
              
              {/* Map Placeholder */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 mb-6 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>Interactive Map</p>
                  <p className="text-sm">123 Tourism Street, Travel City, TC 12345</p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('officeHours')}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{t('mondayFriday')}:</span>
                    <span className="font-medium dark:text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{t('saturday')}:</span>
                    <span className="font-medium dark:text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{t('sunday')}:</span>
                    <span className="font-medium dark:text-white">{t('closed')}</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('quickLinks')}</h3>
                <div className="space-y-3">
                  <a href="/hajj-umrah" className="block text-primary-600 hover:text-primary-700 transition-colors">
                    → Hajj & Umrah Packages
                  </a>
                  <a href="/global-tourism" className="block text-primary-600 hover:text-primary-700 transition-colors">
                    → Global Tourism Tours
                  </a>
                  <a href="/booking" className="block text-primary-600 hover:text-primary-700 transition-colors">
                    → Book Your Trip
                  </a>
                  <a href="/faq" className="block text-primary-600 hover:text-primary-700 transition-colors">
                    → Frequently Asked Questions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('frequentlyAskedQuestions')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('faqSubtitle')}
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How far in advance should I book my Hajj or Umrah package?",
                answer: "We recommend booking at least 3-6 months in advance for Hajj packages and 1-3 months for Umrah packages to ensure availability and better pricing."
              },
              {
                question: "What documents do I need for Hajj and Umrah?",
                answer: "You'll need a valid passport with at least 6 months validity, Hajj/Umrah visa, vaccination certificates (COVID-19, Meningitis), and a physical fitness certificate for Hajj."
              },
              {
                question: "Do you provide visa assistance?",
                answer: "Yes, we provide comprehensive visa assistance for all our packages. Our team will guide you through the entire visa application process."
              },
              {
                question: "What is included in your global tourism packages?",
                answer: "Our global tourism packages typically include flights, accommodations, guided tours, entrance fees to attractions, transportation, and some meals. Specific inclusions vary by package."
              },
              {
                question: "Can I customize my travel package?",
                answer: "Absolutely! We offer customizable packages to meet your specific needs and preferences. Contact us to discuss your requirements."
              },
              {
                question: "What is your cancellation policy?",
                answer: "Our cancellation policy varies by package type and timing. Generally, cancellations made 30+ days before departure receive a full refund, while closer cancellations may incur fees."
              }
            ].map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
