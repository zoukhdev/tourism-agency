import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useApp } from '../../context/AppContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import DashboardOverview from '../../components/admin/DashboardOverview';
import PackageManagement from '../../components/admin/PackageManagement';
import BookingManagement from '../../components/admin/BookingManagement';
import UserManagement from '../../components/admin/UserManagement';
import ContentManagement from '../../components/admin/ContentManagement';
import AnalyticsDashboard from '../../components/admin/AnalyticsDashboard';
import SettingsPanel from '../../components/admin/SettingsPanel';

const AdminDashboard = () => {
  // const { t } = useApp();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-collapse sidebar on mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
        setMobileMenuOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // SECURITY: Check if admin is authenticated using sessionStorage
    const isAdminAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    const adminData = sessionStorage.getItem('admin');
    
    // Also check for remember me token in localStorage
    const rememberData = localStorage.getItem('adminRemember');
    
    if (!isAdminAuthenticated && !adminData && !rememberData) {
      navigate('/admin/login');
      return;
    }
    
    // If using remember me token, restore session
    if (rememberData && !isAdminAuthenticated) {
      try {
        const remember = JSON.parse(rememberData);
        const now = new Date().getTime();
        
        // Check if remember token is still valid
        if (remember.rememberExpiresAt && now < new Date(remember.rememberExpiresAt).getTime()) {
          // Restore session from remember token
          sessionStorage.setItem('admin', JSON.stringify(remember));
          sessionStorage.setItem('isAdminAuthenticated', 'true');
        } else {
          // Remember token expired, clear it
          localStorage.removeItem('adminRemember');
          navigate('/admin/login');
          return;
        }
      } catch (error) {
        // Invalid remember data, clear it
        localStorage.removeItem('adminRemember');
        navigate('/admin/login');
        return;
      }
    }
  }, [navigate]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'packages':
        return <PackageManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'users':
        return <UserManagement />;
      case 'content':
        return <ContentManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Admin Header */}
      <AdminHeader 
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="flex">
        {/* Admin Sidebar */}
        <AdminSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          collapsed={sidebarCollapsed}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

          {/* Main Content */}
          <main className={`flex-1 transition-all duration-300 pt-24 sm:pt-28 ${
            sidebarCollapsed ? 'lg:ml-14 xl:ml-16' : 'lg:ml-56 xl:ml-64'
          }`}>
            <div className="p-2 sm:p-3 md:p-4 lg:p-6">
              {renderActiveSection()}
            </div>
          </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
