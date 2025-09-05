import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AdvancedSettings = ({ 
  advancedConfig, 
  onAdvancedChange, 
  className = '' 
}) => {
  const randomizationOptions = [
    { value: 'none', label: 'No Randomization' },
    { value: 'questions', label: 'Randomize Questions Only' },
    { value: 'options', label: 'Randomize Options Only' },
    { value: 'both', label: 'Randomize Questions & Options' }
  ];

  const gradingOptions = [
    { value: 'immediate', label: 'Immediate (Auto-graded only)' },
    { value: 'manual', label: 'Manual Review Required' },
    { value: 'mixed', label: 'Mixed (Auto + Manual)' },
    { value: 'delayed', label: 'Delayed Release' }
  ];

  const navigationOptions = [
    { value: 'free', label: 'Free Navigation' },
    { value: 'sequential', label: 'Sequential Only' },
    { value: 'restricted', label: 'Restricted Backtrack' }
  ];

  const handleConfigChange = (field, value) => {
    onAdvancedChange({
      ...advancedConfig,
      [field]: value
    });
  };

  const settingsGroups = [
    {
      title: 'Question Presentation',
      icon: 'FileText',
      color: 'text-blue-600',
      settings: [
        {
          id: 'randomization',
          type: 'select',
          label: 'Question Randomization',
          options: randomizationOptions,
          description: 'Control how questions and options are presented to students'
        },
        {
          id: 'questionsPerPage',
          type: 'number',
          label: 'Questions Per Page',
          placeholder: '1',
          min: 1,
          max: 10,
          description: 'Number of questions displayed on each page'
        },
        {
          id: 'showQuestionNumbers',
          type: 'checkbox',
          label: 'Show Question Numbers',
          description: 'Display question numbers to students'
        },
        {
          id: 'showProgressBar',
          type: 'checkbox',
          label: 'Show Progress Bar',
          description: 'Display exam completion progress'
        }
      ]
    },
    {
      title: 'Navigation & Timing',
      icon: 'Clock',
      color: 'text-orange-600',
      settings: [
        {
          id: 'navigationMode',
          type: 'select',
          label: 'Navigation Mode',
          options: navigationOptions,
          description: 'Control how students can navigate between questions'
        },
        {
          id: 'timePerQuestion',
          type: 'number',
          label: 'Time Per Question (minutes)',
          placeholder: '0',
          min: 0,
          description: 'Individual time limit per question (0 = no limit)'
        },
        {
          id: 'showTimeRemaining',
          type: 'checkbox',
          label: 'Show Time Remaining',
          description: 'Display countdown timer to students'
        },
        {
          id: 'warningBeforeTimeout',
          type: 'number',
          label: 'Timeout Warning (minutes)',
          placeholder: '5',
          min: 1,
          max: 30,
          description: 'Show warning before exam auto-submission'
        }
      ]
    },
    {
      title: 'Grading & Results',
      icon: 'BarChart3',
      color: 'text-green-600',
      settings: [
        {
          id: 'gradingMode',
          type: 'select',
          label: 'Grading Mode',
          options: gradingOptions,
          description: 'When and how results are calculated and released'
        },
        {
          id: 'showCorrectAnswers',
          type: 'checkbox',
          label: 'Show Correct Answers',
          description: 'Display correct answers after submission'
        },
        {
          id: 'showScoreBreakdown',
          type: 'checkbox',
          label: 'Show Score Breakdown',
          description: 'Show detailed scoring by question type'
        },
        {
          id: 'allowResultsDownload',
          type: 'checkbox',
          label: 'Allow Results Download',
          description: 'Let students download their results as PDF'
        }
      ]
    },
    {
      title: 'Submission Rules',
      icon: 'Send',
      color: 'text-purple-600',
      settings: [
        {
          id: 'requireAllAnswers',
          type: 'checkbox',
          label: 'Require All Answers',
          description: 'Students must answer all questions before submission'
        },
        {
          id: 'confirmBeforeSubmit',
          type: 'checkbox',
          label: 'Confirm Before Submit',
          description: 'Show confirmation dialog before final submission'
        },
        {
          id: 'autoSubmitOnTimeout',
          type: 'checkbox',
          label: 'Auto-submit on Timeout',
          description: 'Automatically submit exam when time expires'
        },
        {
          id: 'allowLateSubmission',
          type: 'checkbox',
          label: 'Allow Late Submission',
          description: 'Accept submissions after deadline with penalty'
        }
      ]
    }
  ];

  const renderSetting = (setting) => {
    const value = advancedConfig?.[setting?.id];

    switch (setting?.type) {
      case 'select':
        return (
          <Select
            label={setting?.label}
            placeholder={`Select ${setting?.label?.toLowerCase()}`}
            options={setting?.options}
            value={value || ''}
            onChange={(newValue) => handleConfigChange(setting?.id, newValue)}
            description={setting?.description}
          />
        );
      
      case 'number':
        return (
          <Input
            label={setting?.label}
            type="number"
            placeholder={setting?.placeholder}
            value={value || ''}
            onChange={(e) => handleConfigChange(setting?.id, e?.target?.value)}
            description={setting?.description}
            min={setting?.min}
            max={setting?.max}
          />
        );
      
      case 'checkbox':
        return (
          <Checkbox
            label={setting?.label}
            description={setting?.description}
            checked={value || false}
            onChange={(e) => handleConfigChange(setting?.id, e?.target?.checked)}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Advanced Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Fine-tune exam behavior, navigation, and grading settings
        </p>
      </div>
      {settingsGroups?.map((group) => (
        <div key={group?.title} className="space-y-6">
          <div className="flex items-center space-x-2">
            <Icon 
              name={group?.icon} 
              size={20} 
              className={group?.color} 
            />
            <h4 className="text-md font-medium text-foreground">{group?.title}</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {group?.settings?.map((setting) => (
              <div key={setting?.id}>
                {renderSetting(setting)}
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Custom Instructions */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="MessageSquare" size={20} className="text-indigo-600" />
          <h4 className="text-md font-medium text-foreground">Custom Messages</h4>
        </div>
        
        <div className="space-y-4">
          <Input
            label="Welcome Message"
            type="text"
            placeholder="Welcome to the examination. Please read all instructions carefully..."
            value={advancedConfig?.welcomeMessage || ''}
            onChange={(e) => handleConfigChange('welcomeMessage', e?.target?.value)}
            description="Message shown to students before starting the exam"
          />
          
          <Input
            label="Completion Message"
            type="text"
            placeholder="Thank you for completing the examination. Your responses have been submitted..."
            value={advancedConfig?.completionMessage || ''}
            onChange={(e) => handleConfigChange('completionMessage', e?.target?.value)}
            description="Message shown after successful exam submission"
          />
        </div>
      </div>
      {/* Configuration Summary */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Settings" size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Configuration Summary</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Randomization:</span>
                <span className="ml-2 text-foreground">
                  {randomizationOptions?.find(opt => opt?.value === advancedConfig?.randomization)?.label || 'Not set'}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Navigation:</span>
                <span className="ml-2 text-foreground">
                  {navigationOptions?.find(opt => opt?.value === advancedConfig?.navigationMode)?.label || 'Not set'}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Grading:</span>
                <span className="ml-2 text-foreground">
                  {gradingOptions?.find(opt => opt?.value === advancedConfig?.gradingMode)?.label || 'Not set'}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Questions per page:</span>
                <span className="ml-2 text-foreground">
                  {advancedConfig?.questionsPerPage || 1}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;