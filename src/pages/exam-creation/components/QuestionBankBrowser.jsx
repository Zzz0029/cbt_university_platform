import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const QuestionBankBrowser = ({ 
  onImportQuestions,
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'database', label: 'Database Systems' },
    { value: 'datastructures', label: 'Data Structures' },
    { value: 'networks', label: 'Computer Networks' },
    { value: 'software', label: 'Software Engineering' },
    { value: 'os', label: 'Operating Systems' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'mcq', label: 'Multiple Choice' },
    { value: 'essay', label: 'Essay' },
    { value: 'fill-blank', label: 'Fill in the Blanks' },
    { value: 'matching', label: 'Matching' },
    { value: 'true-false', label: 'True/False' }
  ];

  const mockQuestions = [
    {
      id: 1,
      question: "What is the primary key in a relational database?",
      type: 'mcq',
      category: 'database',
      difficulty: 'easy',
      marks: 2,
      options: ['A unique identifier', 'A foreign key', 'An index', 'A constraint'],
      correctAnswer: 'A unique identifier',
      usage: 15,
      lastUsed: '2025-08-20'
    },
    {
      id: 2,
      question: "Explain the concept of normalization in database design and discuss the first three normal forms.",
      type: 'essay',
      category: 'database',
      difficulty: 'hard',
      marks: 10,
      usage: 8,
      lastUsed: '2025-08-15'
    },
    {
      id: 3,
      question: "A _______ is a data structure that follows Last In First Out (LIFO) principle.",
      type: 'fill-blank',
      category: 'datastructures',
      difficulty: 'medium',
      marks: 3,
      correctAnswer: 'Stack',
      usage: 22,
      lastUsed: '2025-09-01'
    },
    {
      id: 4,
      question: "Which of the following is NOT a characteristic of TCP protocol?",
      type: 'mcq',
      category: 'networks',
      difficulty: 'medium',
      marks: 2,
      options: ['Connection-oriented', 'Reliable delivery', 'Connectionless', 'Flow control'],
      correctAnswer: 'Connectionless',
      usage: 12,
      lastUsed: '2025-08-25'
    },
    {
      id: 5,
      question: "The waterfall model is suitable for projects with changing requirements.",
      type: 'true-false',
      category: 'software',
      difficulty: 'easy',
      marks: 1,
      correctAnswer: 'False',
      usage: 18,
      lastUsed: '2025-08-30'
    }
  ];

  const filteredQuestions = mockQuestions?.filter(question => {
    const matchesSearch = question?.question?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = !selectedCategory || question?.category === selectedCategory;
    const matchesType = !selectedType || question?.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleQuestionSelect = (questionId, isSelected) => {
    if (isSelected) {
      setSelectedQuestions([...selectedQuestions, questionId]);
    } else {
      setSelectedQuestions(selectedQuestions?.filter(id => id !== questionId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedQuestions(filteredQuestions?.map(q => q?.id));
    } else {
      setSelectedQuestions([]);
    }
  };

  const handleImportSelected = () => {
    const questionsToImport = mockQuestions?.filter(q => selectedQuestions?.includes(q?.id));
    onImportQuestions(questionsToImport);
    setSelectedQuestions([]);
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Question Bank</h3>
          <p className="text-sm text-muted-foreground">
            {filteredQuestions?.length} questions available
          </p>
        </div>
        
        {selectedQuestions?.length > 0 && (
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={handleImportSelected}
          >
            Import Selected ({selectedQuestions?.length})
          </Button>
        )}
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="search"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
        
        <Select
          placeholder="Filter by category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        
        <Select
          placeholder="Filter by type"
          options={typeOptions}
          value={selectedType}
          onChange={setSelectedType}
        />
      </div>
      {/* Select All */}
      {filteredQuestions?.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <Checkbox
            label={`Select all (${filteredQuestions?.length} questions)`}
            checked={selectedQuestions?.length === filteredQuestions?.length && filteredQuestions?.length > 0}
            indeterminate={selectedQuestions?.length > 0 && selectedQuestions?.length < filteredQuestions?.length}
            onChange={(e) => handleSelectAll(e?.target?.checked)}
          />
          
          <div className="text-sm text-muted-foreground">
            {selectedQuestions?.length} selected
          </div>
        </div>
      )}
      {/* Questions List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredQuestions?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No questions found</h4>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        ) : (
          filteredQuestions?.map((question) => (
            <div
              key={question?.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={selectedQuestions?.includes(question?.id)}
                  onChange={(e) => handleQuestionSelect(question?.id, e?.target?.checked)}
                  className="mt-1"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon 
                      name={getQuestionTypeIcon(question?.type)} 
                      size={16} 
                      className="text-primary" 
                    />
                    <span className="text-xs font-medium text-primary">
                      {typeOptions?.find(opt => opt?.value === question?.type)?.label || question?.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(question?.difficulty)}`}>
                      {question?.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{question?.marks} marks</span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                    {question?.question}
                  </h4>
                  
                  {question?.type === 'mcq' && question?.options && (
                    <div className="text-xs text-muted-foreground mb-2">
                      Options: {question?.options?.slice(0, 2)?.join(', ')}
                      {question?.options?.length > 2 && ` +${question?.options?.length - 2} more`}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Used {question?.usage} times</span>
                    <span>•</span>
                    <span>Last used: {question?.lastUsed}</span>
                    <span>•</span>
                    <span className="capitalize">{question?.category}</span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Eye"
                  className="h-8 w-8"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionBankBrowser;