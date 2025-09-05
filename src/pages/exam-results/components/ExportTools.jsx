import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportTools = ({ userRole, examData, onExport }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportType, setExportType] = useState('summary');
  const [isExporting, setIsExporting] = useState(false);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(false);

  const exportFormats = [
    { value: 'pdf', label: 'PDF Document', icon: 'FileText' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet' },
    { value: 'csv', label: 'CSV File', icon: 'Database' },
    { value: 'json', label: 'JSON Data', icon: 'Code' }
  ];

  const studentExportTypes = [
    { value: 'transcript', label: 'Official Transcript', description: 'Complete academic record with grades' },
    { value: 'certificate', label: 'Completion Certificate', description: 'Certificate of exam completion' },
    { value: 'detailed', label: 'Detailed Report', description: 'Question-by-question analysis' },
    { value: 'summary', label: 'Performance Summary', description: 'Overall performance overview' }
  ];

  const facultyExportTypes = [
    { value: 'class_report', label: 'Class Performance Report', description: 'Complete class analytics' },
    { value: 'grade_sheet', label: 'Grade Sheet', description: 'Student grades for gradebook' },
    { value: 'analytics', label: 'Statistical Analysis', description: 'Detailed performance analytics' },
    { value: 'flagged_report', label: 'Security Report', description: 'Flagged attempts and violations' },
    { value: 'individual', label: 'Individual Reports', description: 'Separate report for each student' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const exportConfig = {
        format: exportFormat,
        type: exportType,
        includeCharts,
        includeDetails,
        examId: examData?.id,
        timestamp: new Date()?.toISOString()
      };

      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onExport) {
        onExport(exportConfig);
      }

      // Simulate file download
      const filename = `exam_results_${examData?.title?.replace(/\s+/g, '_')}_${Date.now()}.${exportFormat}`;
      console.log(`Exporting: ${filename}`);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportTypes = userRole === 'student' ? studentExportTypes : facultyExportTypes;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="text-lg font-medium text-foreground">Export Results</h3>
      </div>
      <div className="space-y-6">
        {/* Export Type Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Export Type</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exportTypes?.map((type) => (
              <div
                key={type?.value}
                className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                  exportType === type?.value
                    ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                }`}
                onClick={() => setExportType(type?.value)}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    exportType === type?.value
                      ? 'border-primary bg-primary' :'border-border'
                  }`}>
                    {exportType === type?.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">{type?.label}</span>
                </div>
                <p className="text-xs text-muted-foreground ml-6">{type?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Format Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">File Format</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {exportFormats?.map((format) => (
              <button
                key={format?.value}
                onClick={() => setExportFormat(format?.value)}
                className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                  exportFormat === format?.value
                    ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                }`}
              >
                <Icon 
                  name={format?.icon} 
                  size={24} 
                  className={`mx-auto mb-2 ${
                    exportFormat === format?.value ? 'text-primary' : 'text-muted-foreground'
                  }`} 
                />
                <span className="text-xs font-medium text-foreground">{format?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Options</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCharts}
                onChange={(e) => setIncludeCharts(e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20"
              />
              <span className="text-sm text-foreground">Include charts and graphs</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDetails}
                onChange={(e) => setIncludeDetails(e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20"
              />
              <span className="text-sm text-foreground">Include detailed question analysis</span>
            </label>
          </div>
        </div>

        {/* Preview Information */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-foreground mb-1">Export Preview</h5>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Type: {exportTypes?.find(t => t?.value === exportType)?.label}</p>
                <p>Format: {exportFormats?.find(f => f?.value === exportFormat)?.label}</p>
                <p>Exam: {examData?.title}</p>
                <p>Generated: {new Date()?.toLocaleDateString('id-ID')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            {userRole === 'student' ?'Exports are logged for academic record purposes' :'All exports are tracked for audit compliance'
            }
          </div>
          
          <Button
            variant="default"
            onClick={handleExport}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            disabled={isExporting}
          >
            {isExporting ? 'Generating...' : 'Export Results'}
          </Button>
        </div>
      </div>
      {/* Recent Exports */}
      {userRole !== 'student' && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Exports</h4>
          <div className="space-y-2">
            {[
              { name: 'Class_Performance_Report.pdf', date: '2025-09-05', size: '2.4 MB' },
              { name: 'Grade_Sheet_CS301.xlsx', date: '2025-09-04', size: '156 KB' },
              { name: 'Security_Report_Sep.pdf', date: '2025-09-03', size: '892 KB' }
            ]?.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{file?.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{file?.date}</span>
                  <span>•</span>
                  <span>{file?.size}</span>
                  <Button variant="ghost" size="sm" iconName="Download" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportTools;