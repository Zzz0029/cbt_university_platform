import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ImportExportTools = ({ 
  onImport, 
  onExport, 
  categories = [],
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState('import');
  const [importSettings, setImportSettings] = useState({
    format: 'json',
    category: '',
    overwriteExisting: false,
    validateQuestions: true
  });
  const [exportSettings, setExportSettings] = useState({
    format: 'json',
    categories: [],
    includeMetadata: true,
    includeStatistics: false
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const formatOptions = [
    { value: 'json', label: 'JSON Format' },
    { value: 'csv', label: 'CSV Format' },
    { value: 'xml', label: 'XML Format' },
    { value: 'qti', label: 'QTI Format' },
    { value: 'gift', label: 'GIFT Format' }
  ];

  const categoryOptions = [
    { value: '', label: 'Pilih Kategori' },
    ...categories?.map(cat => ({ value: cat?.id, label: cat?.name }))
  ];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      setUploadedFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      setUploadedFile(e?.target?.files?.[0]);
    }
  };

  const handleImport = () => {
    if (uploadedFile && onImport) {
      onImport({
        file: uploadedFile,
        settings: importSettings
      });
      setUploadedFile(null);
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport(exportSettings);
    }
  };

  const getFileIcon = (filename) => {
    const extension = filename?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'json': return 'FileCode';
      case 'csv': return 'FileSpreadsheet';
      case 'xml': return 'FileCode2';
      case 'txt': return 'FileText';
      default: return 'File';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">Import & Export</h3>
        <p className="text-sm text-muted-foreground">
          Kelola bank soal dengan mengimpor atau mengekspor pertanyaan dalam berbagai format
        </p>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('import')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'import' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Upload" size={16} className="inline mr-2" />
          Import Pertanyaan
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'export'
              ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Download" size={16} className="inline mr-2" />
          Export Pertanyaan
        </button>
      </div>
      {/* Content */}
      <div className="p-6">
        {activeTab === 'import' ? (
          <div className="space-y-6">
            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-3">
                    <Icon name={getFileIcon(uploadedFile?.name)} size={32} className="text-primary" />
                    <div className="text-left">
                      <p className="font-medium text-foreground">{uploadedFile?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(uploadedFile?.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setUploadedFile(null)}
                    iconName="X"
                    iconPosition="left"
                  >
                    Hapus File
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Icon name="Upload" size={48} className="text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-foreground">
                      Drag & drop file di sini
                    </p>
                    <p className="text-sm text-muted-foreground">
                      atau klik untuk memilih file
                    </p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".json,.csv,.xml,.txt"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" as="span">
                      Pilih File
                    </Button>
                  </label>
                </div>
              )}
            </div>

            {/* Import Settings */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Pengaturan Import</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Format File"
                  options={formatOptions}
                  value={importSettings?.format}
                  onChange={(value) => setImportSettings({
                    ...importSettings,
                    format: value
                  })}
                />
                <Select
                  label="Kategori Tujuan"
                  options={categoryOptions}
                  value={importSettings?.category}
                  onChange={(value) => setImportSettings({
                    ...importSettings,
                    category: value
                  })}
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={importSettings?.overwriteExisting}
                    onChange={(e) => setImportSettings({
                      ...importSettings,
                      overwriteExisting: e?.target?.checked
                    })}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">
                    Timpa pertanyaan yang sudah ada
                  </span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={importSettings?.validateQuestions}
                    onChange={(e) => setImportSettings({
                      ...importSettings,
                      validateQuestions: e?.target?.checked
                    })}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">
                    Validasi pertanyaan sebelum import
                  </span>
                </label>
              </div>
            </div>

            {/* Import Button */}
            <div className="flex items-center space-x-3">
              <Button
                variant="default"
                onClick={handleImport}
                disabled={!uploadedFile}
                iconName="Upload"
                iconPosition="left"
              >
                Import Pertanyaan
              </Button>
              <Button
                variant="outline"
                iconName="HelpCircle"
                iconPosition="left"
              >
                Panduan Format
              </Button>
            </div>

            {/* Supported Formats Info */}
            <div className="bg-muted rounded-lg p-4">
              <h5 className="font-medium text-foreground mb-2">Format yang Didukung:</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>JSON:</strong> Format standar dengan metadata lengkap</li>
                <li>• <strong>CSV:</strong> Format spreadsheet untuk import massal</li>
                <li>• <strong>XML:</strong> Format terstruktur dengan validasi</li>
                <li>• <strong>QTI:</strong> Standard e-learning untuk kompatibilitas LMS</li>
                <li>• <strong>GIFT:</strong> Format Moodle untuk pertanyaan sederhana</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Export Settings */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Pengaturan Export</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Format Export"
                  options={formatOptions}
                  value={exportSettings?.format}
                  onChange={(value) => setExportSettings({
                    ...exportSettings,
                    format: value
                  })}
                />
                <Select
                  label="Kategori"
                  options={[
                    { value: 'all', label: 'Semua Kategori' },
                    ...categoryOptions?.slice(1)
                  ]}
                  value={exportSettings?.categories?.length === 0 ? 'all' : exportSettings?.categories?.[0]}
                  onChange={(value) => setExportSettings({
                    ...exportSettings,
                    categories: value === 'all' ? [] : [value]
                  })}
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exportSettings?.includeMetadata}
                    onChange={(e) => setExportSettings({
                      ...exportSettings,
                      includeMetadata: e?.target?.checked
                    })}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">
                    Sertakan metadata (tags, difficulty, dll)
                  </span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exportSettings?.includeStatistics}
                    onChange={(e) => setExportSettings({
                      ...exportSettings,
                      includeStatistics: e?.target?.checked
                    })}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">
                    Sertakan statistik penggunaan
                  </span>
                </label>
              </div>
            </div>

            {/* Export Preview */}
            <div className="bg-muted rounded-lg p-4">
              <h5 className="font-medium text-foreground mb-3">Preview Export:</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Format:</span>
                  <p className="font-medium text-foreground uppercase">
                    {exportSettings?.format}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Pertanyaan:</span>
                  <p className="font-medium text-foreground">~125 items</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Kategori:</span>
                  <p className="font-medium text-foreground">
                    {exportSettings?.categories?.length === 0 ? 'Semua' : exportSettings?.categories?.length}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Ukuran:</span>
                  <p className="font-medium text-foreground">~2.4 MB</p>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <div className="flex items-center space-x-3">
              <Button
                variant="default"
                onClick={handleExport}
                iconName="Download"
                iconPosition="left"
              >
                Export Pertanyaan
              </Button>
              <Button
                variant="outline"
                iconName="Settings"
                iconPosition="left"
              >
                Template Export
              </Button>
            </div>

            {/* Export History */}
            <div className="space-y-3">
              <h5 className="font-medium text-foreground">Export Terakhir:</h5>
              <div className="space-y-2">
                {[
                  { name: 'database_questions.json', date: '2025-09-04', size: '1.8 MB' },
                  { name: 'algorithms_export.csv', date: '2025-09-03', size: '945 KB' },
                  { name: 'all_questions.xml', date: '2025-09-01', size: '3.2 MB' }
                ]?.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name={getFileIcon(file?.name)} size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{file?.name}</p>
                        <p className="text-xs text-muted-foreground">{file?.date} • {file?.size}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Download"
                      className="h-8 w-8"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportExportTools;