/**
 * Main App Component - Tourism Agency Website
 * 
 * This component sets up the main application structure including:
 * - React Router for navigation
 * - Context provider for global state management
 * - Route definitions for all pages
 * - Layout structure with header and footer
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import HajjUmrah from './pages/HajjUmrah';
import GlobalTourism from './pages/GlobalTourism';
import PackageDetails from './pages/PackageDetails';
import BookingForm from './pages/BookingForm';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

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
                </main>
                
                {/* Global footer with links and info */}
                <Footer />
              </>
            } />
          </Routes>
          </div>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
