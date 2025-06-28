// src/components/AdminContentManagement.js
import React, { useState, useEffect } from 'react';

function AdminContentManagement() {
  const [activeTab, setActiveTab] = useState('videos');
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);
  const [liveSettings, setLiveSettings] = useState({ 
    isActive: false, 
    streamUrl: '', 
    streamType: 'youtube',
    streamOwner: 'omareldalil060@gmail.com'
  });
  const [loading, setLoading] = useState(false);
  
  // نموذج إضافة فيديو/ملف جديد
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ 
    id: '', 
    thumbnail: '', 
    notes: '', 
    isLive: false
  });
  const [editingItem, setEditingItem] = useState(null);

  // إعدادات GitHub
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_PAT;
  const REPO_OWNER = 'omareldalil24';
  const REPO_NAME = 'PIONEER';

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadVideos(), loadFiles(), loadLiveSettings()]);
    } catch (error) {
      console.error('خطأ في تحميل البيانات:', error);
    } finally {
      setLoading(false);
    }
  };

  // جلب الفيديوهات
  const loadVideos = async () => {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/public/grades/grade3/videos.json?${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        setVideos(data || []);
      }
    } catch (error) {
      console.error('خطأ في جلب الفيديوهات:', error);
      setVideos([]);
    }
  };

  // جلب الملفات
  const loadFiles = async () => {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/public/grades/grade3/files.json?${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        setFiles(data || []);
      }
    } catch (error) {
      console.error('خطأ في جلب الملفات:', error);
      setFiles([]);
    }
  };

  // جلب إعدادات البث المباشر
  const loadLiveSettings = async () => {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/public/grades/grade3/live.json?${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        setLiveSettings(data || { 
          isActive: false, 
          streamUrl: '', 
          streamType: 'youtube',
          streamOwner: 'omareldalil060@gmail.com'
        });
      }
    } catch (error) {
      console.error('خطأ في جلب إعدادات البث:', error);
      setLiveSettings({ 
        isActive: false, 
        streamUrl: '', 
        streamType: 'youtube',
        streamOwner: 'omareldalil060@gmail.com'
      });
    }
  };

  // حفظ البيانات في GitHub
  const saveToGitHub = async (filePath, data, message) => {
    try {
      if (!GITHUB_TOKEN) {
        throw new Error('GITHUB_TOKEN غير موجود');
      }

      let sha = null;
      try {
        const fileResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
          headers: { 'Authorization': `Bearer ${GITHUB_TOKEN}` }
        });
        if (fileResponse.ok) {
          const fileData = await fileResponse.json();
          sha = fileData.sha;
        }
      } catch (error) {
        console.log('الملف غير موجود، سيتم إنشاء ملف جديد');
      }

      const jsonContent = JSON.stringify(data, null, 2);
      const base64Content = btoa(unescape(encodeURIComponent(jsonContent)));

      const requestBody = {
        message: message,
        content: base64Content,
        branch: 'main'
      };

      if (sha) {
        requestBody.sha = sha;
      }

      const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`فشل في حفظ البيانات: ${errorData.message}`);
      }

      return true;
    } catch (error) {
      console.error('خطأ في حفظ البيانات:', error);
      throw error;
    }
  };

  // حفظ الفيديوهات
  const saveVideos = async (videosData) => {
    await saveToGitHub('public/grades/grade3/videos.json', videosData, 'تحديث الفيديوهات');
  };

  // حفظ الملفات
  const saveFiles = async (filesData) => {
    await saveToGitHub('public/grades/grade3/files.json', filesData, 'تحديث الملفات');
  };

  // حفظ إعدادات البث المباشر
  const saveLiveSettings = async (liveData) => {
    await saveToGitHub('public/grades/grade3/live.json', liveData, 'تحديث إعدادات البث المباشر');
  };

  // استخراج ID من رابط متعدد المنصات
  const extractStreamId = (url, platform) => {
    if (!url) return null;
    
    // YouTube
    if (platform === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
      if (url.includes('youtube.com/live/')) {
        const match = url.match(/youtube\.com\/live\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
      } else if (url.includes('youtube.com/watch?v=')) {
        const match = url.match(/watch\?v=([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
      } else if (url.includes('youtu.be/')) {
        const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
      } else if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
        return url.trim();
      }
    }
    
    // Google Meet
    if (platform === 'meet' || url.includes('meet.google.com')) {
      return url; // إرجاع الرابط كاملاً للـ Meet
    }
    
    // Facebook
    if (platform === 'facebook' || url.includes('facebook.com')) {
      return url; // إرجاع الرابط كاملاً للـ Facebook
    }
    
    // Vimeo
    if (platform === 'vimeo' || url.includes('vimeo.com')) {
      if (url.includes('vimeo.com/')) {
        const match = url.match(/vimeo\.com\/(\d+)/);
        return match ? match[1] : null;
      } else if (/^\d+$/.test(url.trim())) {
        return url.trim();
      }
    }
    
    return url;
  };

  // تحديد نوع المنصة تلقائياً
  const detectPlatformType = (url) => {
    if (!url) return 'youtube';
    
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('meet.google.com')) {
      return 'meet';
    } else if (url.includes('facebook.com')) {
      return 'facebook';
    } else if (url.includes('vimeo.com')) {
      return 'vimeo';
    }
    
    return 'youtube'; // افتراضي
  };

  // إضافة عنصر جديد
  const handleAddItem = async () => {
    if (!newItem.id || !newItem.thumbnail) {
      alert('⚠️ يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      setLoading(true);

      // للفيديوهات: التأكد من أن ID صحيح
      let processedId = newItem.id.trim();
      if (activeTab === 'videos') {
        const detectedPlatform = detectPlatformType(processedId);
        const extractedId = extractStreamId(processedId, detectedPlatform);
        if (!extractedId) {
          alert('⚠️ يرجى إدخال رابط صحيح أو ID صحيح');
          return;
        }
        processedId = extractedId;
      }

      // تحديد نوع الرابط المناسب للصور
      let thumbnailPath = newItem.thumbnail.trim();

      if (thumbnailPath.startsWith('/grades/')) {
        thumbnailPath = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/public${thumbnailPath}`;
      } else if (!thumbnailPath.startsWith('http')) {
        thumbnailPath = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/public/grades/grade3/${thumbnailPath}`;
      } else if (thumbnailPath.includes('github.com') && thumbnailPath.includes('blob')) {
        thumbnailPath = thumbnailPath
          .replace('github.com', 'raw.githubusercontent.com')
          .replace('/blob', '')
          .replace('?raw=true', '');
      }

      const newItemData = {
        id: processedId,
        thumbnail: thumbnailPath,
        notes: newItem.notes.trim(),
        isLive: newItem.isLive || false
      };

      if (activeTab === 'videos') {
        const updatedVideos = [...videos, newItemData];
        await saveVideos(updatedVideos);
        setVideos(updatedVideos);
      } else if (activeTab === 'files') {
        const updatedFiles = [...files, newItemData];
        await saveFiles(updatedFiles);
        setFiles(updatedFiles);
      }

      setNewItem({ id: '', thumbnail: '', notes: '', isLive: false });
      setShowAddModal(false);
      alert('✅ تم إضافة العنصر بنجاح!');
    } catch (error) {
      alert(`❌ خطأ في إضافة العنصر: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // تعديل عنصر
  const handleEditItem = async (index) => {
    if (!editingItem.id || !editingItem.thumbnail) {
      alert('⚠️ يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      setLoading(true);

      let processedId = editingItem.id.trim();
      if (activeTab === 'videos') {
        const detectedPlatform = detectPlatformType(processedId);
        const extractedId = extractStreamId(processedId, detectedPlatform);
        if (!extractedId) {
          alert('⚠️ يرجى إدخال رابط صحيح أو ID صحيح');
          return;
        }
        processedId = extractedId;
      }

      let thumbnailPath = editingItem.thumbnail.trim();

      if (thumbnailPath.startsWith('/grades/')) {
        thumbnailPath = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/public${thumbnailPath}`;
      } else if (!thumbnailPath.startsWith('http')) {
        thumbnailPath = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/public/grades/grade3/${thumbnailPath}`;
      } else if (thumbnailPath.includes('github.com') && thumbnailPath.includes('blob')) {
        thumbnailPath = thumbnailPath
          .replace('github.com', 'raw.githubusercontent.com')
          .replace('/blob', '')
          .replace('?raw=true', '');
      }

      const updatedItem = {
        id: processedId,
        thumbnail: thumbnailPath,
        notes: editingItem.notes.trim(),
        isLive: editingItem.isLive || false
      };

      if (activeTab === 'videos') {
        const updatedVideos = [...videos];
        updatedVideos[index] = updatedItem;
        await saveVideos(updatedVideos);
        setVideos(updatedVideos);
      } else if (activeTab === 'files') {
        const updatedFiles = [...files];
        updatedFiles[index] = updatedItem;
        await saveFiles(updatedFiles);
        setFiles(updatedFiles);
      }

      setEditingItem(null);
      alert('✅ تم تحديث العنصر بنجاح!');
    } catch (error) {
      alert(`❌ خطأ في تحديث العنصر: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // حذف عنصر
  const handleDeleteItem = async (index) => {
    if (!window.confirm('🗑️ هل أنت متأكد من حذف هذا العنصر؟')) {
      return;
    }

    try {
      setLoading(true);

      if (activeTab === 'videos') {
        const updatedVideos = videos.filter((_, i) => i !== index);
        await saveVideos(updatedVideos);
        setVideos(updatedVideos);
      } else if (activeTab === 'files') {
        const updatedFiles = files.filter((_, i) => i !== index);
        await saveFiles(updatedFiles);
        setFiles(updatedFiles);
      }

      alert('✅ تم حذف العنصر بنجاح!');
    } catch (error) {
      alert(`❌ خطأ في حذف العنصر: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // تحديث إعدادات البث المباشر
  const handleUpdateLiveSettings = async () => {
    try {
      setLoading(true);
      
      // تحديد نوع المنصة تلقائياً إذا لم يتم تحديدها
      const detectedType = detectPlatformType(liveSettings.streamUrl);
      const updatedSettings = {
        ...liveSettings,
        streamType: detectedType,
        streamOwner: 'omareldalil060@gmail.com' // تأكيد صاحب البث
      };
      
      await saveLiveSettings(updatedSettings);
      setLiveSettings(updatedSettings);
      alert('✅ تم تحديث إعدادات البث المباشر بنجاح!');
    } catch (error) {
      alert(`❌ خطأ في تحديث إعدادات البث: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // دالة للحصول على معلومات المنصة
  const getPlatformInfo = (type) => {
    switch (type) {
      case 'youtube':
        return {
          icon: '📺',
          name: 'YouTube Live',
          color: '#ff0000',
          bgColor: 'rgba(255, 0, 0, 0.1)',
          placeholder: 'https://youtube.com/live/VIDEO_ID أو VIDEO_ID'
        };
      case 'meet':
        return {
          icon: '👥',
          name: 'Google Meet',
          color: '#4285f4',
          bgColor: 'rgba(66, 133, 244, 0.1)',
          placeholder: 'https://meet.google.com/xyz-abc-def'
        };
      case 'facebook':
        return {
          icon: '📘',
          name: 'Facebook Live',
          color: '#1877f2',
          bgColor: 'rgba(24, 119, 242, 0.1)',
          placeholder: 'https://facebook.com/username/videos/123456789'
        };
      case 'vimeo':
        return {
          icon: '🎬',
          name: 'Vimeo',
          color: '#1ab7ea',
          bgColor: 'rgba(26, 183, 234, 0.1)',
          placeholder: 'https://vimeo.com/123456789 أو 123456789'
        };
      default:
        return {
          icon: '🔴',
          name: 'البث المباشر',
          color: '#e74c3c',
          bgColor: 'rgba(231, 76, 60, 0.1)',
          placeholder: 'رابط البث المباشر'
        };
    }
  };

  const getCurrentData = () => {
    return activeTab === 'videos' ? videos : files;
  };

  const currentPlatformInfo = getPlatformInfo(liveSettings.streamType);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #c31432, #8e0000, #240b36)',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid #c31432',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 25px'
          }}></div>
          <h3 style={{ 
            fontWeight: '700', 
            fontSize: '1.8rem',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>🔄 جاري التحميل...</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #c31432, #8e0000, #240b36)',
        backgroundAttachment: 'fixed',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        paddingTop: '100px'
      }}>
        {/* Header Section */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 50px auto',
          padding: '0 20px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '30px',
            padding: '40px 50px',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            animation: 'slideInUp 0.6s ease-out'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '300px',
              height: '300px',
              background: 'linear-gradient(135deg, rgba(195, 20, 50, 0.1), rgba(142, 0, 0, 0.05))',
              borderRadius: '50%',
              zIndex: 0
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-40%',
              left: '-15%',
              width: '250px',
              height: '250px',
              background: 'linear-gradient(135deg, rgba(195, 20, 50, 0.05), rgba(142, 0, 0, 0.1))',
              borderRadius: '50%',
              zIndex: 0
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                background: 'linear-gradient(135deg, #c31432, #8e0000)',
                color: 'white',
                padding: '20px 30px',
                borderRadius: '25px',
                fontSize: '3.5rem',
                marginBottom: '25px',
                display: 'inline-block',
                boxShadow: '0 15px 35px rgba(195, 20, 50, 0.4)',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                🎛️
              </div>
              <h1 style={{ 
                color: '#2c3e50',
                margin: '0 0 15px 0',
                fontSize: '2.8rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #c31432, #8e0000)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none'
              }}>
                إدارة المحتوى التعليمي المتقدم
              </h1>
              <p style={{ 
                color: '#6c757d',
                fontSize: '1.3rem',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.6'
              }}>
                تحكم شامل متعدد المنصات في البث المباشر والمحتوى
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 50px auto',
          padding: '0 20px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '25px',
            padding: '15px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            animation: 'slideInUp 0.6s ease-out 0.2s both'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '15px',
              direction: 'rtl'
            }}>
              <button
                onClick={() => setActiveTab('videos')}
                style={{
                  padding: '25px 20px',
                  background: activeTab === 'videos' ? 
                    'linear-gradient(135deg, #c31432, #8e0000)' : 
                    'rgba(195, 20, 50, 0.05)',
                  color: activeTab === 'videos' ? 'white' : '#c31432',
                  border: `3px solid ${activeTab === 'videos' ? '#c31432' : 'rgba(195, 20, 50, 0.2)'}`,
                  borderRadius: '20px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  textShadow: activeTab === 'videos' ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none',
                  boxShadow: activeTab === 'videos' ? 
                    '0 10px 30px rgba(195, 20, 50, 0.3)' : 
                    '0 5px 15px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div style={{ fontSize: '2rem' }}>📹</div>
                <div>إدارة الفيديوهات</div>
                <small style={{ 
                  opacity: 0.8, 
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {videos.length} فيديو
                </small>
              </button>

              <button
                onClick={() => setActiveTab('files')}
                style={{
                  padding: '25px 20px',
                  background: activeTab === 'files' ? 
                    'linear-gradient(135deg, #00b894, #00a085)' : 
                    'rgba(0, 184, 148, 0.05)',
                  color: activeTab === 'files' ? 'white' : '#00b894',
                  border: `3px solid ${activeTab === 'files' ? '#00b894' : 'rgba(0, 184, 148, 0.2)'}`,
                  borderRadius: '20px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  textShadow: activeTab === 'files' ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none',
                  boxShadow: activeTab === 'files' ? 
                    '0 10px 30px rgba(0, 184, 148, 0.3)' : 
                    '0 5px 15px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div style={{ fontSize: '2rem' }}>📄</div>
                <div>إدارة الملفات</div>
                <small style={{ 
                  opacity: 0.8, 
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {files.length} ملف
                </small>
              </button>

              <button
                onClick={() => setActiveTab('live')}
                style={{
                  padding: '25px 20px',
                  background: activeTab === 'live' ? 
                    `linear-gradient(135deg, ${currentPlatformInfo.color}, ${currentPlatformInfo.color}CC)` : 
                    currentPlatformInfo.bgColor,
                  color: activeTab === 'live' ? 'white' : currentPlatformInfo.color,
                  border: `3px solid ${activeTab === 'live' ? currentPlatformInfo.color : currentPlatformInfo.color}33`,
                  borderRadius: '20px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  textShadow: activeTab === 'live' ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none',
                  boxShadow: activeTab === 'live' ? 
                    `0 10px 30px ${currentPlatformInfo.bgColor}` : 
                    '0 5px 15px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  position: 'relative'
                }}
              >
                {liveSettings.isActive && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    animation: 'pulse 1.5s infinite',
                    boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.3)',
                    zIndex: 10
                  }}></div>
                )}
                <div style={{ fontSize: '2rem' }}>{currentPlatformInfo.icon}</div>
                <div>البث المباشر متعدد المنصات</div>
                <small style={{ 
                  opacity: 0.8, 
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {liveSettings.isActive ? `نشط على ${currentPlatformInfo.name}` : 'غير نشط'}
                </small>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px 50px 20px'
        }}>
          {/* Videos & Files Management */}
          {(activeTab === 'videos' || activeTab === 'files') && (
            <div>
              {/* Add Button */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '25px',
                marginBottom: '30px',
                textAlign: 'center',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'slideInUp 0.6s ease-out 0.4s both'
              }}>
                <button
                  onClick={() => setShowAddModal(true)}
                  style={{
                    background: activeTab === 'videos' ? 
                      'linear-gradient(135deg, #c31432, #8e0000)' : 
                      'linear-gradient(135deg, #00b894, #00a085)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '15px 30px',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  ➕ إضافة {activeTab === 'videos' ? 'فيديو' : 'ملف'} جديد
                </button>
              </div>

              {/* Data Table */}
              {getCurrentData().length > 0 ? (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  animation: 'slideInUp 0.6s ease-out 0.6s both'
                }}>
                  <div style={{
                    background: activeTab === 'videos' ? 
                      'linear-gradient(135deg, #c31432, #8e0000)' : 
                      'linear-gradient(135deg, #00b894, #00a085)',
                    color: 'white',
                    padding: '20px',
                    display: 'grid',
                    gridTemplateColumns: activeTab === 'videos' ? '60px 1fr 200px 1fr 100px 120px' : '60px 1fr 200px 1fr 120px',
                    gap: '15px',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    direction: 'rtl'
                  }}>
                    <div>#</div>
                    <div>{activeTab === 'videos' ? 'معرف الفيديو' : 'معرف الملف'}</div>
                    <div>الصورة</div>
                    <div>الملاحظات</div>
                    {activeTab === 'videos' && <div>نوع العرض</div>}
                    <div>الإجراءات</div>
                  </div>
                  
                  {getCurrentData().map((item, index) => (
                    <div key={index} style={{
                      padding: '20px',
                      display: 'grid',
                      gridTemplateColumns: activeTab === 'videos' ? '60px 1fr 200px 1fr 100px 120px' : '60px 1fr 200px 1fr 120px',
                      gap: '15px',
                      borderBottom: index < getCurrentData().length - 1 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
                      direction: 'rtl',
                      alignItems: 'center'
                    }}>
                      <div style={{ fontWeight: '600', color: '#2c3e50' }}>{index + 1}</div>
                      
                      {editingItem && editingItem.index === index ? (
                        <>
                          <input
                            type="text"
                            value={editingItem.id}
                            onChange={(e) => setEditingItem({...editingItem, id: e.target.value})}
                            placeholder={activeTab === 'videos' ? 'رابط أو معرف متعدد المنصات' : 'معرف الملف'}
                            style={{
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: '2px solid rgba(195, 20, 50, 0.3)',
                              fontSize: '14px',
                              fontFamily: activeTab === 'videos' ? 'inherit' : 'monospace'
                            }}
                          />
                          <input
                            type="text"
                            value={editingItem.thumbnail}
                            onChange={(e) => setEditingItem({...editingItem, thumbnail: e.target.value})}
                            placeholder="/grades/grade3/image.png"
                            style={{
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: '2px solid rgba(195, 20, 50, 0.3)',
                              fontSize: '14px'
                            }}
                          />
                          <input
                            type="text"
                            value={editingItem.notes}
                            onChange={(e) => setEditingItem({...editingItem, notes: e.target.value})}
                            style={{
                              padding: '8px 12px',
                              borderRadius: '8px',
                              border: '2px solid rgba(195, 20, 50, 0.3)',
                              fontSize: '14px'
                            }}
                          />
                          {activeTab === 'videos' && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input
                                type="checkbox"
                                checked={editingItem.isLive || false}
                                onChange={(e) => setEditingItem({...editingItem, isLive: e.target.checked})}
                                style={{ width: '18px', height: '18px' }}
                              />
                              <span style={{ fontSize: '12px', color: editingItem.isLive ? '#e74c3c' : '#6c757d' }}>
                                {editingItem.isLive ? '🔴 Live' : '📹 عادي'}
                              </span>
                            </div>
                          )}
                          <div style={{ display: 'flex', gap: '5px' }}>
                            <button
                              onClick={() => handleEditItem(index)}
                              style={{
                                background: 'linear-gradient(135deg, #00b894, #00a085)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}
                            >
                              ✅
                            </button>
                            <button
                              onClick={() => setEditingItem(null)}
                              style={{
                                background: 'linear-gradient(135deg, #6c757d, #5a6268)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}
                            >
                              ❌
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ 
                            fontFamily: activeTab === 'videos' ? 'inherit' : 'monospace', 
                            fontSize: '13px', 
                            color: '#2c3e50',
                            wordBreak: 'break-all'
                          }}>
                            {activeTab === 'videos' ? (
                              <div>
                                <div style={{ color: '#e74c3c', fontWeight: '600', marginBottom: '5px' }}>
                                  {detectPlatformType(item.id) === 'youtube' && '📺 YouTube'}
                                  {detectPlatformType(item.id) === 'meet' && '👥 Google Meet'}
                                  {detectPlatformType(item.id) === 'facebook' && '📘 Facebook'}
                                  {detectPlatformType(item.id) === 'vimeo' && '🎬 Vimeo'}
                                </div>
                                <div style={{ fontSize: '12px' }}>{item.id}</div>
                              </div>
                            ) : (
                              item.id
                            )}
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <img 
                              src={item.thumbnail} 
                              alt="صورة مصغرة"
                              style={{
                                width: '100px',
                                height: '60px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '2px solid rgba(0, 0, 0, 0.1)'
                              }}
                              onError={(e) => {
                                if (!e.target.src.includes('?raw=true') && e.target.src.includes('github.com')) {
                                  e.target.src = e.target.src + '?raw=true';
                                  return;
                                }
                                
                                if (e.target.src.includes('github.com') && e.target.src.includes('blob')) {
                                  const rawUrl = e.target.src
                                    .replace('github.com', 'raw.githubusercontent.com')
                                    .replace('/blob', '')
                                    .replace('?raw=true', '');
                                  e.target.src = rawUrl;
                                  return;
                                }
                                
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                              onLoad={(e) => {
                                e.target.style.display = 'block';
                                if (e.target.nextSibling) {
                                  e.target.nextSibling.style.display = 'none';
                                }
                              }}
                            />
                            <div style={{
                              display: 'none',
                              width: '100px',
                              height: '60px',
                              background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                              borderRadius: '8px',
                              color: 'white',
                              fontSize: '12px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: '600',
                              flexDirection: 'column',
                              gap: '4px'
                            }}>
                              <div>❌</div>
                              <div>صورة غير متاحة</div>
                            </div>
                          </div>
                          <div style={{ 
                            color: '#2c3e50', 
                            fontSize: '14px',
                            lineHeight: '1.4'
                          }}>
                            {item.notes || 'لا توجد ملاحظات'}
                          </div>
                          {activeTab === 'videos' && (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '5px'
                            }}>
                              <span style={{
                                background: item.isLive ? 
                                  'linear-gradient(135deg, #e74c3c, #c0392b)' : 
                                  'linear-gradient(135deg, #6c757d, #5a6268)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600'
                              }}>
                                {item.isLive ? '🔴 Live' : '📹 عادي'}
                              </span>
                            </div>
                          )}
                          <div style={{ display: 'flex', gap: '5px' }}>
                            <button
                              onClick={() => setEditingItem({...item, index})}
                              style={{
                                background: 'linear-gradient(135deg, #f39c12, #e67e22)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteItem(index)}
                              style={{
                                background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}
                            >
                              🗑️
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '50px',
                  textAlign: 'center',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                  animation: 'slideInUp 0.6s ease-out 0.6s both'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.5 }}>
                    {activeTab === 'videos' ? '📹' : '📄'}
                  </div>
                  <h3 style={{ 
                    color: '#6c757d', 
                    fontSize: '1.5rem', 
                    fontWeight: '700'
                  }}>
                    لا توجد {activeTab === 'videos' ? 'فيديوهات' : 'ملفات'} حالياً
                  </h3>
                  <p style={{ 
                    color: '#7f8c8d', 
                    fontSize: '1.1rem'
                  }}>
                    انقر على "إضافة {activeTab === 'videos' ? 'فيديو' : 'ملف'} جديد" لبدء إضافة المحتوى
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Live Settings - Enhanced Multi-Platform */}
          {activeTab === 'live' && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '50px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              animation: 'slideInUp 0.6s ease-out 0.4s both',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* عناصر زخرفية */}
              <div style={{
                position: 'absolute',
                top: '-30%',
                right: '-15%',
                width: '200px',
                height: '200px',
                background: `linear-gradient(135deg, ${currentPlatformInfo.color}20, ${currentPlatformInfo.color}10)`,
                borderRadius: '50%',
                zIndex: 0
              }}></div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <div style={{
                    background: `linear-gradient(135deg, ${currentPlatformInfo.color}, ${currentPlatformInfo.color}CC)`,
                    color: 'white',
                    padding: '20px 25px',
                    borderRadius: '25px',
                    fontSize: '2.5rem',
                    marginBottom: '20px',
                    display: 'inline-block',
                    boxShadow: `0 15px 35px ${currentPlatformInfo.bgColor}`,
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    position: 'relative'
                  }}>
                    {currentPlatformInfo.icon}
                    {liveSettings.isActive && (
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        width: '15px',
                        height: '15px',
                        backgroundColor: '#ffffff',
                        borderRadius: '50%',
                        animation: 'pulse 1.5s infinite',
                        boxShadow: '0 0 0 5px rgba(255, 255, 255, 0.3)'
                      }}></div>
                    )}
                  </div>
                  <h2 style={{
                    color: '#2c3e50',
                    fontSize: '2.2rem',
                    fontWeight: '700',
                    marginBottom: '15px'
                  }}>
                    إدارة البث المباشر متعدد المنصات
                  </h2>
                  <p style={{
                    color: '#6c757d',
                    fontSize: '1.2rem',
                    fontWeight: '500'
                  }}>
                    دعم {currentPlatformInfo.name} والمنصات الأخرى
                  </p>
                </div>

                {/* Platform Selection */}
                <div style={{ marginBottom: '30px', direction: 'rtl' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '15px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    fontSize: '1.2rem'
                  }}>
                    🎯 اختر منصة البث:
                  </label>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px',
                    marginBottom: '25px'
                  }}>
                    {['youtube', 'meet', 'vimeo', 'facebook'].map(platform => {
                      const platformData = getPlatformInfo(platform);
                      return (
                        <button
                          key={platform}
                          onClick={() => setLiveSettings({...liveSettings, streamType: platform})}
                          style={{
                            padding: '20px',
                            background: liveSettings.streamType === platform ? 
                              `linear-gradient(135deg, ${platformData.color}, ${platformData.color}CC)` : 
                              platformData.bgColor,
                            color: liveSettings.streamType === platform ? 'white' : platformData.color,
                            border: `2px solid ${liveSettings.streamType === platform ? platformData.color : platformData.color}33`,
                            borderRadius: '15px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                            fontWeight: '600'
                          }}
                        >
                          <div style={{ fontSize: '2rem' }}>{platformData.icon}</div>
                          <div>{platformData.name}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ maxWidth: '600px', margin: '0 auto', direction: 'rtl' }}>
                  <div style={{ marginBottom: '30px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      color: '#2c3e50',
                      cursor: 'pointer',
                      padding: '20px',
                      background: liveSettings.isActive ? 
                        currentPlatformInfo.bgColor : 
                        'rgba(108, 117, 125, 0.1)',
                      borderRadius: '15px',
                      border: `3px solid ${liveSettings.isActive ? currentPlatformInfo.color : 'rgba(108, 117, 125, 0.3)'}33`,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
                    }}>
                      <input
                        type="checkbox"
                        checked={liveSettings.isActive}
                        onChange={(e) => setLiveSettings({...liveSettings, isActive: e.target.checked})}
                        style={{
                          width: '25px',
                          height: '25px',
                          marginLeft: '10px',
                          accentColor: currentPlatformInfo.color,
                          cursor: 'pointer'
                        }}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.8rem' }}>{currentPlatformInfo.icon}</span>
                        <span>تفعيل البث المباشر</span>
                        {liveSettings.isActive && (
                          <div style={{
                            background: 'linear-gradient(135deg, #28a745, #20c997)',
                            color: 'white',
                            padding: '5px 12px',
                            borderRadius: '15px',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)'
                          }}>
                            نشط على {currentPlatformInfo.name}
                          </div>
                        )}
                      </div>
                    </label>
                  </div>

                  <div style={{ marginBottom: '30px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '12px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      fontSize: '1.2rem'
                    }}>
                      {currentPlatformInfo.icon} رابط البث - {currentPlatformInfo.name}:
                    </label>
                    <input
                      type="url"
                      value={liveSettings.streamUrl}
                      onChange={(e) => setLiveSettings({...liveSettings, streamUrl: e.target.value})}
                      placeholder={currentPlatformInfo.placeholder}
                      style={{
                        width: '100%',
                        padding: '18px 22px',
                        borderRadius: '15px',
                        border: `3px solid ${currentPlatformInfo.color}33`,
                        background: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '16px',
                        textAlign: 'left',
                        boxSizing: 'border-box',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = currentPlatformInfo.color;
                        e.target.style.background = 'rgba(255, 255, 255, 1)';
                        e.target.style.boxShadow = `0 0 0 4px ${currentPlatformInfo.bgColor}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = currentPlatformInfo.color + '33';
                        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                        e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                      }}
                    />
                    
                    {/* Platform-specific instructions */}
                    <div style={{
                      background: currentPlatformInfo.bgColor,
                      border: `2px solid ${currentPlatformInfo.color}33`,
                      borderRadius: '12px',
                      padding: '15px',
                      marginTop: '12px'
                    }}>
                      <small style={{
                        color: currentPlatformInfo.color,
                        fontSize: '14px',
                        display: 'block',
                        fontWeight: '500',
                        lineHeight: '1.5'
                      }}>
                        {liveSettings.streamType === 'youtube' && (
                          <>
                            💡 <strong>مثال:</strong> https://youtube.com/live/VIDEO_ID<br/>
                            🎬 <strong>أو اكتب معرف الفيديو فقط:</strong> VIDEO_ID<br/>
                            🔗 <strong>ملاحظة:</strong> يدعم البث المباشر وUnlisted/Private videos
                          </>
                        )}
                        {liveSettings.streamType === 'meet' && (
                          <>
                            💡 <strong>مثال:</strong> https://meet.google.com/xyz-abc-def<br/>
                            👥 <strong>ملاحظة:</strong> اجتماع تفاعلي مع الطلاب<br/>
                            🔒 <strong>أمان:</strong> محدود لحساب {liveSettings.streamOwner}
                          </>
                        )}
                        {liveSettings.streamType === 'vimeo' && (
                          <>
                            💡 <strong>مثال:</strong> https://vimeo.com/123456789<br/>
                            🎬 <strong>أو اكتب معرف الفيديو فقط:</strong> 123456789<br/>
                            🔗 <strong>ملاحظة:</strong> جودة احترافية عالية
                          </>
                        )}
                        {liveSettings.streamType === 'facebook' && (
                          <>
                            💡 <strong>مثال:</strong> https://facebook.com/username/videos/123456789<br/>
                            📘 <strong>ملاحظة:</strong> بث مباشر مع تفاعل الجمهور<br/>
                            💬 <strong>تفاعل:</strong> تعليقات مباشرة
                          </>
                        )}
                      </small>
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div style={{
                    background: 'rgba(40, 167, 69, 0.1)',
                    border: '2px solid rgba(40, 167, 69, 0.2)',
                    borderRadius: '15px',
                    padding: '20px',
                    marginBottom: '30px',
                    textAlign: 'center'
                  }}>
                    <h4 style={{
                      color: '#28a745',
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      marginBottom: '10px'
                    }}>👨‍🏫 صاحب البث</h4>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                      color: '#2c3e50',
                      fontWeight: '600'
                    }}>
                      {liveSettings.streamOwner}
                    </div>
                  </div>

                  <button
                    onClick={handleUpdateLiveSettings}
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '20px',
                      background: loading ? 
                        'linear-gradient(135deg, #6c757d, #5a6268)' : 
                        `linear-gradient(135deg, ${currentPlatformInfo.color}, ${currentPlatformInfo.color}CC)`,
                      color: 'white',
                      border: 'none',
                      borderRadius: '18px',
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      opacity: loading ? 0.7 : 1,
                      boxShadow: `0 10px 30px ${currentPlatformInfo.bgColor}`,
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{ 
                          display: 'inline-block',
                          width: '22px',
                          height: '22px',
                          border: '3px solid #ffffff',
                          borderTop: '3px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                          marginLeft: '12px'
                        }}></span>
                        جاري الحفظ...
                      </>
                    ) : (
                      `💾 حفظ إعدادات ${currentPlatformInfo.name}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(5px)'
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '40px',
              maxWidth: '500px',
              width: '90%',
              direction: 'rtl',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              animation: 'slideInUp 0.4s ease-out'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ 
              textAlign: 'center', 
              marginBottom: '25px', 
              color: '#2c3e50',
              fontSize: '1.6rem',
              fontWeight: '700'
            }}>
              ➕ إضافة {activeTab === 'videos' ? 'فيديو' : 'ملف'} جديد
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>
                {activeTab === 'videos' ? '🎬 رابط أو معرف متعدد المنصات:' : '🆔 معرف الملف:'}
              </label>
              <input
                type="text"
                value={newItem.id}
                onChange={(e) => setNewItem({...newItem, id: e.target.value})}
                placeholder={activeTab === 'videos' ? 'YouTube, Meet, Vimeo, Facebook - رابط أو معرف' : '1KJeUHc0SkEqc9r5HM5FTGBvo7IGlAJ6k'}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(195, 20, 50, 0.2)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '16px',
                  textAlign: 'left',
                  boxSizing: 'border-box',
                  fontFamily: activeTab === 'videos' ? 'inherit' : 'monospace',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              />
              {activeTab === 'videos' && (
                <small style={{
                  color: '#7f8c8d',
                  fontSize: '13px',
                  display: 'block',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  💡 يدعم: YouTube Live, Google Meet, Vimeo, Facebook Live - رابط كامل أو معرف فقط
                </small>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>
                🖼️ مسار الصورة:
              </label>
              <input
                type="text"
                value={newItem.thumbnail}
                onChange={(e) => setNewItem({...newItem, thumbnail: e.target.value})}
                placeholder="/grades/grade3/image.png"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(195, 20, 50, 0.2)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '16px',
                  textAlign: 'left',
                  boxSizing: 'border-box',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              />
              <small style={{
                color: '#7f8c8d',
                fontSize: '13px',
                display: 'block',
                marginTop: '8px',
                fontWeight: '500'
              }}>
                💡 للصور: /grades/grade3/اسم_الصورة.png أو الرابط الكامل من GitHub
              </small>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>
                📝 الملاحظات:
              </label>
              <input
                type="text"
                value={newItem.notes}
                onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                placeholder={activeTab === 'videos' ? 'شرح موضوع الدرس أو المحتوى' : 'وصف الملف'}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(195, 20, 50, 0.2)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '16px',
                  textAlign: 'right',
                  boxSizing: 'border-box',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  direction: 'rtl'
                }}
              />
            </div>

            {/* خيار Live للفيديوهات فقط */}
            {activeTab === 'videos' && (
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#2c3e50',
                  cursor: 'pointer',
                  padding: '15px',
                  background: newItem.isLive ? 'rgba(231, 76, 60, 0.1)' : 'rgba(108, 117, 125, 0.1)',
                  borderRadius: '12px',
                  border: `2px solid ${newItem.isLive ? 'rgba(231, 76, 60, 0.3)' : 'rgba(108, 117, 125, 0.3)'}`,
                  transition: 'all 0.3s ease'
                }}>
                  <input
                    type="checkbox"
                    checked={newItem.isLive}
                    onChange={(e) => setNewItem({...newItem, isLive: e.target.checked})}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginLeft: '10px',
                      accentColor: '#e74c3c'
                    }}
                  />
                  {newItem.isLive ? '🔴 عرض كبث مباشر (Live)' : '📹 عرض كفيديو عادي'}
                </label>
                <small style={{
                  color: '#7f8c8d',
                  fontSize: '13px',
                  display: 'block',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  💡 البث المباشر: يظهر علامات LIVE ونقطة البث النشط للطلاب
                </small>
              </div>
            )}

            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={handleAddItem}
                disabled={loading || !newItem.id || !newItem.thumbnail}
                style={{
                  flex: 1,
                  padding: '15px',
                  background: (!newItem.id || !newItem.thumbnail) ? 
                    'linear-gradient(135deg, #6c757d, #5a6268)' :
                    (activeTab === 'videos' ? 
                      'linear-gradient(135deg, #c31432, #8e0000)' : 
                      'linear-gradient(135deg, #00b894, #00a085)'
                    ),
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: (!newItem.id || !newItem.thumbnail) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: (!newItem.id || !newItem.thumbnail) ? 0.6 : 1
                }}
              >
                {loading ? '⏳ جاري الإضافة...' : '✅ إضافة'}
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewItem({ id: '', thumbnail: '', notes: '', isLive: false });
                }}
                style={{
                  flex: 1,
                  padding: '15px',
                  background: 'linear-gradient(135deg, #6c757d, #5a6268)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                ❌ إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0%, 100% { 
              opacity: 1; 
              transform: scale(1);
            }
            50% { 
              opacity: 0.7; 
              transform: scale(1.2);
            }
          }
          
          /* تحسين للشاشات الكبيرة - توسيط المحتوى */
          @media (min-width: 1200px) {
            .content-container {
              max-width: 1200px !important;
              margin: 0 auto !important;
            }
          }
          
          /* تحسين الاستجابة للموبايل */
          @media (max-width: 768px) {
            .header-section {
              padding: 25px 20px !important;
              margin-bottom: 30px !important;
            }
            
            .header-section h1 {
              font-size: 2.2rem !important;
            }
            
            .header-section .icon {
              font-size: 2.5rem !important;
              padding: 15px 20px !important;
            }
            
            .nav-tabs {
              grid-template-columns: 1fr !important;
              gap: 10px !important;
              padding: 10px !important;
            }
            
            .nav-tab {
              padding: 20px 15px !important;
              font-size: 1rem !important;
              border-radius: 15px !important;
            }
            
            .nav-tab .icon {
              font-size: 1.5rem !important;
            }
            
            .content-grid {
              grid-template-columns: 40px 1fr 150px 1fr 100px !important;
              gap: 10px !important;
              padding: 15px !important;
            }
            
            .header-grid {
              grid-template-columns: 40px 1fr 150px 1fr 100px !important;
              gap: 10px !important;
              font-size: 0.9rem !important;
              padding: 15px !important;
            }
            
            .live-settings {
              padding: 30px 20px !important;
            }
            
            .live-settings h2 {
              font-size: 1.8rem !important;
            }
            
            .live-settings .icon {
              font-size: 2rem !important;
              padding: 15px 18px !important;
            }
            
            .modal-content {
              width: 95% !important;
              margin: 10px !important;
              padding: 25px !important;
            }
            
            .form-input {
              font-size: 14px !important;
              padding: 12px 16px !important;
            }
            
            .action-buttons {
              flex-direction: column !important;
              gap: 8px !important;
            }
            
            .action-buttons button {
              font-size: 0.9rem !important;
              padding: 10px 15px !important;
            }
            
            .platform-selection {
              grid-template-columns: 1fr 1fr !important;
              gap: 10px !important;
            }
            
            .platform-button {
              padding: 15px 10px !important;
              font-size: 0.9rem !important;
            }
            
            .platform-button .icon {
              font-size: 1.5rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .header-section {
              padding: 20px 15px !important;
              margin-bottom: 25px !important;
            }
            
            .header-section h1 {
              font-size: 1.8rem !important;
            }
            
            .header-section .icon {
              font-size: 2rem !important;
              padding: 12px 15px !important;
            }
            
            .header-section p {
              font-size: 1rem !important;
            }
            
            .nav-tabs {
              padding: 8px !important;
              gap: 8px !important;
            }
            
            .nav-tab {
              padding: 15px 10px !important;
              font-size: 0.9rem !important;
            }
            
            .nav-tab .icon {
              font-size: 1.3rem !important;
            }
            
            .nav-tab small {
              font-size: 0.7rem !important;
            }
            
            .content-grid {
              grid-template-columns: 30px 1fr 120px 1fr 80px !important;
              gap: 8px !important;
              font-size: 0.8rem !important;
              padding: 12px !important;
            }
            
            .header-grid {
              grid-template-columns: 30px 1fr 120px 1fr 80px !important;
              gap: 8px !important;
              font-size: 0.8rem !important;
              padding: 12px !important;
            }
            
            .live-settings {
              padding: 25px 15px !important;
            }
            
            .live-settings h2 {
              font-size: 1.5rem !important;
            }
            
            .live-settings .icon {
              font-size: 1.8rem !important;
              padding: 12px 15px !important;
            }
            
            .live-settings p {
              font-size: 1rem !important;
            }
            
            .live-checkbox-label {
              font-size: 1rem !important;
              padding: 12px !important;
            }
            
            .live-url-input {
              font-size: 14px !important;
              padding: 14px 16px !important;
            }
            
            .modal-content {
              width: 98% !important;
              margin: 5px !important;
              padding: 20px !important;
            }
            
            .modal-content h3 {
              font-size: 1.3rem !important;
            }
            
            .form-input {
              font-size: 14px !important;
              padding: 10px 14px !important;
            }
            
            .action-buttons button {
              font-size: 0.85rem !important;
              padding: 8px 12px !important;
            }
            
            .thumbnail-preview {
              width: 80px !important;
              height: 50px !important;
            }
            
            .data-table-actions {
              gap: 3px !important;
            }
            
            .data-table-actions button {
              padding: 6px 8px !important;
              font-size: 10px !important;
            }
            
            .platform-selection {
              grid-template-columns: 1fr !important;
              gap: 8px !important;
            }
            
            .platform-button {
              padding: 12px 8px !important;
              font-size: 0.8rem !important;
            }
            
            .platform-button .icon {
              font-size: 1.3rem !important;
            }
          }
          
          /* تحسين تفاعل الأزرار */
          button:hover:not(:disabled) {
            transform: translateY(-2px) !important;
          }
          
          button:active:not(:disabled) {
            transform: translateY(0) !important;
          }
          
          button:disabled {
            cursor: not-allowed !important;
            opacity: 0.6 !important;
          }
          
          /* تحسين الإدخالات */
          input:focus {
            outline: none !important;
          }
          
          input[type="text"]:focus,
          input[type="url"]:focus {
            transform: translateY(-1px) !important;
          }
          
          /* تحسين العرض للصور */
          img {
            transition: all 0.3s ease !important;
          }
          
          img:hover {
            transform: scale(1.05) !important;
          }
          
          /* تحسين الأنيميشن للمودال */
          .modal-overlay {
            animation: fadeIn 0.3s ease-out !important;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          /* تحسين العرض للمنصات */
          .platform-indicators {
            display: flex;
            align-items: center;
            gap: 5px;
            flex-wrap: wrap;
          }
          
          .platform-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 6px;
            border-radius: 8px;
            font-size: 10px;
            font-weight: 600;
          }
          
          .youtube-badge {
            background: rgba(255, 0, 0, 0.1);
            color: #ff0000;
            border: 1px solid rgba(255, 0, 0, 0.2);
          }
          
          .meet-badge {
            background: rgba(66, 133, 244, 0.1);
            color: #4285f4;
            border: 1px solid rgba(66, 133, 244, 0.2);
          }
          
          .vimeo-badge {
            background: rgba(26, 183, 234, 0.1);
            color: #1ab7ea;
            border: 1px solid rgba(26, 183, 234, 0.2);
          }
          
          .facebook-badge {
            background: rgba(24, 119, 242, 0.1);
            color: #1877f2;
            border: 1px solid rgba(24, 119, 242, 0.2);
          }
          
          /* تحسين الطباعة */
          @media print {
            .modal-overlay,
            .action-buttons,
            button {
              display: none !important;
            }
            
            .content-container {
              background: white !important;
              box-shadow: none !important;
            }
            
            .header-section,
            .nav-tabs,
            .data-table {
              background: white !important;
              color: black !important;
            }
          }
          
          /* تحسين إمكانية الوصول */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* تحسين التباين */
          @media (prefers-contrast: high) {
            .header-section,
            .nav-tabs,
            .data-table,
            .live-settings,
            .modal-content {
              border: 3px solid #000 !important;
            }
            
            button {
              border: 2px solid #000 !important;
            }
            
            input {
              border: 2px solid #000 !important;
            }
          }
          
          /* تحسين الألوان للنظام المظلم */
          @media (prefers-color-scheme: dark) {
            .header-section,
            .nav-tabs,
            .data-table,
            .live-settings,
            .modal-content {
              background: rgba(33, 37, 41, 0.95) !important;
              color: #ffffff !important;
            }
            
            input {
              background: rgba(52, 58, 64, 0.9) !important;
              color: #ffffff !important;
              border-color: rgba(108, 117, 125, 0.5) !important;
            }
            
            .empty-state h3,
            .empty-state p {
              color: #ffffff !important;
            }
          }
        `}
      </style>
    </>
  );
}

export default AdminContentManagement;
