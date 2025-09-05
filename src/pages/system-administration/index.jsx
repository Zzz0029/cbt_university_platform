import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ExamStatusIndicator from '../../components/ui/ExamStatusIndicator';
import NotificationCenter from '../../components/ui/NotificationCenter';
import SystemHealthMetrics from './components/SystemHealthMetrics';
import UserManagementPanel from './components/UserManagementPanel';
import SecurityConfigPanel from './components/SecurityConfigPanel';
import BackupRecoveryPanel from './components/BackupRecoveryPanel';
import EmergencyControlPanel from './components/EmergencyControlPanel';

const SystemAdministration = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userRole = 'admin';

  const adminTabs = [
    { id: 'dashboard', label: 'System Health', icon: 'Activity' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'security', label: 'Security Config', icon: 'Shield' },
    { id: 'backup', label: 'Backup & Recovery', icon: 'Archive' },
    { id: 'emergency', label: 'Emergency Controls', icon: 'AlertTriangle' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SystemHealthMetrics />;
      case 'users':
        return <UserManagementPanel />;
      case 'security':
        return <SecurityConfigPanel />;
      case 'backup':
        return <BackupRecoveryPanel />;
      case 'emergency':
        return <EmergencyControlPanel />;
      default:
        return <SystemHealthMetrics />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <RoleBasedSidebar 
        isCollapsed={sidebarCollapsed}
        userRole={userRole}
      />
      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      } pb-16 lg:pb-0`}>
        {/* Header */}
        <header className="sticky top-0 z-100 bg-card border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex"
                iconName="Menu"
              />
              
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">System Administration</h1>
                <p className="text-sm text-muted-foreground">
                  Comprehensive platform management and security controls
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ExamStatusIndicator userRole={userRole} />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(true)}
                iconName="Bell"
                className="relative"
              >
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full" />
              </Button>

              <div className="hidden lg:flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">Admin</p>
                  <p className="text-muted-foreground">System Administrator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-t border-border">
            <nav className="flex space-x-8 px-4 lg:px-6 overflow-x-auto">
              {adminTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {/* Quick Stats Bar */}
          <div className="mb-6 p-4 bg-card border border-border rounded-lg">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">99.97%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">1,247</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">3</p>
                <p className="text-sm text-muted-foreground">Active Exams</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">68%</p>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">72%</p>
                <p className="text-sm text-muted-foreground">Memory</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">Secure</p>
                <p className="text-sm text-muted-foreground">Status</p>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>
        </main>
      </div>
      {/* Notification Center */}
      <NotificationCenter
        userRole={userRole}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
};

export default SystemAdministration;