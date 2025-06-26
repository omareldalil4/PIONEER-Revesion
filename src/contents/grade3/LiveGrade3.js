import React, { useState, useEffect } from 'react';

function LiveGrade3() {
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(false);
  const [liveStreamUrl, setLiveStreamUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveStream = async () => {
      try {
        // إضافة timestamp لتجنب الكاش
        const res = await fetch(
          `https://raw.githubusercontent.com/omareldalil24/PIONEER/main/public/grades/grade3/live.json?t=${Date.now()}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log('✅ تم جلب إعدادات البث من الأدمن:', data);
          setIsLiveStreamActive(data.isActive || false);
          
          // استخدام الرابط كما هو بدون تحويل
          setLiveStreamUrl(data.streamUrl || '');
          
          console.log('🔗 رابط البث المباشر:', data.streamUrl);
        } else {
          // لا يوجد بث مباشر
          setIsLiveStreamActive(false);
          setLiveStreamUrl('');
        }
      } catch (error) {
        console.error('Error fetching live stream:', error);
        // لا يوجد بث مباشر في حالة الخطأ
        setIsLiveStreamActive(false);
        setLiveStreamUrl('');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLiveStream();
    
    // تحديث حالة البث كل 10 ثوانِ (أسرع من قبل)
    const interval = setInterval(fetchLiveStream, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // فتح البث في نافذة جديدة مع خصائص محددة
  const openLiveStream = () => {
    if (liveStreamUrl) {
      const newWindow = window.open(
        liveStreamUrl, 
        'liveBroadcast',
        'width=1200,height=800,scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=yes'
      );
      
      if (newWindow) {
        newWindow.focus();
        // تتبع فتح النافذة
        console.log('✅ تم فتح البث في نافذة جديدة');
      } else {
        // إذا فشل فتح النافذة الجديدة، جرب الطريقة العادية
        window.open(liveStreamUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // فتح البث في نفس النافذة
  const watchInCurrentWindow = () => {
    if (liveStreamUrl) {
      window.location.href = liveStreamUrl;
    }
  };

  // فتح في تطبيق يوتيوب (للموبايل)
  const openInYouTubeApp = () => {
    if (liveStreamUrl) {
      // محاولة فتح تطبيق يوتيوب
      const youtubeAppUrl = liveStreamUrl.replace('https://www.youtube.com/', 'youtube://');
      window.location.href = youtubeAppUrl;
      
      // بعد 2 ثانية، إذا لم يفتح التطبيق، افتح في المتصفح
      setTimeout(() => {
        window.open(liveStreamUrl, '_blank');
      }, 2000);
    }
  };

  // نسخ الرابط مع تأثير بصري
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(liveStreamUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // fallback للمتصفحات القديمة
      const textArea = document.createElement('textarea');
      textArea.value = liveStreamUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
          }}>🔴 جاري تحميل البث المباشر...</h3>
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
        {/* Header Section */}
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
          <div style={{ 
            fontSize: '3.5rem', 
            marginBottom: '15px',
            ...(isLiveStreamActive ? {animation: 'pulse 2s infinite'} : {})
          }}>🔴</div>
          <h1 style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '15px',
            color: '#2c3e50'
          }}>
            البث المباشر
          </h1>
          <div style={{
            background: isLiveStreamActive ? 
              'linear-gradient(135deg, #28a745, #20c997)' : 
              'linear-gradient(135deg, #6c757d, #5a6268)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '20px',
            display: 'inline-block',
            fontSize: '0.9rem',
            fontWeight: '600',
            boxShadow: `0 4px 12px ${isLiveStreamActive ? 'rgba(40, 167, 69, 0.3)' : 'rgba(108, 117, 125, 0.3)'}`,
            position: 'relative'
          }}>
            {isLiveStreamActive && (
              <div style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '12px',
                height: '12px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                animation: 'pulse 1s infinite',
                boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.3)'
              }}></div>
            )}
            {isLiveStreamActive ? '🟢 البث نشط الآن - تحديث كل 10 ثوانِ' : '⏸️ لا يوجد بث حالياً'}
          </div>
        </div>

        {/* Content Container */}
        <div style={{
          width: '100%',
          maxWidth: '900px',
          padding: '0 20px 50px 20px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {/* المحتوى الرئيسي */}
          {isLiveStreamActive && liveStreamUrl ? (
            <div className="live-content" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '40px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              animation: 'slideInUp 0.8s ease-out',
              position: 'relative',
              maxWidth: '800px',
              width: '100%',
              textAlign: 'center'
            }}>
              {/* نقاط البث المباشر المتعددة */}
              <div style={{
                position: 'absolute',
                top: '25px',
                right: '25px',
                width: '20px',
                height: '20px',
                backgroundColor: '#ff0000',
                borderRadius: '50%',
                animation: 'pulse 1.5s infinite',
                boxShadow: '0 0 0 8px rgba(255, 0, 0, 0.3)',
                zIndex: 10,
                border: '3px solid #ffffff'
              }}></div>

              <div style={{
                position: 'absolute',
                top: '25px',
                right: '55px',
                width: '15px',
                height: '15px',
                backgroundColor: '#ff4444',
                borderRadius: '50%',
                animation: 'pulse 1.8s infinite',
                boxShadow: '0 0 0 5px rgba(255, 68, 68, 0.2)',
                zIndex: 9,
                border: '2px solid #ffffff'
              }}></div>

              <div style={{
                position: 'absolute',
                top: '25px',
                right: '80px',
                width: '12px',
                height: '12px',
                backgroundColor: '#ff6666',
                borderRadius: '50%',
                animation: 'pulse 2.1s infinite',
                boxShadow: '0 0 0 3px rgba(255, 102, 102, 0.1)',
                zIndex: 8,
                border: '2px solid #ffffff'
              }}></div>

              {/* علامة LIVE محسنة */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '25px',
                background: 'linear-gradient(135deg, #ff0000, #cc0000)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '700',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(255, 0, 0, 0.4)',
                animation: 'pulse 2s infinite',
                border: '2px solid #ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>
                🔴 LIVE NOW
              </div>

              {/* رمز البث الكبير مع تأثير */}
              <div style={{
                fontSize: '6rem',
                marginBottom: '30px',
                color: 'white',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                animation: 'pulse 3s infinite',
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
              }}>
                📺
              </div>

              {/* عنوان البث */}
              <h2 style={{
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '15px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                البث المباشر نشط الآن! 🚀
              </h2>

              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.3rem',
                fontWeight: '500',
                marginBottom: '30px',
                lineHeight: '1.6'
              }}>
                <strong>جميع الطرق متاحة!</strong> اختر الأنسب لك 👇
              </p>

              {/* أزار المشاهدة المحسنة */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                maxWidth: '700px',
                margin: '0 auto 30px auto'
              }}>
                {/* زر فتح في نافذة جديدة - الأفضل */}
                <button
                  onClick={openLiveStream}
                  style={{
                    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                    color: 'white',
                    border: '3px solid #ffffff',
                    borderRadius: '20px',
                    padding: '20px 25px',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(231, 76, 60, 0.4)',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-5px) scale(1.02)';
                    e.target.style.boxShadow = '0 15px 40px rgba(231, 76, 60, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 10px 30px rgba(231, 76, 60, 0.4)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#28a745',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: '600'
                  }}>الأفضل</div>
                  <span style={{ fontSize: '2rem' }}>🚀</span>
                  <div>فتح في نافذة جديدة</div>
                  <small style={{ opacity: 0.9, fontSize: '0.9rem' }}>يحافظ على الموقع مفتوح</small>
                </button>

                {/* زر فتح في نفس النافذة */}
                <button
                  onClick={watchInCurrentWindow}
                  style={{
                    background: 'linear-gradient(135deg, #00b894, #00a085)',
                    color: 'white',
                    border: '3px solid #ffffff',
                    borderRadius: '20px',
                    padding: '20px 25px',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(0, 184, 148, 0.4)',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-5px) scale(1.02)';
                    e.target.style.boxShadow = '0 15px 40px rgba(0, 184, 148, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 10px 30px rgba(0, 184, 148, 0.4)';
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>📺</span>
                  <div>الانتقال إلى يوتيوب</div>
                  <small style={{ opacity: 0.9, fontSize: '0.9rem' }}>انتقال مباشر</small>
                </button>
              </div>

              {/* زر تطبيق يوتيوب للموبايل */}
              <div style={{ marginBottom: '25px' }}>
                <button
                  onClick={openInYouTubeApp}
                  style={{
                    background: 'linear-gradient(135deg, #9b59b6, #8e44ad)',
                    color: 'white',
                    border: '2px solid #ffffff',
                    borderRadius: '15px',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(155, 89, 182, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(155, 89, 182, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(155, 89, 182, 0.3)';
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>📱</span>
                  فتح في تطبيق يوتيوب
                </button>
              </div>

              {/* نسخ الرابط محسن */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                padding: '25px',
                marginTop: '20px',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}>
                  🔗 شارك رابط البث مع الآخرين
                </h4>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}>
                  <input
                    type="text"
                    value={liveStreamUrl}
                    readOnly
                    style={{
                      flex: 1,
                      padding: '15px 20px',
                      borderRadius: '15px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '14px',
                      fontFamily: 'monospace',
                      color: '#2c3e50',
                      minWidth: '250px',
                      fontWeight: '500'
                    }}
                  />
                  <button
                    onClick={copyLink}
                    style={{
                      background: copied ? 
                        'linear-gradient(135deg, #28a745, #20c997)' : 
                        'linear-gradient(135deg, #f39c12, #e67e22)',
                      color: 'white',
                      border: '2px solid #ffffff',
                      borderRadius: '15px',
                      padding: '15px 25px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                      minWidth: '120px'
                    }}
                  >
                    {copied ? '✅ تم النسخ!' : '📋 نسخ الرابط'}
                  </button>
                </div>
                <small style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '13px',
                  display: 'block',
                  marginTop: '10px',
                  textAlign: 'center'
                }}>
                  💡 انسخ الرابط وشاركه في الواتساب أو أي مكان آخر
                </small>
              </div>

              {/* معلومات إضافية */}
              <div style={{
                marginTop: '25px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '20px'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>⚡ نصائح سريعة:</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '10px',
                  textAlign: 'right'
                }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    🔄 تحديث تلقائي كل 10 ثوانِ
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    📱 يعمل على الهاتف والكمبيوتر
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    🚀 النافذة الجديدة هي الأفضل
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    📡 البث مباشر من يوتيوب
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* حالة عدم وجود بث مباشر */
            <div className="empty-state" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '50px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              animation: 'slideInUp 0.6s ease-out',
              maxWidth: '600px',
              width: '100%'
            }}>
              <div className="icon" style={{ 
                fontSize: '5rem', 
                marginBottom: '25px', 
                opacity: 0.7,
                animation: 'pulse 4s infinite'
              }}>📺</div>
              <h3 style={{ 
                color: 'white', 
                marginBottom: '20px',
                fontSize: '2rem',
                fontWeight: '700',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                لا يوجد بث مباشر حالياً
              </h3>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.3rem',
                fontWeight: '500',
                marginBottom: '30px',
                lineHeight: '1.6'
              }}>
                ترقب الإعلان عن مواعيد البث المباشر للمراجعة النهائية
              </p>
              
              {/* نصائح للطلاب */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '25px',
                marginTop: '25px'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>💡 معلومات مهمة:</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '15px',
                  textAlign: 'right'
                }}>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px'
                  }}>
                    🔄 تحديث تلقائي كل 10 ثوانِ
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px'
                  }}>
                    📱 متاح على الهاتف والكمبيوتر
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px'
                  }}>
                    🔔 إشعار فوري عند بدء البث
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px'
                  }}>
                    🎯 بث مباشر للمراجعة النهائية
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
              transform: scale(1.1);
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
          
          /* تحسين للشاشات الصغيرة */
          @media (max-width: 768px) {
            .live-content {
              padding: 25px 20px !important;
              max-width: 100% !important;
            }
            
            .live-content h2 {
              font-size: 2rem !important;
            }
            
            .live-content p {
              font-size: 1.1rem !important;
            }
            
            .live-content button {
              font-size: 1.1rem !important;
              padding: 16px 20px !important;
            }
            
            .empty-state {
              padding: 30px 20px !important;
              max-width: 100% !important;
            }
            
            .copy-link-container {
              flex-direction: column !important;
              gap: 10px !important;
            }
            
            .copy-link-container input {
              min-width: auto !important;
              width: 100% !important;
            }
            
            .grid-buttons {
              grid-template-columns: 1fr !important;
              gap: 15px !important;
            }
          }
          
          @media (max-width: 480px) {
            .live-content {
              padding: 20px 15px !important;
            }
            
            .live-content h2 {
              font-size: 1.8rem !important;
            }
            
            .live-content button {
              font-size: 1rem !important;
              padding: 14px 18px !important;
            }
            
            .empty-state {
              padding: 25px 15px !important;
            }
            
            .empty-state h3 {
              font-size: 1.6rem !important;
            }
            
            .empty-state p {
              font-size: 1rem !important;
            }
            
            .icon {
              font-size: 4rem !important;
            }
            
            .tips-grid {
              grid-template-columns: 1fr !important;
              gap: 8px !important;
            }
            
            .copy-button {
              min-width: 100px !important;
              padding: 12px 15px !important;
            }
          }
          
          @media (max-width: 360px) {
            .live-content {
              padding: 15px 10px !important;
            }
            
            .live-content h2 {
              font-size: 1.5rem !important;
            }
            
            .empty-state {
              padding: 20px 10px !important;
            }
            
            .empty-state h3 {
              font-size: 1.3rem !important;
            }
            
            .copy-input {
              font-size: 12px !important;
              padding: 10px 12px !important;
            }
          }
          
          /* تحسين الاستجابة للتابلت */
          @media (min-width: 768px) and (max-width: 1024px) {
            .grid-buttons {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 18px !important;
            }
          }
          
          /* تحسين للشاشات الكبيرة جداً */
          @media (min-width: 1200px) {
            .live-content {
              max-width: 900px !important;
            }
          }
          
          /* تحسين التركيز للوصولية */
          button:focus,
          input:focus {
            outline: 3px solid rgba(255, 255, 255, 0.6) !important;
            outline-offset: 2px !important;
          }
          
          /* تحسين للحركة المنخفضة */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* تحسين التباين للرؤية */
          @media (prefers-contrast: high) {
            .live-content,
            .empty-state {
              border: 3px solid #fff !important;
            }
            
            button {
              border: 3px solid currentColor !important;
            }
          }
          
          /* تحسين الطباعة */
          @media print {
            .live-content button,
            .copy-link-container {
              display: none !important;
            }
            
            .live-content::after {
              content: "رابط البث: " attr(data-url) !important;
              display: block !important;
              color: #000 !important;
              background: #fff !important;
              padding: 20px !important;
              margin-top: 20px !important;
            }
          }
          
          /* تحسين أداء الانيميشن */
          .live-content,
          .empty-state,
          button {
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          
          /* تحسين للشاشات عالية الكثافة */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .live-content,
            .empty-state {
              border-width: 0.5px !important;
            }
          }
          
          /* تحسين للأجهزة اللوحية */
          @media (pointer: coarse) {
            button {
              min-height: 48px !important;
              min-width: 48px !important;
              padding: 16px 24px !important;
            }
            
            input {
              min-height: 48px !important;
              padding: 16px 20px !important;
            }
          }
          
          /* تحسين نهائي للتنسيق */
          .tips-grid > div {
            transition: transform 0.2s ease !important;
          }
          
          .tips-grid > div:hover {
            transform: translateY(-2px) !important;
          }
          
          /* انتهاء CSS */
        `}
      </style>
    </>
  );
}

export default LiveGrade3;
