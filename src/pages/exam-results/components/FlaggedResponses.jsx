import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FlaggedResponses = ({ flaggedAttempts, onReviewFlag, onDismissFlag }) => {
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error/10 border-error/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-accent/10 border-accent/20';
      default: return 'bg-muted border-border';
    }
  };

  const getViolationIcon = (type) => {
    switch (type) {
      case 'tab_switch': return 'ExternalLink';
      case 'copy_paste': return 'Copy';
      case 'suspicious_timing': return 'Clock';
      case 'multiple_devices': return 'Smartphone';
      case 'face_detection': return 'Eye';
      case 'screen_recording': return 'Monitor';
      default: return 'AlertTriangle';
    }
  };

  const filteredFlags = flaggedAttempts?.filter(flag => {
    if (filterSeverity === 'all') return true;
    return flag?.severity === filterSeverity;
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Flag" size={20} className="text-error" />
          <h3 className="text-lg font-medium text-foreground">Flagged Responses</h3>
          <span className="bg-error/10 text-error text-xs px-2 py-1 rounded-full">
            {flaggedAttempts?.length}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e?.target?.value)}
            className="px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Severity</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
          <Button variant="outline" size="sm" iconName="Download">
            Export Report
          </Button>
        </div>
      </div>
      {filteredFlags?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Shield" size={48} className="text-success mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Security Violations</h4>
          <p className="text-muted-foreground">All exam attempts appear to be legitimate.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Flagged Attempts List */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              Flagged Attempts ({filteredFlags?.length})
            </h4>
            <div className="max-h-96 overflow-y-auto space-y-3">
              {filteredFlags?.map((flag) => (
                <div
                  key={flag?.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedFlag?.id === flag?.id
                      ? 'border-primary bg-primary/5'
                      : getSeverityBg(flag?.severity)
                  }`}
                  onClick={() => setSelectedFlag(flag)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getViolationIcon(flag?.violationType)} 
                        size={16} 
                        className={getSeverityColor(flag?.severity)} 
                      />
                      <span className="text-sm font-medium text-foreground">
                        {flag?.studentName}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      flag?.severity === 'high' ? 'bg-error text-error-foreground' :
                      flag?.severity === 'medium' ? 'bg-warning text-warning-foreground' :
                      'bg-accent text-accent-foreground'
                    }`}>
                      {flag?.severity?.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-foreground mb-2">{flag?.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{flag?.timestamp}</span>
                    <span>Q{flag?.questionNumber}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flag Details */}
          <div>
            {selectedFlag ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-foreground">Violation Details</h4>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDismissFlag(selectedFlag?.id)}
                      iconName="X"
                    >
                      Dismiss
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onReviewFlag(selectedFlag?.id)}
                      iconName="AlertTriangle"
                    >
                      Take Action
                    </Button>
                  </div>
                </div>

                {/* Student Info */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Student:</span>
                      <p className="text-sm font-medium text-foreground">{selectedFlag?.studentName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Student ID:</span>
                      <p className="text-sm font-medium text-foreground">{selectedFlag?.studentId}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Exam:</span>
                      <p className="text-sm font-medium text-foreground">{selectedFlag?.examTitle}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Question:</span>
                      <p className="text-sm font-medium text-foreground">Q{selectedFlag?.questionNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Violation Details */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-foreground">Violation Evidence:</h5>
                  
                  <div className={`p-3 border rounded-lg ${getSeverityBg(selectedFlag?.severity)}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon 
                        name={getViolationIcon(selectedFlag?.violationType)} 
                        size={16} 
                        className={getSeverityColor(selectedFlag?.severity)} 
                      />
                      <span className="text-sm font-medium text-foreground">
                        {selectedFlag?.violationTitle}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{selectedFlag?.description}</p>
                  </div>

                  {/* Evidence List */}
                  <div className="space-y-2">
                    <h6 className="text-sm font-medium text-foreground">Evidence:</h6>
                    {selectedFlag?.evidence?.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Icon name="Dot" size={12} className="text-muted-foreground" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Timestamps */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">First Detected:</span>
                      <p className="font-medium text-foreground">{selectedFlag?.firstDetected}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Occurrence:</span>
                      <p className="font-medium text-foreground">{selectedFlag?.lastOccurrence}</p>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Shield" size={16} className="text-warning" />
                      <span className="text-sm font-medium text-warning">Risk Assessment</span>
                    </div>
                    <p className="text-sm text-foreground">{selectedFlag?.riskAssessment}</p>
                  </div>

                  {/* Recommended Actions */}
                  <div className="space-y-2">
                    <h6 className="text-sm font-medium text-foreground">Recommended Actions:</h6>
                    {selectedFlag?.recommendedActions?.map((action, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
                        <span className="text-sm text-foreground">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-center">
                <div>
                  <Icon name="MousePointer" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-foreground mb-2">Select a Flagged Attempt</h4>
                  <p className="text-muted-foreground">
                    Click on a flagged attempt to view detailed violation evidence and recommended actions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlaggedResponses;