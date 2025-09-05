import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExamPreview = ({ 
  examData, 
  questions = [], 
  onPublish,
  onSaveDraft,
  className = '' 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [previewAnswers, setPreviewAnswers] = useState({});

  const currentQuestion = questions?.[currentQuestionIndex];
  const totalQuestions = questions?.length;
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  const handleAnswerChange = (questionId, answer) => {
    setPreviewAnswers({
      ...previewAnswers,
      [questionId]: answer
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderQuestionContent = (question) => {
    if (!question) return null;

    switch (question?.type) {
      case 'mcq':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-foreground mb-4">
              {question?.question}
            </h3>
            <div className="space-y-2">
              {question?.options?.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name={`question-${question?.id}`}
                    value={option}
                    checked={previewAnswers?.[question?.id] === option}
                    onChange={(e) => handleAnswerChange(question?.id, e?.target?.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-foreground">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'essay':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              {question?.question}
            </h3>
            <textarea
              className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Type your answer here..."
              value={previewAnswers?.[question?.id] || ''}
              onChange={(e) => handleAnswerChange(question?.id, e?.target?.value)}
            />
          </div>
        );

      case 'fill-blank':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              {question?.question}
            </h3>
            <input
              type="text"
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Enter your answer"
              value={previewAnswers?.[question?.id] || ''}
              onChange={(e) => handleAnswerChange(question?.id, e?.target?.value)}
            />
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">
              {question?.question}
            </h3>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={`question-${question?.id}`}
                  value="true"
                  checked={previewAnswers?.[question?.id] === 'true'}
                  onChange={(e) => handleAnswerChange(question?.id, e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-foreground">True</span>
              </label>
              <label className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={`question-${question?.id}`}
                  value="false"
                  checked={previewAnswers?.[question?.id] === 'false'}
                  onChange={(e) => handleAnswerChange(question?.id, e?.target?.value)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-foreground">False</span>
              </label>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <Icon name="HelpCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Question type not supported in preview</p>
          </div>
        );
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Eye" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-primary">Exam Preview</h3>
            <p className="text-sm text-foreground">
              Experience the exam from a student's perspective
            </p>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Preview Mode
        </div>
      </div>
      {/* Exam Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-card border border-border rounded-lg">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Exam Title</h4>
          <p className="text-foreground">{examData?.title || 'Untitled Exam'}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
          <p className="text-foreground">{examData?.duration || 0} minutes</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Total Questions</h4>
          <p className="text-foreground">{totalQuestions}</p>
        </div>
      </div>
      {/* Progress Bar */}
      {totalQuestions > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground">
              {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      {/* Question Content */}
      {totalQuestions > 0 ? (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {currentQuestionIndex + 1}
              </span>
              <span className="text-sm text-muted-foreground">
                {currentQuestion?.marks || 0} marks
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Time: {examData?.duration || 0} minutes remaining
            </div>
          </div>

          {renderQuestionContent(currentQuestion)}
        </div>
      ) : (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <Icon name="FileQuestion" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Questions Added</h4>
          <p className="text-muted-foreground">Add questions to preview the exam</p>
        </div>
      )}
      {/* Navigation */}
      {totalQuestions > 0 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {questions?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestionIndex
                    ? 'bg-primary text-primary-foreground'
                    : previewAnswers?.[questions?.[index]?.id]
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === totalQuestions - 1}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      )}
      {/* Instructions */}
      {examData?.instructions && (
        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-warning mb-1">Exam Instructions</h5>
              <p className="text-sm text-foreground">{examData?.instructions}</p>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onSaveDraft}
            iconName="Save"
            iconPosition="left"
          >
            Save Draft
          </Button>
          
          <Button
            variant="secondary"
            iconName="Download"
            iconPosition="left"
          >
            Export Preview
          </Button>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Edit
          </Button>
          
          <Button
            variant="success"
            onClick={onPublish}
            iconName="Send"
            iconPosition="left"
            disabled={totalQuestions === 0}
          >
            Publish Exam
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamPreview;