import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = ({ 
  userRole = 'student',
  isOpen = false,
  onClose,
  className = ''
}) => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);

  // Generate role-based notifications
  useEffect(() => {
    const generateNotifications = () => {
      const baseNotifications = {
        student: [
          {
            id: 1,
            type: 'exam',
            title: 'Exam Reminder',
            message: 'Database Systems Final exam starts in 2 hours',
            timestamp: '2025-09-05T12:00:00Z',
            read: false,
            priority: 'high',
            icon: 'Clock',
            action: 'View Exam'
          },
          {
            id: 2,
            type: 'result',
            title: 'Results Available',
            message: 'Your Data Structures midterm results are now available',
            timestamp: '2025-09-05T10:30:00Z',
            read: false,
            priority: 'medium',
            icon: 'BarChart3',
            action: 'View Results'
          },
          {
            id: 3,
            type: 'system',
            title: 'System Maintenance',
            message: 'Scheduled maintenance tonight from 2:00 AM - 4:00 AM',
            timestamp: '2025-09-05T08:15:00Z',
            read: true,
            priority: 'low',
            icon: 'Settings',
            action: null
          }
        ],
        faculty: [
          {
            id: 1,
            type: 'exam',
            title: 'Exam Monitoring Alert',
            message: '3 students flagged for unusual activity in CS301 exam',
            timestamp: '2025-09-05T13:45:00Z',
            read: false,
            priority: 'high',
            icon: 'AlertTriangle',
            action: 'Review Activity'
          },
          {
            id: 2,
            type: 'submission',
            title: 'New Submissions',
            message: '12 new exam submissions require grading',
            timestamp: '2025-09-05T11:20:00Z',
            read: false,
            priority: 'medium',
            icon: 'FileText',
            action: 'Grade Exams'
          },
          {
            id: 3,
            type: 'system',
            title: 'Question Bank Updated',
            message: 'New questions added to Database Systems question bank',
            timestamp: '2025-09-05T09:00:00Z',
            read: true,
            priority: 'low',
            icon: 'Database',
            action: 'View Questions'
          }
        ],
        admin: [
          {
            id: 1,
            type: 'security',
            title: 'Security Alert',
            message: 'Multiple failed login attempts detected from IP 192.168.1.100',
            timestamp: '2025-09-05T14:30:00Z',
            read: false,
            priority: 'high',
            icon: 'Shield',
            action: 'Investigate'
          },
          {
            id: 2,
            type: 'system',
            title: 'Server Performance',
            message: 'Database server CPU usage above 85% for 10 minutes',
            timestamp: '2025-09-05T13:15:00Z',
            read: false,
            priority: 'medium',
            icon: 'Activity',
            action: 'View Metrics'
          },
          {
            id: 3,
            type: 'user',
            title: 'New User Registration',
            message: '5 new faculty members registered and pending approval',
            timestamp: '2025-09-05T10:45:00Z',
            read: true,
            priority: 'low',
            icon: 'UserPlus',
            action: 'Review Users'
          }
        ]
      };

      const roleNotifications = baseNotifications?.[userRole] || baseNotifications?.student;
      setNotifications(roleNotifications);
      setUnreadCount(roleNotifications?.filter(n => !n?.read)?.length);
    };

    generateNotifications();
  }, [userRole]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10 border-error/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-muted border-border';
      default: return 'bg-muted border-border';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date?.toLocaleDateString();
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification?.read;
    return notification?.type === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications?.length },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'exam', label: 'Exams', count: notifications?.filter(n => n?.type === 'exam')?.length },
    { value: 'system', label: 'System', count: notifications?.filter(n => n?.type === 'system')?.length }
  ];

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-200 ${className}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      {/* Notification Panel */}
      <div className="absolute top-0 right-0 w-full max-w-md h-full bg-card border-l border-border animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-border">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                filter === option?.value
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {option?.label}
              {option?.count > 0 && (
                <span className="ml-1 text-xs">({option?.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Icon name="Bell" size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No notifications</h3>
              <p className="text-sm text-muted-foreground">
                {filter === 'unread' ? 'All caught up!' : 'You have no notifications yet.'}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {filteredNotifications?.map((notification) => (
                <div
                  key={notification?.id}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    notification?.read 
                      ? 'bg-muted border-border' 
                      : getPriorityBg(notification?.priority)
                  } ${!notification?.read ? 'hover:shadow-sm' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 ${getPriorityColor(notification?.priority)}`}>
                      <Icon name={notification?.icon} size={20} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className={`text-sm font-medium ${
                          notification?.read ? 'text-muted-foreground' : 'text-foreground'
                        }`}>
                          {notification?.title}
                        </h4>
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2 mt-1" />
                        )}
                      </div>
                      
                      <p className={`text-sm mt-1 ${
                        notification?.read ? 'text-muted-foreground' : 'text-foreground'
                      }`}>
                        {notification?.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(notification?.timestamp)}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          {notification?.action && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification?.id)}
                              className="text-xs h-6 px-2"
                            >
                              {notification?.action}
                            </Button>
                          )}
                          
                          {!notification?.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification?.id)}
                              className="text-xs h-6 px-2"
                            >
                              Mark read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <Button
            variant="outline"
            fullWidth
            iconName="Settings"
            iconPosition="left"
          >
            Notification Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;