// src/contents/grade3/LiveGrade3.js
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

function LiveGrade3() {
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(false);
  const [liveStreamUrl, setLiveStreamUrl] = useState('');
  const [streamType, setStreamType] = useState('youtube'); // youtube, meet, vimeo
  const [streamOwner, setStreamOwner] = useState('');
  const [loading, setLoading] = useState(true);

  // دالة محسنة لتحويل روابط متعددة المنصات
  const convertStreamURL = (url, type = 'auto') => {
    if (!url) return '';
    
    // تحديد نوع المنصة تلقائياً إذا لم يتم تحديدها
    let detectedType = type;
    if (type === 'auto') {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        detectedType = 'youtube';
      } else if (url.includes('meet.google.com')) {
        detectedType = 'meet';
      } else if (url.includes('vimeo.com')) {
        detectedType = 'vimeo';
      } else if (url.includes('facebook.com')) {
        detectedType = 'facebook';
      }
    }
    
    // معالجة روابط YouTube
    if (detectedType === 'youtube') {
      let videoId = '';
      
      // رابط البث المباشر: https://www.youtube.com/live/VIDEO_ID
      if (url.includes('youtube.com/live/')) {
        const match = url.match(/youtube\.com\/live\/([a-zA-Z0-9_-]+)/);
        if (match) videoId = match[1];
      }
      // رابط عادي: https://www.youtube.com/watch?v=VIDEO_ID
      else if (url.includes('youtube.com/watch?v=')) {
        const match = url.match(/watch\?v=([a-zA-Z0-9_-]+)/);
        if (match) videoId = match[1];
      }
      // رابط مختصر: https://youtu.be/VIDEO_ID
      else if (url.includes('youtu.be/')) {
        const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (match) videoId = match[1];
      }
      // رابط embed مباشر
      else if (url.includes('youtube.com/embed/')) {
        const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
        if (match) videoId = match[1];
      }
      // معرف فقط
      else if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
        videoId = url.trim();
      }
      
      if (videoId) {
        setStreamType('youtube');
        return `https://www.youtube.com/embed/${videoId}?` +
          'autoplay=1&' +           // تشغيل تلقائي
          'mute=0&' +               // عدم كتم الصوت
          'controls=1&' +           // إظهار أزرار التحكم الأساسية
          'showinfo=0&' +           // إخفاء معلومات الفيديو
          'rel=0&' +                // عدم إظهار فيديوهات مقترحة من قنوات أخرى
          'modestbranding=1&' +     // إخفاء شعار YouTube قدر الإمكان
          'iv_load_policy=3&' +     // إخفاء التعليقات التوضيحية
          'cc_load_policy=0&' +     // إخفاء الترجمة التلقائية
          'fs=1&' +                 // السماح بملء الشاشة
          'disablekb=0&' +          // السماح بالتحكم عبر الكيبورد
          'playsinline=1&' +        // تشغيل داخل المتصفح في الموبايل
          'enablejsapi=1&' +        // تفعيل JavaScript API
          'widget_referrer=' + encodeURIComponent(window.location.origin) + '&' +
          'wmode=opaque&' +         // منع التداخل مع عناصر الصفحة
          'origin=' + window.location.origin; // تحديد المصدر للأمان
      }
    }
    
    // معالجة Google Meet
    if (detectedType === 'meet') {
      setStreamType('meet');
      // إضافة معرف المدير للمصادقة
      const meetUrl = url.includes('?') ? 
        url + '&authuser=' + encodeURIComponent('omareldalil060@gmail.com') :
        url + '?authuser=' + encodeURIComponent('omareldalil060@gmail.com');
      return meetUrl;
    }
    
    // معالجة Facebook Live
    if (detectedType === 'facebook') {
      setStreamType('facebook');
      if (url.includes('facebook.com')) {
        // استخراج معرف البث من Facebook
        const match = url.match(/facebook\.com\/([^\/]+)\/videos\/([0-9]+)/);
        if (match) {
          const pageId = match[1];
          const videoId = match[2];
          return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&width=800&show_text=false&height=450&appId`;
        }
      }
      return url;
    }
    
    // معالجة Vimeo (كما هو حالياً)
    if (detectedType === 'vimeo') {
      let videoId = '';
      
      if (url.includes('vimeo.com/live/')) {
        const match = url.match(/vimeo\.com\/live\/([a-zA-Z0-9_-]+)/);
        if (match) videoId = match[1];
      } else if (url.includes('vimeo.com/')) {
        const match = url.match(/vimeo\.com\/(\d+)/);
        if (match) videoId = match[1];
      } else if (/^\d+$/.test(url.trim())) {
        videoId = url.trim();
      }
      
      if (videoId) {
        setStreamType('vimeo');
        return `https://player.vimeo.com/video/${videoId}?` +
          'autoplay=1&' +
          'muted=0&' +
          'controls=1&' +
          'portrait=0&' +
          'title=0&' +
          'byline=0&' +
          'badge=0&' +
          'background=0&' +
          'transparent=1&' +
          'responsive=1';
      }
    }
    
    return url;
  };

  // حقن CSS متقدم لحماية المحتوى حسب نوع المنصة
  useEffect(() => {
    const advancedStyle = document.createElement('style');
    advancedStyle.id = 'multi-platform-protection';
    advancedStyle.textContent = `
      /* حماية YouTube */
      .youtube-container .ytp-share-button,
      .youtube-container .ytp-share-button-visible,
      .youtube-container .ytp-share-panel,
      .youtube-container .ytp-overflow-button,
      .youtube-container .ytp-overflow-menu,
      .youtube-container .ytp-contextmenu,
      .youtube-container .ytp-popup,
      .youtube-container .ytp-cards-button,
      .youtube-container .ytp-endscreen-element,
      .youtube-container .ytp-watch-later-button,
      .youtube-container .ytp-playlist-menu-button,
      .youtube-container .ytp-chrome-top-buttons,
      .youtube-container button[data-tooltip-target-id*="share"],
      .youtube-container button[aria-label*="Share"],
      .youtube-container button[aria-label*="شارك"],
      .youtube-container [role="button"][aria-label*="Share"],
      .youtube-container *[class*="share" i]:not(.live-content):not(.empty-state),
      .youtube-container *[id*="share" i]:not(.live-content):not(.empty-state) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -99999px !important;
        top: -99999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        z-index: -99999 !important;
        transform: scale(0) !important;
        filter: blur(50px) saturate(0) contrast(0) brightness(0) !important;
      }
      
      /* حماية Google Meet */
      .meet-container [jsaction*="share"],
      .meet-container [data-tooltip*="share" i],
      .meet-container [aria-label*="share" i],
      .meet-container [title*="share" i],
      .meet-container .google-material-icons:contains("share"),
      .meet-container button[jsaction*="invite"],
      .meet-container [data-tooltip*="invite" i] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      
      /* حماية Facebook */
      .facebook-container [aria-label*="Share"],
      .facebook-container [aria-label*="شارك"],
      .facebook-container [data-testid*="share"],
      .facebook-container ._4xev,
      .facebook-container ._15py {
        display: none !important;
        visibility: hidden !important;
      }
      
      /* حماية Vimeo */
      .vimeo-container .share,
      .vimeo-container [data-menu="share"],
      .vimeo-container .js-share,
      .vimeo-container [title*="Share"],
      .vimeo-container [aria-label*="Share"] {
        display: none !important;
        visibility: hidden !important;
      }
      
      /* تأثير blur عام للحماية */
      .stream-protection-overlay {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 200px;
        height: 80px;
        background: rgba(0, 0, 0, 0.8);
        z-index: 999999;
        pointer-events: auto;
        border-radius: 0 0 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.3);
        font-size: 12px;
        font-weight: 600;
      }
      
      /* تحسين لكل منصة */
      .youtube-container iframe {
        border-radius: 15px;
        border: 3px solid #ff0000;
      }
      
      .meet-container iframe {
        border-radius: 15px;
        border: 3px solid #4285f4;
      }
      
      .facebook-container iframe {
        border-radius: 15px;
        border: 3px solid #1877f2;
      }
      
      .vimeo-container iframe {
        border-radius: 15px;
        border: 3px solid #1ab7ea;
      }
      
      /* رسوم متحركة للمنصات */
      @keyframes youtubeGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.3); }
        50% { box-shadow: 0 0 30px rgba(255, 0, 0, 0.5); }
      }
      
      @keyframes meetGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(66, 133, 244, 0.3); }
        50% { box-shadow: 0 0 30px rgba(66, 133, 244, 0.5); }
      }
      
      @keyframes facebookGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(24, 119, 242, 0.3); }
        50% { box-shadow: 0 0 30px rgba(24, 119, 242, 0.5); }
      }
      
      @keyframes vimeoGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(26, 183, 234, 0.3); }
        50% { box-shadow: 0 0 30px rgba(26, 183, 234, 0.5); }
      }
      
      .youtube-container .video-wrapper {
        animation: youtubeGlow 3s infinite;
      }
      
      .meet-container .video-wrapper {
        animation: meetGlow 3s infinite;
      }
      
      .facebook-container .video-wrapper {
        animation: facebookGlow 3s infinite;
      }
      
      .vimeo-container .video-wrapper {
        animation: vimeoGlow 3s infinite;
      }
    `;
    
    document.head.appendChild(advancedStyle);
    
    // مراقب DOM متقدم
    const protectionObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // تطبيق الحماية على عناصر جديدة
            const hideElement = (element) => {
              if (element && !element.closest('.live-content, .empty-state')) {
                element.style.display = 'none';
                element.style.visibility = 'hidden';
                element.style.opacity = '0';
                element.style.pointerEvents = 'none';
                element.style.position = 'absolute';
                element.style.left = '-99999px';
                element.style.zIndex = '-99999';
                setTimeout(() => {
                  if (element.parentNode) {
                    element.remove();
                  }
                }, 50);
              }
            };
            
            // حماية متعددة المنصات
            const protectionSelectors = [
              // YouTube
              '.ytp-share-button', '.ytp-share-panel', '.ytp-overflow-button',
              // Google Meet
              '[jsaction*="share"]', '[data-tooltip*="share" i]',
              // Facebook
              '[data-testid*="share"]', '._4xev', '._15py',
              // Vimeo
              '.share', '[data-menu="share"]', '.js-share',
              // عام
              '[class*="share" i]', '[id*="share" i]', '[aria-label*="Share"]'
            ];
            
            protectionSelectors.forEach(selector => {
              try {
                const elements = node.querySelectorAll ? node.querySelectorAll(selector) : [];
                elements.forEach(hideElement);
                if (node.matches && node.matches(selector)) {
                  hideElement(node);
                }
              } catch (e) {}
            });
          }
        });
      });
    });
    
    protectionObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'aria-label', 'role', 'id', 'jsaction', 'data-testid']
    });
    
    // تطبيق الحماية دورياً
    const protectionInterval = setInterval(() => {
      const shareElements = document.querySelectorAll(`
        .ytp-share-button, .ytp-share-panel, .ytp-overflow-button,
        [jsaction*="share"], [data-tooltip*="share" i],
        [data-testid*="share"], ._4xev, ._15py,
        .share:not(.live-content):not(.empty-state),
        [data-menu="share"], .js-share,
        [class*="share" i]:not(.live-content):not(.empty-state),
        [id*="share" i]:not(.live-content):not(.empty-state),
        [aria-label*="Share"], [aria-label*="شارك"]
      `);
      
      shareElements.forEach(el => {
        if (el && !el.closest('.live-content, .empty-state')) {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          try { el.remove(); } catch (e) {}
        }
      });
    }, 300);
    
    return () => {
      const style = document.getElementById('multi-platform-protection');
      if (style && document.head.contains(style)) {
        document.head.removeChild(style);
      }
      protectionObserver.disconnect();
      clearInterval(protectionInterval);
    };
  }, []);

  // جلب إعدادات البث
  useEffect(() => {
    const fetchLiveStream = async () => {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/omareldalil24/PIONEER/main/public/grades/grade3/live.json?t=${Date.now()}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log('✅ تم جلب إعدادات البث من الأدمن:', data);
          setIsLiveStreamActive(data.isActive || false);
          setStreamOwner(data.streamOwner || 'omareldalil060@gmail.com');
          
          // تحويل الرابط حسب نوع المنصة
          const convertedUrl = convertStreamURL(data.streamUrl || '', data.streamType || 'auto');
          setLiveStreamUrl(convertedUrl);
          
          console.log('🔗 الرابط الأصلي:', data.streamUrl);
          console.log('🔗 الرابط المحول:', convertedUrl);
          console.log('📺 نوع المنصة:', streamType);
          console.log('👨‍🏫 صاحب البث:', streamOwner);
        } else {
          setIsLiveStreamActive(false);
          setLiveStreamUrl('');
        }
      } catch (error) {
        console.error('Error fetching live stream:', error);
        setIsLiveStreamActive(false);
        setLiveStreamUrl('');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLiveStream();
    
    // تحديث حالة البث كل 10 ثواني (أسرع من السابق)
    const interval = setInterval(fetchLiveStream, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // دالة للحصول على أيقونة وألوان المنصة
  const getPlatformInfo = (type) => {
    switch (type) {
      case 'youtube':
        return {
          icon: '📺',
          name: 'YouTube Live',
          color: '#ff0000',
          bgColor: 'rgba(255, 0, 0, 0.1)',
          borderColor: 'rgba(255, 0, 0, 0.3)'
        };
      case 'meet':
        return {
          icon: '👥',
          name: 'Google Meet',
          color: '#4285f4',
          bgColor: 'rgba(66, 133, 244, 0.1)',
          borderColor: 'rgba(66, 133, 244, 0.3)'
        };
      case 'facebook':
        return {
          icon: '📘',
          name: 'Facebook Live',
          color: '#1877f2',
          bgColor: 'rgba(24, 119, 242, 0.1)',
          borderColor: 'rgba(24, 119, 242, 0.3)'
        };
      case 'vimeo':
        return {
          icon: '🎬',
          name: 'Vimeo',
          color: '#1ab7ea',
          bgColor: 'rgba(26, 183, 234, 0.1)',
          borderColor: 'rgba(26, 183, 234, 0.3)'
        };
      default:
        return {
          icon: '🔴',
          name: 'البث المباشر',
          color: '#e74c3c',
          bgColor: 'rgba(231, 76, 60, 0.1)',
          borderColor: 'rgba(231, 76, 60, 0.3)'
        };
    }
  };

  const platformInfo = getPlatformInfo(streamType);

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
          }}>🔄 جاري تحميل البث المباشر...</h3>
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
        {/* Header Section - محسن مع معلومات المنصة */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          margin: '0 auto 40px auto',
          padding: '30px 35px',
          borderRadius: '20px',
          maxWidth: '700px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          animation: 'slideInUp 0.6s ease-out'
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>{platformInfo.icon}</div>
          <h1 style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '15px',
            color: '#2c3e50'
          }}>
            {platformInfo.name}
          </h1>
          
          {/* معلومات المنصة والمدير */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: platformInfo.bgColor,
              color: platformInfo.color,
              padding: '8px 15px',
              borderRadius: '15px',
              fontSize: '0.9rem',
              fontWeight: '600',
              border: `2px solid ${platformInfo.borderColor}`
            }}>
              📡 {platformInfo.name}
            </div>
            
            <div style={{
              background: 'rgba(40, 167, 69, 0.1)',
              color: '#28a745',
              padding: '8px 15px',
              borderRadius: '15px',
              fontSize: '0.9rem',
              fontWeight: '600',
              border: '2px solid rgba(40, 167, 69, 0.3)'
            }}>
              👨‍🏫 {streamOwner}
            </div>
          </div>
          
          <div style={{
            background: isLiveStreamActive ? 
              'linear-gradient(135deg, #28a745, #20c997)' : 
              'linear-gradient(135deg, #6c757d, #5a6268)',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '20px',
            display: 'inline-block',
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: `0 4px 12px ${isLiveStreamActive ? 'rgba(40, 167, 69, 0.3)' : 'rgba(108, 117, 125, 0.3)'}`
          }}>
            {isLiveStreamActive ? '🟢 البث نشط الآن' : '⏸️ لا يوجد بث حالياً'}
          </div>
        </div>

        {/* Content Container */}
        <div style={{
          width: '100%',
          maxWidth: '1000px',
          padding: '0 20px 50px 20px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {/* المحتوى الرئيسي */}
          {isLiveStreamActive && liveStreamUrl ? (
            <div className={`live-content ${streamType}-container`} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '25px',
              border: `2px solid ${platformInfo.borderColor}`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              animation: 'slideInUp 0.8s ease-out',
              position: 'relative',
              maxWidth: '900px',
              width: '100%'
            }}>
              {/* نقطة البث المباشر */}
              <div style={{
                position: 'absolute',
                top: '25px',
                right: '25px',
                width: '20px',
                height: '20px',
                backgroundColor: platformInfo.color,
                borderRadius: '50%',
                animation: 'pulse 1.5s infinite',
                boxShadow: `0 0 0 8px ${platformInfo.bgColor}`,
                zIndex: 10,
                border: '3px solid #ffffff'
              }}></div>

              {/* علامة LIVE مع اسم المنصة */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '25px',
                background: platformInfo.color,
                color: 'white',
                padding: '8px 15px',
                borderRadius: '15px',
                fontSize: '0.9rem',
                fontWeight: '700',
                zIndex: 10,
                boxShadow: `0 2px 8px ${platformInfo.bgColor}`,
                animation: 'pulse 2s infinite',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                {platformInfo.icon} LIVE
              </div>

              {/* الفيديو مع طبقة حماية متقدمة */}
              <div className="video-wrapper" style={{
                position: 'relative',
                paddingBottom: streamType === 'meet' ? '75%' : '56.25%', // نسبة مختلفة للـ Meet
                height: 0,
                borderRadius: '20px',
                overflow: 'hidden',
                border: `3px solid ${platformInfo.borderColor}`,
                background: '#000'
              }}>
                {streamType === 'meet' ? (
                  // عرض خاص للـ Google Meet
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #4285f4, #1a73e8)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    borderRadius: '20px'
                  }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👥</div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '15px' }}>
                      Google Meet جاهز
                    </h3>
                    <p style={{ fontSize: '1.2rem', marginBottom: '25px', opacity: 0.9 }}>
                      انقر للانضمام إلى الاجتماع
                    </p>
                   <a
                      href={liveStreamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        padding: '15px 30px',
                        borderRadius: '15px',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      🚀 الانضمام للاجتماع
                    </a>
                    
                    <div style={{
                      marginTop: '20px',
                      padding: '15px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      opacity: 0.8
                    }}>
                      💡 سيتم فتح Google Meet في نافذة جديدة
                    </div>
                  </div>
                ) : (
                  // عرض iframe للمنصات الأخرى
                  <>
                    <iframe
                      src={liveStreamUrl}
                      title={`البث المباشر - ${platformInfo.name}`}
                      frameBorder="0"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        outline: 'none'
                      }}
                      sandbox="allow-scripts allow-same-origin allow-presentation"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onSelectStart={(e) => e.preventDefault()}
                    />
                    
                    {/* طبقة حماية شاملة متقدمة */}
                    <div className="stream-protection-overlay"
                      style={{
                        position: 'absolute',
                        bottom: '0px',
                        right: '0px',
                        width: '250px',
                        height: '60px',
                        background: `linear-gradient(90deg, transparent 0%, ${platformInfo.color}AA 50%, ${platformInfo.color} 100%)`,
                        zIndex: 999999,
                        pointerEvents: 'auto',
                        borderRadius: '0 0 20px 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'not-allowed'
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        return false;
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        return false;
                      }}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        return false;
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                      }}
                    >
                      🔒 محمي - {platformInfo.name}
                    </div>
                    
                    {/* طبقة حماية علوية */}
                    <div style={{
                      position: 'absolute',
                      top: '0px',
                      right: '0px',
                      width: '200px',
                      height: '80px',
                      background: `linear-gradient(180deg, ${platformInfo.color}CC 0%, transparent 100%)`,
                      zIndex: 999998,
                      pointerEvents: 'auto',
                      borderRadius: '0 20px 0 0'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.stopImmediatePropagation();
                      return false;
                    }}
                    ></div>
                    
                    {/* طبقة حماية وسطى */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      right: '0px',
                      width: '150px',
                      height: '100px',
                      background: 'transparent',
                      zIndex: 999997,
                      pointerEvents: 'auto',
                      transform: 'translateY(-50%)'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.stopImmediatePropagation();
                      return false;
                    }}
                    ></div>
                  </>
                )}
              </div>

              {/* معلومات إضافية محسنة */}
              <div style={{ marginTop: '25px' }}>
                <div style={{
                  background: platformInfo.bgColor,
                  border: `2px solid ${platformInfo.borderColor}`,
                  borderRadius: '15px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  <h4 style={{
                    color: platformInfo.color,
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    {platformInfo.icon} معلومات البث
                  </h4>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '15px',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      padding: '12px 15px',
                      borderRadius: '10px',
                      textAlign: 'center'
                    }}>
                      <div style={{ color: platformInfo.color, fontWeight: '600', marginBottom: '5px' }}>
                        📡 المنصة
                      </div>
                      <div style={{ color: '#2c3e50', fontSize: '0.9rem' }}>
                        {platformInfo.name}
                      </div>
                    </div>
                    
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      padding: '12px 15px',
                      borderRadius: '10px',
                      textAlign: 'center'
                    }}>
                      <div style={{ color: platformInfo.color, fontWeight: '600', marginBottom: '5px' }}>
                        👨‍🏫 المدير
                      </div>
                      <div style={{ color: '#2c3e50', fontSize: '0.9rem' }}>
                        {streamOwner}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '10px',
                    padding: '15px',
                    textAlign: 'center'
                  }}>
                    {streamType === 'youtube' && (
                      <p style={{
                        color: '#2c3e50',
                        fontSize: '0.95rem',
                        margin: '0 0 10px 0',
                        fontWeight: '500'
                      }}>
                        📺 يمكنك التحكم في جودة الفيديو من الإعدادات<br/>
                        🔄 البث محدث تلقائياً كل 10 ثوانِ
                      </p>
                    )}
                    
                    {streamType === 'meet' && (
                      <p style={{
                        color: '#2c3e50',
                        fontSize: '0.95rem',
                        margin: '0 0 10px 0',
                        fontWeight: '500'
                      }}>
                        👥 اجتماع تفاعلي مع الأستاذ<br/>
                        🎤 يمكنك طرح الأسئلة صوتياً
                      </p>
                    )}
                    
                    {streamType === 'facebook' && (
                      <p style={{
                        color: '#2c3e50',
                        fontSize: '0.95rem',
                        margin: '0 0 10px 0',
                        fontWeight: '500'
                      }}>
                        📘 بث مباشر على Facebook<br/>
                        💬 يمكنك التفاعل في التعليقات
                      </p>
                    )}
                    
                    {streamType === 'vimeo' && (
                      <p style={{
                        color: '#2c3e50',
                        fontSize: '0.95rem',
                        margin: '0 0 10px 0',
                        fontWeight: '500'
                      }}>
                        🎬 بث عالي الجودة على Vimeo<br/>
                        🎯 تجربة مشاهدة احترافية
                      </p>
                    )}
                  </div>
                </div>
                
                {/* أزرار التحكم المحسنة */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '15px',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => window.location.reload()}
                    style={{
                      background: `linear-gradient(135deg, ${platformInfo.color}, ${platformInfo.color}CC)`,
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      padding: '12px 20px',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: `0 4px 15px ${platformInfo.bgColor}`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = `0 6px 20px ${platformInfo.bgColor}`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = `0 4px 15px ${platformInfo.bgColor}`;
                    }}
                  >
                    🔄 تحديث البث
                  </button>
                  
                  {streamType !== 'meet' && (
                    <button
                      onClick={() => {
                        const iframe = document.querySelector('.live-content iframe');
                        if (iframe && iframe.requestFullscreen) {
                          iframe.requestFullscreen();
                        }
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #6c757d, #5a6268)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        padding: '12px 20px',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(108, 117, 125, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(108, 117, 125, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(108, 117, 125, 0.3)';
                      }}
                    >
                      📺 ملء الشاشة
                    </button>
                  )}
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
              maxWidth: '700px',
              width: '100%'
            }}>
              <div className="icon" style={{ fontSize: '5rem', marginBottom: '25px', opacity: 0.7 }}>
                {platformInfo.icon}
              </div>
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
              
              {/* معلومات المنصات المتاحة */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '25px',
                marginTop: '30px'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>📡 المنصات المتاحة للبث:</h4>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '15px',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    background: 'rgba(255, 0, 0, 0.1)',
                    border: '2px solid rgba(255, 0, 0, 0.3)',
                    borderRadius: '12px',
                    padding: '15px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📺</div>
                    <div style={{ color: 'white', fontWeight: '600' }}>YouTube Live</div>
                    <small style={{ color: 'rgba(255, 255, 255, 0.8)' }}>بث عالي الجودة</small>
                  </div>
                  
                  <div style={{
                    background: 'rgba(66, 133, 244, 0.1)',
                    border: '2px solid rgba(66, 133, 244, 0.3)',
                    borderRadius: '12px',
                    padding: '15px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</div>
                    <div style={{ color: 'white', fontWeight: '600' }}>Google Meet</div>
                    <small style={{ color: 'rgba(255, 255, 255, 0.8)' }}>تفاعل مباشر</small>
                  </div>
                  
                  <div style={{
                    background: 'rgba(26, 183, 234, 0.1)',
                    border: '2px solid rgba(26, 183, 234, 0.3)',
                    borderRadius: '12px',
                    padding: '15px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎬</div>
                    <div style={{ color: 'white', fontWeight: '600' }}>Vimeo</div>
                    <small style={{ color: 'rgba(255, 255, 255, 0.8)' }}>جودة احترافية</small>
                  </div>
                </div>
                
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  <h4 style={{
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '15px'
                  }}>💡 نصائح مهمة:</h4>
                  <ul style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    textAlign: 'right',
                    listStyle: 'none',
                    padding: 0,
                    lineHeight: '1.8'
                  }}>
                    <li style={{ marginBottom: '8px' }}>🔄 تحديث الصفحة تلقائياً كل 10 ثوانِ</li>
                    <li style={{ marginBottom: '8px' }}>📱 يمكنك مشاهدة البث من الهاتف أو الكمبيوتر</li>
                    <li style={{ marginBottom: '8px' }}>🔔 ستظهر إشارة حمراء عند بدء البث</li>
                    <li style={{ marginBottom: '8px' }}>🌐 تأكد من قوة الإنترنت لأفضل جودة</li>
                    <li>👨‍🏫 جميع البثوث مدارة بواسطة {streamOwner}</li>
                  </ul>
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
          
          /* تحسين للشاشات الكبيرة */
          @media (min-width: 992px) {
            .live-content {
              max-width: 900px !important;
              margin: 0 auto !important;
            }
          }
          
          @media (min-width: 1200px) {
            .live-content {
              max-width: 1000px !important;
            }
          }
          
          /* تحسين للموبايل */
          @media (max-width: 768px) {
            .live-content {
              padding: 20px 15px !important;
              max-width: 100% !important;
            }
            
            .empty-state {
              padding: 30px 20px !important;
              max-width: 100% !important;
            }
            
            .empty-state h3 {
              font-size: 1.6rem !important;
            }
            
            .empty-state p {
              font-size: 1.1rem !important;
            }
            
            .video-wrapper {
              border-radius: 15px !important;
            }
            
            .stream-protection-overlay {
              width: 200px !important;
              height: 50px !important;
              font-size: 10px !important;
            }
            
            .platform-info-grid {
              grid-template-columns: 1fr !important;
              gap: 10px !important;
            }
            
            .control-buttons {
              flex-direction: column !important;
              gap: 10px !important;
            }
            
            .control-buttons button {
              width: 100% !important;
              padding: 10px 15px !important;
              font-size: 0.9rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .live-content {
              padding: 15px 10px !important;
            }
            
            .empty-state {
              padding: 25px 15px !important;
            }
            
            .empty-state h3 {
              font-size: 1.4rem !important;
            }
            
            .empty-state p {
              font-size: 1rem !important;
            }
            
            .empty-state .icon {
              font-size: 4rem !important;
              margin-bottom: 20px !important;
            }
            
            .video-wrapper {
              border-radius: 12px !important;
            }
            
            .stream-protection-overlay {
              width: 150px !important;
              height: 40px !important;
              font-size: 9px !important;
            }
            
            .platform-info {
              padding: 15px !important;
            }
            
            .platform-info h4 {
              font-size: 1.1rem !important;
            }
          }
          
          @media (max-width: 360px) {
            .live-content {
              padding: 12px 8px !important;
            }
            
            .empty-state {
              padding: 20px 12px !important;
            }
            
            .empty-state h3 {
              font-size: 1.2rem !important;
            }
            
            .empty-state p {
              font-size: 0.9rem !important;
            }
            
            .video-wrapper {
              border-radius: 10px !important;
            }
            
            .stream-protection-overlay {
              width: 120px !important;
              height: 35px !important;
              font-size: 8px !important;
            }
          }
          
          /* تحسين iframe للبث */
          iframe {
            border: none !important;
            outline: none !important;
          }
          
          iframe:focus {
            outline: 3px solid rgba(255, 255, 255, 0.5) !important;
            outline-offset: 2px !important;
          }
          
          /* منع النقر الأيمن والتحديد والسحب */
          .live-content {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
          }
          
          .live-content iframe {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            pointer-events: auto !important;
          }
          
          /* تحسين الأداء */
          .live-content {
            will-change: transform;
            transform: translateZ(0);
          }
          
          iframe {
            will-change: auto;
            backface-visibility: hidden;
          }
          
          /* تأثيرات خاصة للمنصات */
          .youtube-container {
            border-color: #ff0000 !important;
          }
          
          .meet-container {
            border-color: #4285f4 !important;
          }
          
          .facebook-container {
            border-color: #1877f2 !important;
          }
          
          .vimeo-container {
            border-color: #1ab7ea !important;
          }
          
          /* حماية متقدمة ضد العناصر المنبثقة */
          .live-content *[class*="share"],
          .live-content *[id*="share"],
          .live-content *[data-testid*="share"],
          .live-content *[jsaction*="share"],
          .live-content *[aria-label*="Share"],
          .live-content *[aria-label*="شارك"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            left: -99999px !important;
            width: 0 !important;
            height: 0 !important;
            z-index: -99999 !important;
          }
        `}
      </style>
    </>
  );
}

export default LiveGrade3;
