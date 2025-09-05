import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SecurityModeOverlay = ({ 
  isActive = false, 
  examTitle = 'Database Systems Final',
  timeRemaining = '01:45:30',
  onEmergencyExit,
  onRequestHelp,
  className = ''
}) => {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [proctoringStatus, setProctoringStatus] = useState('active');

  // Simulate connection monitoring
  useEffect(() => {
    if (!isActive) return;

    const checkConnection = () => {
      // Simulate connection status changes
      const statuses = ['connected', 'weak', 'reconnecting'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      setConnectionStatus(randomStatus);
    };

    const interval = setInterval(checkConnection, 10000);
    return () => clearInterval(interval);
  }, [isActive]);

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'weak': return 'text-warning';
      case 'reconnecting': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected': return 'Wifi';
      case 'weak': return 'WifiOff';
      case 'reconnecting': return 'RotateCcw';
      default: return 'WifiOff';
    }
  };

  const handleEmergencyExit = () => {
    if (onEmergencyExit) {
      onEmergencyExit();
    }
    setShowExitConfirm(false);
  };

  const handleRequestHelp = () => {
    if (onRequestHelp) {
      onRequestHelp();
    }
  };

  if (!isActive) return null;

  return (
    <div className={`fixed inset-0 bg-background z-300 ${className}`}>
      {/* Security Header */}
      <div className="fixed top-0 left-0 right-0 bg-card border-b border-border z-400">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Exam Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full animate-pulse-soft" />
              <span className="text-sm font-medium text-error">SECURE EXAM MODE</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div>
              <h1 className="text-lg font-semibold text-foreground">{examTitle}</h1>
              <p className="text-sm text-muted-foreground">Time Remaining: {timeRemaining}</p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-6">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <Icon 
                name={getConnectionIcon()} 
                size={16} 
                className={`${getConnectionColor()} ${connectionStatus === 'reconnecting' ? 'animate-spin' : ''}`} 
              />
              <span className={`text-sm font-medium ${getConnectionColor()}`}>
                {connectionStatus?.charAt(0)?.toUpperCase() + connectionStatus?.slice(1)}
              </span>
            </div>

            {/* Proctoring Status */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
              <span className="text-sm font-medium text-success">Monitored</span>
            </div>

            {/* Emergency Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRequestHelp}
                iconName="HelpCircle"
                iconPosition="left"
                className="text-warning border-warning hover:bg-warning/10"
              >
                Help
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowExitConfirm(true)}
                iconName="AlertTriangle"
                iconPosition="left"
              >
                Emergency Exit
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="pt-20 pb-16 px-6 h-full overflow-auto">
        <div className="max-w-4xl mx-auto">
          {/* Security Notice */}
          <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-warning mb-1">Secure Examination Environment</h3>
                <p className="text-sm text-foreground">
                  This exam is being monitored for security. Do not attempt to leave this window, 
                  access other applications, or communicate with others during the examination.
                </p>
              </div>
            </div>
          </div>

          {/* Exam Content Placeholder */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-center py-12">
              <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Exam Content Area</h2>
              <p className="text-muted-foreground">
                Exam questions and content would be displayed here during an active examination.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Security Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-400">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Session ID: CBT-2025-001</span>
            <span>•</span>
            <span>Attempt 1 of 1</span>
            <span>•</span>
            <span>Auto-save enabled</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="default" size="sm">
              Next Question
            </Button>
            <Button variant="success" size="sm">
              Submit Exam
            </Button>
          </div>
        </div>
      </div>
      {/* Emergency Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 z-500 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 animate-slide-up">
            <div className="flex items-start space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-error flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Emergency Exit Confirmation</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to exit the secure exam environment? This action will:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• End your current exam session</li>
                  <li>• Submit your current answers</li>
                  <li>• Log this as an emergency exit</li>
                  <li>• Require administrator approval to re-enter</li>
                </ul>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowExitConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleEmergencyExit}
                className="flex-1"
              >
                Confirm Exit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityModeOverlay;