import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedSidebar = ({ isCollapsed = false, userRole = 'student' }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = {
      student: [
        {
          label: 'Dashboard',
          path: '/student-dashboard',
          icon: 'LayoutDashboard',
          badge: null
        }
      ],
      faculty: [
        {
          label: 'Dashboard',
          path: '/student-dashboard',
          icon: 'LayoutDashboard',
          badge: null
        },
        {
          label: 'Exam Creation',
          path: '/exam-creation',
          icon: 'FileText',
          badge: null
        },
        {
          label: 'Question Bank',
          path: '/question-bank-management',
          icon: 'Database',
          badge: null
        },
        {
          label: 'Exam Results',
          path: '/exam-results',
          icon: 'BarChart3',
          badge: null
        }
      ],
      admin: [
        {
          label: 'Dashboard',
          path: '/student-dashboard',
          icon: 'LayoutDashboard',
          badge: null
        },
        {
          label: 'System Admin',
          path: '/system-administration',
          icon: 'Settings',
          badge: null
        },
        {
          label: 'Exam Creation',
          path: '/exam-creation',
          icon: 'FileText',
          badge: null
        },
        {
          label: 'Question Bank',
          path: '/question-bank-management',
          icon: 'Database',
          badge: null
        },
        {
          label: 'Exam Results',
          path: '/exam-results',
          icon: 'BarChart3',
          badge: null
        }
      ]
    };

    return baseItems?.[userRole] || baseItems?.student;
  };

  const navigationItems = getNavigationItems();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location?.pathname]);

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className={`fixed left-0 top-0 h-full bg-card border-r border-border z-100 transition-all duration-300 ease-out ${
      isCollapsed ? 'w-16' : 'w-240'
    }`}>
      {/* Logo Section */}
      <div className="flex items-center h-16 px-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} color="white" />
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-semibold text-foreground">CBT Platform</h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems?.map((item) => {
          const isActive = location?.pathname === item?.path;
          return (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`nav-item w-full text-left ${isActive ? 'active' : ''} focus-ring`}
            >
              <Icon name={item?.icon} size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="ml-3 animate-fade-in">{item?.label}</span>
              )}
              {!isCollapsed && item?.badge && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {item?.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-border p-4">
        {/* Notifications */}
        <button className={`nav-item w-full text-left mb-2 focus-ring`}>
          <div className="relative">
            <Icon name="Bell" size={20} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </div>
          {!isCollapsed && (
            <span className="ml-3 animate-fade-in">Notifications</span>
          )}
        </button>

        {/* Profile & Logout */}
        <button className={`nav-item w-full text-left mb-2 focus-ring`}>
          <Icon name="User" size={20} />
          {!isCollapsed && (
            <span className="ml-3 animate-fade-in">Profile</span>
          )}
        </button>

        <button
          onClick={handleLogout}
          className={`nav-item w-full text-left text-error hover:bg-error/10 focus-ring`}
        >
          <Icon name="LogOut" size={20} />
          {!isCollapsed && (
            <span className="ml-3 animate-fade-in">Logout</span>
          )}
        </button>
      </div>
    </div>
  );

  // Mobile Bottom Navigation
  const MobileNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-100 lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems?.slice(0, 4)?.map((item) => {
          const isActive = location?.pathname === item?.path;
          return (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium">{item?.label}</span>
            </button>
          );
        })}
        
        {/* More Menu for additional items */}
        {navigationItems?.length > 4 && (
          <button
            onClick={() => setIsMobileOpen(true)}
            className="flex flex-col items-center justify-center flex-1 h-full space-y-1 text-muted-foreground"
          >
            <Icon name="MoreHorizontal" size={20} />
            <span className="text-xs font-medium">More</span>
          </button>
        )}
      </div>
    </div>
  );

  // Mobile Menu Overlay
  const MobileMenuOverlay = () => (
    <div className={`fixed inset-0 z-300 lg:hidden transition-opacity duration-300 ${
      isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
      <div className={`absolute bottom-0 left-0 right-0 bg-card rounded-t-xl transition-transform duration-300 ${
        isMobileOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
              iconName="X"
            />
          </div>
          
          <div className="space-y-2">
            {navigationItems?.slice(4)?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className="nav-item w-full text-left"
              >
                <Icon name={item?.icon} size={20} />
                <span className="ml-3">{item?.label}</span>
              </button>
            ))}
            
            <hr className="my-4 border-border" />
            
            <button className="nav-item w-full text-left">
              <div className="relative">
                <Icon name="Bell" size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              <span className="ml-3">Notifications</span>
            </button>
            
            <button className="nav-item w-full text-left">
              <Icon name="User" size={20} />
              <span className="ml-3">Profile</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="nav-item w-full text-left text-error hover:bg-error/10"
            >
              <Icon name="LogOut" size={20} />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
      <MobileMenuOverlay />
    </>
  );
};

export default RoleBasedSidebar;