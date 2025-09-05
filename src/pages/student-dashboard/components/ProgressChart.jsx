import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProgressChart = ({ progressData, chartType = 'bar' }) => {
  const subjectData = [
    { subject: 'Basis Data', completed: 8, total: 10, percentage: 80 },
    { subject: 'Algoritma', completed: 6, total: 8, percentage: 75 },
    { subject: 'Jaringan', completed: 4, total: 6, percentage: 67 },
    { subject: 'Web Dev', completed: 9, total: 12, percentage: 75 },
    { subject: 'Mobile Dev', completed: 3, total: 5, percentage: 60 }
  ];

  const overallData = [
    { name: 'Selesai', value: 30, color: '#10B981' },
    { name: 'Tertunda', value: 8, color: '#F59E0B' },
    { name: 'Belum Mulai', value: 3, color: '#6B7280' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Selesai: {payload?.[0]?.value} dari {payload?.[0]?.payload?.total} ujian
          </p>
          <p className="text-sm text-primary font-medium">
            {payload?.[0]?.payload?.percentage}% selesai
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{payload?.[0]?.name}</p>
          <p className="text-sm text-muted-foreground">
            {payload?.[0]?.value} ujian
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartType === 'pie') {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Status Ujian Keseluruhan</h3>
          <Icon name="PieChart" size={20} className="text-muted-foreground" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={overallData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {overallData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {overallData?.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-sm font-medium text-foreground">{item?.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item?.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Progress per Mata Kuliah</h3>
        <Icon name="BarChart3" size={20} className="text-muted-foreground" />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={subjectData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="subject" 
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="completed" 
              fill="var(--color-primary)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {subjectData?.map((subject, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">{subject?.subject}</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${subject?.percentage}%` }}
                />
              </div>
              <span className="text-muted-foreground w-12 text-right">
                {subject?.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;