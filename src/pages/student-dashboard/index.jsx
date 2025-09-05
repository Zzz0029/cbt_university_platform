import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ExamStatusIndicator from '../../components/ui/ExamStatusIndicator';
import NotificationCenter from '../../components/ui/NotificationCenter';
import SecurityModeOverlay from '../../components/ui/SecurityModeOverlay';

// Import page components
import ExamCard from './components/ExamCard';
import ResultCard from './components/ResultCard';
import ProgressChart from './components/ProgressChart';
import QuickActions from './components/QuickActions';
import AnnouncementPanel from './components/AnnouncementPanel';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSecurityMode, setIsSecurityMode] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');

  // Mock student data
  const studentInfo = {
    name: 'Andi Pratama',
    studentId: '2021110001',
    program: 'Teknik Informatika',
    semester: 'Semester 7',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  };

  // Mock upcoming exams data
  const upcomingExams = [
    {
      id: 1,
      title: 'Ujian Tengah Semester - Basis Data',
      subject: 'Sistem Basis Data',
      code: 'IF301',
      startTime: '2025-09-05T14:00:00Z',
      duration: 120,
      status: 'in-progress',
      type: 'midterm',
      instructor: 'Dr. Ahmad Wijaya'
    },
    {
      id: 2,
      title: 'Quiz Mingguan - Algoritma',
      subject: 'Analisis Algoritma',
      code: 'IF205',
      startTime: '2025-09-06T10:00:00Z',
      duration: 60,
      status: 'scheduled',
      type: 'quiz',
      instructor: 'Prof. Sari Indah'
    },
    {
      id: 3,
      title: 'Ujian Akhir Semester - Jaringan',
      subject: 'Jaringan Komputer',
      code: 'IF401',
      startTime: '2025-09-08T09:00:00Z',
      duration: 180,
      status: 'scheduled',
      type: 'final',
      instructor: 'Dr. Budi Santoso'
    }
  ];

  // Mock recent results data
  const recentResults = [
    {
      id: 1,
      examTitle: 'Quiz 1 - Struktur Data',
      subject: 'Struktur Data dan Algoritma',
      score: 85,
      maxScore: 100,
      status: 'graded',
      completedAt: '2025-09-01T10:30:00Z',
      feedback: 'Pemahaman konsep linked list sudah baik, namun perlu latihan lebih untuk implementasi tree.'
    },
    {
      id: 2,
      examTitle: 'Ujian Tengah - Pemrograman Web',
      subject: 'Pemrograman Web',
      score: 92,
      maxScore: 100,
      status: 'graded',
      completedAt: '2025-08-28T14:15:00Z',
      feedback: 'Excellent work on responsive design implementation.'
    },
    {
      id: 3,
      examTitle: 'Quiz 2 - Database Design',
      subject: 'Sistem Basis Data',
      score: null,
      maxScore: 100,
      status: 'pending',
      completedAt: '2025-09-03T16:00:00Z',
      feedback: null
    }
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleStartExam = (exam) => {
    // In a real application, this would navigate to the exam interface
    console.log('Starting exam:', exam?.title);
    setIsSecurityMode(true);
  };

  const handleViewExamDetails = (exam) => {
    console.log('Viewing exam details:', exam?.title);
    // Navigate to exam details page
  };

  const handleViewResultDetails = (result) => {
    console.log('Viewing result details:', result?.examTitle);
    navigate('/exam-results');
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'practice': console.log('Opening practice tests');
        break;
      case 'calendar': console.log('Opening exam calendar');
        break;
      case 'results': navigate('/exam-results');
        break;
      case 'support': console.log('Opening support chat');
        break;
      case 'system-check': console.log('Running system check');
        break;
      case 'chat': console.log('Opening live chat');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleViewAllAnnouncements = () => {
    console.log('Viewing all announcements');
  };

  const handleEmergencyExit = () => {
    setIsSecurityMode(false);
    console.log('Emergency exit from exam');
  };

  const handleRequestHelp = () => {
    console.log('Requesting help during exam');
  };

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const getActiveExamsCount = () => {
    return upcomingExams?.filter(exam => exam?.status === 'in-progress')?.length;
  };

  const getScheduledExamsCount = () => {
    return upcomingExams?.filter(exam => exam?.status === 'scheduled')?.length;
  };

  const getPendingResultsCount = () => {
    return recentResults?.filter(result => result?.status === 'pending')?.length;
  };

  if (isSecurityMode) {
    return (
      <SecurityModeOverlay
        isActive={true}
        examTitle="Ujian Tengah Semester - Basis Data"
        timeRemaining="01:45:30"
        onEmergencyExit={handleEmergencyExit}
        onRequestHelp={handleRequestHelp}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <RoleBasedSidebar userRole="student" />
      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={studentInfo?.avatar}
                  alt={studentInfo?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-xl font-semibold text-foreground">
                    {getGreeting()}, {studentInfo?.name}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {studentInfo?.studentId} • {studentInfo?.program}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Current Time */}
              <div className="text-sm text-muted-foreground">
                {currentTime?.toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>

              {/* Exam Status Indicator */}
              <ExamStatusIndicator userRole="student" />

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNotificationOpen(true)}
                className="relative"
              >
                <Icon name="Bell" size={20} />
                {getPendingResultsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getPendingResultsCount()}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ujian Aktif</p>
                  <p className="text-2xl font-bold text-foreground">{getActiveExamsCount()}</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <Icon name="Play" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ujian Terjadwal</p>
                  <p className="text-2xl font-bold text-foreground">{getScheduledExamsCount()}</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hasil Tertunda</p>
                  <p className="text-2xl font-bold text-foreground">{getPendingResultsCount()}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="FileText" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rata-rata Nilai</p>
                  <p className="text-2xl font-bold text-foreground">85.5</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Icon name="TrendingUp" size={24} className="text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Exams and Results */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Exams */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Ujian Mendatang</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Lihat Kalender
                  </Button>
                </div>

                <div className="space-y-4">
                  {upcomingExams?.map((exam) => (
                    <ExamCard
                      key={exam?.id}
                      exam={exam}
                      onStartExam={handleStartExam}
                      onViewDetails={handleViewExamDetails}
                    />
                  ))}
                </div>
              </section>

              {/* Recent Results */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Hasil Terbaru</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/exam-results')}
                    iconName="BarChart3"
                    iconPosition="left"
                  >
                    Lihat Semua
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentResults?.slice(0, 4)?.map((result) => (
                    <ResultCard
                      key={result?.id}
                      result={result}
                      onViewDetails={handleViewResultDetails}
                    />
                  ))}
                </div>
              </section>

              {/* Progress Charts */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-6">Progress Akademik</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <ProgressChart chartType="bar" progressData={recentResults} />
                  <ProgressChart chartType="pie" progressData={recentResults} />
                </div>
              </section>
            </div>

            {/* Right Column - Quick Actions and Announcements */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <QuickActions onActionClick={handleQuickAction} />

              {/* Announcements */}
              <AnnouncementPanel onViewAll={handleViewAllAnnouncements} />
            </div>
          </div>
        </main>
      </div>
      {/* Notification Center */}
      <NotificationCenter
        userRole="student"
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
      {/* Mobile Bottom Padding */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default StudentDashboard;