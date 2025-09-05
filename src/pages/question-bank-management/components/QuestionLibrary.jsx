import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuestionLibrary = ({ 
  questions = [], 
  onEditQuestion, 
  onDeleteQuestion, 
  onDuplicateQuestion,
  onBulkAction,
  selectedQuestions = [],
  onQuestionSelect,
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('lastModified');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [viewMode, setViewMode] = useState('table');

  const sortOptions = [
    { value: 'lastModified', label: 'Last Modified' },
    { value: 'created', label: 'Date Created' },
    { value: 'usage', label: 'Usage Count' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'subject', label: 'Subject' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'mcq', label: 'Multiple Choice' },
    { value: 'essay', label: 'Essay' },
    { value: 'fill-blank', label: 'Fill in Blanks' },
    { value: 'matching', label: 'Matching' },
    { value: 'true-false', label: 'True/False' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'database', label: 'Database Systems' },
    { value: 'algorithms', label: 'Algorithms' },
    { value: 'networks', label: 'Computer Networks' },
    { value: 'programming', label: 'Programming' },
    { value: 'mathematics', label: 'Mathematics' }
  ];

  const filteredAndSortedQuestions = useMemo(() => {
    let filtered = questions?.filter(question => {
      const matchesSearch = question?.text?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           question?.subject?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesType = filterType === 'all' || question?.type === filterType;
      const matchesDifficulty = filterDifficulty === 'all' || question?.difficulty === filterDifficulty;
      const matchesSubject = filterSubject === 'all' || question?.subject === filterSubject;
      
      return matchesSearch && matchesType && matchesDifficulty && matchesSubject;
    });

    return filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (sortBy === 'lastModified' || sortBy === 'created') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [questions, searchTerm, sortBy, sortOrder, filterType, filterDifficulty, filterSubject]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'mcq': return 'CheckCircle';
      case 'essay': return 'FileText';
      case 'fill-blank': return 'Edit3';
      case 'matching': return 'Link';
      case 'true-false': return 'ToggleLeft';
      default: return 'HelpCircle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onQuestionSelect(filteredAndSortedQuestions?.map(q => q?.id));
    } else {
      onQuestionSelect([]);
    }
  };

  const handleQuestionSelect = (questionId, checked) => {
    if (checked) {
      onQuestionSelect([...selectedQuestions, questionId]);
    } else {
      onQuestionSelect(selectedQuestions?.filter(id => id !== questionId));
    }
  };

  const TableView = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedQuestions?.length === filteredAndSortedQuestions?.length && filteredAndSortedQuestions?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">Question</th>
              <th className="text-left p-4 font-medium text-foreground">Type</th>
              <th className="text-left p-4 font-medium text-foreground">Difficulty</th>
              <th className="text-left p-4 font-medium text-foreground">Subject</th>
              <th className="text-left p-4 font-medium text-foreground">Usage</th>
              <th className="text-left p-4 font-medium text-foreground">Modified</th>
              <th className="w-32 p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedQuestions?.map((question) => (
              <tr key={question?.id} className="border-b border-border hover:bg-muted/50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedQuestions?.includes(question?.id)}
                    onChange={(e) => handleQuestionSelect(question?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="max-w-md">
                    <p className="text-sm font-medium text-foreground line-clamp-2">
                      {question?.text}
                    </p>
                    {question?.tags && question?.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {question?.tags?.slice(0, 3)?.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                            {tag}
                          </span>
                        ))}
                        {question?.tags?.length > 3 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                            +{question?.tags?.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={getTypeIcon(question?.type)} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground capitalize">{question?.type?.replace('-', ' ')}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(question?.difficulty)}`}>
                    {question?.difficulty?.charAt(0)?.toUpperCase() + question?.difficulty?.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{question?.subject}</span>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <span className="text-foreground font-medium">{question?.usageCount}</span>
                    <span className="text-muted-foreground"> times</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(question?.lastModified)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditQuestion(question)}
                      iconName="Edit2"
                      className="h-8 w-8"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDuplicateQuestion(question)}
                      iconName="Copy"
                      className="h-8 w-8"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteQuestion(question?.id)}
                      iconName="Trash2"
                      className="h-8 w-8 text-error hover:text-error"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredAndSortedQuestions?.map((question) => (
        <div key={question?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <input
              type="checkbox"
              checked={selectedQuestions?.includes(question?.id)}
              onChange={(e) => handleQuestionSelect(question?.id, e?.target?.checked)}
              className="rounded border-border mt-1"
            />
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEditQuestion(question)}
                iconName="Edit2"
                className="h-8 w-8"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDuplicateQuestion(question)}
                iconName="Copy"
                className="h-8 w-8"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteQuestion(question?.id)}
                iconName="Trash2"
                className="h-8 w-8 text-error hover:text-error"
              />
            </div>
          </div>
          
          <div className="mb-3">
            <p className="text-sm font-medium text-foreground line-clamp-3 mb-2">
              {question?.text}
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name={getTypeIcon(question?.type)} size={14} />
              <span className="capitalize">{question?.type?.replace('-', ' ')}</span>
              <span>•</span>
              <span className={`px-2 py-1 rounded ${getDifficultyColor(question?.difficulty)}`}>
                {question?.difficulty}
              </span>
            </div>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subject:</span>
              <span className="text-foreground">{question?.subject}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Usage:</span>
              <span className="text-foreground">{question?.usageCount} times</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Modified:</span>
              <span className="text-foreground">{formatDate(question?.lastModified)}</span>
            </div>
          </div>
          
          {question?.tags && question?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {question?.tags?.slice(0, 2)?.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                  {tag}
                </span>
              ))}
              {question?.tags?.length > 2 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                  +{question?.tags?.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4">
            <Input
              type="search"
              placeholder="Cari pertanyaan atau mata pelajaran..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          
          <div className="lg:col-span-2">
            <Select
              options={typeOptions}
              value={filterType}
              onChange={setFilterType}
              placeholder="Tipe"
            />
          </div>
          
          <div className="lg:col-span-2">
            <Select
              options={difficultyOptions}
              value={filterDifficulty}
              onChange={setFilterDifficulty}
              placeholder="Tingkat"
            />
          </div>
          
          <div className="lg:col-span-2">
            <Select
              options={subjectOptions}
              value={filterSubject}
              onChange={setFilterSubject}
              placeholder="Mata Pelajaran"
            />
          </div>
          
          <div className="lg:col-span-2">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Urutkan"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                iconName="Table"
              />
              <Button
                variant={viewMode === 'card' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('card')}
                iconName="Grid3X3"
              />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
            >
              {sortOrder === 'asc' ? 'Naik' : 'Turun'}
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {filteredAndSortedQuestions?.length} dari {questions?.length} pertanyaan
          </div>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedQuestions?.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {selectedQuestions?.length} pertanyaan dipilih
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('export', selectedQuestions)}
                iconName="Download"
              >
                Ekspor
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('duplicate', selectedQuestions)}
                iconName="Copy"
              >
                Duplikasi
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onBulkAction('delete', selectedQuestions)}
                iconName="Trash2"
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Questions List */}
      {filteredAndSortedQuestions?.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Tidak ada pertanyaan ditemukan</h3>
          <p className="text-muted-foreground">
            Coba ubah filter pencarian atau buat pertanyaan baru
          </p>
        </div>
      ) : (
        viewMode === 'table' ? <TableView /> : <CardView />
      )}
    </div>
  );
};

export default QuestionLibrary;