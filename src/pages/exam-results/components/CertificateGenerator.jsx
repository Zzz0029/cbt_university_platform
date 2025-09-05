import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CertificateGenerator = ({ userRole, examData, studentData, onGenerateCertificate }) => {
  const [certificateType, setCertificateType] = useState('completion');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const certificateTypes = [
    {
      value: 'completion',
      label: 'Certificate of Completion',
      description: 'Standard completion certificate for passed exams',
      requirements: 'Minimum 60% score required',
      icon: 'Award'
    },
    {
      value: 'excellence',
      label: 'Certificate of Excellence',
      description: 'Recognition for outstanding performance',
      requirements: 'Minimum 90% score required',
      icon: 'Star'
    },
    {
      value: 'participation',
      label: 'Certificate of Participation',
      description: 'Acknowledgment of exam participation',
      requirements: 'Exam completion required',
      icon: 'Users'
    }
  ];

  const digitalBadges = [
    {
      id: 'database_expert',
      name: 'Database Systems Expert',
      description: 'Mastery in database design and management',
      criteria: 'Score ≥ 85% in Database Systems exam',
      earned: examData?.score >= 85,
      icon: 'Database'
    },
    {
      id: 'problem_solver',
      name: 'Problem Solver',
      description: 'Exceptional analytical thinking skills',
      criteria: 'Top 10% performance in problem-solving questions',
      earned: examData?.percentile >= 90,
      icon: 'Lightbulb'
    },
    {
      id: 'time_master',
      name: 'Time Management Master',
      description: 'Efficient exam completion',
      criteria: 'Complete exam in less than 80% of allocated time',
      earned: examData?.timeEfficiency >= 80,
      icon: 'Clock'
    }
  ];

  const handleGenerateCertificate = async () => {
    setIsGenerating(true);
    
    try {
      const certificateConfig = {
        type: certificateType,
        studentName: studentData?.name,
        examTitle: examData?.title,
        course: examData?.course,
        score: examData?.score,
        grade: examData?.grade,
        date: examData?.date,
        verificationCode: `CBT-${Date.now()}-${Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase()}`,
        institutionName: 'Universitas Teknologi Indonesia',
        signatoryName: 'Dr. Ahmad Wijaya, M.Kom',
        signatoryTitle: 'Dekan Fakultas Teknologi Informasi'
      };

      // Simulate certificate generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (onGenerateCertificate) {
        onGenerateCertificate(certificateConfig);
      }

      console.log('Certificate generated:', certificateConfig);
      
    } catch (error) {
      console.error('Certificate generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const isEligible = (type) => {
    switch (type) {
      case 'completion':
        return examData?.score >= 60;
      case 'excellence':
        return examData?.score >= 90;
      case 'participation':
        return examData?.status === 'completed';
      default:
        return false;
    }
  };

  if (userRole === 'student') {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Award" size={20} className="text-warning" />
          <h3 className="text-lg font-medium text-foreground">Certificates & Badges</h3>
        </div>
        {/* Certificate Generation */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Available Certificates</h4>
            
            {certificateTypes?.map((cert) => {
              const eligible = isEligible(cert?.value);
              return (
                <div
                  key={cert?.value}
                  className={`p-4 border rounded-lg transition-all duration-200 ${
                    eligible
                      ? certificateType === cert?.value
                        ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 cursor-pointer' :'border-border bg-muted/50 opacity-60'
                  }`}
                  onClick={() => eligible && setCertificateType(cert?.value)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Icon 
                        name={cert?.icon} 
                        size={20} 
                        className={eligible ? 'text-warning' : 'text-muted-foreground'} 
                      />
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-1">{cert?.label}</h5>
                        <p className="text-xs text-muted-foreground mb-2">{cert?.description}</p>
                        <p className="text-xs text-muted-foreground">{cert?.requirements}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {eligible ? (
                        <Icon name="CheckCircle" size={16} className="text-success" />
                      ) : (
                        <Icon name="Lock" size={16} className="text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Generate Button */}
          {isEligible(certificateType) && (
            <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-lg">
              <div>
                <h5 className="text-sm font-medium text-success mb-1">Certificate Available</h5>
                <p className="text-xs text-muted-foreground">
                  You are eligible for the {certificateTypes?.find(c => c?.value === certificateType)?.label}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode(true)}
                  iconName="Eye"
                >
                  Preview
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleGenerateCertificate}
                  loading={isGenerating}
                  iconName="Download"
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
              </div>
            </div>
          )}

          {/* Digital Badges */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Digital Badges</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {digitalBadges?.map((badge) => (
                <div
                  key={badge?.id}
                  className={`p-4 border rounded-lg text-center transition-all duration-200 ${
                    badge?.earned
                      ? 'border-warning bg-warning/10' :'border-border bg-muted/50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    badge?.earned ? 'bg-warning/20' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={badge?.icon} 
                      size={24} 
                      className={badge?.earned ? 'text-warning' : 'text-muted-foreground'} 
                    />
                  </div>
                  <h5 className="text-sm font-medium text-foreground mb-1">{badge?.name}</h5>
                  <p className="text-xs text-muted-foreground mb-2">{badge?.description}</p>
                  <p className="text-xs text-muted-foreground">{badge?.criteria}</p>
                  
                  {badge?.earned && (
                    <div className="mt-3">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-success text-success-foreground rounded-full">
                        <Icon name="CheckCircle" size={12} className="mr-1" />
                        Earned
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Certificate Preview Modal */}
        {previewMode && (
          <div className="fixed inset-0 bg-black/50 z-300 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-foreground">Certificate Preview</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPreviewMode(false)}
                    iconName="X"
                  />
                </div>
                
                {/* Certificate Design Preview */}
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 rounded-lg p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="GraduationCap" size={32} color="white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Universitas Teknologi Indonesia</h2>
                    <p className="text-sm text-muted-foreground">Fakultas Teknologi Informasi</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-primary mb-4">
                      {certificateTypes?.find(c => c?.value === certificateType)?.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">This is to certify that</p>
                    <h4 className="text-2xl font-bold text-foreground mb-4">{studentData?.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      has successfully completed the examination
                    </p>
                    <h5 className="text-lg font-semibold text-foreground mb-4">{examData?.title}</h5>
                    <p className="text-sm text-muted-foreground">
                      with a score of <span className="font-semibold text-foreground">{examData?.score}%</span> 
                      and grade <span className="font-semibold text-foreground">{examData?.grade}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>
                      <p>Date: {examData?.date}</p>
                    </div>
                    <div>
                      <p>Verification: CBT-2025-PREVIEW</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setPreviewMode(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => {
                      setPreviewMode(false);
                      handleGenerateCertificate();
                    }}
                    iconName="Download"
                  >
                    Generate Certificate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Faculty/Admin view - Bulk certificate generation
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={20} className="text-warning" />
          <h3 className="text-lg font-medium text-foreground">Bulk Certificate Generation</h3>
        </div>
        <Button variant="outline" size="sm" iconName="Settings">
          Configure Templates
        </Button>
      </div>
      <div className="space-y-6">
        {/* Eligible Students Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-center">
            <div className="text-2xl font-bold text-success mb-1">24</div>
            <div className="text-sm text-muted-foreground">Completion Eligible</div>
          </div>
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg text-center">
            <div className="text-2xl font-bold text-warning mb-1">8</div>
            <div className="text-sm text-muted-foreground">Excellence Eligible</div>
          </div>
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary mb-1">32</div>
            <div className="text-sm text-muted-foreground">Total Participants</div>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Bulk Certificate Generation</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="success"
              fullWidth
              iconName="Award"
              iconPosition="left"
              onClick={() => console.log('Generate completion certificates')}
            >
              Generate All Completion Certificates
            </Button>
            
            <Button
              variant="warning"
              fullWidth
              iconName="Star"
              iconPosition="left"
              onClick={() => console.log('Generate excellence certificates')}
            >
              Generate Excellence Certificates
            </Button>
          </div>
        </div>

        {/* Certificate Templates */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Certificate Templates</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificateTypes?.map((template) => (
              <div key={template?.value} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={template?.icon} size={16} className="text-warning" />
                    <span className="text-sm font-medium text-foreground">{template?.label}</span>
                  </div>
                  <Button variant="ghost" size="sm" iconName="Edit" />
                </div>
                <p className="text-xs text-muted-foreground">{template?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;