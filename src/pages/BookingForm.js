import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const BookingForm = () => {
  const { t } = useApp();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [formData, setFormData] = useState({
    // Service Selection
    serviceType: '',
    packageId: '',
    
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Travel Details
    departureCity: '',
    preferredDepartureDate: '',
    returnDate: '',
    numberOfTravelers: 1,
    
    // Accommodation Preferences
    roomType: '',
    specialRequests: '',
    
    // Additional Services
    travelInsurance: false,
    visaAssistance: false,
    airportTransfer: false,
    additionalServices: [],
    
    
    // Payment Information
    agreeToTerms: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const serviceTypes = [
    { value: 'hajj', label: t('hajj') },
    { value: 'umrah', label: t('umrah') },
    { value: 'global-tourism', label: t('globalTourism') }
  ];

  const packages = {
    hajj: [
      { id: 1, name: t('premiumHajjPackage2024'), price: 4500 },
      { id: 2, name: t('standardHajjPackage2024'), price: 3200 },
      { id: 6, name: t('economyHajjPackage2024'), price: 2500 }
    ],
    umrah: [
      { id: 3, name: t('luxuryUmrahPackage'), price: 2800 },
      { id: 4, name: t('familyUmrahPackage'), price: 2200 },
      { id: 5, name: t('quickUmrahPackage'), price: 1800 }
    ],
    'global-tourism': [
      { id: 7, name: t('europeanCulturalHeritageTour'), price: 3200 },
      { id: 8, name: t('southeastAsiaAdventure'), price: 2800 },
      { id: 9, name: t('africanSafariExperience'), price: 4500 }
    ]
  };

  const roomTypes = [
    { value: 'single', label: t('singleRoom') },
    { value: 'double', label: t('doubleRoom') },
    { value: 'triple', label: t('tripleRoom') },
    { value: 'quad', label: t('quadRoom') }
  ];

  const additionalServicesOptions = [
    { value: 'extra-baggage', label: t('extraBaggageAllowance'), price: 150 },
    { value: 'seat-selection', label: t('seatSelection'), price: 50 },
    { value: 'meal-upgrade', label: t('mealUpgrade'), price: 100 },
    { value: 'wifi', label: t('inFlightWifi'), price: 75 }
  ];

  const paymentMethods = [
    { value: 'credit-card', label: t('creditCard') },
    { value: 'debit-card', label: t('debitCard') },
    { value: 'bank-transfer', label: t('bankTransfer') },
    { value: 'installments', label: t('installments') }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAdditionalServiceChange = (serviceValue, checked) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: checked 
        ? [...prev.additionalServices, serviceValue]
        : prev.additionalServices.filter(s => s !== serviceValue)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.serviceType) newErrors.serviceType = 'Please select a service type';
        if (!formData.packageId) newErrors.packageId = 'Please select a package';
        break;
      case 2:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        break;
      case 3:
        if (!formData.departureCity) newErrors.departureCity = 'Departure city is required';
        if (!formData.preferredDepartureDate) newErrors.preferredDepartureDate = 'Preferred departure date is required';
        if (!formData.returnDate) newErrors.returnDate = 'Return date is required';
        if (!formData.roomType) newErrors.roomType = 'Room type is required';
        break;
      case 4:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        break;
      default:
        // No validation for unknown steps
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Handle form submission
      console.log('Form submitted:', formData);
      alert('Booking request submitted successfully! We will contact you within 24 hours.');
    }
  };

  const getSelectedPackage = () => {
    const packageList = packages[formData.serviceType] || [];
    return packageList.find(pkg => pkg.id.toString() === formData.packageId);
  };

  const calculateTotal = () => {
    const selectedPackage = getSelectedPackage();
    if (!selectedPackage) return 0;
    
    let total = selectedPackage.price * formData.numberOfTravelers;
    
    // Add additional services
    formData.additionalServices.forEach(serviceValue => {
      const service = additionalServicesOptions.find(s => s.value === serviceValue);
      if (service) {
        total += service.price * formData.numberOfTravelers;
      }
    });
    
    return total;
  };

  const steps = [
    { number: 1, title: t('serviceSelection') },
    { number: 2, title: t('personalInformation') },
    { number: 3, title: t('travelDetails') },
    { number: 4, title: t('emergencyContact') },
    { number: 5, title: t('paymentConfirmation') }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t('bookYourJourney')}</h1>
            <p className="text-xl">{t('completeFormToReserve')}</p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Progress Bar */}
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-primary-600 border-primary-600 text-white' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                }`}>
                  {step.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Progress Bar */}
          <div className="md:hidden">
            {/* Current Step Display */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-2">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  'bg-primary-600 border-primary-600 text-white'
                }`}>
                  {currentStep}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-primary-600">
                {steps[currentStep - 1]?.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Step {currentStep} of {steps.length}
              </p>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center space-x-2">
              {steps.map((step, index) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    currentStep >= step.number 
                      ? 'bg-primary-600' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mt-1 ${
                      currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Labels (Compact) */}
            <div className="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
              {steps.map((step) => (
                <div key={step.number} className="text-center flex-1">
                  <div className={`font-medium ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.number}
                  </div>
                  <div className="truncate max-w-16">
                    {step.title.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('selectYourService')}</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('serviceType')} *
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="">{t('selectServiceType')}</option>
                      {serviceTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
                  </div>

                  {formData.serviceType && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('package')} *
                      </label>
                      <select
                        name="packageId"
                        value={formData.packageId}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="">{t('selectPackage')}</option>
                        {packages[formData.serviceType]?.map(pkg => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.name} - ${pkg.price}
                          </option>
                        ))}
                      </select>
                      {errors.packageId && <p className="text-red-500 text-sm mt-1">{errors.packageId}</p>}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('personalInformation')}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('firstName')} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('lastName')} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('phoneNumber')} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                </div>
              </div>
            )}

            {/* Step 3: Travel Details */}
            {currentStep === 3 && (
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('travelDetails')}</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('departureCity')} *
                      </label>
                      <input
                        type="text"
                        name="departureCity"
                        value={formData.departureCity}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder={t('placeholderDepartureCity')}
                      />
                      {errors.departureCity && <p className="text-red-500 text-sm mt-1">{errors.departureCity}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('numberOfTravelers')}
                      </label>
                      <select
                        name="numberOfTravelers"
                        value={formData.numberOfTravelers}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? t('person') : t('people')}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('preferredDepartureDate')} *
                      </label>
                      <input
                        type="date"
                        name="preferredDepartureDate"
                        value={formData.preferredDepartureDate}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                      {errors.preferredDepartureDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDepartureDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('returnDate')} *
                      </label>
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                      {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('roomType')} *
                    </label>
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="">{t('selectRoomType')}</option>
                      {roomTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('specialRequests')}
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={4}
                      className="input-field"
                      placeholder={t('placeholderSpecialRequests')}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('additionalServices')}</h3>
                    <div className="space-y-3">
                      {additionalServicesOptions.map(service => (
                        <label key={service.value} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.additionalServices.includes(service.value)}
                            onChange={(e) => handleAdditionalServiceChange(service.value, e.target.checked)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                            {service.label} (+${service.price})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* Step 4: Payment & Confirmation */}
            {currentStep === 4 && (
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('paymentConfirmation')}</h2>
                
                <div className="space-y-6">
                  {/* Booking Summary */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('bookingSummary')}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="dark:text-gray-300">{t('package')}:</span>
                        <span className="dark:text-white">{getSelectedPackage()?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="dark:text-gray-300">{t('travelers')}:</span>
                        <span className="dark:text-white">{formData.numberOfTravelers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="dark:text-gray-300">{t('basePrice')}:</span>
                        <span className="dark:text-white">${getSelectedPackage()?.price} × {formData.numberOfTravelers}</span>
                      </div>
                      {formData.additionalServices.length > 0 && (
                        <div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('additionalServices')}:</div>
                          {formData.additionalServices.map(serviceValue => {
                            const service = additionalServicesOptions.find(s => s.value === serviceValue);
                            return (
                              <div key={serviceValue} className="flex justify-between text-sm ml-4">
                                <span className="dark:text-gray-300">{service?.label}:</span>
                                <span className="dark:text-white">+${service?.price} × {formData.numberOfTravelers}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                        <div className="flex justify-between font-semibold text-lg">
                          <span className="dark:text-white">{t('total')}:</span>
                          <span className="dark:text-white">${calculateTotal()}</span>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                    />
                    <label className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                      {t('agreeToTerms')} *
                    </label>
                  </div>
                  {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium ${
                  currentStep === 1
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {t('previous')}
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary px-6 py-3"
                >
                  {t('next')}
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary px-6 py-3"
                >
                  {t('submitBooking')}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BookingForm;
