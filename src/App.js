/**
 * Main App Component - Tourism Agency Website
 * 
 * This component sets up the main application structure including:
 * - React Router for navigation
 * - Context provider for global state management
 * - Route definitions for all pages
 * - Layout structure with header and footer
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';

// Lazy load components for better performance
const HajjUmrah = lazy(() => import('./pages/HajjUmrah'));
const GlobalTourism = lazy(() => import('./pages/GlobalTourism'));
const PackageDetails = lazy(() => import('./pages/PackageDetails'));
const BookingForm = lazy(() => import('./pages/BookingForm'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router 
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          {/* Main app container with dark mode support */}
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* ===========================================
                  ADMIN ROUTES
                  Routes for admin panel access
              =========================================== */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              
              {/* ===========================================
                  AUTHENTICATION ROUTES
                  Login and signup pages without navbar/footer
              =========================================== */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* ===========================================
                  PUBLIC WEBSITE ROUTES
                  Main website pages with header and footer
              =========================================== */}
              <Route path="/*" element={
                <>
                  {/* Global header with navigation */}
                  <Header />
                  
                  {/* Main content area */}
                  <main>
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        {/* Homepage with hero slider and services */}
                        <Route path="/" element={<Homepage />} />
                        
                        {/* Hajj & Umrah packages and information */}
                        <Route path="/hajj-umrah" element={<HajjUmrah />} />
                        
                        {/* Global tourism packages */}
                        <Route path="/global-tourism" element={<GlobalTourism />} />
                        
                        {/* Individual package details page */}
                        <Route path="/package/:id" element={<PackageDetails />} />
                        
                        {/* Booking form for travel packages */}
                        <Route path="/booking" element={<BookingForm />} />
                        
                        {/* Contact us page with form */}
                        <Route path="/contact" element={<ContactUs />} />
                        
                        {/* User profile and booking history */}
                        <Route path="/profile" element={<Profile />} />
                      </Routes>
                    </Suspense>
                  </main>
                  
                  {/* Global footer with links and info */}
                  <Footer />
                </>
              } />
            </Routes>
          </Suspense>
          </div>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
