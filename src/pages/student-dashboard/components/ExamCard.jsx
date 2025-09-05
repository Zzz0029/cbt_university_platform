import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExamCard = ({ exam, onStartExam, onViewDetails }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (exam?.status === 'scheduled') {
      const updateTimer = () => {
        const now = new Date();
        const examDate = new Date(exam.startTime);
        const diff = examDate - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeRemaining(`${hours}h ${minutes}m`);
        } else {
          setTimeRemaining('Starting soon');
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 60000);
      return () => clearInterval(interval);
    }
  }, [exam?.startTime, exam?.status]);

  const getStatusColor = () => {
    switch (exam?.status) {
      case 'in-progress': return 'text-success bg-success/10 border-success/20';
      case 'scheduled': return 'text-warning bg-warning/10 border-warning/20';
      case 'completed': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = () => {
    switch (exam?.status) {
      case 'in-progress': return 'Play';
      case 'scheduled': return 'Clock';
      case 'completed': return 'CheckCircle';
      default: return 'FileText';
    }
  };

  const getStatusText = () => {
    switch (exam?.status) {
      case 'in-progress': return 'Sedang Berlangsung';
      case 'scheduled': return 'Terjadwal';
      case 'completed': return 'Selesai';
      default: return 'Tidak Diketahui';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{exam?.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{exam?.subject} • {exam?.code}</p>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>{new Date(exam.startTime)?.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>{exam?.duration} menit</span>
            </div>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor()}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon()} size={12} />
            <span>{getStatusText()}</span>
          </div>
        </div>
      </div>
      {exam?.status === 'scheduled' && timeRemaining && (
        <div className="mb-4 p-3 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Timer" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">
              Dimulai dalam {timeRemaining}
            </span>
          </div>
        </div>
      )}
      {exam?.status === 'in-progress' && (
        <div className="mb-4 p-3 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
            <span className="text-sm font-medium text-success">
              Ujian sedang berlangsung
            </span>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          <span>Waktu: {new Date(exam.startTime)?.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(exam)}
            iconName="Eye"
            iconPosition="left"
          >
            Detail
          </Button>
          
          {exam?.status === 'in-progress' && (
            <Button
              variant="success"
              size="sm"
              onClick={() => onStartExam(exam)}
              iconName="Play"
              iconPosition="left"
            >
              Masuk Ujian
            </Button>
          )}
          
          {exam?.status === 'scheduled' && (
            <Button
              variant="default"
              size="sm"
              disabled={timeRemaining === 'Starting soon' ? false : true}
              onClick={() => onStartExam(exam)}
              iconName="Clock"
              iconPosition="left"
            >
              {timeRemaining === 'Starting soon' ? 'Mulai' : 'Menunggu'}
            </Button>
          )}
          
          {exam?.status === 'completed' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(exam)}
              iconName="BarChart3"
              iconPosition="left"
            >
              Lihat Hasil
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamCard;