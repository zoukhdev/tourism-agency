import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
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
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            
            {/* Authentication Routes (without navbar) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Public Website Routes (with navbar and footer) */}
            <Route path="/*" element={
              <>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/hajj-umrah" element={<HajjUmrah />} />
                    <Route path="/global-tourism" element={<GlobalTourism />} />
                    <Route path="/package/:id" element={<PackageDetails />} />
                    <Route path="/booking" element={<BookingForm />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
