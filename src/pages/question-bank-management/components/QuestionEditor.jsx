import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuestionEditor = ({ 
  question = null, 
  onSave, 
  onCancel, 
  isOpen = false,
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    text: '',
    type: 'mcq',
    difficulty: 'medium',
    subject: '',
    tags: [],
    points: 1,
    timeLimit: 0,
    explanation: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ],
    correctAnswer: '',
    matchingPairs: [
      { left: '', right: '' },
      { left: '', right: '' }
    ],
    fillBlanks: {
      text: '',
      blanks: []
    }
  });

  const [activeTab, setActiveTab] = useState('content');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (question) {
      setFormData({
        text: question?.text || '',
        type: question?.type || 'mcq',
        difficulty: question?.difficulty || 'medium',
        subject: question?.subject || '',
        tags: question?.tags || [],
        points: question?.points || 1,
        timeLimit: question?.timeLimit || 0,
        explanation: question?.explanation || '',
        options: question?.options || [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ],
        correctAnswer: question?.correctAnswer || '',
        matchingPairs: question?.matchingPairs || [
          { left: '', right: '' },
          { left: '', right: '' }
        ],
        fillBlanks: question?.fillBlanks || {
          text: '',
          blanks: []
        }
      });
    } else {
      // Reset form for new question
      setFormData({
        text: '',
        type: 'mcq',
        difficulty: 'medium',
        subject: '',
        tags: [],
        points: 1,
        timeLimit: 0,
        explanation: '',
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ],
        correctAnswer: '',
        matchingPairs: [
          { left: '', right: '' },
          { left: '', right: '' }
        ],
        fillBlanks: {
          text: '',
          blanks: []
        }
      });
    }
  }, [question, isOpen]);

  const typeOptions = [
    { value: 'mcq', label: 'Pilihan Ganda' },
    { value: 'essay', label: 'Esai' },
    { value: 'fill-blank', label: 'Isi Titik-titik' },
    { value: 'matching', label: 'Menjodohkan' },
    { value: 'true-false', label: 'Benar/Salah' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Mudah' },
    { value: 'medium', label: 'Sedang' },
    { value: 'hard', label: 'Sulit' }
  ];

  const subjectOptions = [
    { value: 'database', label: 'Sistem Basis Data' },
    { value: 'algorithms', label: 'Algoritma' },
    { value: 'networks', label: 'Jaringan Komputer' },
    { value: 'programming', label: 'Pemrograman' },
    { value: 'mathematics', label: 'Matematika' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData?.options];
    newOptions[index] = { ...newOptions?.[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev?.options, { text: '', isCorrect: false }]
    }));
  };

  const removeOption = (index) => {
    if (formData?.options?.length > 2) {
      const newOptions = formData?.options?.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        options: newOptions
      }));
    }
  };

  const handleMatchingPairChange = (index, field, value) => {
    const newPairs = [...formData?.matchingPairs];
    newPairs[index] = { ...newPairs?.[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      matchingPairs: newPairs
    }));
  };

  const addMatchingPair = () => {
    setFormData(prev => ({
      ...prev,
      matchingPairs: [...prev?.matchingPairs, { left: '', right: '' }]
    }));
  };

  const removeMatchingPair = (index) => {
    if (formData?.matchingPairs?.length > 1) {
      const newPairs = formData?.matchingPairs?.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        matchingPairs: newPairs
      }));
    }
  };

  const addTag = () => {
    if (tagInput?.trim() && !formData?.tags?.includes(tagInput?.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev?.tags, tagInput?.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev?.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = () => {
    const questionData = {
      ...formData,
      id: question?.id || Date.now(),
      lastModified: new Date()?.toISOString(),
      created: question?.created || new Date()?.toISOString(),
      usageCount: question?.usageCount || 0
    };
    onSave(questionData);
  };

  const renderQuestionTypeEditor = () => {
    switch (formData?.type) {
      case 'mcq':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Pilihan Jawaban</h4>
            {formData?.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <input
                  type="checkbox"
                  checked={option?.isCorrect}
                  onChange={(e) => handleOptionChange(index, 'isCorrect', e?.target?.checked)}
                  className="rounded border-border"
                />
                <Input
                  placeholder={`Pilihan ${String.fromCharCode(65 + index)}`}
                  value={option?.text}
                  onChange={(e) => handleOptionChange(index, 'text', e?.target?.value)}
                  className="flex-1"
                />
                {formData?.options?.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    iconName="X"
                    className="text-error"
                  />
                )}
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addOption}
              iconName="Plus"
              iconPosition="left"
            >
              Tambah Pilihan
            </Button>
          </div>
        );

      case 'essay':
        return (
          <div className="space-y-4">
            <Input
              label="Rubrik Penilaian"
              placeholder="Masukkan kriteria penilaian untuk jawaban esai..."
              value={formData?.explanation}
              onChange={(e) => handleInputChange('explanation', e?.target?.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Poin Maksimal"
                type="number"
                value={formData?.points}
                onChange={(e) => handleInputChange('points', parseInt(e?.target?.value) || 1)}
                min="1"
                max="100"
              />
              <Input
                label="Batas Waktu (menit)"
                type="number"
                value={formData?.timeLimit}
                onChange={(e) => handleInputChange('timeLimit', parseInt(e?.target?.value) || 0)}
                min="0"
                max="180"
              />
            </div>
          </div>
        );

      case 'fill-blank':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Gunakan [blank] untuk menandai tempat yang harus diisi
              </p>
              <p className="text-xs text-muted-foreground">
                Contoh: "Ibu kota Indonesia adalah [blank] dan terletak di pulau [blank]"
              </p>
            </div>
            <textarea
              className="w-full p-3 border border-border rounded-lg resize-none focus-ring"
              rows="4"
              placeholder="Masukkan teks dengan [blank] untuk bagian yang harus diisi..."
              value={formData?.fillBlanks?.text}
              onChange={(e) => handleInputChange('fillBlanks', { 
                ...formData?.fillBlanks, 
                text: e?.target?.value 
              })}
            />
          </div>
        );

      case 'matching':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Pasangan yang Harus Dijodohkan</h4>
            {formData?.matchingPairs?.map((pair, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <Input
                  placeholder="Kolom Kiri"
                  value={pair?.left}
                  onChange={(e) => handleMatchingPairChange(index, 'left', e?.target?.value)}
                  className="flex-1"
                />
                <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                <Input
                  placeholder="Kolom Kanan"
                  value={pair?.right}
                  onChange={(e) => handleMatchingPairChange(index, 'right', e?.target?.value)}
                  className="flex-1"
                />
                {formData?.matchingPairs?.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMatchingPair(index)}
                    iconName="X"
                    className="text-error"
                  />
                )}
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addMatchingPair}
              iconName="Plus"
              iconPosition="left"
            >
              Tambah Pasangan
            </Button>
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="trueFalse"
                  checked={formData?.correctAnswer === 'true'}
                  onChange={() => handleInputChange('correctAnswer', 'true')}
                  className="border-border"
                />
                <span className="text-sm text-foreground">Benar</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="trueFalse"
                  checked={formData?.correctAnswer === 'false'}
                  onChange={() => handleInputChange('correctAnswer', 'false')}
                  className="border-border"
                />
                <span className="text-sm text-foreground">Salah</span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black/50 z-300 flex items-center justify-center p-4 ${className}`}>
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {question ? 'Edit Pertanyaan' : 'Buat Pertanyaan Baru'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            iconName="X"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'content' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Konten Pertanyaan
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'settings' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Pengaturan
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'content' ? (
            <div className="space-y-6">
              {/* Question Text */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Teks Pertanyaan *
                </label>
                <textarea
                  className="w-full p-3 border border-border rounded-lg resize-none focus-ring"
                  rows="4"
                  placeholder="Masukkan pertanyaan Anda di sini..."
                  value={formData?.text}
                  onChange={(e) => handleInputChange('text', e?.target?.value)}
                  required
                />
              </div>

              {/* Question Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Tipe Pertanyaan"
                  options={typeOptions}
                  value={formData?.type}
                  onChange={(value) => handleInputChange('type', value)}
                  required
                />
                <Select
                  label="Tingkat Kesulitan"
                  options={difficultyOptions}
                  value={formData?.difficulty}
                  onChange={(value) => handleInputChange('difficulty', value)}
                  required
                />
              </div>

              {/* Type-specific Editor */}
              {renderQuestionTypeEditor()}

              {/* Explanation */}
              {formData?.type !== 'essay' && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Penjelasan (Opsional)
                  </label>
                  <textarea
                    className="w-full p-3 border border-border rounded-lg resize-none focus-ring"
                    rows="3"
                    placeholder="Berikan penjelasan untuk jawaban yang benar..."
                    value={formData?.explanation}
                    onChange={(e) => handleInputChange('explanation', e?.target?.value)}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Subject and Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Mata Pelajaran"
                  options={subjectOptions}
                  value={formData?.subject}
                  onChange={(value) => handleInputChange('subject', value)}
                  required
                />
                <Input
                  label="Poin"
                  type="number"
                  value={formData?.points}
                  onChange={(e) => handleInputChange('points', parseInt(e?.target?.value) || 1)}
                  min="1"
                  max="100"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tag
                </label>
                <div className="flex items-center space-x-2 mb-3">
                  <Input
                    placeholder="Tambah tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e?.target?.value)}
                    onKeyPress={(e) => e?.key === 'Enter' && addTag()}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={addTag}
                    iconName="Plus"
                  />
                </div>
                {formData?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-primary hover:text-primary/70"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Time Limit */}
              <Input
                label="Batas Waktu (menit, 0 = tidak terbatas)"
                type="number"
                value={formData?.timeLimit}
                onChange={(e) => handleInputChange('timeLimit', parseInt(e?.target?.value) || 0)}
                min="0"
                max="180"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onCancel}
          >
            Batal
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!formData?.text?.trim() || !formData?.subject}
          >
            {question ? 'Simpan Perubahan' : 'Buat Pertanyaan'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;