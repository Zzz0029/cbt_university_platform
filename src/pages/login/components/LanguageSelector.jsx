import React from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ currentLanguage, onLanguageChange, className = '' }) => {
  const languages = [
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];

  return (
    <div className={`relative inline-block ${className}`}>
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e?.target?.value)}
        className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-8 text-sm font-medium text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      >
        {languages?.map((language) => (
          <option key={language?.code} value={language?.code}>
            {language?.flag} {language?.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
      </div>
    </div>
  );
};

export default LanguageSelector;