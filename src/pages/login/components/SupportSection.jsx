import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SupportSection = ({ currentLanguage, className = '' }) => {
  const handleContactSupport = () => {
    alert(currentLanguage === 'id' ?'Hubungi IT Support: support@university.ac.id atau telepon (021) 1234-5678' :'Contact IT Support: support@university.ac.id or call (021) 1234-5678'
    );
  };

  const handleSystemStatus = () => {
    alert(currentLanguage === 'id' ?'Status Sistem: Semua layanan berjalan normal. Terakhir diperbarui: 05 Sep 2025, 01:30 WIB' :'System Status: All services operational. Last updated: Sep 05, 2025, 01:30 WIB'
    );
  };

  return (
    <div className={`${className}`}>
      <div className="text-center space-y-4">
        <h3 className="text-sm font-medium text-foreground">
          {currentLanguage === 'id' ? 'Butuh Bantuan?' : 'Need Help?'}
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleContactSupport}
            iconName="MessageCircle"
            iconPosition="left"
          >
            {currentLanguage === 'id' ? 'Hubungi Support' : 'Contact Support'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSystemStatus}
            iconName="Activity"
            iconPosition="left"
          >
            {currentLanguage === 'id' ? 'Status Sistem' : 'System Status'}
          </Button>
        </div>

        {/* Quick Help Links */}
        <div className="pt-4 border-t border-border">
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <button className="text-primary hover:text-primary/80 transition-colors">
              {currentLanguage === 'id' ? 'Panduan Login' : 'Login Guide'}
            </button>
            <span className="text-muted-foreground">•</span>
            <button className="text-primary hover:text-primary/80 transition-colors">
              {currentLanguage === 'id' ? 'Persyaratan Sistem' : 'System Requirements'}
            </button>
            <span className="text-muted-foreground">•</span>
            <button className="text-primary hover:text-primary/80 transition-colors">
              {currentLanguage === 'id' ? 'FAQ' : 'FAQ'}
            </button>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-6 p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Phone" size={16} className="text-error" />
            <div className="text-center">
              <p className="text-sm font-medium text-error">
                {currentLanguage === 'id' ? 'Darurat Teknis' : 'Technical Emergency'}
              </p>
              <p className="text-xs text-foreground">
                {currentLanguage === 'id' ? 'Telepon: (021) 1234-5678 ext. 911' : 'Call: (021) 1234-5678 ext. 911'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;