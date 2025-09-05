import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CategoryManager = ({ 
  categories = [], 
  onCreateCategory, 
  onUpdateCategory, 
  onDeleteCategory,
  className = '' 
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    parentId: null,
    color: '#1E40AF'
  });

  const colorOptions = [
    { value: '#1E40AF', label: 'Biru' },
    { value: '#059669', label: 'Hijau' },
    { value: '#DC2626', label: 'Merah' },
    { value: '#D97706', label: 'Oranye' },
    { value: '#7C3AED', label: 'Ungu' },
    { value: '#BE185D', label: 'Pink' }
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
        },
        {
          id: 3,
          name: 'Normalisasi',
          description: 'Bentuk normal database',
          color: '#1E40AF',
          parentId: 1,
          questionCount: 15,
          children: []
        }
      ]
    },
    {
      id: 4,
      name: 'Algoritma',
      description: 'Struktur data dan algoritma',
      color: '#059669',
      parentId: null,
      questionCount: 38,
      children: [
        {
          id: 5,
          name: 'Sorting',
          description: 'Algoritma pengurutan',
          color: '#059669',
          parentId: 4,
          questionCount: 18,
          children: []
        }
      ]
    },
    {
      id: 6,
      name: 'Jaringan Komputer',
      description: 'Protokol dan arsitektur jaringan',
      color: '#DC2626',
      parentId: null,
      questionCount: 32,
      children: []
    }
  ];

  const allCategories = categories?.length > 0 ? categories : mockCategories;

  const toggleExpanded = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded?.has(categoryId)) {
      newExpanded?.delete(categoryId);
    } else {
      newExpanded?.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCreateCategory = () => {
    if (newCategory?.name?.trim()) {
      const categoryData = {
        ...newCategory,
        id: Date.now(),
        questionCount: 0,
        children: []
      };
      onCreateCategory(categoryData);
      setNewCategory({
        name: '',
        description: '',
        parentId: null,
        color: '#1E40AF'
      });
      setIsCreating(false);
    }
  };

  const handleUpdateCategory = (category) => {
    onUpdateCategory(category);
    setEditingCategory(null);
  };

  const getParentOptions = (excludeId = null) => {
    const options = [{ value: null, label: 'Kategori Utama' }];
    
    const addOptions = (cats, level = 0) => {
      cats?.forEach(cat => {
        if (cat?.id !== excludeId) {
          options?.push({
            value: cat?.id,
            label: '  '?.repeat(level) + cat?.name
          });
          if (cat?.children && cat?.children?.length > 0) {
            addOptions(cat?.children, level + 1);
          }
        }
      });
    };
    
    addOptions(allCategories);
    return options;
  };

  const renderCategory = (category, level = 0) => {
    const isExpanded = expandedCategories?.has(category?.id);
    const hasChildren = category?.children && category?.children?.length > 0;
    const isEditing = editingCategory?.id === category?.id;

    return (
      <div key={category?.id} className="space-y-2">
        <div 
          className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow"
          style={{ marginLeft: `${level * 24}px` }}
        >
          <div className="flex items-center space-x-3 flex-1">
            {hasChildren && (
              <button
                onClick={() => toggleExpanded(category?.id)}
                className="p-1 hover:bg-muted rounded"
              >
                <Icon 
                  name={isExpanded ? 'ChevronDown' : 'ChevronRight'} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </button>
            )}
            
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: category?.color }}
            />
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={editingCategory?.name}
                    onChange={(e) => setEditingCategory({
                      ...editingCategory,
                      name: e?.target?.value
                    })}
                    placeholder="Nama kategori"
                    className="text-sm"
                  />
                  <Input
                    value={editingCategory?.description}
                    onChange={(e) => setEditingCategory({
                      ...editingCategory,
                      description: e?.target?.value
                    })}
                    placeholder="Deskripsi"
                    className="text-sm"
                  />
                </div>
              ) : (
                <div>
                  <h4 className="font-medium text-foreground">{category?.name}</h4>
                  <p className="text-sm text-muted-foreground">{category?.description}</p>
                </div>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              {category?.questionCount} pertanyaan
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleUpdateCategory(editingCategory)}
                  iconName="Check"
                  className="h-8 w-8 text-success"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingCategory(null)}
                  iconName="X"
                  className="h-8 w-8 text-error"
                />
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingCategory(category)}
                  iconName="Edit2"
                  className="h-8 w-8"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteCategory(category?.id)}
                  iconName="Trash2"
                  className="h-8 w-8 text-error hover:text-error"
                />
              </>
            )}
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="space-y-2">
            {category?.children?.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Manajemen Kategori</h3>
          <p className="text-sm text-muted-foreground">
            Kelola kategori dan subkategori untuk mengorganisir bank soal
          </p>
        </div>
        <Button
          variant="default"
          onClick={() => setIsCreating(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Tambah Kategori
        </Button>
      </div>
      {/* Create Category Form */}
      {isCreating && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-medium text-foreground mb-4">Buat Kategori Baru</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Nama Kategori"
              placeholder="Masukkan nama kategori"
              value={newCategory?.name}
              onChange={(e) => setNewCategory({
                ...newCategory,
                name: e?.target?.value
              })}
              required
            />
            <Select
              label="Kategori Induk"
              options={getParentOptions()}
              value={newCategory?.parentId}
              onChange={(value) => setNewCategory({
                ...newCategory,
                parentId: value
              })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Deskripsi"
              placeholder="Deskripsi kategori"
              value={newCategory?.description}
              onChange={(e) => setNewCategory({
                ...newCategory,
                description: e?.target?.value
              })}
            />
            <Select
              label="Warna"
              options={colorOptions}
              value={newCategory?.color}
              onChange={(value) => setNewCategory({
                ...newCategory,
                color: value
              })}
            />
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="default"
              onClick={handleCreateCategory}
              disabled={!newCategory?.name?.trim()}
            >
              Buat Kategori
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsCreating(false)}
            >
              Batal
            </Button>
          </div>
        </div>
      )}
      {/* Categories List */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="space-y-3">
          {allCategories?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="FolderOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">Belum ada kategori</h4>
              <p className="text-muted-foreground">
                Buat kategori pertama untuk mengorganisir bank soal Anda
              </p>
            </div>
          ) : (
            allCategories?.map(category => renderCategory(category))
          )}
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Folder" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Kategori</p>
              <p className="text-xl font-semibold text-foreground">
                {allCategories?.reduce((acc, cat) => acc + 1 + (cat?.children?.length || 0), 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Pertanyaan</p>
              <p className="text-xl font-semibold text-foreground">
                {allCategories?.reduce((acc, cat) => acc + cat?.questionCount + 
                  (cat?.children?.reduce((childAcc, child) => childAcc + child?.questionCount, 0) || 0), 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rata-rata per Kategori</p>
              <p className="text-xl font-semibold text-foreground">
                {Math.round(allCategories?.reduce((acc, cat) => acc + cat?.questionCount, 0) / Math.max(allCategories?.length, 1))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;