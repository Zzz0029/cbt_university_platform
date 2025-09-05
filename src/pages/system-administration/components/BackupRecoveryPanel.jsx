import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BackupRecoveryPanel = () => {
  const [backupHistory] = useState([
    {
      id: 1,
      type: 'full',
      timestamp: '2025-09-05T02:00:00Z',
      size: '2.4 GB',
      status: 'completed',
      duration: '45 minutes',
      location: 'AWS S3 - Primary'
    },
    {
      id: 2,
      type: 'incremental',
      timestamp: '2025-09-04T14:00:00Z',
      size: '156 MB',
      status: 'completed',
      duration: '8 minutes',
      location: 'AWS S3 - Primary'
    },
    {
      id: 3,
      type: 'database',
      timestamp: '2025-09-04T02:00:00Z',
      size: '1.8 GB',
      status: 'completed',
      duration: '32 minutes',
      location: 'Local Storage'
    },
    {
      id: 4,
      type: 'full',
      timestamp: '2025-09-03T02:00:00Z',
      size: '2.3 GB',
      status: 'failed',
      duration: '12 minutes',
      location: 'AWS S3 - Primary',
      error: 'Network timeout during upload'
    }
  ]);

  const [schedules] = useState([
    {
      id: 1,
      name: 'Daily Database Backup',
      type: 'database',
      frequency: 'daily',
      time: '02:00',
      retention: '30 days',
      status: 'active',
      nextRun: '2025-09-06T02:00:00Z'
    },
    {
      id: 2,
      name: 'Weekly Full Backup',
      type: 'full',
      frequency: 'weekly',
      time: '01:00',
      retention: '90 days',
      status: 'active',
      nextRun: '2025-09-08T01:00:00Z'
    },
    {
      id: 3,
      name: 'Hourly Incremental',
      type: 'incremental',
      frequency: 'hourly',
      time: '00',
      retention: '7 days',
      status: 'paused',
      nextRun: null
    }
  ]);

  const [recoveryPoints] = useState([
    {
      id: 1,
      timestamp: '2025-09-05T02:00:00Z',
      type: 'full',
      size: '2.4 GB',
      integrity: 'verified',
      location: 'AWS S3 - Primary'
    },
    {
      id: 2,
      timestamp: '2025-09-04T02:00:00Z',
      type: 'database',
      size: '1.8 GB',
      integrity: 'verified',
      location: 'Local Storage'
    },
    {
      id: 3,
      timestamp: '2025-09-03T02:00:00Z',
      type: 'full',
      size: '2.3 GB',
      integrity: 'pending',
      location: 'AWS S3 - Secondary'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'failed': return 'text-error bg-error/10';
      case 'running': return 'text-warning bg-warning/10';
      case 'active': return 'text-success bg-success/10';
      case 'paused': return 'text-warning bg-warning/10';
      case 'verified': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'full': return 'Database';
      case 'incremental': return 'GitBranch';
      case 'database': return 'Server';
      default: return 'Archive';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNextRun = (timestamp) => {
    if (!timestamp) return 'Paused';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((date - now) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `in ${diffInHours}h`;
    return date?.toLocaleDateString('id-ID');
  };

  return (
    <div className="space-y-6">
      {/* Backup Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Backup</p>
              <p className="font-semibold text-success">Success</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Archive" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Backups</p>
              <p className="font-semibold text-foreground">47</p>
              <p className="text-xs text-muted-foreground">12.8 GB</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Backup</p>
              <p className="font-semibold text-foreground">22h</p>
              <p className="text-xs text-muted-foreground">Full backup</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-error/10 rounded-lg">
              <Icon name="AlertTriangle" size={20} className="text-error" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Failed Backups</p>
              <p className="font-semibold text-error">1</p>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="default" iconName="Play" className="h-12">
            Start Manual Backup
          </Button>
          <Button variant="outline" iconName="RotateCcw" className="h-12">
            Restore from Backup
          </Button>
          <Button variant="outline" iconName="Download" className="h-12">
            Download Backup
          </Button>
          <Button variant="outline" iconName="Settings" className="h-12">
            Configure Schedule
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backup History */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Backups</h3>
            <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
          </div>
          
          <div className="space-y-3">
            {backupHistory?.map((backup) => (
              <div key={backup?.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <div className="p-2 bg-muted rounded-lg">
                  <Icon name={getTypeIcon(backup?.type)} size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-foreground capitalize">{backup?.type} Backup</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(backup?.status)}`}>
                      {backup?.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatTimestamp(backup?.timestamp)} • {backup?.size} • {backup?.duration}
                  </p>
                  {backup?.error && (
                    <p className="text-xs text-error mt-1">{backup?.error}</p>
                  )}
                </div>
                <Button variant="ghost" size="sm" iconName="MoreVertical" />
              </div>
            ))}
          </div>
        </div>

        {/* Backup Schedules */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Backup Schedules</h3>
            <Button variant="outline" size="sm" iconName="Plus">
              Add Schedule
            </Button>
          </div>
          
          <div className="space-y-3">
            {schedules?.map((schedule) => (
              <div key={schedule?.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <div className="p-2 bg-muted rounded-lg">
                  <Icon name={getTypeIcon(schedule?.type)} size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-foreground">{schedule?.name}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule?.status)}`}>
                      {schedule?.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {schedule?.frequency} at {schedule?.time} • Retention: {schedule?.retention}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Next run: {formatNextRun(schedule?.nextRun)}
                  </p>
                </div>
                <Button variant="ghost" size="sm" iconName="Settings" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recovery Points */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recovery Points</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Verify Integrity
            </Button>
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-foreground">Timestamp</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Type</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Size</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Integrity</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Location</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recoveryPoints?.map((point) => (
                <tr key={point?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-3 text-sm font-mono text-muted-foreground">
                    {formatTimestamp(point?.timestamp)}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name={getTypeIcon(point?.type)} size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground capitalize">{point?.type}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">{point?.size}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(point?.integrity)}`}>
                      {point?.integrity}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">{point?.location}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="RotateCcw">
                        Restore
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Download">
                        Download
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BackupRecoveryPanel;