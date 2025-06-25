// src/contents/grade3/FilesGrade3.js
import React, { useState, useEffect } from 'react';
import { Container, Modal } from 'react-bootstrap';

function FilesGrade3() {
  const [filesData, setFilesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/omareldalil24/PIONEER/main/public/grades/grade3/files.json?${Date.now()}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log('✅ تم جلب ملفات من الأدمن:', data);
          setFilesData(data);
        } else {
          console.log('⚠️ لم يتم العثور على ملف الملفات');
          setFilesData([]);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
        setFilesData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFiles();
    
    // تحديث كل 30 ثانية
    const interval = setInterval(fetchFiles, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = (file) => {
    setSelectedFile(file);
    setShowModal(true);
    setIsFullScreen(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setIsFullScreen(false);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

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
            borderTop: '4px solid #ffffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 25px'
          }}></div>
          <h3 style={{ 
            fontWeight: '700', 
            fontSize: '1.8rem',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>📄 جاري تحميل الملفات...</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom right, #c31432, #8e0000, #240b36)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          paddingTop: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Header Section - متوسط دائماً */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          margin: '0 auto 40px auto',
          padding: '30px 35px',
          borderRadius: '20px',
          maxWidth: '600px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          animation: 'slideInUp 0.6s ease-out'
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>📄</div>
          <h1 style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '15px',
            color: '#2c3e50'
          }}>
            ملفات الدراسة
          </h1>
          {filesData.length > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, #00b894, #00a085)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              display: 'inline-block',
              fontSize: '0.9rem',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(0, 184, 148, 0.3)'
            }}>
              📊 {filesData.length} ملف متاح
            </div>
          )}
        </div>

        {/* Content Container - متوسط للشاشات العادية */}
        <div style={{
          width: '100%',
          maxWidth: '1400px', // عرض أكبر لاستيعاب البوكسات الأكبر
          padding: '0 20px 50px 20px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {filesData.length > 0 ? (
            <div className="files-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px',
              justifyItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}>
              {filesData.map((file, index) => (
                <div
                  key={index}
                  onClick={() => handleOpenModal(file)}
                  className="file-item"
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                    position: 'relative',
                    borderRadius: '25px',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-15px) scale(1.05)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                >
                  {/* عرض الصورة من الأدمن */}
                  <img 
                    src={file.thumbnail} 
                    alt={file.notes || 'ملف الدراسة'}
                    style={{
                      width: '100%',
                      maxWidth: '380px', // زيادة الحجم من 280px إلى 380px
                      height: 'auto',
                      borderRadius: '25px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.4s ease',
                      border: '3px solid rgba(255, 255, 255, 0.8)'
                    }}
                    onError={(e) => {
                      // في حالة فشل تحميل الصورة، نعرض صورة بديلة
                      e.target.style.display = 'block';
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgwIiBoZWlnaHQ9IjI4NSIgdmlld0JveD0iMCAwIDM4MCAyODUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzODAiIGhlaWdodD0iMjg1IiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgcng9IjI1Ii8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwYjg5NCIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMGEwODUiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8dGV4dCB4PSIxOTAiIHk9IjE0MyIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+2YXZhNmB2KfYqiDYp9mE2K/Ysdin2LPYqTwvdGV4dD4KPHR4dCB4PSIxOTAiIHk9IjE3MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+4pqg77iPINiq2LHYp9mF2Lwg2K7Yp9i12Kk8L3RleHQ+Cjx0ZXh0IHg9IjE5MCIgeT0iMTk1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjwvdGV4dD4KPC9zdmc+';
                    }}
                  />
                  
                  {/* نص الملاحظات كـ overlay */}
                  {file.notes && (
                    <div className="file-overlay" style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
                      color: 'white',
                      padding: '20px 15px 15px 15px',
                      fontSize: '16px', // زيادة حجم النص
                      fontWeight: '600',
                      textAlign: 'center',
                      borderRadius: '0 0 25px 25px',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}>
                      {file.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '50px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              maxWidth: '600px',
              width: '100%'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '25px', opacity: 0.7 }}>📄</div>
              <h3 style={{ 
                color: 'white', 
                marginBottom: '18px',
                fontSize: '1.8rem',
                fontWeight: '700',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                لا توجد ملفات حالياً
              </h3>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.2rem',
                fontWeight: '500'
              }}>
                سيتم إضافة ملفات الدراسة قريباً
              </p>
            </div>
          )}
        </div>

        {/* مودال الملف */}
        <Modal 
          show={showModal} 
          onHide={handleCloseModal} 
          centered 
          size={isFullScreen ? "xl" : "lg"}
          fullscreen={isFullScreen}
          className={isFullScreen ? "fullscreen-modal" : ""}
          style={{ direction: 'rtl' }}
        >
          <Modal.Header 
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '15px 15px 0 0',
              padding: '20px 25px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              direction: 'rtl'
            }}
          >
            <Modal.Title style={{
              color: '#2c3e50',
              fontSize: '1.3rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: 0,
              flex: 1
            }}>
              📄 {selectedFile?.notes || 'ملف الدراسة'}
            </Modal.Title>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {selectedFile && (
                <button
                  onClick={toggleFullScreen}
                  style={{
                    border: '2px solid rgba(0, 184, 148, 0.3)',
                    background: 'rgba(0, 184, 148, 0.1)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: '40px',
                    height: '40px'
                  }}
                  title={isFullScreen ? "إغلاق العرض الكامل" : "عرض كامل الشاشة"}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#00b894';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(0, 184, 148, 0.1)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  {isFullScreen ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#00b894">
                      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#00b894">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                    </svg>
                  )}
                </button>
              )}
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'rgba(231, 76, 60, 0.1)',
                  border: '2px solid rgba(231, 76, 60, 0.3)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: '#e74c3c',
                  fontSize: '18px',
                  fontWeight: '700'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#e74c3c';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(231, 76, 60, 0.1)';
                  e.target.style.color = '#e74c3c';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ✕
              </button>
            </div>
          </Modal.Header>
          <Modal.Body 
            style={{ 
              padding: isFullScreen ? '0' : undefined,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '0 0 15px 15px'
            }}
          >
            {selectedFile && (
              <div style={{ 
                position: 'relative', 
                paddingBottom: isFullScreen ? '95vh' : '56.25%', 
                height: 0 
              }}>
                <iframe
                  title="File Preview"
                  src={`https://drive.google.com/file/d/${selectedFile.id}/preview`}
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: isFullScreen ? '0' : '0 0 15px 15px'
                  }}
                />
                {/* منطقة حماية من النقر لمنع فتح نافذة جديدة */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    zIndex: 9999,
                    cursor: 'default',
                  }}
                />
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>

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
          
          /* تحسين للشاشات الكبيرة - توسيط المحتوى */
          @media (min-width: 992px) {
            .files-grid {
              max-width: 1200px !important;
              margin: 0 auto !important;
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 40px !important;
            }
          }
          
          @media (min-width: 1200px) {
            .files-grid {
              max-width: 1400px !important;
              gap: 45px !important;
            }
          }
          
          /* تحسين الاستجابة للموبايل */
          @media (max-width: 768px) {
            .files-grid {
              grid-template-columns: 1fr !important;
              gap: 35px !important;
              padding: 0 !important;
              max-width: 100% !important;
            }
            
            .file-item img {
              max-width: 350px !important; /* زيادة الحجم للموبايل */
            }
            
            .header-content h1 {
              font-size: 2rem !important;
            }
            
            .modal-dialog {
              margin: 10px !important;
            }
            
            .modal-header {
              padding: 15px 20px !important;
            }
            
            .modal-header-buttons {
              gap: 8px !important;
            }
            
            .modal-header-buttons button {
              width: 35px !important;
              height: 35px !important;
              font-size: 16px !important;
            }
            
            .file-overlay {
              font-size: 14px !important;
              padding: 18px 12px 12px 12px !important;
            }
          }
          
          @media (max-width: 480px) {
            .files-grid {
              gap: 30px !important;
            }
            
            .file-item img {
              max-width: 320px !important;
            }
            
            .header-content h1 {
              font-size: 1.8rem !important;
            }
            
            .header-content p {
              font-size: 1rem !important;
            }
            
            .empty-state {
              padding: 30px 20px !important;
            }
            
            .empty-state h3 {
              font-size: 1.5rem !important;
            }
            
            .empty-state p {
              font-size: 1rem !important;
            }
            
            .header-section {
              padding: 20px 0 !important;
            }
            
            .header-section h1 {
              font-size: 1.6rem !important;
            }
            
            .header-section .icon {
              font-size: 2.5rem !important;
            }
            
            .modal-header {
              padding: 12px 15px !important;
              flex-direction: column !important;
              gap: 10px !important;
            }
            
            .modal-title {
              font-size: 1rem !important;
              text-align: center !important;
            }
            
            .modal-header-buttons {
              gap: 6px !important;
            }
            
            .modal-header-buttons button {
              width: 32px !important;
              height: 32px !important;
              font-size: 14px !important;
            }
            
            .file-overlay {
              font-size: 13px !important;
              padding: 15px 10px 10px 10px !important;
            }
          }
          
          @media (max-width: 360px) {
            .files-grid {
              gap: 25px !important;
            }
            
            .file-item img {
              max-width: 290px !important;
            }
            
            .header-content {
              padding: 0 10px !important;
            }
            
            .header-content h1 {
              font-size: 1.4rem !important;
            }
            
            .header-content p {
              font-size: 0.9rem !important;
            }
            
            .modal-header {
              padding: 10px 12px !important;
            }
            
            .modal-title {
              font-size: 0.9rem !important;
            }
            
            .file-overlay {
              font-size: 12px !important;
              padding: 12px 8px 8px 8px !important;
            }
          }
          
          /* تحسين للتابلت */
          @media (min-width: 768px) and (max-width: 991px) {
            .files-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 35px !important;
            }
            
            .file-item img {
              max-width: 360px !important;
            }
          }
          
          /* تحسين التركيز للوصولية */
          .file-item:focus,
          .modal-header button:focus {
            outline: 3px solid rgba(0, 184, 148, 0.5);
            outline-offset: 2px;
          }
          
          /* تحسين للحركة المنخفضة */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* تحسين المودال للموبايل */
          @media (max-width: 768px) {
            .modal-content {
              margin: 5px !important;
              border-radius: 15px !important;
            }
          }
          
          /* تحسين أزرار المودال */
          .modal-header button {
            border: none !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
          }
          
          .modal-header button:hover {
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
          }
          
          /* تحسين للشاشات عالية الدقة */
          @media (min-width: 1400px) {
            .files-grid {
              grid-template-columns: repeat(3, 1fr) !important;
              max-width: 1400px !important;
            }
          }
          
          /* تحسين text overlay */
          .file-overlay {
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
          }
          
          .file-item:hover .file-overlay {
            background: linear-gradient(to top, rgba(0, 184, 148, 0.9), transparent);
          }
        `}
      </style>
    </>
  );
}

export default FilesGrade3;