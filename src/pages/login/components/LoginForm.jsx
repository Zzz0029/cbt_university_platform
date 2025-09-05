import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLanguageChange, currentLanguage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [captchaValue, setCaptchaValue] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('A7B9K');

  // Mock credentials for different user roles
  const mockCredentials = {
    student: { username: 'student@university.ac.id', password: 'student123' },
    faculty: { username: 'faculty@university.ac.id', password: 'faculty123' },
    admin: { username: 'admin@university.ac.id', password: 'admin123' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.username?.trim()) {
      newErrors.username = currentLanguage === 'id' ? 'Username atau email wajib diisi' : 'Username or email is required';
    }
    
    if (!formData?.password?.trim()) {
      newErrors.password = currentLanguage === 'id' ? 'Password wajib diisi' : 'Password is required';
    }
    
    if (showCaptcha && captchaValue !== generatedCaptcha) {
      newErrors.captcha = currentLanguage === 'id' ? 'CAPTCHA tidak valid' : 'Invalid CAPTCHA';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check credentials
    const isValidCredentials = Object.values(mockCredentials)?.some(
      cred => cred?.username === formData?.username && cred?.password === formData?.password
    );
    
    if (isValidCredentials) {
      // Determine user role and redirect
      let userRole = 'student';
      if (formData?.username === mockCredentials?.faculty?.username) userRole = 'faculty';
      if (formData?.username === mockCredentials?.admin?.username) userRole = 'admin';
      
      // Store user session
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', formData?.username);
      
      // Redirect based on role
      switch (userRole) {
        case 'admin': navigate('/system-administration');
          break;
        case 'faculty': navigate('/exam-creation');
          break;
        default:
          navigate('/student-dashboard');
      }
    } else {
      setFailedAttempts(prev => prev + 1);
      
      if (failedAttempts >= 2) {
        setShowCaptcha(true);
        // Generate new CAPTCHA
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const newCaptcha = Array.from({length: 5}, () => chars?.[Math.floor(Math.random() * chars?.length)])?.join('');
        setGeneratedCaptcha(newCaptcha);
      }
      
      setErrors({
        general: currentLanguage === 'id' 
          ? `Kredensial tidak valid. Gunakan: ${Object.entries(mockCredentials)?.map(([role, cred]) => `${role}: ${cred?.username}/${cred?.password}`)?.join(', ')}`
          : `Invalid credentials. Use: ${Object.entries(mockCredentials)?.map(([role, cred]) => `${role}: ${cred?.username}/${cred?.password}`)?.join(', ')}`
      });
    }
    
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    alert(currentLanguage === 'id' ?'Fitur reset password akan segera tersedia. Hubungi administrator untuk bantuan.' :'Password reset feature coming soon. Contact administrator for assistance.'
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="GraduationCap" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {currentLanguage === 'id' ? 'Masuk ke Platform CBT' : 'Login to CBT Platform'}
          </h1>
          <p className="text-muted-foreground">
            {currentLanguage === 'id' ?'Akses sistem ujian berbasis komputer universitas' :'Access the university computer-based testing system'
            }
          </p>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0 mt-0.5" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Username/Email Field */}
        <Input
          label={currentLanguage === 'id' ? 'Username atau Email' : 'Username or Email'}
          type="text"
          name="username"
          value={formData?.username}
          onChange={handleInputChange}
          placeholder={currentLanguage === 'id' ? 'Masukkan username atau email' : 'Enter username or email'}
          error={errors?.username}
          required
          disabled={isLoading}
        />

        {/* Password Field */}
        <Input
          label={currentLanguage === 'id' ? 'Password' : 'Password'}
          type="password"
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          placeholder={currentLanguage === 'id' ? 'Masukkan password' : 'Enter password'}
          error={errors?.password}
          required
          disabled={isLoading}
        />

        {/* CAPTCHA */}
        {showCaptcha && (
          <div className="space-y-3">
            <div className="p-4 bg-muted border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">
                  {currentLanguage === 'id' ? 'Verifikasi CAPTCHA' : 'CAPTCHA Verification'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                    const newCaptcha = Array.from({length: 5}, () => chars?.[Math.floor(Math.random() * chars?.length)])?.join('');
                    setGeneratedCaptcha(newCaptcha);
                  }}
                  className="text-primary hover:text-primary/80"
                >
                  <Icon name="RotateCcw" size={16} />
                </button>
              </div>
              <div className="bg-white border-2 border-dashed border-border p-3 rounded text-center font-mono text-xl font-bold text-foreground tracking-wider">
                {generatedCaptcha}
              </div>
            </div>
            <Input
              label={currentLanguage === 'id' ? 'Masukkan CAPTCHA' : 'Enter CAPTCHA'}
              type="text"
              value={captchaValue}
              onChange={(e) => setCaptchaValue(e?.target?.value?.toUpperCase())}
              placeholder={currentLanguage === 'id' ? 'Ketik kode di atas' : 'Type the code above'}
              error={errors?.captcha}
              required
              disabled={isLoading}
            />
          </div>
        )}

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <Checkbox
            label={currentLanguage === 'id' ? 'Ingat saya' : 'Remember me'}
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
            disabled={isLoading}
          >
            {currentLanguage === 'id' ? 'Lupa password?' : 'Forgot password?'}
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          iconName="LogIn"
          iconPosition="left"
          className="h-12"
        >
          {isLoading 
            ? (currentLanguage === 'id' ? 'Memverifikasi...' : 'Verifying...') 
            : (currentLanguage === 'id' ? 'Masuk' : 'Login')
          }
        </Button>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Shield" size={16} className="text-warning flex-shrink-0 mt-0.5" />
            <div className="text-xs text-foreground">
              <p className="font-medium mb-1">
                {currentLanguage === 'id' ? 'Keamanan Terjamin' : 'Secure Connection'}
              </p>
              <p className="text-muted-foreground">
                {currentLanguage === 'id' ?'Koneksi Anda dienkripsi dan dilindungi oleh protokol keamanan tingkat universitas.' :'Your connection is encrypted and protected by university-grade security protocols.'
                }
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;