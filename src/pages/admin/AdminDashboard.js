import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
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
  const { t } = useApp();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Check if admin is authenticated
    const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated');
    const adminData = localStorage.getItem('admin');
    
    if (!isAdminAuthenticated || !adminData) {
      navigate('/admin/login');
      return;
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
      />

      <div className="flex">
        {/* Admin Sidebar */}
        <AdminSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          collapsed={sidebarCollapsed}
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 pt-20 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <div className="p-6">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
