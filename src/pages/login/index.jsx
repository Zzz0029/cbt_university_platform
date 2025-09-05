import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import LanguageSelector from './components/LanguageSelector';
import TrustIndicators from './components/TrustIndicators';
import SupportSection from './components/SupportSection';
import Icon from '../../components/AppIcon';

const Login = () => {
  const [currentLanguage, setCurrentLanguage] = useState('id');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'id';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  const formatTime = (date) => {
    return date?.toLocaleString(currentLanguage === 'id' ? 'id-ID' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  {currentLanguage === 'id' ? 'Platform CBT Universitas' : 'University CBT Platform'}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {currentLanguage === 'id' ? 'Sistem Ujian Berbasis Komputer' : 'Computer-Based Testing System'}
                </p>
              </div>
            </div>

            {/* Language Selector */}
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="pt-16 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Branding and Info */}
            <div className="hidden lg:block space-y-8">
              {/* Hero Section */}
              <div className="text-center lg:text-left">
                <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6">
                  <Icon name="Monitor" size={48} className="text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {currentLanguage === 'id' ?'Ujian Digital Terpercaya' :'Trusted Digital Examinations'
                  }
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {currentLanguage === 'id' ?'Platform ujian berbasis komputer dengan keamanan tingkat universitas dan monitoring real-time untuk memastikan integritas akademik.' :'Computer-based testing platform with university-grade security and real-time monitoring to ensure academic integrity.'
                  }
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={24} className="text-success" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {currentLanguage === 'id' ? 'Keamanan Tinggi' : 'High Security'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'id' ?'Enkripsi end-to-end dan monitoring anti-kecurangan' :'End-to-end encryption and anti-cheating monitoring'
                    }
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={24} className="text-warning" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {currentLanguage === 'id' ? 'Real-time' : 'Real-time'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'id' ?'Monitoring dan sinkronisasi waktu yang akurat' :'Accurate time monitoring and synchronization'
                    }
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {currentLanguage === 'id' ? 'Multi-Role' : 'Multi-Role'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'id' ?'Akses berbeda untuk mahasiswa, dosen, dan admin' :'Different access for students, faculty, and admins'
                    }
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="BarChart3" size={24} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {currentLanguage === 'id' ? 'Analitik' : 'Analytics'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'id' ?'Laporan dan analisis performa ujian lengkap' :'Comprehensive exam performance reports and analysis'
                    }
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <TrustIndicators currentLanguage={currentLanguage} />
            </div>

            {/* Right Column - Login Form */}
            <div className="w-full">
              <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
                <LoginForm 
                  currentLanguage={currentLanguage}
                  onLanguageChange={handleLanguageChange}
                />
                
                {/* Support Section */}
                <div className="mt-8 pt-8 border-t border-border">
                  <SupportSection currentLanguage={currentLanguage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>
                {currentLanguage === 'id' 
                  ? `© ${new Date()?.getFullYear()} Platform CBT Universitas. Hak cipta dilindungi.`
                  : `© ${new Date()?.getFullYear()} University CBT Platform. All rights reserved.`
                }
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
                <span>
                  {currentLanguage === 'id' ? 'Sistem Online' : 'System Online'}
                </span>
              </div>
              <span>•</span>
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;