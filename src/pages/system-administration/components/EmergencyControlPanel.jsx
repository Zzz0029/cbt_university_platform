import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyControlPanel = () => {
  const [systemStatus, setSystemStatus] = useState({
    maintenanceMode: false,
    examSuspended: false,
    emergencyMode: false,
    lastIncident: '2025-09-03T15:30:00Z'
  });

  const [activeExams] = useState([
    {
      id: 1,
      title: 'Database Systems Final',
      course: 'CS 301',
      activeStudents: 45,
      startTime: '2025-09-05T14:00:00Z',
      endTime: '2025-09-05T16:00:00Z',
      status: 'active'
    },
    {
      id: 2,
      title: 'Data Structures Midterm',
      course: 'CS 201',
      activeStudents: 32,
      startTime: '2025-09-05T15:00:00Z',
      endTime: '2025-09-05T16:30:00Z',
      status: 'active'
    },
    {
      id: 3,
      title: 'Software Engineering Quiz',
      course: 'CS 401',
      activeStudents: 18,
      startTime: '2025-09-05T15:30:00Z',
      endTime: '2025-09-05T16:15:00Z',
      status: 'active'
    }
  ]);

  const [incidentHistory] = useState([
    {
      id: 1,
      timestamp: '2025-09-03T15:30:00Z',
      type: 'system_outage',
      severity: 'high',
      description: 'Database connection timeout during peak exam hours',
      resolution: 'Database server restarted, connection pool increased',
      duration: '15 minutes',
      affectedUsers: 127,
      status: 'resolved'
    },
    {
      id: 2,
      timestamp: '2025-09-02T10:15:00Z',
      type: 'security_breach',
      severity: 'critical',
      description: 'Unauthorized access attempt detected from external IP',
      resolution: 'IP blocked, security protocols updated',
      duration: '5 minutes',
      affectedUsers: 0,
      status: 'resolved'
    },
    {
      id: 3,
      timestamp: '2025-09-01T14:45:00Z',
      type: 'exam_disruption',
      severity: 'medium',
      description: 'Network connectivity issues in Building A',
      resolution: 'Backup network activated, exam time extended',
      duration: '8 minutes',
      affectedUsers: 23,
      status: 'resolved'
    }
  ]);

  const [escalationContacts] = useState([
    {
      id: 1,
      name: 'Dr. Bambang Sutrisno',
      role: 'IT Director',
      phone: '+62-21-555-0101',
      email: 'bambang.sutrisno@university.ac.id',
      priority: 'primary'
    },
    {
      id: 2,
      name: 'Ahmad Wijaya',
      role: 'System Administrator',
      phone: '+62-21-555-0102',
      email: 'ahmad.wijaya@university.ac.id',
      priority: 'secondary'
    },
    {
      id: 3,
      name: 'Siti Nurhaliza',
      role: 'Security Officer',
      phone: '+62-21-555-0103',
      email: 'siti.nurhaliza@university.ac.id',
      priority: 'tertiary'
    }
  ]);

  const handleMaintenanceMode = () => {
    setSystemStatus(prev => ({
      ...prev,
      maintenanceMode: !prev?.maintenanceMode
    }));
  };

  const handleExamSuspension = () => {
    setSystemStatus(prev => ({
      ...prev,
      examSuspended: !prev?.examSuspended
    }));
  };

  const handleEmergencyMode = () => {
    setSystemStatus(prev => ({
      ...prev,
      emergencyMode: !prev?.emergencyMode
    }));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-primary bg-primary/10 border-primary/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
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

  const formatDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInMinutes = Math.floor((end - start) / (1000 * 60));
    return `${diffInMinutes} minutes`;
  };

  return (
    <div className="space-y-6">
      {/* Emergency Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`bg-card border rounded-lg p-4 ${
          systemStatus?.maintenanceMode ? 'border-warning bg-warning/5' : 'border-border'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              systemStatus?.maintenanceMode ? 'bg-warning/20' : 'bg-success/10'
            }`}>
              <Icon name="Settings" size={20} className={
                systemStatus?.maintenanceMode ? 'text-warning' : 'text-success'
              } />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Maintenance Mode</p>
              <p className={`font-semibold ${
                systemStatus?.maintenanceMode ? 'text-warning' : 'text-success'
              }`}>
                {systemStatus?.maintenanceMode ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
        </div>
        
        <div className={`bg-card border rounded-lg p-4 ${
          systemStatus?.examSuspended ? 'border-error bg-error/5' : 'border-border'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              systemStatus?.examSuspended ? 'bg-error/20' : 'bg-success/10'
            }`}>
              <Icon name="Pause" size={20} className={
                systemStatus?.examSuspended ? 'text-error' : 'text-success'
              } />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Exam Status</p>
              <p className={`font-semibold ${
                systemStatus?.examSuspended ? 'text-error' : 'text-success'
              }`}>
                {systemStatus?.examSuspended ? 'Suspended' : 'Running'}
              </p>
            </div>
          </div>
        </div>
        
        <div className={`bg-card border rounded-lg p-4 ${
          systemStatus?.emergencyMode ? 'border-error bg-error/5' : 'border-border'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              systemStatus?.emergencyMode ? 'bg-error/20' : 'bg-success/10'
            }`}>
              <Icon name="AlertTriangle" size={20} className={
                systemStatus?.emergencyMode ? 'text-error' : 'text-success'
              } />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Emergency Mode</p>
              <p className={`font-semibold ${
                systemStatus?.emergencyMode ? 'text-error' : 'text-success'
              }`}>
                {systemStatus?.emergencyMode ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Students</p>
              <p className="font-semibold text-foreground">
                {activeExams?.reduce((total, exam) => total + exam?.activeStudents, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Emergency Controls */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Settings" size={20} className="text-warning" />
              <h4 className="font-medium text-foreground">Maintenance Mode</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Enable maintenance mode to prevent new exam sessions and display maintenance notice to users.
            </p>
            <Button
              variant={systemStatus?.maintenanceMode ? "destructive" : "warning"}
              onClick={handleMaintenanceMode}
              iconName={systemStatus?.maintenanceMode ? "X" : "Settings"}
              fullWidth
            >
              {systemStatus?.maintenanceMode ? 'Disable Maintenance' : 'Enable Maintenance'}
            </Button>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Pause" size={20} className="text-error" />
              <h4 className="font-medium text-foreground">Suspend All Exams</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Immediately suspend all active exams and preserve current progress for later resumption.
            </p>
            <Button
              variant={systemStatus?.examSuspended ? "outline" : "destructive"}
              onClick={handleExamSuspension}
              iconName={systemStatus?.examSuspended ? "Play" : "Pause"}
              fullWidth
            >
              {systemStatus?.examSuspended ? 'Resume Exams' : 'Suspend Exams'}
            </Button>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="AlertTriangle" size={20} className="text-error" />
              <h4 className="font-medium text-foreground">Emergency Mode</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Activate emergency protocols, notify administrators, and initiate incident response procedures.
            </p>
            <Button
              variant={systemStatus?.emergencyMode ? "outline" : "destructive"}
              onClick={handleEmergencyMode}
              iconName={systemStatus?.emergencyMode ? "X" : "AlertTriangle"}
              fullWidth
            >
              {systemStatus?.emergencyMode ? 'Deactivate Emergency' : 'Activate Emergency'}
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Exams */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Active Exams</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
              <span className="text-sm text-success">Live</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {activeExams?.map((exam) => (
              <div key={exam?.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="FileText" size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{exam?.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {exam?.course} • {exam?.activeStudents} students • {formatDuration(exam?.startTime, exam?.endTime)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Started: {formatTimestamp(exam?.startTime)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Eye">
                    Monitor
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Pause">
                    Suspend
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Escalation Contacts */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Contacts</h3>
          
          <div className="space-y-3">
            {escalationContacts?.map((contact) => (
              <div key={contact?.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <div className={`p-2 rounded-lg ${
                  contact?.priority === 'primary' ? 'bg-error/10' :
                  contact?.priority === 'secondary' ? 'bg-warning/10' : 'bg-primary/10'
                }`}>
                  <Icon name="User" size={16} className={
                    contact?.priority === 'primary' ? 'text-error' :
                    contact?.priority === 'secondary' ? 'text-warning' : 'text-primary'
                  } />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{contact?.name}</p>
                  <p className="text-xs text-muted-foreground">{contact?.role}</p>
                  <p className="text-xs text-muted-foreground">{contact?.phone}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Phone">
                    Call
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Mail">
                    Email
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Incident History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Incidents</h3>
          <Button variant="outline" size="sm" iconName="Plus">
            Report Incident
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-foreground">Timestamp</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Type</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Severity</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Description</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Duration</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Affected</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {incidentHistory?.map((incident) => (
                <tr key={incident?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-3 text-sm font-mono text-muted-foreground">
                    {formatTimestamp(incident?.timestamp)}
                  </td>
                  <td className="p-3 text-sm text-foreground capitalize">
                    {incident?.type?.replace('_', ' ')}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident?.severity)}`}>
                      {incident?.severity?.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground max-w-xs truncate">
                    {incident?.description}
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">{incident?.duration}</td>
                  <td className="p-3 text-sm text-muted-foreground">{incident?.affectedUsers} users</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium text-success bg-success/10">
                      {incident?.status?.toUpperCase()}
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
};

export default EmergencyControlPanel;