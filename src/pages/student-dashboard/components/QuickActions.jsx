import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const [systemStatus, setSystemStatus] = useState('online');

  const quickActions = [
    {
      id: 'practice',
      title: 'Latihan Soal',
      description: 'Akses bank soal untuk latihan',
      icon: 'BookOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      action: () => onActionClick('practice')
    },
    {
      id: 'calendar',
      title: 'Kalender Ujian',
      description: 'Lihat jadwal ujian mendatang',
      icon: 'Calendar',
      color: 'text-success',
      bgColor: 'bg-success/10',
      action: () => onActionClick('calendar')
    },
    {
      id: 'results',
      title: 'Riwayat Hasil',
      description: 'Lihat semua hasil ujian',
      icon: 'BarChart3',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      action: () => onActionClick('results')
    },
    {
      id: 'support',
      title: 'Bantuan Teknis',
      description: 'Chat dengan tim support',
      icon: 'HelpCircle',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      action: () => onActionClick('support')
    }
  ];

  const systemChecks = [
    {
      name: 'Koneksi Internet',
      status: 'good',
      icon: 'Wifi',
      description: 'Stabil - 45 Mbps'
    },
    {
      name: 'Browser',
      status: 'good',
      icon: 'Globe',
      description: 'Chrome 118 - Kompatibel'
    },
    {
      name: 'Kamera',
      status: 'warning',
      icon: 'Camera',
      description: 'Tidak terdeteksi'
    },
    {
      name: 'Mikrofon',
      status: 'good',
      icon: 'Mic',
      description: 'Berfungsi normal'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Aksi Cepat</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:shadow-sm transition-all duration-200 text-left focus-ring"
            >
              <div className={`p-2 rounded-lg ${action?.bgColor}`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">{action?.title}</h4>
                <p className="text-xs text-muted-foreground">{action?.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
      {/* System Status Check */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Pemeriksaan Sistem</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onActionClick('system-check')}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Periksa Ulang
          </Button>
        </div>

        <div className="space-y-3">
          {systemChecks?.map((check, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={check?.icon} size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{check?.name}</p>
                  <p className="text-xs text-muted-foreground">{check?.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(check?.status)} 
                  size={16} 
                  className={getStatusColor(check?.status)} 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-primary font-medium mb-1">Tips Persiapan Ujian</p>
              <p className="text-foreground">
                Pastikan koneksi internet stabil dan perangkat dalam kondisi baik sebelum memulai ujian.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Emergency Contacts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Kontak Darurat</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Icon name="Phone" size={16} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Bantuan Teknis</p>
                <p className="text-xs text-muted-foreground">+62 21 1234 5678</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" iconName="Phone" />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="MessageCircle" size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Live Chat</p>
                <p className="text-xs text-muted-foreground">Tersedia 24/7</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              iconName="MessageCircle"
              onClick={() => onActionClick('chat')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;