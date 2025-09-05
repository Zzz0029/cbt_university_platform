import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ExamStatusIndicator = ({ userRole = 'student', className = '' }) => {
  const [examStatus, setExamStatus] = useState({
    active: false,
    upcoming: 2,
    timeRemaining: null,
    currentExam: null
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Simulate real-time exam status updates
  useEffect(() => {
    const updateExamStatus = () => {
      if (userRole === 'student') {
        // Student view - show active exam or upcoming exams
        setExamStatus({
          active: false,
          upcoming: 2,
          timeRemaining: '2h 15m',
          currentExam: {
            title: 'Database Systems Final',
            course: 'CS 301',
            startTime: '14:00',
            duration: '120 minutes'
          }
        });
      } else {
        // Faculty/Admin view - show exam management status
        setExamStatus({
          active: true,
          upcoming: 5,
          timeRemaining: null,
          currentExam: {
            title: '3 Active Exams',
            course: 'Multiple Courses',
            activeStudents: 45,
            pendingReview: 12
          }
        });
      }
    };

    updateExamStatus();
    const interval = setInterval(updateExamStatus, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [userRole]);

  const getStatusColor = () => {
    if (examStatus?.active) return 'text-success';
    if (examStatus?.upcoming > 0) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getStatusIcon = () => {
    if (examStatus?.active) return 'Play';
    if (examStatus?.upcoming > 0) return 'Clock';
    return 'CheckCircle';
  };

  const StudentStatusView = () => (
    <div className="space-y-3">
      {examStatus?.active ? (
        <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
              <span className="text-sm font-medium text-success">Exam in Progress</span>
            </div>
            <span className="text-xs text-success font-mono">{examStatus?.timeRemaining}</span>
          </div>
          <p className="text-sm text-foreground mt-1">{examStatus?.currentExam?.title}</p>
        </div>
      ) : (
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Next Exam</span>
            </div>
            <span className="text-xs text-warning font-mono">in {examStatus?.timeRemaining}</span>
          </div>
          <p className="text-sm text-foreground mt-1">{examStatus?.currentExam?.title}</p>
          <p className="text-xs text-muted-foreground">{examStatus?.currentExam?.course} • {examStatus?.currentExam?.startTime}</p>
        </div>
      )}

      {examStatus?.upcoming > 1 && (
        <div className="text-xs text-muted-foreground">
          +{examStatus?.upcoming - 1} more exam{examStatus?.upcoming > 2 ? 's' : ''} scheduled
        </div>
      )}
    </div>
  );

  const FacultyStatusView = () => (
    <div className="space-y-3">
      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
            <span className="text-sm font-medium text-primary">Active Monitoring</span>
          </div>
          <span className="text-xs text-primary font-mono">{examStatus?.currentExam?.activeStudents} students</span>
        </div>
        <p className="text-sm text-foreground mt-1">{examStatus?.currentExam?.title}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-muted rounded">
          <span className="text-muted-foreground">Upcoming</span>
          <p className="font-medium">{examStatus?.upcoming} exams</p>
        </div>
        <div className="p-2 bg-muted rounded">
          <span className="text-muted-foreground">Pending Review</span>
          <p className="font-medium">{examStatus?.currentExam?.pendingReview} results</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      {/* Status Badge */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors duration-200 focus-ring"
      >
        <div className="relative">
          <Icon name={getStatusIcon()} size={16} className={getStatusColor()} />
          {examStatus?.upcoming > 0 && (
            <span className="absolute -top-1 -right-1 bg-warning text-warning-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {examStatus?.upcoming}
            </span>
          )}
        </div>
        <span className="text-sm font-medium">
          {examStatus?.active ? 'Active' : examStatus?.upcoming > 0 ? 'Upcoming' : 'No Exams'}
        </span>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={14} 
          className="text-muted-foreground" 
        />
      </button>
      {/* Expanded Status Details */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-popover border border-border rounded-lg elevation-2 z-200 animate-slide-up">
          {userRole === 'student' ? <StudentStatusView /> : <FacultyStatusView />}
          
          {/* Quick Actions */}
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex space-x-2">
              {userRole === 'student' ? (
                <>
                  <button className="flex-1 px-3 py-2 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                    Join Exam
                  </button>
                  <button className="flex-1 px-3 py-2 text-xs border border-border rounded hover:bg-muted transition-colors">
                    View Schedule
                  </button>
                </>
              ) : (
                <>
                  <button className="flex-1 px-3 py-2 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                    Monitor
                  </button>
                  <button className="flex-1 px-3 py-2 text-xs border border-border rounded hover:bg-muted transition-colors">
                    Manage
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamStatusIndicator;