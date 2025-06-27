// src/contents/grade3/VideosGrade3.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';

function VideosGrade3() {
  const [videosData, setVideosData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateNotification, setUpdateNotification] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/omareldalil24/PIONEER/main/public/grades/grade3/videos.json'
        );
        if (!res.ok) throw new Error('Failed to fetch videos');
        const data = await res.json();
        setVideosData(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setVideosData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleOpenModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  // تحديد نوع العرض (live أو عادي)
  const isLiveVideo = (video) => {
    return video.isLive === true;
  };

  // استخراج ID من رابط Vimeo
  const extractVimeoId = (url) => {
    if (!url) return null;
    
    // إذا كان الرابط يحتوي على vimeo.com
    if (url.includes('vimeo.com')) {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : null;
    }
    
    // إذا كان مجرد ID
    if (/^\d+$/.test(url.trim())) {
      return url.trim();
    }
    
    return null;
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
          }}>📹 جاري تحميل المحتوى...</h3>
        </div>
      </div>
    );
  }

  // تصفية الفيديوهات - Live أولاً
  const liveVideos = videosData.filter(video => isLiveVideo(video));
  const normalVideos = videosData.filter(video => !isLiveVideo(video));
  const sortedVideos = [...liveVideos, ...normalVideos];

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
          <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>
            {liveVideos.length > 0 ? '🔴' : '📹'}
          </div>
          <h1 style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '15px',
            color: '#2c3e50'
          }}>
            {liveVideos.length > 0 ? 'البث المباشر والفيديوهات' : 'فيديوهات المراجعة'}
          </h1>
          <p style={{ 
            fontSize: '1.1rem',
            fontWeight: '500',
            color: '#6c757d',
            marginBottom: '15px'
          }}>
            {liveVideos.length > 0 ? 'بث مباشر وتسجيلات شاملة للمنهج' : 'مراجعة شاملة ومبسطة للمنهج'}
          </p>
          {videosData.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {liveVideos.length > 0 && (
                <div style={{
                  background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    animation: 'pulse 1.5s infinite'
                  }}></div>
                  🔴 {liveVideos.length} بث مباشر
                </div>
              )}
              {normalVideos.length > 0 && (
                <div style={{
                  background: 'linear-gradient(135deg, #c31432, #8e0000)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(195, 20, 50, 0.3)'
                }}>
                  📹 {normalVideos.length} فيديو
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Container - متوسط للشاشات العادية */}
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          padding: '0 20px 50px 20px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {/* إشعار التحديث */}
          {updateNotification && (
            <div style={{
              position: 'fixed',
              top: '120px',
              right: '20px',
              background: 'linear-gradient(135deg, #00b894, #00a085)',
              color: 'white',
              padding: '15px 25px',
              borderRadius: '20px',
              fontSize: '1rem',
              fontWeight: '600',
              zIndex: 1000,
              boxShadow: '0 8px 25px rgba(0, 184, 148, 0.4)',
              animation: 'slideInRight 0.5s ease-out'
            }}>
              {updateNotification}
            </div>
          )}

          {sortedVideos.length > 0 ? (
            <div className="videos-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px',
              justifyItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}>
              {sortedVideos.map((video, index) => (
                <div
                  key={index}
                  onClick={() => handleOpenModal(video)}
                  className="video-item"
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
                  {/* عناصر Live فقط للفيديوهات اللي isLive = true */}
                  {isLiveVideo(video) && (
                    <>
                      {/* نقطة البث المباشر */}
                      <div style={{
                        position: 'absolute',
                        top: '25px',
                        right: '25px',
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#e74c3c',
                        borderRadius: '50%',
                        animation: 'pulse 1.5s infinite',
                        boxShadow: '0 0 0 8px rgba(231, 76, 60, 0.3)',
                        zIndex: 10,
                        border: '3px solid white'
                      }}></div>
                      
                      {/* علامة LIVE */}
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '15px',
                        fontSize: '12px',
                        fontWeight: '700',
                        zIndex: 10,
                        boxShadow: '0 4px 15px rgba(231, 76, 60, 0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        🔴 LIVE
                      </div>
                    </>
                  )}

                  <img 
                    src={video.thumbnail} 
                    alt={isLiveVideo(video) ? "بث مباشر" : "فيديو المراجعة"}
                    style={{
                      width: '100%',
                      maxWidth: '380px',
                      height: 'auto',
                      borderRadius: '25px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.4s ease',
                      border: `3px solid ${isLiveVideo(video) ? 'rgba(231, 76, 60, 0.8)' : 'rgba(195, 20, 50, 0.8)'}`
                    }}
                    onError={(e) => {
                      e.target.style.display = 'block';
                      const gradientColor = isLiveVideo(video) ? 
                        'linear-gradient(135deg, #e74c3c, #c0392b)' : 
                        'linear-gradient(135deg, #c31432, #8e0000)';
                      const text = isLiveVideo(video) ? 'LIVE BROADCAST' : 'فيديوهات المراجعة';
                      e.target.src = `data:image/svg+xml;base64,${btoa(`<svg width="380" height="285" viewBox="0 0 380 285" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="285" fill="url(#gradient)" rx="25"/><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${isLiveVideo(video) ? '#e74c3c' : '#c31432'}"/><stop offset="100%" style="stop-color:${isLiveVideo(video) ? '#c0392b' : '#8e0000'}"/></linearGradient></defs><text x="190" y="155" font-family="Arial" font-size="22" fill="white" text-anchor="middle">${text}</text></svg>`)}`;
                    }}
                  />
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
              <div style={{ fontSize: '5rem', marginBottom: '25px', opacity: 0.7 }}>📹</div>
              <h3 style={{ 
                color: 'white', 
                marginBottom: '18px',
                fontSize: '1.8rem',
                fontWeight: '700',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                لا توجد فيديوهات حالياً
              </h3>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.2rem',
                fontWeight: '500'
              }}>
                سيتم إضافة الفيديوهات والبث المباشر قريباً
              </p>
            </div>
          )}
        </div>

        {/* مودال الفيديو المحسن - تصميم أنيق بدون الشريط الأحمر */}
        <Modal 
          show={showModal} 
          onHide={handleCloseModal} 
          centered 
          size="lg"
          style={{ direction: 'rtl' }}
          className="custom-video-modal"
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 249, 250, 0.95))',
            backdropFilter: 'blur(25px)',
            borderRadius: '30px',
            overflow: 'hidden',
            border: 'none',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.15)',
            position: 'relative'
          }}>
            {/* Header المحسن */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '25px 35px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              direction: 'rtl',
              borderRadius: '30px 30px 0 0',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* خلفية زخرفية */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                zIndex: 0
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-15%',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%',
                zIndex: 0
              }}></div>

              <div style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                margin: 0,
                color: 'white',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                zIndex: 1
              }}>
                {selectedVideo && isLiveVideo(selectedVideo) ? (
                  <>
                    {/* نقطة البث المباشر */}
                    <div style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#ff4757',
                      borderRadius: '50%',
                      animation: 'pulse 1.5s infinite',
                      marginLeft: '8px',
                      boxShadow: '0 0 10px rgba(255, 71, 87, 0.6)'
                    }}></div>
                    🎬 {selectedVideo?.notes || 'بث مباشر'}
                  </>
                ) : (
                  <>
                    🎬 {selectedVideo?.notes || 'فيديو المراجعة'}
                  </>
                )}
              </div>
              
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: '700',
                  position: 'relative',
                  zIndex: 1,
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.target.style.transform = 'scale(1.1) rotate(90deg)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'scale(1) rotate(0deg)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                ✕
              </button>
            </div>

            {/* Video Container */}
            <div style={{ 
              padding: '0',
              background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
              position: 'relative'
            }}>
              {selectedVideo && (
                <div style={{ 
                  position: 'relative', 
                  paddingBottom: '56.25%', 
                  height: 0, 
                  overflow: 'hidden',
                  borderRadius: '0 0 30px 30px'
                }}>
                  {/* Vimeo Player */}
                  <iframe
                    src={`https://player.vimeo.com/video/${extractVimeoId(selectedVideo.id)}?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&controls=1&autoplay=0`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="مشغل الفيديو"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      borderRadius: '0 0 30px 30px'
                    }}
                  />

                  {/* شاشة تحميل أنيقة */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: 'white',
                    zIndex: -1,
                    borderRadius: '0 0 30px 30px'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      border: '4px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '4px solid #ffffff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginBottom: '20px'
                    }}></div>
                    <p style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                      margin: 0
                    }}>
                      جاري تحميل الفيديو...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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
          
          @keyframes slideInRight {
            from { 
              opacity: 0; 
              transform: translateX(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }

          /* تخصيص المودال */
          .custom-video-modal .modal-dialog {
            max-width: 900px !important;
            margin: 20px auto !important;
          }

          .custom-video-modal .modal-content {
            border: none !important;
            border-radius: 30px !important;
            overflow: hidden !important;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15) !important;
            background: transparent !important;
          }

          .custom-video-modal .modal-header {
            display: none !important;
          }

          .custom-video-modal .modal-body {
            padding: 0 !important;
          }

          /* تحسين للشاشات الكبيرة - توسيط المحتوى */
          @media (min-width: 992px) {
            .videos-grid {
              max-width: 1200px !important;
              margin: 0 auto !important;
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 40px !important;
            }
          }

          @media (min-width: 1200px) {
            .videos-grid {
              max-width: 1400px !important;
              gap: 45px !important;
            }
          }

          /* تحسين الاستجابة للموبايل - فيديو واحد في السطر */
          @media (max-width: 768px) {
            .videos-grid {
              grid-template-columns: 1fr !important;
              gap: 35px !important;
              padding: 0 !important;
              max-width: 100% !important;
              justify-items: center !important;
            }
            
            .video-item {
              width: 100% !important;
              max-width: 400px !important;
              margin: 0 auto !important;
            }
            
            .video-item img {
              max-width: 100% !important;
              width: 100% !important;
            }
            
            .custom-video-modal .modal-dialog {
              margin: 10px !important;
              max-width: calc(100% - 20px) !important;
            }
          }

          @media (max-width: 480px) {
            .videos-grid {
              gap: 30px !important;
              grid-template-columns: 1fr !important;
              justify-items: center !important;
            }
            
            .video-item {
              width: 100% !important;
              max-width: 380px !important;
              margin: 0 auto !important;
            }
            
            .video-item img {
              max-width: 100% !important;
              width: 100% !important;
            }

            .custom-video-modal .modal-dialog {
              margin: 5px !important;
              max-width: calc(100% - 10px) !important;
            }
          }

          /* تحسين للتابلت - أيضاً فيديو واحد في السطر */
          @media (min-width: 768px) and (max-width: 991px) {
            .videos-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
              justify-items: center !important;
            }

            .video-item {
              width: 100% !important;
              max-width: 450px !important;
              margin: 0 auto !important;
            }

            .video-item img {
              max-width: 100% !important;
              width: 100% !important;
            }
          }

          /* تحسين التركيز للوصولية */
          .video-item:focus {
            outline: 3px solid rgba(231, 76, 60, 0.5);
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

          /* تحسين للشاشات العريضة جداً */
          @media (min-width: 1600px) {
            .videos-grid {
              max-width: 1500px !important;
              grid-template-columns: repeat(4, 1fr) !important;
              gap: 50px !important;
            }

            .video-item img {
              max-width: 350px !important;
            }
          }

          @media (min-width: 1800px) {
            .videos-grid {
              max-width: 1600px !important;
              grid-template-columns: repeat(4, 1fr) !important;
              gap: 60px !important;
            }

            .video-item img {
              max-width: 380px !important;
            }
          }

          /* تحسين الـ scrollbar للمودال */
          .custom-video-modal::-webkit-scrollbar {
            width: 6px;
          }

          .custom-video-modal::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.1);
            border-radius: 3px;
          }

          .custom-video-modal::-webkit-scrollbar-thumb {
            background: rgba(195, 20, 50, 0.5);
            border-radius: 3px;
          }

          .custom-video-modal::-webkit-scrollbar-thumb:hover {
            background: rgba(195, 20, 50, 0.7);
          }

          /* تحسين الفوكس للكيبورد */
          .video-item:focus-visible {
            outline: 3px solid rgba(231, 76, 60, 0.8);
            outline-offset: 4px;
          }

          /* تحسين الـ hover effects */
          .video-item:hover .live-badge {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(231, 76, 60, 0.6);
          }

          /* تحسين الـ z-index */
          .modal {
            z-index: 1055 !important;
          }

          .modal-backdrop {
            z-index: 1050 !important;
          }

          /* تحسين للطباعة */
          @media print {
            .no-print {
              display: none !important;
            }

            .video-item {
              break-inside: avoid;
              margin-bottom: 20px;
            }

            .modal {
              display: none !important;
            }
          }

          /* تحسين التباين للرؤية */
          @media (prefers-contrast: high) {
            .video-item {
              border: 4px solid #000 !important;
            }

            .custom-video-modal .modal-content {
              border: 3px solid #000 !important;
            }

            .live-badge {
              border: 2px solid #fff !important;
            }
          }

          /* تحسين للموضع الداكن */
          @media (prefers-color-scheme: dark) {
            .custom-video-modal .modal-content {
              background: rgba(25, 25, 25, 0.95) !important;
            }
          }

          /* تحسين اللمس للأجهزة اللوحية */
          @media (pointer: coarse) {
            .video-item {
              min-height: 44px;
              padding: 10px;
            }

            .custom-video-modal .modal-header button {
              min-width: 44px;
              min-height: 44px;
            }
          }

          /* تحسين نهائي للأداء */
          .videos-grid,
          .video-item {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
          }

          /* تحسين للشاشات عالية الكثافة */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .video-item img {
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
            }
          }

          /* تحسين البطارية المنخفضة */
          @media (prefers-reduced-data: reduce) {
            .video-item {
              transition: none !important;
              animation: none !important;
            }

            .live-indicator {
              animation: none !important;
            }

            .pulse-dot {
              animation: none !important;
            }
          }

          /* تحسين نهائي للـ iframe */
          iframe {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          /* تحسين الأداء العام */
          * {
            box-sizing: border-box;
          }

          .video-container {
            will-change: transform;
            transform: translateZ(0);
          }

          /* تحسين لوضع fullscreen */
          iframe:fullscreen,
          iframe:-webkit-full-screen,
          iframe:-moz-full-screen {
            width: 100% !important;
            height: 100% !important;
          }

          /* تحسين المودال للشاشات الصغيرة */
          @media (max-width: 576px) {
            .custom-video-modal .modal-dialog {
              margin: 0 !important;
              max-width: 100% !important;
              height: 100vh !important;
              display: flex !important;
              align-items: center !important;
            }

            .custom-video-modal .modal-content {
              border-radius: 0 !important;
              max-height: 90vh !important;
            }
          }

          /* تحسين التفاعل مع الفيديو */
          .video-iframe-container {
            transition: all 0.3s ease;
          }

          .video-iframe-container:hover {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }

          /* تحسين عنصر التحميل */
          .loading-overlay {
            transition: opacity 0.5s ease;
          }

          /* تحسين الانيميشنات للمودال */
          .custom-video-modal.show .modal-dialog {
            animation: modalSlideIn 0.3s ease-out;
          }

          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: scale(0.8) translateY(-50px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          /* تحسين responsive للعناصر الداخلية */
          @media (max-width: 320px) {
            .videos-grid {
              gap: 20px !important;
              padding: 0 5px !important;
              grid-template-columns: 1fr !important;
              justify-items: center !important;
            }

            .video-item {
              width: 100% !important;
              max-width: 310px !important;
              margin: 0 auto !important;
            }

            .video-item img {
              max-width: 100% !important;
              width: 100% !important;
            }

            .header-content {
              padding: 0 5px !important;
            }

            .header-content h1 {
              font-size: 1.2rem !important;
            }

            .stats-badges > div {
              font-size: 0.6rem !important;
              padding: 4px 8px !important;
            }

            .live-badge {
              padding: 4px 8px !important;
              font-size: 10px !important;
            }
          }

          /* تحسين للشاشات الطويلة */
          @media (min-aspect-ratio: 1/2) and (max-width: 768px) {
            .videos-grid {
              grid-template-columns: 1fr !important;
              gap: 30px !important;
              justify-items: center !important;
            }

            .video-item {
              width: 100% !important;
              max-width: 350px !important;
              margin: 0 auto !important;
            }

            .video-item img {
              max-width: 100% !important;
              width: 100% !important;
            }
          }

          /* تحسين الـ loading state */
          .loading-shimmer {
            background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 75%);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }

          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          /* تحسين الـ scrollbar العام */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.05);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(195, 20, 50, 0.3);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgba(195, 20, 50, 0.5);
          }

          /* تحسين الفوكس للكيبورد العام */
          button:focus-visible,
          .video-item:focus-visible {
            outline: 3px solid rgba(231, 76, 60, 0.8);
            outline-offset: 4px;
          }

          /* تحسين الـ z-index العام */
          .modal {
            z-index: 1055 !important;
          }

          .modal-backdrop {
            z-index: 1050 !important;
          }

          /* حماية من التلاعب والتحسينات النهائية */
          .custom-video-modal {
            pointer-events: auto !important;
          }

          .custom-video-modal iframe {
            pointer-events: auto !important;
          }

          /* تحسين للطباعة النهائي */
          @media print {
            .no-print,
            .modal,
            .modal-backdrop {
              display: none !important;
            }

            .video-item {
              break-inside: avoid;
              margin-bottom: 20px;
            }

            body {
              background: white !important;
            }
          }

          /* تحسين التباين النهائي */
          @media (prefers-contrast: high) {
            .video-item,
            .custom-video-modal .modal-content {
              border: 4px solid #000 !important;
            }

            .live-badge {
              border: 3px solid #fff !important;
            }
          }

          /* تحسين للموضع الداكن النهائي */
          @media (prefers-color-scheme: dark) {
            .custom-video-modal {
              background: rgba(25, 25, 25, 0.95) !important;
            }
          }

          /* تحسين اللمس النهائي */
          @media (pointer: coarse) {
            .video-item,
            button {
              min-height: 44px;
              min-width: 44px;
            }
          }

          /* تحسين نهائي للأداء والذاكرة */
          .videos-grid,
          .video-item,
          .custom-video-modal {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
            will-change: transform;
          }

          /* إنهاء التحسينات */
        `}
      </style>
    </>
  );
}

export default VideosGrade3;
=======
// src/contents/grade3/VideosGrade3.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';

function VideosGrade3() {
  const [videosData, setVideosData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateNotification, setUpdateNotification] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/omareldalil24/PIONEER/main/public/grades/grade3/videos.json'
        );
        if (!res.ok) throw new Error('Failed to fetch videos');
        const data = await res.json();
        setVideosData(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setVideosData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleOpenModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  // تحديد نوع العرض (live أو عادي)
  const isLiveVideo = (video) => {
    return video.isLive === true;
  };

  // استخراج ID من رابط Vimeo
  const extractVimeoId = (url) => {
    if (!url) return null;
    
    // إذا كان الرابط يحتوي على vimeo.com
    if (url.includes('vimeo.com')) {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : null;
    }
    
    // إذا كان مجرد ID
    if (/^\d+$/.test(url.trim())) {
      return url.trim();
    }
    
    return null;
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
          }}>📹 جاري تحميل المحتوى...</h3>
        </div>
      </div>
    );
  }

  // تصفية الفيديوهات - Live أولاً
  const liveVideos = videosData.filter(video => isLiveVideo(video));
  const normalVideos = videosData.filter(video => !isLiveVideo(video));
  const sortedVideos = [...liveVideos, ...normalVideos];

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
          <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>
            {liveVideos.length > 0 ? '🔴' : '📹'}
          </div>
          <h1 style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '15px',
            color: '#2c3e50'
          }}>
            {liveVideos.length > 0 ? 'البث المباشر والفيديوهات' : 'فيديوهات المراجعة'}
          </h1>
          <p style={{ 
            fontSize: '1.1rem',
            fontWeight: '500',
            color: '#6c757d',
            marginBottom: '15px'
          }}>
            {liveVideos.length > 0 ? 'بث مباشر وتسجيلات شاملة للمنهج' : 'مراجعة شاملة ومبسطة للمنهج'}
          </p>
          {videosData.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {liveVideos.length > 0 && (
                <div style={{
                  background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    animation: 'pulse 1.5s infinite'
                  }}></div>
                  🔴 {liveVideos.length} بث مباشر
                </div>
              )}
              {normalVideos.length > 0 && (
                <div style={{
                  background: 'linear-gradient(135deg, #c31432, #8e0000)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(195, 20, 50, 0.3)'
                }}>
                  📹 {normalVideos.length} فيديو
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Container - متوسط للشاشات العادية */}
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          padding: '0 20px 50px 20px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {/* إشعار التحديث */}
          {updateNotification && (
            <div style={{
              position: 'fixed',
              top: '120px',
              right: '20px',
              background: 'linear-gradient(135deg, #00b894, #00a085)',
              color: 'white',
              padding: '15px 25px',
              borderRadius: '20px',
              fontSize: '1rem',
              fontWeight: '600',
              zIndex: 1000,
              boxShadow: '0 8px 25px rgba(0, 184, 148, 0.4)',
              animation: 'slideInRight 0.5s ease-out'
            }}>
              {updateNotification}
            </div>
          )}

          {sortedVideos.length > 0 ? (
            <div className="videos-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px',
              justifyItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}>
              {sortedVideos.map((video, index) => (
                <div
                  key={index}
                  onClick={() => handleOpenModal(video)}
                  className="video-item"
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
                  {/* عناصر Live فقط للفيديوهات اللي isLive = true */}
                  {isLiveVideo(video) && (
                    <>
                      {/* نقطة البث المباشر */}
                      <div style={{
                        position: 'absolute',
                        top: '25px',
                        right: '25px',
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#e74c3c',
                        borderRadius: '50%',
                        animation: 'pulse 1.5s infinite',
                        boxShadow: '0 0 0 8px rgba(231, 76, 60, 0.3)',
                        zIndex: 10,
                        border: '3px solid white'
                      }}></div>
                      
                      {/* علامة LIVE */}
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '15px',
                        fontSize: '12px',
                        fontWeight: '700',
                        zIndex: 10,
                        boxShadow: '0 4px 15px rgba(231, 76, 60, 0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        🔴 LIVE
                      </div>
                    </>
                  )}

                  <img 
                    src={video.thumbnail} 
                    alt={isLiveVideo(video) ? "بث مباشر" : "فيديو المراجعة"}
                    style={{
                      width: '100%',
                      maxWidth: '380px',
                      height: 'auto',
                      borderRadius: '25px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.4s ease',
                      border: `3px solid ${isLiveVideo(video) ? 'rgba(231, 76, 60, 0.8)' : 'rgba(195, 20, 50, 0.8)'}`
                    }}
                    onError={(e) => {
                      e.target.style.display = 'block';
                      const gradientColor = isLiveVideo(video) ? 
                        'linear-gradient(135deg, #e74c3c, #c0392b)' : 
                        'linear-gradient(135deg, #c31432, #8e0000)';
                      const text = isLiveVideo(video) ? 'LIVE BROADCAST' : 'فيديوهات المراجعة';
                      e.target.src = `data:image/svg+xml;base64,${btoa(`<svg width="380" height="285" viewBox="0 0 380 285" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="285" fill="url(#gradient)" rx="25"/><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${isLiveVideo(video) ? '#e74c3c' : '#c31432'}"/><stop offset="100%" style="stop-color:${isLiveVideo(video) ? '#c0392b' : '#8e0000'}"/></linearGradient></defs><text x="190" y="155" font-family="Arial" font-size="22" fill="white" text-anchor="middle">${text}</text></svg>`)}`;
                    }}
                  />
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
              <div style={{ fontSize: '5rem', marginBottom: '25px', opacity: 0.7 }}>📹</div>
              <h3 style={{ 
                color: 'white', 
                marginBottom: '18px',
                fontSize: '1.8rem',
                fontWeight: '700',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                لا توجد فيديوهات حالياً
              </h3>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.2rem',
                fontWeight: '500'
              }}>
                سيتم إضافة الفيديوهات والبث المباشر قريباً
              </p>
            </div>
          )}
        </div>

        {/* مودال الفيديو المحسن - تصميم أنيق بدون الشريط الأحمر */}
        <Modal 
          show={showModal} 
          onHide={handleCloseModal} 
          centered 
          size="lg"
          style={{ direction: 'rtl' }}
          className="custom-video-modal"
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 249, 250, 0.95))',
            backdropFilter: 'blur(25px)',
            borderRadius: '30px',
            overflow: 'hidden',
            border: 'none',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.15)',
            position: 'relative'
          }}>
            {/* Header المحسن */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '25px 35px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              direction: 'rtl',
              borderRadius: '30px 30px 0 0',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* خلفية زخرفية */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                zIndex: 0
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-15%',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%',
                zIndex: 0
              }}></div>

              <div style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                margin: 0,
                color: 'white',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                zIndex: 1
              }}>
                {selectedVideo && isLiveVideo(selectedVideo) ? (
                  <>
                    {/* نقطة البث المباشر */}
                    <div style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#ff4757',
                      borderRadius: '50%',
                      animation: 'pulse 1.5s infinite',
                      marginLeft: '8px',
                      boxShadow: '0 0 10px rgba(255, 71, 87, 0.6)'
                    }}></div>
                    🎬 {selectedVideo?.notes || 'بث مباشر'}
                  </>
                ) : (
                  <>
                    🎬 {selectedVideo?.notes || 'فيديو المراجعة'}
                  </>
                )}
              </div>
              
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: '700',
                  position: 'relative',
                  zIndex: 1,
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.target.style.transform = 'scale(1.1) rotate(90deg)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'scale(1) rotate(0deg)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                ✕
              </button>
            </div>

            {/* Video Container */}
            <div style={{ 
              padding: '0',
              background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
              position: 'relative'
            }}>
              {selectedVideo && (
                <div style={{ 
                  position: 'relative', 
                  paddingBottom: '56.25%', 
                  height: 0, 
                  overflow: 'hidden',
                  borderRadius: '0 0 30px 30px'
                }}>
                  {/* Vimeo Player */}
                  <iframe
                    src={`https://player.vimeo.com/video/${extractVimeoId(selectedVideo.id)}?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&controls=1&autoplay=0`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="مشغل الفيديو"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      borderRadius: '0 0 30px 30px'
                    }}
                  />

                  {/* شاشة تحميل أنيقة */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: 'white',
                    zIndex: -1,
                    borderRadius: '0 0 30px 30px'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      border: '4px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '4px solid #ffffff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginBottom: '20px'
                    }}></div>
                    <p style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                      margin: 0
                    }}>
                      جاري تحميل الفيديو...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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
          
          @keyframes slideInRight {
            from { 
              opacity: 0; 
              transform: translateX(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }

          /* تخصيص المودال */
          .custom-video-modal .modal-dialog {
            max-width: 900px !important;
            margin: 20px auto !important;
          }

          .custom-video-modal .modal-content {
            border: none !important;
            border-radius: 30px !important;
            overflow: hidden !important;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15) !important;
            background: transparent !important;
          }

          .custom-video-modal .modal-header {
            display: none !important;
          }

          .custom-video-modal .modal-body {
            padding: 0 !important;
          }

          /* تحسين للشاشات الكبيرة - توسيط المحتوى */
          @media (min-width: 992px) {
            .videos-grid {
              max-width: 1200px !important;
              margin: 0 auto !important;
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 40px !important;
            }
          }

          @media (min-width: 1200px) {
            .videos-grid {
              max-width: 1400px !important;
              gap: 45px !important;
            }
          }

          /* تحسين الاستجابة للموبايل - فيديو واحد في السطر */
          @media (max-width: 768px) {
            .videos-grid {
              grid-template-columns: 1fr !important;
              gap: 35px !important;
              padding: 0 !important;
              max-width: 100% !important;
              justify-items: center !important;
            }
            
            .video-item {
              width: 100% !important;
              max-width: 400px !important;
              margin: 0 auto !important;
            }
            
            .video-item img {
              max-width: 100% !important;
              width: 100% !important;
            }
            
            .custom-video-modal .modal-dialog {
              margin: 10px !important;
              max-width: calc(100% - 20px) !important;
            }
          }

          @media (max-width: 480px) {
            .videos-grid {
              gap: 30px !important;
              grid-template-columns: 1fr !important;
              justify-items: center !important;
            }
            
            .video-item {
              width: 100% !important;
              max-width: 380px !important;
              margin: 0 auto !important;
            }
            
            .video-item img {
              max-width: 100% !important;
              width: 100% !important;
            }

            .custom-video-modal .modal-dialog {
              margin: 5px !important;
              max-width: calc(100% - 10px) !important;
            }
          }

          /* تحسين للتابلت - أيضاً فيديو واحد في السطر */
          @media (min-width: 768px) and (max-width: 991px) {
            .videos-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
              justify-items: center !important;
            }

            .video-item {
              width: 100% !important;
              max-width: 450px !important;
              margin: 0 auto !important;
            }

            .video-item img {
              max-width: 100% !important;
              width: 100% !important;
            }
          }

          /* تحسين التركيز للوصولية */
          .video-item:focus {
            outline: 3px solid rgba(231, 76, 60, 0.5);
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

          /* تحسين للشاشات العريضة جداً */
          @media (min-width: 1600px) {
            .videos-grid {
              max-width: 1500px !important;
              grid-template-columns: repeat(4, 1fr) !important;
              gap: 50px !important;
            }

            .video-item img {
              max-width: 350px !important;
            }
          }

          @media (min-width: 1800px) {
            .videos-grid {
              max-width: 1600px !important;
              grid-template-columns: repeat(4, 1fr) !important;
              gap: 60px !important;
            }

            .video-item img {
              max-width: 380px !important;
            }
          }

          /* تحسين الـ scrollbar للمودال */
          .custom-video-modal::-webkit-scrollbar {
            width: 6px;
          }

          .custom-video-modal::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.1);
            border-radius: 3px;
          }

          .custom-video-modal::-webkit-scrollbar-thumb {
            background: rgba(195, 20, 50, 0.5);
            border-radius: 3px;
          }

          .custom-video-modal::-webkit-scrollbar-thumb:hover {
            background: rgba(195, 20, 50, 0.7);
          }

          /* تحسين الفوكس للكيبورد */
          .video-item:focus-visible {
            outline: 3px solid rgba(231, 76, 60, 0.8);
            outline-offset: 4px;
          }

          /* تحسين الـ hover effects */
          .video-item:hover .live-badge {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(231, 76, 60, 0.6);
          }

          /* تحسين الـ z-index */
          .modal {
            z-index: 1055 !important;
          }

          .modal-backdrop {
            z-index: 1050 !important;
          }

          /* تحسين للطباعة */
          @media print {
            .no-print {
              display: none !important;
            }

            .video-item {
              break-inside: avoid;
              margin-bottom: 20px;
            }

            .modal {
              display: none !important;
            }
          }

          /* تحسين التباين للرؤية */
          @media (prefers-contrast: high) {
            .video-item {
              border: 4px solid #000 !important;
            }

            .custom-video-modal .modal-content {
              border: 3px solid #000 !important;
            }

            .live-badge {
              border: 2px solid #fff !important;
            }
          }

          /* تحسين للموضع الداكن */
          @media (prefers-color-scheme: dark) {
            .custom-video-modal .modal-content {
              background: rgba(25, 25, 25, 0.95) !important;
            }
          }

          /* تحسين اللمس للأجهزة اللوحية */
          @media (pointer: coarse) {
            .video-item {
              min-height: 44px;
              padding: 10px;
            }

            .custom-video-modal .modal-header button {
              min-width: 44px;
              min-height: 44px;
            }
          }

          /* تحسين نهائي للأداء */
          .videos-grid,
          .video-item {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
          }

          /* تحسين للشاشات عالية الكثافة */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .video-item img {
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
            }
          }

          /* تحسين البطارية المنخفضة */
          @media (prefers-reduced-data: reduce) {
            .video-item {
              transition: none !important;
              animation: none !important;
            }

            .live-indicator {
              animation: none !important;
            }

            .pulse-dot {
              animation: none !important;
            }
          }

          /* تحسين نهائي للـ iframe */
          iframe {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          /* تحسين الأداء العام */
          * {
            box-sizing: border-box;
          }

          .video-container {
            will-change: transform;
            transform: translateZ(0);
          }

          /* تحسين لوضع fullscreen */
          iframe:fullscreen,
          iframe:-webkit-full-screen,
          iframe:-moz-full-screen {
            width: 100% !important;
            height: 100% !important;
          }

          /* تحسين المودال للشاشات الصغيرة */
          @media (max-width: 576px) {
            .custom-video-modal .modal-dialog {
              margin: 0 !important;
              max-width: 100% !important;
              height: 100vh !important;
              display: flex !important;
              align-items: center !important;
            }

            .custom-video-modal .modal-content {
              border-radius: 0 !important;
              max-height: 90vh !important;
            }
          }

          /* تحسين التفاعل مع الفيديو */
          .video-iframe-container {
            transition: all 0.3s ease;
          }

          .video-iframe-container:hover {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }

          /* تحسين عنصر التحميل */
          .loading-overlay {
            transition: opacity 0.5s ease;
          }

          /* تحسين الانيميشنات للمودال */
          .custom-video-modal.show .modal-dialog {
            animation: modalSlideIn 0.3s ease-out;
          }

          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: scale(0.8) translateY(-50px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          /* تحسين responsive للعناصر الداخلية */
          @media (max-width: 320px) {
            .videos-grid {
              gap: 20px !important;
              padding: 0 5px !important;
              grid-template-columns: 1fr !important;
              justify-items: center !important;
            }

            .video-item {
              width: 100% !important;
              max-width: 310px !important;
              margin: 0 auto !important;
            }

            .video-item img {
              max-width: 100% !important;
              width: 100% !important;
            }

            .header-content {
              padding: 0 5px !important;
            }

            .header-content h1 {
              font-size: 1.2rem !important;
            }

            .stats-badges > div {
              font-size: 0.6rem !important;
              padding: 4px 8px !important;
            }

            .live-badge {
              padding: 4px 8px !important;
              font-size: 10px !important;
            }
          }

          /* تحسين للشاشات الطويلة */
          @media (min-aspect-ratio: 1/2) and (max-width: 768px) {
            .videos-grid {
              grid-template-columns: 1fr !important;
              gap: 30px !important;
              justify-items: center !important;
            }

            .video-item {
              width: 100% !important;
              max-width: 350px !important;
              margin: 0 auto !important;
            }

            .video-item img {
              max-width: 100% !important;
              width: 100% !important;
            }
          }

          /* تحسين الـ loading state */
          .loading-shimmer {
            background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 75%);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }

          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          /* تحسين الـ scrollbar العام */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.05);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(195, 20, 50, 0.3);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgba(195, 20, 50, 0.5);
          }

          /* تحسين الفوكس للكيبورد العام */
          button:focus-visible,
          .video-item:focus-visible {
            outline: 3px solid rgba(231, 76, 60, 0.8);
            outline-offset: 4px;
          }

          /* تحسين الـ z-index العام */
          .modal {
            z-index: 1055 !important;
          }

          .modal-backdrop {
            z-index: 1050 !important;
          }

          /* حماية من التلاعب والتحسينات النهائية */
          .custom-video-modal {
            pointer-events: auto !important;
          }

          .custom-video-modal iframe {
            pointer-events: auto !important;
          }

          /* تحسين للطباعة النهائي */
          @media print {
            .no-print,
            .modal,
            .modal-backdrop {
              display: none !important;
            }

            .video-item {
              break-inside: avoid;
              margin-bottom: 20px;
            }

            body {
              background: white !important;
            }
          }

          /* تحسين التباين النهائي */
          @media (prefers-contrast: high) {
            .video-item,
            .custom-video-modal .modal-content {
              border: 4px solid #000 !important;
            }

            .live-badge {
              border: 3px solid #fff !important;
            }
          }

          /* تحسين للموضع الداكن النهائي */
          @media (prefers-color-scheme: dark) {
            .custom-video-modal {
              background: rgba(25, 25, 25, 0.95) !important;
            }
          }

          /* تحسين اللمس النهائي */
          @media (pointer: coarse) {
            .video-item,
            button {
              min-height: 44px;
              min-width: 44px;
            }
          }

          /* تحسين نهائي للأداء والذاكرة */
          .videos-grid,
          .video-item,
          .custom-video-modal {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
            will-change: transform;
          }

          /* إنهاء التحسينات */
        `}
      </style>
    </>
  );
}

export default VideosGrade3;
>>>>>>> ed2528a9ce995e567ed2d9215c64d590e2982728
