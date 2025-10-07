import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  // Clean translations object with no duplicates
  const translations = {
    en: {
      // Navigation
      home: 'Home',
      hajjUmrah: 'Hajj & Umrah',
      globalTourism: 'Global Tourism',
      contact: 'Contact',
      bookNow: 'Book Now',
      account: 'Account',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      selectLanguage: 'Select Language',
      
      // Homepage
      heroTitle: 'Your Journey Begins Here',
      heroSubtitle: 'Experience the world\'s most sacred pilgrimages and breathtaking destinations with Al-Hijrah Tourism - your trusted partner in spiritual and cultural journeys.',
      exploreHajjUmrah: 'Explore Hajj & Umrah',
      discoverGlobalTours: 'Discover Global Tours',
      ourServices: 'Our Services',
      servicesSubtitle: 'We provide comprehensive travel solutions tailored to your spiritual and cultural needs',
      hajjUmrahService: 'Hajj & Umrah',
      hajjUmrahDesc: 'Complete spiritual journeys with expert guidance and premium accommodations',
      globalTourismService: 'Global Tourism',
      globalTourismDesc: 'Explore the world with our carefully curated travel packages and experiences',
      expertGuidance: 'Expert Guidance',
      expertGuidanceDesc: 'Professional travel consultants to ensure your journey is seamless and memorable',
      bestPrices: 'Best Prices',
      bestPricesDesc: 'Competitive pricing with no hidden fees and flexible payment options',
      specialOffers: 'Special Offers',
      specialOffersSubtitle: 'Don\'t miss out on these limited-time deals',
      whyChooseUs: 'Why Choose Al-Hijrah Tourism?',
      expertGuidanceFeature: 'Expert Guidance',
      expertGuidanceFeatureDesc: 'Our experienced team provides personalized guidance for every step of your journey',
      premiumAccommodations: 'Premium Accommodations',
      premiumAccommodationsDesc: 'Stay in carefully selected hotels and accommodations for maximum comfort',
      support247: '24/7 Support',
      support247Desc: 'Round-the-clock assistance to ensure your journey is smooth and worry-free',
      readyToStart: 'Ready to Start Your Journey?',
      readyToStartSubtitle: 'Contact us today to plan your perfect spiritual or cultural journey',
      bookYourTrip: 'Book Your Trip',
      getInTouch: 'Get in Touch',
      
      // Hajj & Umrah Page
      hajjUmrahTitle: 'Hajj & Umrah Programs',
      hajjUmrahSubtitle: 'Embark on your spiritual journey with our carefully crafted Hajj and Umrah packages. Experience the sacred pilgrimage with comfort, guidance, and peace of mind.',
      packageType: 'Package Type',
      allTypes: 'All Types',
      hajj: 'Hajj',
      umrah: 'Umrah',
      duration: 'Duration',
      allDurations: 'All Durations',
      shortDuration: '1-7 days',
      mediumDuration: '8-10 days',
      longDuration: '11+ days',
      priceRange: 'Price Range',
      allPrices: 'All Prices',
      budgetPrice: 'Under $2,000',
      midPrice: '$2,000 - $3,500',
      premiumPrice: 'Above $3,500',
      availablePackages: 'Available Packages',
      choosePackages: 'Choose from our carefully selected Hajj and Umrah packages',
      noPackagesFound: 'No packages found',
      tryAdjustingFilters: 'Try adjusting your filters to see more options',
      packageIncludes: 'Package includes:',
      moreFeatures: 'more features',
      viewDetails: 'View Details',
      reviews: 'reviews',
      
      // Package Types
      premiumHajjPackage: 'Premium Hajj Package',
      standardHajjPackage: 'Standard Hajj Package',
      budgetHajjPackage: 'Budget Hajj Package',
      familyHajjPackage: 'Family Hajj Package',
      luxuryUmrahPackage: 'Luxury Umrah Package',
      standardUmrahPackage: 'Standard Umrah Package',
      budgetUmrahPackage: 'Budget Umrah Package',
      familyUmrahPackage: 'Family Umrah Package',
      quickUmrahPackage: 'Quick Umrah Package',
      economyHajjPackage: 'Economy Hajj Package 2024',
      
      // Package Descriptions
      premiumHajjDesc: 'Complete Hajj experience with 5-star accommodation in Makkah and Madinah',
      standardHajjDesc: 'Comfortable Hajj journey with quality accommodation and essential services',
      luxuryUmrahDesc: 'Premium Umrah experience with luxury accommodations and personalized service',
      standardUmrahDesc: 'Comfortable Umrah journey with quality accommodation and essential services',
      budgetUmrahDesc: 'Affordable Umrah package with basic accommodation and essential services',
      familyHajjDesc: 'Family-friendly Hajj package with spacious accommodations and child-friendly services',
      familyUmrahDesc: 'Perfect for families with children, including family-friendly accommodations',
      quickUmrahDesc: 'Short and sweet Umrah journey for those with limited time',
      
      // Package Features
      roundTripFlights: 'Round-trip flights',
      fiveStarMakkah: '5-star hotel in Makkah (5 nights)',
      fourStarMakkah: '4-star hotel in Makkah (5 nights)',
      threeStarMakkah: '3-star hotel in Makkah (5 nights)',
      fiveStarMadinah: '5-star hotel in Madinah (5 nights)',
      fourStarMadinah: '4-star hotel in Madinah (5 nights)',
      threeStarMadinah: '3-star hotel in Madinah (5 nights)',
      allMealsIncluded: 'All meals included',
      breakfastIncluded: 'Breakfast included',
      expertGuide: 'Expert guide throughout',
      expertGuideBasic: 'Expert guide',
      transportationIncluded: 'Transportation included',
      groupSize: 'Small group size (max 20)',
      familyServices: 'Family-friendly services',
      childCare: 'Child care services',
      
      // Global Tourism
      globalTourismTitle: 'Global Tourism Packages',
      globalTourismSubtitle: 'Discover the world with our carefully curated travel experiences. From cultural heritage tours to adventure expeditions, we offer unforgettable journeys across the globe.',
      
      // Booking Form
      serviceSelection: 'Service Selection',
      personalInformation: 'Personal Information',
      travelDetails: 'Travel Details',
      emergencyContact: 'Emergency Contact',
      paymentConfirmation: 'Payment Confirmation',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      dateOfBirth: 'Date of Birth',
      nationality: 'Nationality',
      passportNumber: 'Passport Number',
      passportExpiry: 'Passport Expiry',
      departureCity: 'Departure City',
      preferredDepartureDate: 'Preferred Departure Date',
      returnDate: 'Return Date',
      numberOfTravelers: 'Number of Travelers',
      roomType: 'Room Type',
      specialRequests: 'Special Requests',
      travelInsurance: 'Travel Insurance',
      visaAssistance: 'Visa Assistance',
      airportTransfer: 'Airport Transfer',
      emergencyContactName: 'Emergency Contact Name',
      emergencyContactPhone: 'Emergency Contact Phone',
      emergencyContactRelation: 'Emergency Contact Relation',
      paymentMethod: 'Payment Method',
      agreeToTerms: 'Agree to Terms',
      singleRoom: 'Single Room',
      doubleRoom: 'Double Room',
      tripleRoom: 'Triple Room',
      quadRoom: 'Quad Room',
      extraBaggageAllowance: 'Extra Baggage Allowance',
      seatSelection: 'Seat Selection',
      mealUpgrade: 'Meal Upgrade',
      inFlightWifi: 'In-Flight WiFi',
      creditCard: 'Credit Card',
      debitCard: 'Debit Card',
      bankTransfer: 'Bank Transfer',
      installments: 'Installments',
      
      // Contact Us
      contactUs: 'Contact Us',
      contactUsSubtitle: 'Get in touch with us for any questions or assistance with your travel plans',
      name: 'Name',
      subject: 'Subject',
      message: 'Message',
      inquiryType: 'Inquiry Type',
      generalInquiry: 'General Inquiry',
      bookingInquiry: 'Booking Inquiry',
      supportRequest: 'Support Request',
      feedback: 'Feedback',
      other: 'Other',
      submit: 'Submit',
      contactInfo: 'Contact Information',
      address: 'Address',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone Number',
      workingHours: 'Working Hours',
      mondayToFriday: 'Monday to Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      contactMethods: 'Contact Methods',
      
      // Authentication
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      adminLogin: 'Admin Login',
      adminLoginSubtitle: 'Access the admin dashboard',
      demoCredentials: 'Demo Credentials',
      password: 'Password',
      rememberMe: 'Remember Me',
      forgotPassword: 'Forgot Password?',
      backToWebsite: 'Back to Website',
      signingIn: 'Signing In...',
      signIn: 'Sign In',
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Email is invalid',
      phoneRequired: 'Phone number is required',
      phoneInvalid: 'Phone number is invalid',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 6 characters',
      passwordMinLength8: 'Password must be at least 8 characters',
      passwordComplexity: 'Password must contain uppercase, lowercase, number, and special character',
      confirmPasswordRequired: 'Confirm password is required',
      passwordsDoNotMatch: 'Passwords do not match',
      mustAgreeToTerms: 'You must agree to the terms and conditions',
      invalidCredentials: 'Invalid credentials',
      loginError: 'Login error occurred',
      
      // Profile
      profile: 'Profile',
      profileSettings: 'Profile Settings',
      personalInfo: 'Personal Information',
      bookingHistory: 'Booking History',
      preferences: 'Preferences',
      notifications: 'Notifications',
      privacy: 'Privacy',
      security: 'Security',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      
      // Admin Dashboard
      adminDashboard: 'Admin Dashboard',
      dashboardOverview: 'Dashboard Overview',
      packageManagement: 'Package Management',
      bookingManagement: 'Booking Management',
      userManagement: 'User Management',
      contentManagement: 'Content Management',
      analyticsDashboard: 'Analytics Dashboard',
      settingsPanel: 'Settings Panel',
      totalBookings: 'Total Bookings',
      totalRevenue: 'Total Revenue',
      activeUsers: 'Active Users',
      pendingBookings: 'Pending Bookings',
      recentBookings: 'Recent Bookings',
      topPerformingPackages: 'Top Performing Packages',
      customerInsights: 'Customer Insights',
      newCustomers: 'New Customers',
      returningCustomers: 'Returning Customers',
      averageAge: 'Average Age',
      topCountries: 'Top Countries',
      generalSettings: 'General Settings',
      appearance: 'Appearance',
      emailSettings: 'Email Settings',
      backupRestore: 'Backup & Restore',
      siteName: 'Site Name',
      siteDescription: 'Site Description',
      contactEmail: 'Contact Email',
      contactPhone: 'Contact Phone',
      currency: 'Currency',
      timezone: 'Timezone',
      dateFormat: 'Date Format',
      defaultLanguage: 'Default Language',
      theme: 'Theme',
      brandColors: 'Brand Colors',
      primary: 'Primary',
      secondary: 'Secondary',
      accent: 'Accent',
      background: 'Background',
      emailNotifications: 'Email Notifications',
      smsNotifications: 'SMS Notifications',
      maintenanceMode: 'Maintenance Mode',
      allowUserRegistration: 'Allow User Registration',
      requireEmailVerification: 'Require Email Verification',
      maximumFileSize: 'Maximum File Size',
      allowedFileTypes: 'Allowed File Types',
      smtpHost: 'SMTP Host',
      smtpPort: 'SMTP Port',
      smtpUsername: 'SMTP Username',
      smtpPassword: 'SMTP Password',
      fromEmailAddress: 'From Email Address',
      fromName: 'From Name',
      testEmailConfiguration: 'Test Email Configuration',
      saveEmailSettings: 'Save Email Settings',
      createBackup: 'Create Backup',
      restoreBackup: 'Restore Backup',
      backupHistory: 'Backup History',
      createBackupNow: 'Create Backup Now',
      download: 'Download',
      
      // Common Actions
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      save: 'Save',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      export: 'Export',
      import: 'Import',
      refresh: 'Refresh',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
      
      // Status
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      cancelled: 'Cancelled',
      completed: 'Completed',
      inProgress: 'In Progress',
      draft: 'Draft',
      published: 'Published',
      
      // User Types
      admin: 'Admin',
      staff: 'Staff',
      userType: 'User Type',
      fullName: 'Full Name',
      joinDate: 'Join Date',
      lastLogin: 'Last Login',
      status: 'Status',
      role: 'Role',
      permissions: 'Permissions',
      department: 'Department',
      
      // Booking Status
      bookingId: 'Booking ID',
      bookingDate: 'Booking Date',
      travelDate: 'Travel Date',
      travelers: 'Travelers',
      amount: 'Amount',
      payment: 'Payment',
      actions: 'Actions',
      customer: 'Customer',
      package: 'Package',
      price: 'Price',
      revenue: 'Revenue',
      bookings: 'Bookings',
      
      // Content Management
      addContent: 'Add Content',
      contentType: 'Content Type',
      title: 'Title',
      slug: 'Slug',
      content: 'Content',
      excerpt: 'Excerpt',
      featuredImage: 'Featured Image',
      tags: 'Tags',
      categories: 'Categories',
      publishDate: 'Publish Date',
      views: 'Views',
      uploadMedia: 'Upload Media',
      mediaLibrary: 'Media Library',
      translationKey: 'Translation Key',
      lastModified: 'Last Modified',
      modifiedBy: 'Modified By',
      translations: 'Translations',
      pages: 'Pages',
      totalPageViews: 'Total Page Views',
      publishedPages: 'Published Pages',
      draftPages: 'Draft Pages',
      
      // Footer
      footerDescription: 'Your trusted partner for Hajj, Umrah, and global tourism experiences. We provide exceptional service and unforgettable journeys that create lasting memories.',
      quickLinks: 'Quick Links',
      aboutUs: 'About Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      facebook: 'Facebook',
      instagram: 'Instagram',
      twitter: 'Twitter',
      linkedin: 'LinkedIn',
      youtube: 'YouTube',
      copyright: '© 2024 Al-Hijrah Tourism. All rights reserved.',
      
      // Common
      overview: 'Overview',
      details: 'Details',
      totalSpent: 'Total Spent',
      staffMembers: 'Staff Members',
      addUser: 'Add User'
    },
    
    ar: {
      // Navigation
      home: 'الرئيسية',
      hajjUmrah: 'الحج والعمرة',
      globalTourism: 'السياحة العالمية',
      contact: 'اتصل بنا',
      bookNow: 'احجز الآن',
      account: 'الحساب',
      darkMode: 'الوضع المظلم',
      lightMode: 'الوضع المضيء',
      selectLanguage: 'اختر اللغة',
      
      // Homepage
      heroTitle: 'رحلتك تبدأ من هنا',
      heroSubtitle: 'اختبر أكثر الحج المقدس والعمرة في العالم وأروع الوجهات مع الحجرة للسياحة - شريكك الموثوق في الرحلات الروحية والثقافية.',
      exploreHajjUmrah: 'استكشف الحج والعمرة',
      discoverGlobalTours: 'اكتشف الجولات العالمية',
      ourServices: 'خدماتنا',
      servicesSubtitle: 'نوفر حلول سفر شاملة مصممة خصيصاً لاحتياجاتك الروحية والثقافية',
      hajjUmrahService: 'الحج والعمرة',
      hajjUmrahDesc: 'رحلات روحية كاملة مع إرشاد خبير وإقامة فاخرة',
      globalTourismService: 'السياحة العالمية',
      globalTourismDesc: 'استكشف العالم مع حزم السفر وال experiences التي نختارها بعناية',
      expertGuidance: 'إرشاد خبير',
      expertGuidanceDesc: 'مستشارو سفر محترفون لضمان أن تكون رحلتك سلسة ومليئة بالذكريات',
      bestPrices: 'أفضل الأسعار',
      bestPricesDesc: 'أسعار تنافسية بدون رسوم مخفية وخيارات دفع مرنة',
      specialOffers: 'عروض خاصة',
      specialOffersSubtitle: 'لا تفوت هذه الصفقات المحدودة الوقت',
      whyChooseUs: 'لماذا تختار الحجرة للسياحة؟',
      expertGuidanceFeature: 'إرشاد خبير',
      expertGuidanceFeatureDesc: 'فريقنا ذو الخبرة يوفر إرشاداً شخصياً لكل خطوة في رحلتك',
      premiumAccommodations: 'إقامة فاخرة',
      premiumAccommodationsDesc: 'اقض في فنادق وإقامة مختارة بعناية لأقصى راحة',
      support247: 'دعم على مدار الساعة',
      support247Desc: 'مساعدة على مدار الساعة لضمان أن تكون رحلتك سلسة وخالية من القلق',
      readyToStart: 'مستعد لبدء رحلتك؟',
      readyToStartSubtitle: 'اتصل بنا اليوم لتخطيط رحلتك الروحية أو الثقافية المثالية',
      bookYourTrip: 'احجز رحلتك',
      getInTouch: 'تواصل معنا',
      
      // Additional Arabic translations (no duplicates)
      visaAssistance: 'مساعدة التأشيرة',
      cancel: 'إلغاء',
      customer: 'العميل',
      emailAddress: 'عنوان البريد الإلكتروني',
      phoneNumber: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      totalSpent: 'إجمالي المصروف',
      fullName: 'الاسم الكامل',
      address: 'العنوان',
      overview: 'نظرة عامة',
      totalBookings: 'إجمالي الحجوزات',
      recentBookings: 'الحجوزات الأخيرة',
      bookingId: 'رقم الحجز',
      travelDate: 'تاريخ السفر',
      packageType: 'نوع الباقة',
      userType: 'نوع المستخدم',
      addUser: 'إضافة مستخدم',
      totalPageViews: 'إجمالي مشاهدات الصفحة',
      publishedPages: 'الصفحات المنشورة',
      draftPages: 'الصفحات المسودة'
    },
    
    fr: {
      // Navigation
      home: 'Accueil',
      hajjUmrah: 'Hajj et Omra',
      globalTourism: 'Tourisme Mondial',
      contact: 'Contact',
      bookNow: 'Réserver Maintenant',
      account: 'Compte',
      darkMode: 'Mode Sombre',
      lightMode: 'Mode Clair',
      selectLanguage: 'Sélectionner la Langue',
      
      // Homepage
      heroTitle: 'Votre Voyage Commence Ici',
      heroSubtitle: 'Découvrez les pèlerinages les plus sacrés du monde et des destinations à couper le souffle avec Al-Hijrah Tourism - votre partenaire de confiance pour les voyages spirituels et culturels.',
      exploreHajjUmrah: 'Explorer Hajj et Omra',
      discoverGlobalTours: 'Découvrir les Tours Mondiaux',
      ourServices: 'Nos Services',
      servicesSubtitle: 'Nous fournissons des solutions de voyage complètes adaptées à vos besoins spirituels et culturels',
      hajjUmrahService: 'Hajj et Omra',
      hajjUmrahDesc: 'Voyages spirituels complets avec guidage expert et hébergement premium',
      globalTourismService: 'Tourisme Mondial',
      globalTourismDesc: 'Explorez le monde avec nos forfaits de voyage et expériences soigneusement sélectionnés',
      expertGuidance: 'Guidage Expert',
      expertGuidanceDesc: 'Conseillers en voyage professionnels pour assurer que votre voyage soit fluide et mémorable',
      bestPrices: 'Meilleurs Prix',
      bestPricesDesc: 'Prix compétitifs sans frais cachés et options de paiement flexibles',
      specialOffers: 'Offres Spéciales',
      specialOffersSubtitle: 'Ne manquez pas ces offres à durée limitée',
      whyChooseUs: 'Pourquoi Choisir Al-Hijrah Tourism?',
      expertGuidanceFeature: 'Guidage Expert',
      expertGuidanceFeatureDesc: 'Notre équipe expérimentée fournit un guidage personnalisé pour chaque étape de votre voyage',
      premiumAccommodations: 'Hébergement Premium',
      premiumAccommodationsDesc: 'Séjournez dans des hôtels et hébergements soigneusement sélectionnés pour un confort maximum',
      support247: 'Support 24/7',
      support247Desc: 'Assistance 24h/24 pour assurer que votre voyage soit fluide et sans souci',
      readyToStart: 'Prêt à Commencer Votre Voyage?',
      readyToStartSubtitle: 'Contactez-nous aujourd\'hui pour planifier votre voyage spirituel ou culturel parfait',
      bookYourTrip: 'Réserver Votre Voyage',
      getInTouch: 'Entrer en Contact',
      
      // Additional French translations (no duplicates)
      visaAssistance: 'Assistance Visa',
      cancel: 'Annuler',
      customer: 'Client',
      emailAddress: 'Adresse Email',
      phoneNumber: 'Numéro de Téléphone',
      email: 'Email',
      totalSpent: 'Total Dépensé',
      fullName: 'Nom Complet',
      address: 'Adresse',
      overview: 'Aperçu',
      totalBookings: 'Total des Réservations',
      recentBookings: 'Réservations Récentes',
      bookingId: 'ID de Réservation',
      travelDate: 'Date de Voyage',
      packageType: 'Type de Forfait',
      userType: 'Type d\'Utilisateur',
      addUser: 'Ajouter Utilisateur',
      totalPageViews: 'Total des Vues de Page',
      publishedPages: 'Pages Publiées',
      draftPages: 'Pages Brouillon'
    }
  };

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Get current language info
  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === language) || languages[0];
  };

  // Change language function
  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem('language', langCode);
    setIsLanguageDropdownOpen(false);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const value = {
    // State
    isDarkMode,
    language,
    isLanguageDropdownOpen,
    
    // Data
    languages,
    
    // Functions
    t,
    toggleDarkMode,
    changeLanguage,
    getCurrentLanguage,
    setIsLanguageDropdownOpen
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};