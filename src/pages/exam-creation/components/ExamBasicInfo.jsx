import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ExamBasicInfo = ({ 
  formData, 
  onFormChange, 
  errors = {},
  className = '' 
}) => {
  const subjectOptions = [
    { value: 'cs301', label: 'CS 301 - Database Systems' },
    { value: 'cs302', label: 'CS 302 - Data Structures' },
    { value: 'cs303', label: 'CS 303 - Computer Networks' },
    { value: 'cs304', label: 'CS 304 - Software Engineering' },
    { value: 'cs305', label: 'CS 305 - Operating Systems' },
    { value: 'math201', label: 'MATH 201 - Discrete Mathematics' },
    { value: 'math202', label: 'MATH 202 - Linear Algebra' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const attemptOptions = [
    { value: '1', label: '1 Attempt' },
    { value: '2', label: '2 Attempts' },
    { value: '3', label: '3 Attempts' },
    { value: 'unlimited', label: 'Unlimited Attempts' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input
          label="Exam Title"
          type="text"
          placeholder="Enter exam title"
          value={formData?.title || ''}
          onChange={(e) => handleInputChange('title', e?.target?.value)}
          error={errors?.title}
          required
          className="lg:col-span-2"
        />

        <Select
          label="Subject"
          placeholder="Select subject"
          options={subjectOptions}
          value={formData?.subject || ''}
          onChange={(value) => handleInputChange('subject', value)}
          error={errors?.subject}
          required
          searchable
        />

        <Select
          label="Difficulty Level"
          placeholder="Select difficulty"
          options={difficultyOptions}
          value={formData?.difficulty || ''}
          onChange={(value) => handleInputChange('difficulty', value)}
          error={errors?.difficulty}
          required
        />

        <Input
          label="Duration (minutes)"
          type="number"
          placeholder="120"
          value={formData?.duration || ''}
          onChange={(e) => handleInputChange('duration', e?.target?.value)}
          error={errors?.duration}
          required
          min="1"
          max="480"
        />

        <Input
          label="Total Marks"
          type="number"
          placeholder="100"
          value={formData?.totalMarks || ''}
          onChange={(e) => handleInputChange('totalMarks', e?.target?.value)}
          error={errors?.totalMarks}
          required
          min="1"
        />

        <Input
          label="Start Date & Time"
          type="datetime-local"
          value={formData?.startDateTime || ''}
          onChange={(e) => handleInputChange('startDateTime', e?.target?.value)}
          error={errors?.startDateTime}
          required
        />

        <Input
          label="End Date & Time"
          type="datetime-local"
          value={formData?.endDateTime || ''}
          onChange={(e) => handleInputChange('endDateTime', e?.target?.value)}
          error={errors?.endDateTime}
          required
        />

        <Select
          label="Allowed Attempts"
          placeholder="Select attempts"
          options={attemptOptions}
          value={formData?.attempts || ''}
          onChange={(value) => handleInputChange('attempts', value)}
          error={errors?.attempts}
          required
        />
      </div>
      <div>
        <Input
          label="Exam Instructions"
          type="text"
          placeholder="Enter detailed instructions for students..."
          value={formData?.instructions || ''}
          onChange={(e) => handleInputChange('instructions', e?.target?.value)}
          error={errors?.instructions}
          description="Provide clear instructions about exam rules, navigation, and submission process"
        />
      </div>
      <div>
        <Input
          label="Passing Criteria (%)"
          type="number"
          placeholder="60"
          value={formData?.passingCriteria || ''}
          onChange={(e) => handleInputChange('passingCriteria', e?.target?.value)}
          error={errors?.passingCriteria}
          required
          min="1"
          max="100"
          description="Minimum percentage required to pass the exam"
        />
      </div>
    </div>
  );
};

export default ExamBasicInfo;