import React from 'react';
import Icon from '../../../components/AppIcon';

const ResultsOverview = ({ userRole, selectedExam, overallStats }) => {
  if (userRole === 'student') {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{selectedExam?.title}</h2>
            <p className="text-sm text-muted-foreground">{selectedExam?.course} • {selectedExam?.date}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={20} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Grade: {selectedExam?.grade}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{selectedExam?.score}%</div>
            <div className="text-sm text-muted-foreground">Overall Score</div>
          </div>
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">{selectedExam?.correctAnswers}</div>
            <div className="text-sm text-muted-foreground">Correct Answers</div>
          </div>
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning mb-1">{selectedExam?.completionTime}</div>
            <div className="text-sm text-muted-foreground">Time Taken</div>
          </div>
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">{selectedExam?.percentile}th</div>
            <div className="text-sm text-muted-foreground">Percentile</div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Subject-wise Performance</h3>
          {selectedExam?.subjectBreakdown?.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="BookOpen" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{subject?.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-border rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${subject?.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-12 text-right">
                  {subject?.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Faculty/Admin view
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{selectedExam?.title}</h2>
          <p className="text-sm text-muted-foreground">
            {selectedExam?.course} • {selectedExam?.totalStudents} students • {selectedExam?.date}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            {selectedExam?.completedStudents}/{selectedExam?.totalStudents} completed
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">{overallStats?.averageScore}%</div>
          <div className="text-sm text-muted-foreground">Average Score</div>
        </div>
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">{overallStats?.passRate}%</div>
          <div className="text-sm text-muted-foreground">Pass Rate</div>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning mb-1">{overallStats?.averageTime}</div>
          <div className="text-sm text-muted-foreground">Avg. Time</div>
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent mb-1">{overallStats?.flaggedAttempts}</div>
          <div className="text-sm text-muted-foreground">Flagged</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsOverview;