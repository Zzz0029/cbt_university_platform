import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuestionManager = ({ 
  questions = [], 
  onQuestionsChange, 
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
  className = '' 
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const questionTypeOptions = [
    { value: 'mcq', label: 'Multiple Choice' },
    { value: 'essay', label: 'Essay' },
    { value: 'fill-blank', label: 'Fill in the Blanks' },
    { value: 'matching', label: 'Matching' },
    { value: 'true-false', label: 'True/False' }
  ];

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e?.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newQuestions = [...questions];
    const draggedQuestion = newQuestions?.[draggedIndex];
    newQuestions?.splice(draggedIndex, 1);
    newQuestions?.splice(dropIndex, 0, draggedQuestion);
    
    onQuestionsChange(newQuestions);
    setDraggedIndex(null);
  };

  const handleDuplicateQuestion = (index) => {
    const questionToDuplicate = { ...questions?.[index] };
    questionToDuplicate.id = Date.now();
    questionToDuplicate.question = `${questionToDuplicate?.question} (Copy)`;
    
    const newQuestions = [...questions];
    newQuestions?.splice(index + 1, 0, questionToDuplicate);
    onQuestionsChange(newQuestions);
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case 'mcq': return 'CheckCircle';
      case 'essay': return 'FileText';
      case 'fill-blank': return 'Edit3';
      case 'matching': return 'Link';
      case 'true-false': return 'ToggleLeft';
      default: return 'HelpCircle';
    }
  };

  const getQuestionTypeColor = (type) => {
    switch (type) {
      case 'mcq': return 'text-blue-600';
      case 'essay': return 'text-green-600';
      case 'fill-blank': return 'text-orange-600';
      case 'matching': return 'text-purple-600';
      case 'true-false': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const totalMarks = questions?.reduce((sum, q) => sum + (q?.marks || 0), 0);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Questions ({questions?.length})</h3>
          <p className="text-sm text-muted-foreground">Total Marks: {totalMarks}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            placeholder="Add question type"
            options={questionTypeOptions}
            value=""
            onChange={(value) => onAddQuestion(value)}
            className="w-48"
          />
          <Button
            variant="outline"
            iconName="Upload"
            iconPosition="left"
            size="sm"
          >
            Import
          </Button>
        </div>
      </div>
      {/* Questions List */}
      {questions?.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <Icon name="FileQuestion" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No questions added yet</h4>
          <p className="text-muted-foreground mb-4">Start building your exam by adding questions</p>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => onAddQuestion('mcq')}
          >
            Add First Question
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {questions?.map((question, index) => (
            <div
              key={question?.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-move"
            >
              <div className="flex items-start space-x-4">
                {/* Drag Handle */}
                <div className="flex-shrink-0 mt-1">
                  <Icon name="GripVertical" size={16} className="text-muted-foreground" />
                </div>

                {/* Question Number */}
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>

                {/* Question Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon 
                      name={getQuestionTypeIcon(question?.type)} 
                      size={16} 
                      className={getQuestionTypeColor(question?.type)} 
                    />
                    <span className={`text-xs font-medium ${getQuestionTypeColor(question?.type)}`}>
                      {questionTypeOptions?.find(opt => opt?.value === question?.type)?.label || question?.type}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{question?.marks || 0} marks</span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-foreground mb-1 line-clamp-2">
                    {question?.question || 'Untitled Question'}
                  </h4>
                  
                  {question?.type === 'mcq' && question?.options && (
                    <div className="text-xs text-muted-foreground">
                      {question?.options?.length} options • Correct: {question?.correctAnswer || 'Not set'}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditQuestion(index)}
                    iconName="Edit"
                    className="h-8 w-8"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDuplicateQuestion(index)}
                    iconName="Copy"
                    className="h-8 w-8"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteQuestion(index)}
                    iconName="Trash2"
                    className="h-8 w-8 text-error hover:text-error"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Quick Stats */}
      {questions?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{questions?.length}</div>
            <div className="text-xs text-muted-foreground">Total Questions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{totalMarks}</div>
            <div className="text-xs text-muted-foreground">Total Marks</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">
              {questions?.filter(q => q?.type === 'mcq')?.length}
            </div>
            <div className="text-xs text-muted-foreground">MCQ Questions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">
              {questions?.filter(q => q?.type === 'essay')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Essay Questions</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionManager;