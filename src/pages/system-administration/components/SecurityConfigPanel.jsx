import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SecurityConfigPanel = () => {
  const [activeTab, setActiveTab] = useState('ip-restrictions');
  const [ipRestrictions, setIpRestrictions] = useState([
    { id: 1, ip: '192.168.1.0/24', description: 'Campus Network', status: 'active', type: 'allow' },
    { id: 2, ip: '10.0.0.0/8', description: 'Internal Network', status: 'active', type: 'allow' },
    { id: 3, ip: '203.142.45.0/24', description: 'External Partner', status: 'active', type: 'allow' },
    { id: 4, ip: '185.220.101.0/24', description: 'Blocked Range', status: 'active', type: 'deny' }
  ]);

  const [geofenceZones, setGeofenceZones] = useState([
    { id: 1, name: 'Main Campus', coordinates: '-6.2088, 106.8456', radius: 500, status: 'active' },
    { id: 2, name: 'Library Building', coordinates: '-6.2090, 106.8460', radius: 100, status: 'active' },
    { id: 3, name: 'Computer Lab', coordinates: '-6.2085, 106.8450', radius: 50, status: 'active' }
  ]);

  const [auditLogs] = useState([
    {
      id: 1,
      timestamp: '2025-09-05T13:45:00Z',
      user: 'admin@university.ac.id',
      action: 'IP_RESTRICTION_ADDED',
      details: 'Added IP restriction for 203.142.45.0/24',
      severity: 'info'
    },
    {
      id: 2,
      timestamp: '2025-09-05T13:30:00Z',
      user: 'system',
      action: 'FAILED_LOGIN_ATTEMPT',
      details: 'Multiple failed login attempts from 192.168.1.100',
      severity: 'warning'
    },
    {
      id: 3,
      timestamp: '2025-09-05T13:15:00Z',
      user: 'security@university.ac.id',
      action: 'GEOFENCE_VIOLATION',
      details: 'User attempted exam access outside permitted zone',
      severity: 'high'
    },
    {
      id: 4,
      timestamp: '2025-09-05T13:00:00Z',
      user: 'admin@university.ac.id',
      action: 'BROWSER_POLICY_UPDATED',
      details: 'Updated browser lockdown policy for CS301 exam',
      severity: 'info'
    }
  ]);

  const [browserPolicies] = useState([
    { id: 1, name: 'Standard Exam Policy', restrictions: ['disable_copy', 'disable_paste', 'disable_print', 'fullscreen_mode'], status: 'active' },
    { id: 2, name: 'High Security Policy', restrictions: ['disable_copy', 'disable_paste', 'disable_print', 'fullscreen_mode', 'disable_devtools', 'block_navigation'], status: 'active' },
    { id: 3, name: 'Basic Policy', restrictions: ['disable_copy', 'disable_paste'], status: 'inactive' }
  ]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted border-border';
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

  const tabs = [
    { id: 'ip-restrictions', label: 'IP Restrictions', icon: 'Shield' },
    { id: 'geofencing', label: 'Geofencing', icon: 'MapPin' },
    { id: 'browser-policies', label: 'Browser Policies', icon: 'Monitor' },
    { id: 'audit-logs', label: 'Audit Logs', icon: 'FileText' }
  ];

  const renderIPRestrictions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">IP Address Restrictions</h3>
        <Button variant="default" iconName="Plus">
          Add IP Rule
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-foreground">IP Address/Range</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Description</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Type</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ipRestrictions?.map((rule) => (
              <tr key={rule?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="p-4 font-mono text-sm text-foreground">{rule?.ip}</td>
                <td className="p-4 text-sm text-muted-foreground">{rule?.description}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rule?.type === 'allow' ? 'text-success bg-success/10' : 'text-error bg-error/10'
                  }`}>
                    {rule?.type?.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-success bg-success/10">
                    {rule?.status?.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit" />
                    <Button variant="ghost" size="sm" iconName="Trash2" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGeofencing = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Geofence Zones</h3>
        <Button variant="default" iconName="Plus">
          Add Zone
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {geofenceZones?.map((zone) => (
            <div key={zone?.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{zone?.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Coordinates: {zone?.coordinates}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Radius: {zone?.radius}m
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium text-success bg-success/10">
                    {zone?.status?.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Edit" />
                  <Button variant="ghost" size="sm" iconName="Trash2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Zone Map Preview</h4>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="University Campus"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=-6.2088,106.8456&z=16&output=embed"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBrowserPolicies = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Browser Lockdown Policies</h3>
        <Button variant="default" iconName="Plus">
          Create Policy
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {browserPolicies?.map((policy) => (
          <div key={policy?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-medium text-foreground">{policy?.name}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                policy?.status === 'active' ? 'text-success bg-success/10' : 'text-muted-foreground bg-muted'
              }`}>
                {policy?.status?.toUpperCase()}
              </span>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Restrictions:</p>
              <div className="flex flex-wrap gap-1">
                {policy?.restrictions?.map((restriction, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    {restriction?.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <Button variant="ghost" size="sm" iconName="Edit" />
              <Button variant="ghost" size="sm" iconName="Copy" />
              <Button variant="ghost" size="sm" iconName="Trash2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAuditLogs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Security Audit Logs</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Filter">
            Filter
          </Button>
          <Button variant="outline" iconName="Download">
            Export
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-foreground">Timestamp</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">User</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Action</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Details</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Severity</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs?.map((log) => (
                <tr key={log?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 text-sm font-mono text-muted-foreground">
                    {formatTimestamp(log?.timestamp)}
                  </td>
                  <td className="p-4 text-sm text-foreground">{log?.user}</td>
                  <td className="p-4 text-sm font-medium text-foreground">{log?.action}</td>
                  <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">
                    {log?.details}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(log?.severity)}`}>
                      {log?.severity?.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Security Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Icon name="Shield" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Security Status</p>
              <p className="font-semibold text-success">Secure</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Activity" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Rules</p>
              <p className="font-semibold text-foreground">{ipRestrictions?.filter(r => r?.status === 'active')?.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alerts Today</p>
              <p className="font-semibold text-foreground">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-error/10 rounded-lg">
              <Icon name="Ban" size={20} className="text-error" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Blocked IPs</p>
              <p className="font-semibold text-foreground">{ipRestrictions?.filter(r => r?.type === 'deny')?.length}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="bg-card border border-border rounded-lg">
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
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

        <div className="p-6">
          {activeTab === 'ip-restrictions' && renderIPRestrictions()}
          {activeTab === 'geofencing' && renderGeofencing()}
          {activeTab === 'browser-policies' && renderBrowserPolicies()}
          {activeTab === 'audit-logs' && renderAuditLogs()}
        </div>
      </div>
    </div>
  );
};

export default SecurityConfigPanel;