import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ExamStatusIndicator from '../../components/ui/ExamStatusIndicator';
import NotificationCenter from '../../components/ui/NotificationCenter';
import QuestionLibrary from './components/QuestionLibrary';
import QuestionEditor from './components/QuestionEditor';
import CategoryManager from './components/CategoryManager';
import ImportExportTools from './components/ImportExportTools';
import QuestionAnalytics from './components/QuestionAnalytics';

const QuestionBankManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('library');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userRole] = useState('faculty');
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);

  // Mock data for questions
  const mockQuestions = [
    {
      id: 1,
      text: 'Apa yang dimaksud dengan normalisasi database dan mengapa penting dalam desain database?',
      type: 'essay',
      difficulty: 'medium',
      subject: 'Sistem Basis Data',
      tags: ['normalisasi', 'database', 'desain'],
      points: 10,
      timeLimit: 15,
      explanation: 'Normalisasi adalah proses mengorganisir data dalam database untuk mengurangi redundansi dan meningkatkan integritas data.',
      usageCount: 12,
      lastModified: '2025-09-04T10:30:00Z',
      created: '2025-08-15T09:00:00Z'
    },
    {
      id: 2,
      text: 'Manakah dari berikut ini yang merupakan karakteristik utama dari algoritma bubble sort?',
      type: 'mcq',
      difficulty: 'easy',
      subject: 'Algoritma',
      tags: ['sorting', 'algoritma', 'bubble-sort'],
      points: 5,
      timeLimit: 5,
      options: [
        { text: 'Kompleksitas waktu O(n log n)', isCorrect: false },
        { text: 'Membandingkan elemen bersebelahan', isCorrect: true },
        { text: 'Menggunakan divide and conquer', isCorrect: false },
        { text: 'Memerlukan memori tambahan', isCorrect: false }
      ],
      explanation: 'Bubble sort bekerja dengan membandingkan elemen bersebelahan dan menukarnya jika tidak dalam urutan yang benar.',
      usageCount: 25,
      lastModified: '2025-09-03T14:20:00Z',
      created: '2025-08-10T11:15:00Z'
    },
    {
      id: 3,
      text: 'Protokol _____ digunakan untuk transfer file yang aman, sedangkan _____ digunakan untuk browsing web.',
      type: 'fill-blank',
      difficulty: 'medium',
      subject: 'Jaringan Komputer',
      tags: ['protokol', 'jaringan', 'keamanan'],
      points: 8,
      timeLimit: 10,
      fillBlanks: {
        text: 'Protokol [blank] digunakan untuk transfer file yang aman, sedangkan [blank] digunakan untuk browsing web.',
        blanks: ['SFTP', 'HTTP']
      },
      explanation: 'SFTP (Secure File Transfer Protocol) untuk transfer file aman, HTTP untuk web browsing.',
      usageCount: 18,
      lastModified: '2025-09-02T16:45:00Z',
      created: '2025-08-20T13:30:00Z'
    },
    {
      id: 4,
      text: 'Pernyataan "Semua variabel dalam Python harus dideklarasikan sebelum digunakan" adalah:',
      type: 'true-false',
      difficulty: 'easy',
      subject: 'Pemrograman',
      tags: ['python', 'variabel', 'deklarasi'],
      points: 3,
      timeLimit: 3,
      correctAnswer: 'false',
      explanation: 'Python adalah bahasa dinamis yang tidak memerlukan deklarasi variabel eksplisit.',
      usageCount: 32,
      lastModified: '2025-09-01T08:15:00Z',
      created: '2025-08-05T10:00:00Z'
    },
    {
      id: 5,
      text: 'Jodohkan konsep matematika berikut dengan definisinya:',
      type: 'matching',
      difficulty: 'hard',
      subject: 'Matematika',
      tags: ['konsep', 'definisi', 'matematika'],
      points: 12,
      timeLimit: 20,
      matchingPairs: [
        { left: 'Integral', right: 'Luas di bawah kurva' },
        { left: 'Derivatif', right: 'Tingkat perubahan' },
        { left: 'Limit', right: 'Nilai pendekatan' },
        { left: 'Matriks', right: 'Susunan bilangan' }
      ],
      explanation: 'Konsep-konsep dasar kalkulus dan aljabar linear.',
      usageCount: 8,
      lastModified: '2025-08-30T12:00:00Z',
      created: '2025-08-25T15:45:00Z'
    }
  ];

  const mockCategories = [
    {
      id: 1,
      name: 'Sistem Basis Data',
      description: 'Pertanyaan terkait database dan SQL',
      color: '#1E40AF',
      parentId: null,
      questionCount: 45,
      children: [
        {
          id: 2,
          name: 'SQL Dasar',
          description: 'Query SELECT, INSERT, UPDATE, DELETE',
          color: '#1E40AF',
          parentId: 1,
          questionCount: 20,
          children: []
        }
      ]
    },
    {
      id: 3,
      name: 'Algoritma',
      description: 'Struktur data dan algoritma',
      color: '#059669',
      parentId: null,
      questionCount: 38,
      children: []
    }
  ];

  useEffect(() => {
    setQuestions(mockQuestions);
    setCategories(mockCategories);
  }, []);

  const handleCreateQuestion = () => {
    setEditingQuestion(null);
    setShowQuestionEditor(true);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setShowQuestionEditor(true);
  };

  const handleSaveQuestion = (questionData) => {
    if (editingQuestion) {
      setQuestions(prev => prev?.map(q => q?.id === editingQuestion?.id ? questionData : q));
    } else {
      setQuestions(prev => [...prev, questionData]);
    }
    setShowQuestionEditor(false);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pertanyaan ini?')) {
      setQuestions(prev => prev?.filter(q => q?.id !== questionId));
      setSelectedQuestions(prev => prev?.filter(id => id !== questionId));
    }
  };

  const handleDuplicateQuestion = (question) => {
    const duplicatedQuestion = {
      ...question,
      id: Date.now(),
      text: `${question?.text} (Copy)`,
      usageCount: 0,
      created: new Date()?.toISOString(),
      lastModified: new Date()?.toISOString()
    };
    setQuestions(prev => [...prev, duplicatedQuestion]);
  };

  const handleBulkAction = (action, questionIds) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Apakah Anda yakin ingin menghapus ${questionIds?.length} pertanyaan?`)) {
          setQuestions(prev => prev?.filter(q => !questionIds?.includes(q?.id)));
          setSelectedQuestions([]);
        }
        break;
      case 'duplicate':
        const questionsToDuplicate = questions?.filter(q => questionIds?.includes(q?.id));
        const duplicatedQuestions = questionsToDuplicate?.map(q => ({
          ...q,
          id: Date.now() + Math.random(),
          text: `${q?.text} (Copy)`,
          usageCount: 0,
          created: new Date()?.toISOString(),
          lastModified: new Date()?.toISOString()
        }));
        setQuestions(prev => [...prev, ...duplicatedQuestions]);
        setSelectedQuestions([]);
        break;
      case 'export':
        console.log('Exporting questions:', questionIds);
        break;
      default:
        break;
    }
  };

  const handleCreateCategory = (categoryData) => {
    setCategories(prev => [...prev, categoryData]);
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCategories(prev => prev?.map(cat => 
      cat?.id === updatedCategory?.id ? updatedCategory : cat
    ));
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      setCategories(prev => prev?.filter(cat => cat?.id !== categoryId));
    }
  };

  const handleImport = (importData) => {
    console.log('Importing questions:', importData);
    // Simulate import process
    alert('Import berhasil! 15 pertanyaan telah ditambahkan.');
  };

  const handleExport = (exportSettings) => {
    console.log('Exporting with settings:', exportSettings);
    // Simulate export process
    alert('Export berhasil! File akan diunduh dalam beberapa detik.');
  };

  const tabs = [
    { id: 'library', label: 'Bank Soal', icon: 'Database' },
    { id: 'categories', label: 'Kategori', icon: 'Folder' },
    { id: 'import-export', label: 'Import/Export', icon: 'ArrowUpDown' },
    { id: 'analytics', label: 'Analitik', icon: 'BarChart3' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <RoleBasedSidebar 
        isCollapsed={sidebarCollapsed}
        userRole={userRole}
      />
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-240'}`}>
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                iconName="Menu"
                className="lg:hidden"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Manajemen Bank Soal</h1>
                <p className="text-sm text-muted-foreground">
                  Kelola dan organisir koleksi pertanyaan ujian
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ExamStatusIndicator userRole={userRole} />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(true)}
                iconName="Bell"
                className="relative"
              />

              <Button
                variant="default"
                onClick={handleCreateQuestion}
                iconName="Plus"
                iconPosition="left"
              >
                Buat Pertanyaan
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mt-6 border-b border-border">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab?.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === 'library' && (
            <QuestionLibrary
              questions={questions}
              onEditQuestion={handleEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onDuplicateQuestion={handleDuplicateQuestion}
              onBulkAction={handleBulkAction}
              selectedQuestions={selectedQuestions}
              onQuestionSelect={setSelectedQuestions}
            />
          )}

          {activeTab === 'categories' && (
            <CategoryManager
              categories={categories}
              onCreateCategory={handleCreateCategory}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}

          {activeTab === 'import-export' && (
            <ImportExportTools
              onImport={handleImport}
              onExport={handleExport}
              categories={categories}
            />
          )}

          {activeTab === 'analytics' && (
            <QuestionAnalytics />
          )}
        </main>
      </div>
      {/* Question Editor Modal */}
      <QuestionEditor
        question={editingQuestion}
        onSave={handleSaveQuestion}
        onCancel={() => {
          setShowQuestionEditor(false);
          setEditingQuestion(null);
        }}
        isOpen={showQuestionEditor}
      />
      {/* Notification Center */}
      <NotificationCenter
        userRole={userRole}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
};

export default QuestionBankManagement;