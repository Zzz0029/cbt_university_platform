import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const SystemHealthMetrics = () => {
  const [metrics, setMetrics] = useState({
    serverPerformance: {
      cpu: 68,
      memory: 72,
      disk: 45,
      network: 89
    },
    concurrentUsers: 1247,
    storageUtilization: 67,
    securityStatus: 'secure',
    uptime: '99.97%'
  });

  const [performanceData] = useState([
    { time: '00:00', cpu: 45, memory: 52, network: 78 },
    { time: '04:00', cpu: 38, memory: 48, network: 65 },
    { time: '08:00', cpu: 72, memory: 68, network: 89 },
    { time: '12:00', cpu: 85, memory: 78, network: 92 },
    { time: '16:00', cpu: 68, memory: 72, network: 89 },
    { time: '20:00', cpu: 55, memory: 58, network: 82 }
  ]);

  const [storageData] = useState([
    { name: 'Database', value: 45, color: '#1E40AF' },
    { name: 'Media Files', value: 25, color: '#059669' },
    { name: 'Logs', value: 15, color: '#F59E0B' },
    { name: 'Backups', value: 10, color: '#EF4444' },
    { name: 'Free Space', value: 33, color: '#6B7280' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        serverPerformance: {
          cpu: Math.max(30, Math.min(95, prev?.serverPerformance?.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(40, Math.min(90, prev?.serverPerformance?.memory + (Math.random() - 0.5) * 8)),
          disk: Math.max(20, Math.min(80, prev?.serverPerformance?.disk + (Math.random() - 0.5) * 5)),
          network: Math.max(50, Math.min(100, prev?.serverPerformance?.network + (Math.random() - 0.5) * 12))
        },
        concurrentUsers: Math.max(800, Math.min(2000, prev?.concurrentUsers + Math.floor((Math.random() - 0.5) * 50)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value, type) => {
    if (type === 'performance') {
      if (value > 85) return 'text-error';
      if (value > 70) return 'text-warning';
      return 'text-success';
    }
    return 'text-success';
  };

  const getStatusBg = (value, type) => {
    if (type === 'performance') {
      if (value > 85) return 'bg-error/10 border-error/20';
      if (value > 70) return 'bg-warning/10 border-warning/20';
      return 'bg-success/10 border-success/20';
    }
    return 'bg-success/10 border-success/20';
  };

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">CPU Usage</p>
              <p className={`text-2xl font-bold ${getStatusColor(metrics?.serverPerformance?.cpu, 'performance')}`}>
                {metrics?.serverPerformance?.cpu}%
              </p>
            </div>
            <div className={`p-3 rounded-lg ${getStatusBg(metrics?.serverPerformance?.cpu, 'performance')}`}>
              <Icon name="Cpu" size={24} className={getStatusColor(metrics?.serverPerformance?.cpu, 'performance')} />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Memory Usage</p>
              <p className={`text-2xl font-bold ${getStatusColor(metrics?.serverPerformance?.memory, 'performance')}`}>
                {metrics?.serverPerformance?.memory}%
              </p>
            </div>
            <div className={`p-3 rounded-lg ${getStatusBg(metrics?.serverPerformance?.memory, 'performance')}`}>
              <Icon name="HardDrive" size={24} className={getStatusColor(metrics?.serverPerformance?.memory, 'performance')} />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-primary">{metrics?.concurrentUsers?.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border-primary/20">
              <Icon name="Users" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">System Uptime</p>
              <p className="text-2xl font-bold text-success">{metrics?.uptime}</p>
            </div>
            <div className="p-3 rounded-lg bg-success/10 border-success/20">
              <Icon name="Activity" size={24} className="text-success" />
            </div>
          </div>
        </div>
      </div>
      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Performance */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Real-time Performance</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
              <span className="text-sm text-success">Live</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="cpu" stroke="#EF4444" strokeWidth={2} name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#F59E0B" strokeWidth={2} name="Memory %" />
                <Line type="monotone" dataKey="network" stroke="#10B981" strokeWidth={2} name="Network %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Storage Utilization */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Storage Utilization</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={storageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {storageData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {storageData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.color }} />
                <span className="text-sm text-muted-foreground">{item?.name}</span>
                <span className="text-sm font-medium text-foreground">{item?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* System Alerts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">System Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">High CPU Usage Detected</p>
              <p className="text-sm text-muted-foreground">Database server CPU usage above 85% for 15 minutes</p>
              <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
            </div>
            <button className="text-warning hover:text-warning/80 transition-colors">
              <Icon name="X" size={16} />
            </button>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Scheduled Maintenance</p>
              <p className="text-sm text-muted-foreground">System backup scheduled for tonight at 2:00 AM</p>
              <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
            </div>
            <button className="text-primary hover:text-primary/80 transition-colors">
              <Icon name="X" size={16} />
            </button>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Security Scan Completed</p>
              <p className="text-sm text-muted-foreground">Weekly security scan completed successfully - no threats detected</p>
              <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
            </div>
            <button className="text-success hover:text-success/80 transition-colors">
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMetrics;