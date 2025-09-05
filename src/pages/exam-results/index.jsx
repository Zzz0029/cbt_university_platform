import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ExamStatusIndicator from '../../components/ui/ExamStatusIndicator';
import NotificationCenter from '../../components/ui/NotificationCenter';
import ResultsOverview from './components/ResultsOverview';
import PerformanceCharts from './components/PerformanceCharts';
import DetailedReview from './components/DetailedReview';
import FlaggedResponses from './components/FlaggedResponses';
import ExportTools from './components/ExportTools';
import CertificateGenerator from './components/CertificateGenerator';

const ExamResults = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('student'); // student, faculty, admin
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data
  const examsList = [
    {
      id: 1,
      title: 'Database Systems Final Exam',
      course: 'CS 301 - Database Systems',
      date: '2025-09-04',
      score: 87,
      grade: 'A',
      status: 'completed',
      correctAnswers: 26,
      totalQuestions: 30,
      completionTime: '1h 45m',
      percentile: 85,
      timeEfficiency: 87,
      totalStudents: 32,
      completedStudents: 30,
      subjectBreakdown: [
        { name: 'SQL Queries', percentage: 92 },
        { name: 'Database Design', percentage: 85 },
        { name: 'Normalization', percentage: 88 },
        { name: 'Transactions', percentage: 82 }
      ]
    },
    {
      id: 2,
      title: 'Data Structures Midterm',
      course: 'CS 201 - Data Structures',
      date: '2025-09-01',
      score: 92,
      grade: 'A',
      status: 'completed',
      correctAnswers: 23,
      totalQuestions: 25,
      completionTime: '1h 20m',
      percentile: 95,
      timeEfficiency: 92,
      totalStudents: 28,
      completedStudents: 28,
      subjectBreakdown: [
        { name: 'Arrays & Lists', percentage: 95 },
        { name: 'Trees & Graphs', percentage: 90 },
        { name: 'Sorting', percentage: 94 },
        { name: 'Searching', percentage: 88 }
      ]
    }
  ];

  const overallStats = {
    averageScore: 84.5,
    passRate: 87.5,
    averageTime: '1h 52m',
    flaggedAttempts: 3
  };

  const chartData = {
    performanceTrend: [
      { exam: 'Quiz 1', score: 78 },
      { exam: 'Quiz 2', score: 82 },
      { exam: 'Midterm', score: 92 },
      { exam: 'Quiz 3', score: 85 },
      { exam: 'Final', score: 87 }
    ],
    subjectPerformance: [
      { subject: 'SQL', score: 92 },
      { subject: 'Design', score: 85 },
      { subject: 'Normal.', score: 88 },
      { subject: 'Trans.', score: 82 }
    ],
    scoreDistribution: [
      { range: '90-100', students: 8 },
      { range: '80-89', students: 12 },
      { range: '70-79', students: 7 },
      { range: '60-69', students: 3 },
      { range: '<60', students: 2 }
    ],
    questionDifficulty: [
      { name: 'Easy', value: 40 },
      { name: 'Medium', value: 45 },
      { name: 'Hard', value: 15 }
    ],
    timeAnalysis: [
      { question: 'Q1-5', averageTime: 12 },
      { question: 'Q6-10', averageTime: 15 },
      { question: 'Q11-15', averageTime: 18 },
      { question: 'Q16-20', averageTime: 22 },
      { question: 'Q21-25', averageTime: 25 },
      { question: 'Q26-30', averageTime: 28 }
    ],
    performanceComparison: [
      { subject: 'SQL', classAverage: 85, universityAverage: 78 },
      { subject: 'Design', classAverage: 82, universityAverage: 75 },
      { subject: 'Normal.', classAverage: 88, universityAverage: 80 },
      { subject: 'Trans.', classAverage: 79, universityAverage: 72 }
    ]
  };

  const questions = [
    {
      id: 1,
      number: 1,
      type: 'mcq',
      title: 'What is the primary key in a relational database?',
      question: `A primary key is a column or combination of columns that uniquely identifies each row in a table. 
      Which of the following statements about primary keys is correct?`,
      studentAnswer: 'A primary key can contain NULL values',
      correctAnswer: 'A primary key uniquely identifies each row and cannot contain NULL values',
      explanation: `A primary key serves as a unique identifier for each record in a table. It must be unique across all rows and cannot contain NULL values. This ensures data integrity and provides a reliable way to reference specific records.`,
      points: 2,
      earnedPoints: 0,
      isCorrect: false,
      isFlagged: false
    },
    {
      id: 2,
      number: 2,
      type: 'essay',
      title: 'Explain database normalization',
      question: `Explain the concept of database normalization and describe the first three normal forms (1NF, 2NF, 3NF). 
      Provide an example of how you would normalize a denormalized table.`,
      studentAnswer: `Database normalization is the process of organizing data to reduce redundancy. 
      1NF requires atomic values, 2NF eliminates partial dependencies, 3NF eliminates transitive dependencies.`,
      correctAnswer: `Comprehensive explanation covering all aspects with detailed examples`,
      explanation: `Your answer covers the basic concepts correctly but lacks detailed examples and could benefit from more specific explanations of each normal form.`,
      points: 10,
      earnedPoints: 7,
      isCorrect: true,
      isFlagged: false
    }
  ];

  const studentAnswers = [
    {
      id: 1,
      name: 'Ahmad Rizki Pratama',
      studentId: 'CS2021001',
      score: 92,
      grade: 'A',
      completionTime: '1h 35m',
      status: 'completed',
      isFlagged: false
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      studentId: 'CS2021002',
      score: 88,
      grade: 'A',
      completionTime: '1h 42m',
      status: 'completed',
      isFlagged: false
    },
    {
      id: 3,
      name: 'Budi Santoso',
      studentId: 'CS2021003',
      score: 65,
      grade: 'C',
      completionTime: '2h 15m',
      status: 'flagged',
      isFlagged: true
    }
  ];

  const flaggedAttempts = [
    {
      id: 1,
      studentName: 'Budi Santoso',
      studentId: 'CS2021003',
      examTitle: 'Database Systems Final',
      questionNumber: 15,
      violationType: 'tab_switch',
      violationTitle: 'Tab Switching Detected',
      description: 'Student switched browser tabs 5 times during question 15',
      severity: 'high',
      timestamp: '2025-09-04 14:25:30',
      firstDetected: '2025-09-04 14:25:30',
      lastOccurrence: '2025-09-04 14:28:45',
      evidence: [
        'Tab switch detected at 14:25:30',
        'Tab switch detected at 14:26:15',
        'Tab switch detected at 14:27:02',
        'Tab switch detected at 14:27:48',
        'Tab switch detected at 14:28:45'
      ],
      riskAssessment: 'High risk of external resource consultation. Pattern suggests systematic searching for answers.',
      recommendedActions: [
        'Review student\'s answer for question 15',
        'Consider manual review of exam session',
        'Schedule meeting with student to discuss academic integrity',
        'Apply penalty as per institutional policy'
      ]
    },
    {
      id: 2,
      studentName: 'Rina Wulandari',
      studentId: 'CS2021015',
      examTitle: 'Database Systems Final',
      questionNumber: 8,
      violationType: 'suspicious_timing',
      violationTitle: 'Suspicious Answer Timing',
      description: 'Extremely fast completion of complex questions followed by long delays',
      severity: 'medium',
      timestamp: '2025-09-04 13:45:12',
      firstDetected: '2025-09-04 13:45:12',
      lastOccurrence: '2025-09-04 14:15:30',
      evidence: [
        'Question 8 answered in 15 seconds (avg: 3 minutes)',
        'Question 9 answered in 12 seconds (avg: 4 minutes)',
        '8-minute delay before answering question 10',
        'Pattern inconsistent with student\'s usual pace'
      ],
      riskAssessment: 'Medium risk. Timing pattern suggests possible pre-knowledge of answers or external assistance.',
      recommendedActions: [
        'Review answer quality vs. completion time',
        'Compare with student\'s historical performance',
        'Consider additional verification questions'
      ]
    }
  ];

  const studentData = {
    name: 'Ahmad Rizki Pratama',
    studentId: 'CS2021001',
    email: 'ahmad.rizki@university.ac.id'
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setSelectedExam(examsList?.[0]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRoleChange = (role) => {
    setUserRole(role);
    setActiveTab('overview');
  };

  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
    setActiveTab('overview');
  };

  const handleExport = (config) => {
    console.log('Exporting with config:', config);
    // Implement export logic
  };

  const handleGenerateCertificate = (config) => {
    console.log('Generating certificate:', config);
    // Implement certificate generation
  };

  const handleReviewFlag = (flagId) => {
    console.log('Reviewing flag:', flagId);
    // Implement flag review logic
  };

  const handleDismissFlag = (flagId) => {
    console.log('Dismissing flag:', flagId);
    // Implement flag dismissal logic
  };

  const tabs = userRole === 'student' 
    ? [
        { id: 'overview', label: 'Overview', icon: 'BarChart3' },
        { id: 'charts', label: 'Performance', icon: 'TrendingUp' },
        { id: 'review', label: 'Question Review', icon: 'FileText' },
        { id: 'certificates', label: 'Certificates', icon: 'Award' },
        { id: 'export', label: 'Export', icon: 'Download' }
      ]
    : [
        { id: 'overview', label: 'Overview', icon: 'BarChart3' },
        { id: 'charts', label: 'Analytics', icon: 'TrendingUp' },
        { id: 'review', label: 'Student Performance', icon: 'Users' },
        { id: 'flagged', label: 'Security', icon: 'Flag' },
        { id: 'certificates', label: 'Certificates', icon: 'Award' },
        { id: 'export', label: 'Export', icon: 'Download' }
      ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <RoleBasedSidebar isCollapsed={sidebarCollapsed} userRole={userRole} />
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading exam results...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedSidebar isCollapsed={sidebarCollapsed} userRole={userRole} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                iconName="Menu"
                className="lg:hidden"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Exam Results</h1>
                <p className="text-sm text-muted-foreground">
                  {userRole === 'student' ?'View your exam performance and detailed feedback' :'Analyze student performance and manage exam results'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Role Switcher (Demo) */}
              <select
                value={userRole}
                onChange={(e) => handleRoleChange(e?.target?.value)}
                className="px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="student">Student View</option>
                <option value="faculty">Faculty View</option>
                <option value="admin">Admin View</option>
              </select>

              <ExamStatusIndicator userRole={userRole} />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setNotificationOpen(true)}
                iconName="Bell"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Exam Selector */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-foreground">
                  {userRole === 'student' ? 'Your Exams' : 'Select Exam'}
                </h2>
                {userRole !== 'student' && (
                  <Button variant="outline" size="sm" iconName="Plus">
                    Add Exam
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {examsList?.map((exam) => (
                  <div
                    key={exam?.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedExam?.id === exam?.id
                        ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleExamSelect(exam)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-foreground">{exam?.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        exam?.grade === 'A' ? 'bg-success/10 text-success' :
                        exam?.grade === 'B'? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'
                      }`}>
                        {exam?.grade}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{exam?.course}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{exam?.date}</span>
                      <span>{exam?.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedExam && (
              <>
                {/* Tab Navigation */}
                <div className="bg-card border border-border rounded-lg">
                  <div className="border-b border-border">
                    <nav className="flex space-x-8 px-6">
                      {tabs?.map((tab) => (
                        <button
                          key={tab?.id}
                          onClick={() => setActiveTab(tab?.id)}
                          className={`flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-colors ${
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

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <ResultsOverview
                        userRole={userRole}
                        selectedExam={selectedExam}
                        overallStats={overallStats}
                      />
                    )}

                    {activeTab === 'charts' && (
                      <PerformanceCharts
                        userRole={userRole}
                        chartData={chartData}
                      />
                    )}

                    {activeTab === 'review' && (
                      <DetailedReview
                        userRole={userRole}
                        questions={questions}
                        studentAnswers={studentAnswers}
                      />
                    )}

                    {activeTab === 'flagged' && userRole !== 'student' && (
                      <FlaggedResponses
                        flaggedAttempts={flaggedAttempts}
                        onReviewFlag={handleReviewFlag}
                        onDismissFlag={handleDismissFlag}
                      />
                    )}

                    {activeTab === 'certificates' && (
                      <CertificateGenerator
                        userRole={userRole}
                        examData={selectedExam}
                        studentData={studentData}
                        onGenerateCertificate={handleGenerateCertificate}
                      />
                    )}

                    {activeTab === 'export' && (
                      <ExportTools
                        userRole={userRole}
                        examData={selectedExam}
                        onExport={handleExport}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      {/* Notification Center */}
      <NotificationCenter
        userRole={userRole}
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
    </div>
  );
};

export default ExamResults;