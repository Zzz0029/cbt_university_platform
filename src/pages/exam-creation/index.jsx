import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ExamStatusIndicator from '../../components/ui/ExamStatusIndicator';
import NotificationCenter from '../../components/ui/NotificationCenter';
import ExamBasicInfo from './components/ExamBasicInfo';
import QuestionManager from './components/QuestionManager';
import QuestionBankBrowser from './components/QuestionBankBrowser';
import SecuritySettings from './components/SecuritySettings';
import AdvancedSettings from './components/AdvancedSettings';
import ExamPreview from './components/ExamPreview';

const ExamCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [examData, setExamData] = useState({
    title: '',
    subject: '',
    difficulty: '',
    duration: '',
    totalMarks: '',
    startDateTime: '',
    endDateTime: '',
    attempts: '',
    instructions: '',
    passingCriteria: ''
  });
  const [questions, setQuestions] = useState([]);
  const [securityConfig, setSecurityConfig] = useState({
    proctoringLevel: 'basic',
    browserLockdown: true,
    disableRightClick: true,
    fullScreenMode: true,
    webcamMonitoring: false,
    screenRecording: false,
    allowedIPs: '',
    geofenceRadius: '',
    sessionTimeout: '30',
    warningThreshold: '3',
    autoSubmitOnViolation: true,
    sendAlerts: true,
    requireIdVerification: false
  });
  const [advancedConfig, setAdvancedConfig] = useState({
    randomization: 'none',
    questionsPerPage: '1',
    navigationMode: 'free',
    timePerQuestion: '',
    gradingMode: 'immediate',
    showQuestionNumbers: true,
    showProgressBar: true,
    showTimeRemaining: true,
    warningBeforeTimeout: '5',
    showCorrectAnswers: false,
    showScoreBreakdown: true,
    allowResultsDownload: false,
    requireAllAnswers: false,
    confirmBeforeSubmit: true,
    autoSubmitOnTimeout: true,
    allowLateSubmission: false,
    welcomeMessage: '',
    completionMessage: ''
  });
  const [errors, setErrors] = useState({});
  const [isDraft, setIsDraft] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const steps = [
    {
      id: 'basic',
      title: 'Basic Information',
      description: 'Exam title, subject, and scheduling',
      icon: 'FileText',
      component: ExamBasicInfo
    },
    {
      id: 'questions',
      title: 'Questions',
      description: 'Add and manage exam questions',
      icon: 'HelpCircle',
      component: QuestionManager
    },
    {
      id: 'security',
      title: 'Security Settings',
      description: 'Proctoring and anti-cheating measures',
      icon: 'Shield',
      component: SecuritySettings
    },
    {
      id: 'advanced',
      title: 'Advanced Settings',
      description: 'Navigation, grading, and customization',
      icon: 'Settings',
      component: AdvancedSettings
    },
    {
      id: 'preview',
      title: 'Preview & Publish',
      description: 'Review and publish your exam',
      icon: 'Eye',
      component: ExamPreview
    }
  ];

  const currentStepData = steps?.[currentStep];

  // Load draft on component mount (only once)
  useEffect(() => {
    const loadDraft = () => {
      const savedDraft = localStorage.getItem('exam-draft');
      if (savedDraft) {
        try {
          const draftData = JSON.parse(savedDraft);
          if (draftData?.examData) setExamData(draftData?.examData);
          if (draftData?.questions) setQuestions(draftData?.questions);
          if (draftData?.securityConfig) setSecurityConfig(draftData?.securityConfig);
          if (draftData?.advancedConfig) setAdvancedConfig(draftData?.advancedConfig);
          if (typeof draftData?.currentStep === 'number') setCurrentStep(draftData?.currentStep);
          setIsDraft(true);
        } catch (error) {
          console.error('Error loading draft:', error);
        }
      }
      setIsLoaded(true);
    };

    loadDraft();
  }, []); // Empty dependency array - only run once on mount

  // Auto-save functionality (only after initial load)
  useEffect(() => {
    if (!isLoaded) return; // Don't auto-save until initial load is complete

    const autoSave = () => {
      const examState = {
        examData,
        questions,
        securityConfig,
        advancedConfig,
        currentStep,
        lastSaved: new Date()?.toISOString()
      };
      localStorage.setItem('exam-draft', JSON.stringify(examState));
      setIsDraft(true);
    };

    const timer = setTimeout(autoSave, 30000); // Auto-save every 30 seconds
    return () => clearTimeout(timer);
  }, [examData, questions, securityConfig, advancedConfig, currentStep, isLoaded]);

  const validateStep = (stepIndex) => {
    const newErrors = {};
    
    if (stepIndex === 0) {
      if (!examData?.title) newErrors.title = 'Exam title is required';
      if (!examData?.subject) newErrors.subject = 'Subject is required';
      if (!examData?.duration) newErrors.duration = 'Duration is required';
      if (!examData?.startDateTime) newErrors.startDateTime = 'Start date is required';
      if (!examData?.endDateTime) newErrors.endDateTime = 'End date is required';
      if (!examData?.passingCriteria) newErrors.passingCriteria = 'Passing criteria is required';
    }
    
    if (stepIndex === 1) {
      if (questions?.length === 0) newErrors.questions = 'At least one question is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, steps?.length - 1));
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep || validateStep(currentStep)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleAddQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      type,
      question: '',
      marks: type === 'essay' ? 10 : 2,
      options: type === 'mcq' ? ['Option A', 'Option B', 'Option C', 'Option D'] : null,
      correctAnswer: '',
      explanation: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleEditQuestion = (index) => {
    // In a real app, this would open a question editor modal
    console.log('Edit question at index:', index);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions?.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleImportQuestions = (importedQuestions) => {
    setQuestions([...questions, ...importedQuestions]);
    setShowQuestionBank(false);
  };

  const handleSaveDraft = () => {
    const examState = {
      examData,
      questions,
      securityConfig,
      advancedConfig,
      currentStep,
      lastSaved: new Date()?.toISOString()
    };
    localStorage.setItem('exam-draft', JSON.stringify(examState));
    setIsDraft(true);
    // Show success message
    alert('Draft saved successfully!');
  };

  const handlePublishExam = () => {
    if (validateStep(currentStep) && questions?.length > 0) {
      // In a real app, this would send data to the server
      console.log('Publishing exam:', { examData, questions, securityConfig, advancedConfig });
      localStorage.removeItem('exam-draft');
      alert('Exam published successfully!');
      navigate('/exam-results');
    }
  };

  const renderStepContent = () => {
    const StepComponent = currentStepData?.component;
    
    const commonProps = {
      className: "flex-1"
    };

    switch (currentStep) {
      case 0:
        return (
          <StepComponent
            formData={examData}
            onFormChange={setExamData}
            errors={errors}
            {...commonProps}
          />
        );
      case 1:
        return (
          <StepComponent
            questions={questions}
            onQuestionsChange={setQuestions}
            onAddQuestion={handleAddQuestion}
            onEditQuestion={handleEditQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            {...commonProps}
          />
        );
      case 2:
        return (
          <StepComponent
            securityConfig={securityConfig}
            onSecurityChange={setSecurityConfig}
            {...commonProps}
          />
        );
      case 3:
        return (
          <StepComponent
            advancedConfig={advancedConfig}
            onAdvancedChange={setAdvancedConfig}
            {...commonProps}
          />
        );
      case 4:
        return (
          <StepComponent
            examData={examData}
            questions={questions}
            onPublish={handlePublishExam}
            onSaveDraft={handleSaveDraft}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <RoleBasedSidebar 
        isCollapsed={sidebarCollapsed}
        userRole="faculty"
      />
      {/* Main Content */}
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
                <h1 className="text-2xl font-bold text-foreground">Create New Exam</h1>
                <p className="text-sm text-muted-foreground">
                  Build comprehensive examinations with security features
                </p>
              </div>
              
              {isDraft && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-warning/10 border border-warning/20 rounded-full">
                  <Icon name="Save" size={14} className="text-warning" />
                  <span className="text-xs text-warning font-medium">Draft Saved</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <ExamStatusIndicator userRole="faculty" />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(true)}
                iconName="Bell"
              />
              
              <Button
                variant="outline"
                onClick={() => navigate('/student-dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </header>

        {/* Step Navigation */}
        <div className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Step {currentStep + 1}: {currentStepData?.title}
            </h2>
            
            <div className="flex items-center space-x-2">
              {currentStep === 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowQuestionBank(true)}
                  iconName="Database"
                  iconPosition="left"
                >
                  Question Bank
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveDraft}
                iconName="Save"
                iconPosition="left"
              >
                Save Draft
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto">
            {steps?.map((step, index) => (
              <button
                key={step?.id}
                onClick={() => handleStepClick(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : index < currentStep
                    ? 'bg-success/10 text-success hover:bg-success/20' :'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                disabled={index > currentStep && !validateStep(currentStep)}
              >
                <Icon 
                  name={index < currentStep ? 'Check' : step?.icon} 
                  size={16} 
                />
                <span>{step?.title}</span>
              </button>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground mt-2">
            {currentStepData?.description}
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex">
          {/* Primary Content */}
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {currentStep + 1} of {steps?.length}
                  </span>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / steps?.length) * 100}%` }}
                    />
                  </div>
                </div>
                
                {currentStep === steps?.length - 1 ? (
                  <Button
                    variant="success"
                    onClick={handlePublishExam}
                    iconName="Send"
                    iconPosition="left"
                    disabled={questions?.length === 0}
                  >
                    Publish Exam
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={handleNextStep}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </main>

          {/* Question Bank Sidebar */}
          {showQuestionBank && (
            <aside className="w-96 bg-card border-l border-border p-6 overflow-y-auto max-h-screen">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Question Bank</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowQuestionBank(false)}
                  iconName="X"
                />
              </div>
              
              <QuestionBankBrowser onImportQuestions={handleImportQuestions} />
            </aside>
          )}
        </div>
      </div>
      {/* Notification Center */}
      <NotificationCenter
        userRole="faculty"
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
};

export default ExamCreation;