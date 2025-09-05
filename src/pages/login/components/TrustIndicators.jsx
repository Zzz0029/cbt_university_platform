import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = ({ currentLanguage, className = '' }) => {
  const certifications = [
    {
      id: 1,
      name: currentLanguage === 'id' ? 'Kemendikbud RI' : 'Ministry of Education',
      icon: 'Award',
      description: currentLanguage === 'id' ? 'Tersertifikasi' : 'Certified'
    },
    {
      id: 2,
      name: currentLanguage === 'id' ? 'ISO 27001' : 'ISO 27001',
      icon: 'Shield',
      description: currentLanguage === 'id' ? 'Keamanan Data' : 'Data Security'
    },
    {
      id: 3,
      name: currentLanguage === 'id' ? 'DIKTI' : 'Higher Education',
      icon: 'CheckCircle',
      description: currentLanguage === 'id' ? 'Terakreditasi' : 'Accredited'
    }
  ];

  return (
    <div className={`${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-sm font-medium text-foreground mb-4">
          {currentLanguage === 'id' ? 'Dipercaya Oleh' : 'Trusted By'}
        </h3>
        
        <div className="flex items-center justify-center space-x-6">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-success/10 border border-success/20 rounded-full flex items-center justify-center">
                <Icon name={cert?.icon} size={20} className="text-success" />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-foreground">{cert?.name}</p>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Features */}
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={14} className="text-success" />
          <span className="text-muted-foreground">
            {currentLanguage === 'id' ? 'Enkripsi 256-bit' : '256-bit Encryption'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={14} className="text-success" />
          <span className="text-muted-foreground">
            {currentLanguage === 'id' ? 'Monitoring Real-time' : 'Real-time Monitoring'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Server" size={14} className="text-success" />
          <span className="text-muted-foreground">
            {currentLanguage === 'id' ? 'Server Lokal' : 'Local Servers'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={14} className="text-success" />
          <span className="text-muted-foreground">
            {currentLanguage === 'id' ? 'Uptime 99.9%' : '99.9% Uptime'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;