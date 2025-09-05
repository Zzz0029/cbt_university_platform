import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnnouncementPanel = ({ onViewAll }) => {
  const [expandedAnnouncement, setExpandedAnnouncement] = useState(null);

  const announcements = [
    {
      id: 1,
      type: 'urgent',
      title: 'Perubahan Jadwal Ujian Basis Data',
      content: `Ujian Basis Data yang dijadwalkan pada tanggal 10 September 2025 dipindahkan ke tanggal 12 September 2025 pukul 14:00 WIB.\n\nPerubahan ini dilakukan karena ada perbaikan sistem yang perlu dilakukan. Mohon persiapkan diri dengan baik.\n\nUntuk informasi lebih lanjut, silakan hubungi koordinator akademik.`,
      author: 'Dr. Ahmad Wijaya',
      department: 'Teknik Informatika',
      publishedAt: '2025-09-05T10:30:00Z',
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'Pemeliharaan Sistem CBT',
      content: `Sistem CBT akan menjalani pemeliharaan rutin pada:\n\nTanggal: 8 September 2025\nWaktu: 02:00 - 04:00 WIB\n\nSelama periode ini, sistem tidak dapat diakses. Mohon rencanakan aktivitas ujian di luar waktu pemeliharaan.`,
      author: 'Tim IT Universitas',
      department: 'Pusat Teknologi Informasi',
      publishedAt: '2025-09-04T16:45:00Z',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'general',
      title: 'Panduan Teknis Ujian Online',
      content: `Dokumen panduan teknis untuk ujian online telah diperbarui. Panduan mencakup:\n\n• Persyaratan sistem minimum\n• Cara mengatasi masalah teknis\n• Prosedur darurat selama ujian\n\nSilakan unduh dari portal akademik.`,
      author: 'Bagian Akademik',
      department: 'Universitas',
      publishedAt: '2025-09-03T09:15:00Z',
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Info';
      case 'low': return 'Bell';
      default: return 'MessageSquare';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Penting';
      case 'medium': return 'Informasi';
      case 'low': return 'Umum';
      default: return 'Pengumuman';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleExpanded = (id) => {
    setExpandedAnnouncement(expandedAnnouncement === id ? null : id);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Pengumuman Terbaru</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ExternalLink"
          iconPosition="right"
        >
          Lihat Semua
        </Button>
      </div>
      <div className="space-y-4">
        {announcements?.map((announcement) => (
          <div
            key={announcement?.id}
            className="border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getPriorityColor(announcement?.priority)}`}>
                  <div className="flex items-center space-x-1">
                    <Icon name={getPriorityIcon(announcement?.priority)} size={12} />
                    <span>{getPriorityText(announcement?.priority)}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-foreground mb-1">
                    {announcement?.title}
                  </h4>
                  
                  <div className="text-sm text-muted-foreground mb-2">
                    <span>{announcement?.author}</span>
                    <span className="mx-2">•</span>
                    <span>{announcement?.department}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpanded(announcement?.id)}
                iconName={expandedAnnouncement === announcement?.id ? 'ChevronUp' : 'ChevronDown'}
              />
            </div>

            <div className="text-sm text-foreground">
              {expandedAnnouncement === announcement?.id ? (
                <div className="whitespace-pre-line">
                  {announcement?.content}
                </div>
              ) : (
                <p>
                  {announcement?.content?.split('\n')?.[0]}
                  {announcement?.content?.length > 100 && '...'}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">
                Dipublikasikan: {formatDate(announcement?.publishedAt)}
              </span>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Share2"
                  className="text-xs"
                >
                  Bagikan
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Bookmark"
                  className="text-xs"
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {announcements?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">Tidak Ada Pengumuman</h4>
          <p className="text-sm text-muted-foreground">
            Pengumuman terbaru akan muncul di sini
          </p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementPanel;