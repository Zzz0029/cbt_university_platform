import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SecuritySettings = ({ 
  securityConfig, 
  onSecurityChange, 
  className = '' 
}) => {
  const proctoringOptions = [
    { value: 'none', label: 'No Proctoring' },
    { value: 'basic', label: 'Basic Monitoring' },
    { value: 'advanced', label: 'Advanced AI Proctoring' },
    { value: 'live', label: 'Live Human Proctoring' }
  ];

  const handleConfigChange = (field, value) => {
    onSecurityChange({
      ...securityConfig,
      [field]: value
    });
  };

  const securityFeatures = [
    {
      id: 'browserLockdown',
      title: 'Browser Lockdown',
      description: 'Prevent students from switching tabs, opening new windows, or accessing other applications',
      icon: 'Lock',
      category: 'browser'
    },
    {
      id: 'disableRightClick',
      title: 'Disable Right Click',
      description: 'Disable context menu and right-click functionality during the exam',
      icon: 'MousePointer',
      category: 'browser'
    },
    {
      id: 'disableCopyPaste',
      title: 'Disable Copy/Paste',
      description: 'Prevent copying and pasting content during the examination',
      icon: 'Copy',
      category: 'browser'
    },
    {
      id: 'fullScreenMode',
      title: 'Full Screen Mode',
      description: 'Force exam to run in full screen mode with exit prevention',
      icon: 'Maximize',
      category: 'browser'
    },
    {
      id: 'webcamMonitoring',
      title: 'Webcam Monitoring',
      description: 'Record student webcam feed throughout the examination',
      icon: 'Camera',
      category: 'monitoring'
    },
    {
      id: 'screenRecording',
      title: 'Screen Recording',
      description: 'Record student screen activity during the exam session',
      icon: 'Monitor',
      category: 'monitoring'
    },
    {
      id: 'keystrokeLogging',
      title: 'Keystroke Logging',
      description: 'Log all keyboard inputs for suspicious activity detection',
      icon: 'Keyboard',
      category: 'monitoring'
    },
    {
      id: 'faceDetection',
      title: 'Face Detection',
      description: 'Detect multiple faces or absence of student during exam',
      icon: 'User',
      category: 'ai'
    },
    {
      id: 'voiceDetection',
      title: 'Voice Detection',
      description: 'Monitor audio for suspicious conversations or sounds',
      icon: 'Mic',
      category: 'ai'
    },
    {
      id: 'eyeTracking',
      title: 'Eye Tracking',
      description: 'Track eye movement patterns to detect cheating behavior',
      icon: 'Eye',
      category: 'ai'
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'browser': return 'Globe';
      case 'monitoring': return 'Shield';
      case 'ai': return 'Brain';
      default: return 'Settings';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'browser': return 'text-blue-600';
      case 'monitoring': return 'text-orange-600';
      case 'ai': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const groupedFeatures = securityFeatures?.reduce((acc, feature) => {
    if (!acc?.[feature?.category]) {
      acc[feature.category] = [];
    }
    acc?.[feature?.category]?.push(feature);
    return acc;
  }, {});

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Proctoring Level */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Proctoring Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Choose the level of monitoring and security for this examination
          </p>
        </div>
        
        <Select
          label="Proctoring Level"
          placeholder="Select proctoring level"
          options={proctoringOptions}
          value={securityConfig?.proctoringLevel || ''}
          onChange={(value) => handleConfigChange('proctoringLevel', value)}
          description="Higher levels provide more security but may impact student experience"
        />
      </div>
      {/* IP Restrictions */}
      <div className="space-y-4">
        <div>
          <h4 className="text-md font-medium text-foreground">Access Restrictions</h4>
          <p className="text-sm text-muted-foreground">
            Control where students can take the exam from
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Allowed IP Addresses"
            type="text"
            placeholder="192.168.1.0/24, 10.0.0.1"
            value={securityConfig?.allowedIPs || ''}
            onChange={(e) => handleConfigChange('allowedIPs', e?.target?.value)}
            description="Comma-separated list of IP addresses or ranges"
          />
          
          <Input
            label="Geofencing Radius (km)"
            type="number"
            placeholder="5"
            value={securityConfig?.geofenceRadius || ''}
            onChange={(e) => handleConfigChange('geofenceRadius', e?.target?.value)}
            description="Maximum distance from exam center"
            min="0"
          />
        </div>
      </div>
      {/* Security Features by Category */}
      {Object.entries(groupedFeatures)?.map(([category, features]) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getCategoryIcon(category)} 
              size={20} 
              className={getCategoryColor(category)} 
            />
            <h4 className="text-md font-medium text-foreground capitalize">
              {category === 'ai' ? 'AI-Powered Security' : `${category} Security`}
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features?.map((feature) => (
              <div
                key={feature?.id}
                className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={securityConfig?.[feature?.id] || false}
                    onChange={(e) => handleConfigChange(feature?.id, e?.target?.checked)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon 
                        name={feature?.icon} 
                        size={16} 
                        className={getCategoryColor(category)} 
                      />
                      <h5 className="text-sm font-medium text-foreground">
                        {feature?.title}
                      </h5>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {feature?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Additional Security Settings */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Additional Settings</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Session Timeout (minutes)"
            type="number"
            placeholder="30"
            value={securityConfig?.sessionTimeout || ''}
            onChange={(e) => handleConfigChange('sessionTimeout', e?.target?.value)}
            description="Auto-logout after inactivity"
            min="5"
            max="120"
          />
          
          <Input
            label="Warning Threshold"
            type="number"
            placeholder="3"
            value={securityConfig?.warningThreshold || ''}
            onChange={(e) => handleConfigChange('warningThreshold', e?.target?.value)}
            description="Number of warnings before auto-submission"
            min="1"
            max="10"
          />
        </div>
        
        <div className="space-y-3">
          <Checkbox
            label="Auto-submit on security violation"
            description="Automatically submit exam if security rules are violated"
            checked={securityConfig?.autoSubmitOnViolation || false}
            onChange={(e) => handleConfigChange('autoSubmitOnViolation', e?.target?.checked)}
          />
          
          <Checkbox
            label="Send security alerts to faculty"
            description="Notify exam supervisors of security incidents in real-time"
            checked={securityConfig?.sendAlerts || false}
            onChange={(e) => handleConfigChange('sendAlerts', e?.target?.checked)}
          />
          
          <Checkbox
            label="Require identity verification"
            description="Students must verify identity before starting exam"
            checked={securityConfig?.requireIdVerification || false}
            onChange={(e) => handleConfigChange('requireIdVerification', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Security Summary */}
      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-primary mb-1">Security Level Summary</h5>
            <p className="text-sm text-foreground">
              {Object.values(securityConfig)?.filter(Boolean)?.length} security features enabled. 
              This configuration provides{' '}
              {Object.values(securityConfig)?.filter(Boolean)?.length > 8 ? 'high' : 
               Object.values(securityConfig)?.filter(Boolean)?.length > 4 ? 'medium' : 'basic'} 
              {' '}level security for your examination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;