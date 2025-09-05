import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultCard = ({ result, onViewDetails }) => {
  const getGradeColor = (score) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    if (score >= 60) return 'text-primary';
    return 'text-error';
  };

  const getGradeLetter = (score) => {
    if (score >= 85) return 'A';
    if (score >= 80) return 'A-';
    if (score >= 75) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 65) return 'B-';
    if (score >= 60) return 'C+';
    if (score >= 55) return 'C';
    if (score >= 50) return 'C-';
    if (score >= 45) return 'D+';
    if (score >= 40) return 'D';
    return 'E';
  };

  const getStatusIcon = () => {
    if (result?.status === 'graded') return 'CheckCircle';
    if (result?.status === 'pending') return 'Clock';
    return 'AlertCircle';
  };

  const getStatusText = () => {
    switch (result?.status) {
      case 'graded': return 'Dinilai';
      case 'pending': return 'Menunggu Penilaian';
      case 'reviewing': return 'Sedang Ditinjau';
      default: return 'Tidak Diketahui';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-base font-semibold text-foreground mb-1">{result?.examTitle}</h4>
          <p className="text-sm text-muted-foreground">{result?.subject}</p>
        </div>

        {result?.status === 'graded' && (
          <div className="text-right">
            <div className={`text-2xl font-bold ${getGradeColor(result?.score)}`}>
              {result?.score}
            </div>
            <div className={`text-sm font-medium ${getGradeColor(result?.score)}`}>
              {getGradeLetter(result?.score)}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4 text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>{new Date(result.completedAt)?.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon()} size={14} />
            <span>{getStatusText()}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails(result)}
          iconName="ExternalLink"
          iconPosition="right"
          className="text-xs"
        >
          Detail
        </Button>
      </div>
      {result?.feedback && (
        <div className="mt-3 p-2 bg-muted rounded text-xs text-muted-foreground">
          <Icon name="MessageSquare" size={12} className="inline mr-1" />
          {result?.feedback?.length > 100 ? `${result?.feedback?.substring(0, 100)}...` : result?.feedback}
        </div>
      )}
    </div>
  );
};

export default ResultCard;