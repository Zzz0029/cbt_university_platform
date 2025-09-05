import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetailedReview = ({ userRole, questions, studentAnswers }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [filterType, setFilterType] = useState('all');

  const filteredQuestions = questions?.filter(question => {
    if (filterType === 'all') return true;
    if (filterType === 'correct') return question?.isCorrect;
    if (filterType === 'incorrect') return !question?.isCorrect;
    if (filterType === 'flagged') return question?.isFlagged;
    return true;
  });

  const getQuestionIcon = (question) => {
    if (question?.isFlagged) return { name: 'Flag', color: 'text-error' };
    if (question?.isCorrect) return { name: 'CheckCircle', color: 'text-success' };
    return { name: 'XCircle', color: 'text-error' };
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case 'mcq': return 'Circle';
      case 'essay': return 'FileText';
      case 'fill': return 'Edit3';
      case 'matching': return 'Link';
      default: return 'HelpCircle';
    }
  };

  if (userRole === 'student') {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-foreground">Question Review</h3>
          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e?.target?.value)}
              className="px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Questions</option>
              <option value="correct">Correct</option>
              <option value="incorrect">Incorrect</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question List */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Questions ({filteredQuestions?.length})
            </h4>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredQuestions?.map((question, index) => {
                const icon = getQuestionIcon(question);
                return (
                  <button
                    key={question?.id}
                    onClick={() => setSelectedQuestion(index)}
                    className={`w-full p-3 text-left border rounded-lg transition-all duration-200 ${
                      selectedQuestion === index
                        ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name={icon?.name} size={16} className={icon?.color} />
                        <span className="text-sm font-medium text-foreground">
                          Q{question?.number}
                        </span>
                        <Icon 
                          name={getQuestionTypeIcon(question?.type)} 
                          size={14} 
                          className="text-muted-foreground" 
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {question?.points} pts
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 truncate">
                      {question?.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Detail */}
          <div className="lg:col-span-2">
            {filteredQuestions?.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-foreground">
                    Question {filteredQuestions?.[selectedQuestion]?.number}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {filteredQuestions?.[selectedQuestion]?.points} points
                    </span>
                    {filteredQuestions?.[selectedQuestion]?.isFlagged && (
                      <Icon name="Flag" size={16} className="text-error" />
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-foreground">
                    {filteredQuestions?.[selectedQuestion]?.question}
                  </p>
                </div>

                {/* Student Answer */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-foreground">Your Answer:</h5>
                  <div className={`p-3 rounded-lg border ${
                    filteredQuestions?.[selectedQuestion]?.isCorrect
                      ? 'bg-success/10 border-success/20' :'bg-error/10 border-error/20'
                  }`}>
                    <p className="text-foreground">
                      {filteredQuestions?.[selectedQuestion]?.studentAnswer}
                    </p>
                  </div>
                </div>

                {/* Correct Answer */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-foreground">Correct Answer:</h5>
                  <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-foreground">
                      {filteredQuestions?.[selectedQuestion]?.correctAnswer}
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                {filteredQuestions?.[selectedQuestion]?.explanation && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-foreground">Explanation:</h5>
                    <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                      <p className="text-foreground">
                        {filteredQuestions?.[selectedQuestion]?.explanation}
                      </p>
                    </div>
                  </div>
                )}

                {/* Points Breakdown */}
                <div className="p-3 bg-card border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Points Earned:</span>
                    <span className="text-sm font-medium text-foreground">
                      {filteredQuestions?.[selectedQuestion]?.earnedPoints} / {filteredQuestions?.[selectedQuestion]?.points}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Faculty/Admin view - Student performance matrix
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-foreground">Student Performance Matrix</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export Data
          </Button>
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Student</th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">Score</th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">Grade</th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">Time</th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-center p-3 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentAnswers?.map((student, index) => (
              <tr key={student?.id} className="border-b border-border hover:bg-muted/50">
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {student?.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{student?.name}</div>
                      <div className="text-xs text-muted-foreground">{student?.studentId}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-center">
                  <span className="text-sm font-medium text-foreground">{student?.score}%</span>
                </td>
                <td className="p-3 text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    student?.grade === 'A' ? 'bg-success/10 text-success' :
                    student?.grade === 'B' ? 'bg-primary/10 text-primary' :
                    student?.grade === 'C'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                  }`}>
                    {student?.grade}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className="text-sm text-foreground">{student?.completionTime}</span>
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    {student?.isFlagged && (
                      <Icon name="Flag" size={14} className="text-error" />
                    )}
                    <span className={`text-xs ${
                      student?.status === 'completed' ? 'text-success' :
                      student?.status === 'flagged'? 'text-error' : 'text-warning'
                    }`}>
                      {student?.status}
                    </span>
                  </div>
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Button variant="ghost" size="sm" iconName="Eye" />
                    <Button variant="ghost" size="sm" iconName="MessageSquare" />
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailedReview;