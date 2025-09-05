import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuestionAnalytics = ({ className = '' }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('usage');

  const timeRangeOptions = [
    { value: '7d', label: '7 Hari Terakhir' },
    { value: '30d', label: '30 Hari Terakhir' },
    { value: '90d', label: '3 Bulan Terakhir' },
    { value: '1y', label: '1 Tahun Terakhir' }
  ];

  const metricOptions = [
    { value: 'usage', label: 'Penggunaan Pertanyaan' },
    { value: 'difficulty', label: 'Analisis Kesulitan' },
    { value: 'performance', label: 'Performa Siswa' },
    { value: 'categories', label: 'Distribusi Kategori' }
  ];

  // Mock data for analytics
  const usageData = [
    { name: 'Database', questions: 45, used: 38, unused: 7 },
    { name: 'Algoritma', questions: 32, used: 28, unused: 4 },
    { name: 'Jaringan', questions: 28, used: 22, unused: 6 },
    { name: 'Programming', questions: 35, used: 30, unused: 5 },
    { name: 'Matematika', questions: 25, used: 18, unused: 7 }
  ];

  const difficultyData = [
    { name: 'Mudah', value: 35, color: '#10B981' },
    { name: 'Sedang', value: 45, color: '#F59E0B' },
    { name: 'Sulit', value: 20, color: '#EF4444' }
  ];

  const performanceData = [
    { month: 'Jan', avgScore: 75, questionCount: 120 },
    { month: 'Feb', avgScore: 78, questionCount: 135 },
    { month: 'Mar', avgScore: 72, questionCount: 150 },
    { month: 'Apr', avgScore: 80, questionCount: 165 },
    { month: 'May', avgScore: 77, questionCount: 180 },
    { month: 'Jun', avgScore: 82, questionCount: 195 }
  ];

  const topPerformingQuestions = [
    {
      id: 1,
      text: 'Apa itu normalisasi database?',
      category: 'Database',
      avgScore: 92,
      usageCount: 45,
      difficulty: 'medium'
    },
    {
      id: 2,
      text: 'Jelaskan algoritma bubble sort',
      category: 'Algoritma',
      avgScore: 88,
      usageCount: 38,
      difficulty: 'easy'
    },
    {
      id: 3,
      text: 'Perbedaan TCP dan UDP',
      category: 'Jaringan',
      avgScore: 85,
      usageCount: 42,
      difficulty: 'medium'
    }
  ];

  const poorPerformingQuestions = [
    {
      id: 4,
      text: 'Implementasi algoritma Dijkstra',
      category: 'Algoritma',
      avgScore: 45,
      usageCount: 28,
      difficulty: 'hard'
    },
    {
      id: 5,
      text: 'Konsep ACID dalam database',
      category: 'Database',
      avgScore: 52,
      usageCount: 35,
      difficulty: 'hard'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const renderMetricChart = () => {
    switch (selectedMetric) {
      case 'usage':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="used" fill="#1E40AF" name="Digunakan" />
              <Bar dataKey="unused" fill="#E5E7EB" name="Tidak Digunakan" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'difficulty':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={difficultyData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {difficultyData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'performance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="avgScore" 
                stroke="#1E40AF" 
                strokeWidth={2}
                name="Rata-rata Skor"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="questions" fill="#1E40AF" name="Total Pertanyaan" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Analitik Bank Soal</h3>
          <p className="text-sm text-muted-foreground">
            Pantau performa dan penggunaan pertanyaan dalam bank soal
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
          >
            Export Laporan
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Pertanyaan</p>
              <p className="text-xl font-semibold text-foreground">165</p>
              <p className="text-xs text-success">+12 bulan ini</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tingkat Penggunaan</p>
              <p className="text-xl font-semibold text-foreground">82%</p>
              <p className="text-xs text-success">+5% dari bulan lalu</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rata-rata Skor</p>
              <p className="text-xl font-semibold text-foreground">77%</p>
              <p className="text-xs text-warning">-2% dari bulan lalu</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-error" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Perlu Review</p>
              <p className="text-xl font-semibold text-foreground">8</p>
              <p className="text-xs text-error">Skor rendah</p>
            </div>
          </div>
        </div>
      </div>
      {/* Chart Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-medium text-foreground">Analisis Detail</h4>
          <Select
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric}
            className="w-48"
          />
        </div>
        {renderMetricChart()}
      </div>
      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Questions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="TrendingUp" size={20} className="text-success" />
            <h4 className="text-lg font-medium text-foreground">Pertanyaan Terbaik</h4>
          </div>
          <div className="space-y-3">
            {topPerformingQuestions?.map((question, index) => (
              <div key={question?.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {question?.text}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">{question?.category}</span>
                    <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(question?.difficulty)}`}>
                      {question?.difficulty}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-success">{question?.avgScore}%</p>
                  <p className="text-xs text-muted-foreground">{question?.usageCount}x</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Poor Performing Questions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="TrendingDown" size={20} className="text-error" />
            <h4 className="text-lg font-medium text-foreground">Perlu Perbaikan</h4>
          </div>
          <div className="space-y-3">
            {poorPerformingQuestions?.map((question, index) => (
              <div key={question?.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {question?.text}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">{question?.category}</span>
                    <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(question?.difficulty)}`}>
                      {question?.difficulty}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-error">{question?.avgScore}%</p>
                  <p className="text-xs text-muted-foreground">{question?.usageCount}x</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit2"
              iconPosition="left"
              fullWidth
            >
              Review & Edit Questions
            </Button>
          </div>
        </div>
      </div>
      {/* Recommendations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} className="text-warning" />
          <h4 className="text-lg font-medium text-foreground">Rekomendasi</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <Icon name="Plus" size={16} className="text-primary mb-2" />
            <h5 className="font-medium text-primary mb-1">Tambah Pertanyaan Mudah</h5>
            <p className="text-sm text-foreground">
              Kategori Database membutuhkan lebih banyak pertanyaan tingkat mudah
            </p>
          </div>
          
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <Icon name="Edit2" size={16} className="text-warning mb-2" />
            <h5 className="font-medium text-warning mb-1">Review Pertanyaan Sulit</h5>
            <p className="text-sm text-foreground">
              8 pertanyaan memiliki tingkat kesulitan yang terlalu tinggi
            </p>
          </div>
          
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="Target" size={16} className="text-success mb-2" />
            <h5 className="font-medium text-success mb-1">Optimalkan Penggunaan</h5>
            <p className="text-sm text-foreground">
              29 pertanyaan belum pernah digunakan dalam ujian
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionAnalytics;