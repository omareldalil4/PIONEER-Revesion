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

        {/* مودال الفيديو المحسن - يتكيف حسب النوع */}
        <Modal 
          show={showModal} 
          onHide={handleCloseModal} 
          centered 
          size="lg"
          style={{ direction: 'rtl' }}
        >
          <Modal.Header 
            style={{
              background: selectedVideo && isLiveVideo(selectedVideo) ? 
                'linear-gradient(135deg, #e74c3c, #c0392b)' : 
                'linear-gradient(135deg, #c31432, #8e0000)',
              backdropFilter: 'blur(20px)',
              borderBottom: 'none',
              borderRadius: '15px 15px 0 0',
              padding: '20px 25px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              direction: 'rtl',
              color: 'white'
            }}
          >
            <Modal.Title style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: 0
            }}>
              {selectedVideo && isLiveVideo(selectedVideo) ? (
                <>
                  {/* نقطة البث المباشر في العنوان */}
                  <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    animation: 'pulse 1.5s infinite',
                    marginLeft: '8px'
                  }}></div>
                  🔴 LIVE • {selectedVideo?.notes || 'بث مباشر'}
                </>
              ) : (
                <>
                  🎬 {selectedVideo?.notes || 'فيديو المراجعة'}
                </>
              )}
            </Modal.Title>
            <button
              onClick={handleCloseModal}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: 'white',
                fontSize: '18px',
                fontWeight: '700'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ✕
            </button>
          </Modal.Header>
          <Modal.Body 
            style={{ 
              padding: '0',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '0 0 15px 15px',
              position: 'relative'
            }}
          >
            {selectedVideo && (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                {/* تشويش كامل على أيقونة Drive - لجميع الفيديوهات */}
                <div style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  width: '80px',
                  height: '80px',
                  background: selectedVideo && isLiveVideo(selectedVideo) ? 
                    'linear-gradient(135deg, #e74c3c, #c0392b)' : 
                    'linear-gradient(135deg, #c31432, #8e0000)',
                  zIndex: 25,
                  borderRadius: '0 0 0 15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '700',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  pointerEvents: 'auto',
                  cursor: 'default'
                }}>
                  {selectedVideo && isLiveVideo(selectedVideo) ? '🔴 LIVE' : '🎬 VIDEO'}
                </div>

                {/* طبقة إضافية لمنع النقر على منطقة Drive - لجميع الفيديوهات */}
                <div style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  width: '100px',
                  height: '100px',
                  zIndex: 24,
                  pointerEvents: 'auto',
                  cursor: 'default'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }}
                />

                {/* عناصر Live فقط إذا كان الفيديو isLive = true */}
                {selectedVideo && isLiveVideo(selectedVideo) && (
                  <>
                    {/* إشعار البث المباشر */}
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      left: '15px',
                      background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                      color: 'white',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '700',
                      zIndex: 15,
                      boxShadow: '0 4px 15px rgba(231, 76, 60, 0.4)',
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
                      LIVE NOW
                    </div>

                    {/* شريط إخفاء أدوات التحكم فقط */}
                    <div 
                      className="live-controls-overlay"
                      style={{
                        position: 'absolute',
                        bottom: '0px',
                        left: '0px',
                        right: '0px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                        zIndex: 15,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '700',
                        pointerEvents: 'none',
                        userSelect: 'none'
                      }}
                    >
                      🔴 LIVE STREAM • البث المباشر
                    </div>
                  </>
                )}

                {/* الفيديو العادي بدون تعديل */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '0 0 15px 15px'
                }}>
                  <iframe
                    className={selectedVideo && isLiveVideo(selectedVideo) ? "live-video-iframe" : "normal-video-iframe"}
                    title={selectedVideo && isLiveVideo(selectedVideo) ? "Live Stream" : "Video Preview"}
                    src={`https://drive.google.com/file/d/${selectedVideo.id}/preview`}
                    frameBorder="0"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                  />
                </div>
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
          
          /* منع التفاعل مع أيقونة Drive وشريط التحكم للـ Live */
          .video-iframe {
            border: none !important;
            pointer-events: auto !important;
          }
          
          /* إخفاء شريط التحكم في Live فقط - بدون منع التشغيل */
          .live-video-iframe::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            z-index: 10;
            pointer-events: none;
          }

          /* إخفاء شريط التحكم في CSS مع السماح بالتشغيل */
          .live-video-iframe {
            position: relative;
          }

          .live-controls-overlay {
            pointer-events: none !important;
            user-select: none !important;
          }

          /* إخفاء عناصر محددة في Live بدون منع التشغيل */
          iframe[src*="preview"] + .live-controls-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            pointer-events: none;
          }

          /* تحسين fullscreen للـ Live */
          .live-video-iframe:-webkit-full-screen,
          .live-video-iframe:-moz-full-screen,
          .live-video-iframe:fullscreen {
            position: relative;
          }

          .live-video-iframe:-webkit-full-screen + .live-controls-overlay,
          .live-video-iframe:-moz-full-screen + .live-controls-overlay,
          .live-video-iframe:fullscreen + .live-controls-overlay {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: 80px !important;
            z-index: 999999 !important;
            font-size: 18px !important;
          }

          /* إخفاء عناصر التحكم في Drive بـ CSS فقط */
          .live-video-iframe {
            position: relative !important;
          }

          /* شريط يغطي منطقة التحكم بدون تعطيل الفيديو */
          .live-controls-overlay {
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
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
            
            .header-content h1 {
              font-size: 2rem !important;
            }
            
            .modal-dialog {
              margin: 10px !important;
            }
            
            .stats-badges {
              flex-direction: column !important;
              gap: 8px !important;
            }
            
            /* تحسين للموبايل */
            .live-controls-overlay {
              height: 50px !important;
              font-size: 12px !important;
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

.stats-badges {
 gap: 5px !important;
}

.stats-badges > div {
 font-size: 0.8rem !important;
 padding: 8px 15px !important;
}

.live-controls-overlay {
 height: 45px !important;
 font-size: 11px !important;
}
}

@media (max-width: 360px) {
.videos-grid {
 gap: 25px !important;
 grid-template-columns: 1fr !important;
 justify-items: center !important;
 padding: 0 10px !important;
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

.header-content {
 padding: 0 10px !important;
}

.header-content h1 {
 font-size: 1.4rem !important;
}

.header-content p {
 font-size: 0.9rem !important;
}

.stats-badges > div {
 font-size: 0.7rem !important;
 padding: 6px 12px !important;
}

.live-badge {
 padding: 4px 8px !important;
 font-size: 10px !important;
}

.live-controls-overlay {
 height: 40px !important;
 font-size: 10px !important;
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

/* تحسين المودال للموبايل */
@media (max-width: 768px) {
.modal-content {
 margin: 5px !important;
 border-radius: 15px !important;
}

.modal-header {
 padding: 15px 20px !important;
}

.modal-title {
 font-size: 1.1rem !important;
}
}

/* تحسين أداء الانيميشن */
.video-item,
.video-item img {
will-change: transform;
transform: translateZ(0);
}

/* إخفاء الـ scrollbar الأفقي */
body {
overflow-x: hidden;
}

/* تحسين الـ safe area للأجهزة الحديثة */
@supports (padding: max(0px)) {
.header-content {
 padding-left: max(20px, env(safe-area-inset-left));
 padding-right: max(20px, env(safe-area-inset-right));
}
}

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

/* تحسين للشاشات الطويلة - فيديو واحد في السطر أيضاً */
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

/* تحسين الـ loading */
.loading-shimmer {
background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 75%);
background-size: 200% 100%;
animation: shimmer 2s infinite;
}

@keyframes shimmer {
0% { background-position: 200% 0; }
100% { background-position: -200% 0; }
}

/* تحسين الـ scrollbar للمودال */
.modal-body::-webkit-scrollbar {
width: 6px;
}

.modal-body::-webkit-scrollbar-track {
background: rgba(0,0,0,0.1);
border-radius: 3px;
}

.modal-body::-webkit-scrollbar-thumb {
background: rgba(195, 20, 50, 0.5);
border-radius: 3px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
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

/* حماية من التلاعب بالـ CSS والتحسينات النهائية */
.live-controls-overlay {
position: absolute !important;
bottom: 0 !important;
left: 0 !important;
right: 0 !important;
background: linear-gradient(135deg, #e74c3c, #c0392b) !important;
z-index: 15 !important;
display: flex !important;
align-items: center !important;
justify-content: center !important;
color: white !important;
font-weight: 700 !important;
pointer-events: none !important;
user-select: none !important;
}

/* تأكيد أن الـ Live overlay يظهر دائماً */
.live-controls-overlay {
display: flex !important;
visibility: visible !important;
opacity: 1 !important;
}

/* حماية من إخفاء الـ overlay */
.live-controls-overlay[style*="display: none"] {
display: flex !important;
}

.live-controls-overlay[style*="visibility: hidden"] {
visibility: visible !important;
}

.live-controls-overlay[style*="opacity: 0"] {
opacity: 1 !important;
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

.modal-content {
 border: 3px solid #000 !important;
}

.live-badge {
 border: 2px solid #fff !important;
}

.live-controls-overlay {
 background: #000 !important;
 border: 3px solid #fff !important;
}
}

/* تحسين للموضع الداكن */
@media (prefers-color-scheme: dark) {
.modal-body {
 background: rgba(25, 25, 25, 0.95) !important;
}

.live-controls-overlay {
 background: linear-gradient(135deg, #8B0000, #590000) !important;
}
}

/* تحسين اللمس للأجهزة اللوحية */
@media (pointer: coarse) {
.video-item {
 min-height: 44px;
 padding: 10px;
}

.modal-header button {
 min-width: 44px;
 min-height: 44px;
}
}

/* تحسين نهائي للأداء */
.videos-grid,
.video-item,
.live-controls-overlay {
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

/* منع أي تداخل مع أدوات التحكم */
.live-video-iframe {
isolation: isolate;
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
.live-video-iframe:fullscreen .live-controls-overlay,
.live-video-iframe:-webkit-full-screen .live-controls-overlay,
.live-video-iframe:-moz-full-screen .live-controls-overlay {
position: fixed !important;
bottom: 0 !important;
left: 0 !important;
right: 0 !important;
height: 80px !important;
z-index: 999999 !important;
font-size: 18px !important;
}

/* تأكيد نهائي لكل الخصائص */
.live-controls-overlay {
background: linear-gradient(135deg, #e74c3c, #c0392b) !important;
z-index: 15 !important;
height: 60px !important;
display: flex !important;
align-items: center !important;
justify-content: center !important;
color: white !important;
font-size: 14px !important;
font-weight: 700 !important;
pointer-events: none !important;
user-select: none !important;
-webkit-user-select: none !important;
-moz-user-select: none !important;
-ms-user-select: none !important;
}

/* إنهاء الـ CSS */
       `}
     </style>
   </>
 );
}

export default VideosGrade3;