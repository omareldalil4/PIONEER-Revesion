// src/contents/grade3/LiveGrade3.js
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

function LiveGrade3() {
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(false);
  const [liveStreamUrl, setLiveStreamUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCustomFullscreen, setIsCustomFullscreen] = useState(false);

  // دالة لتحويل رابط يوتيوب إلى رابط embed مع إخفاء معلومات القناة ومنع fullscreen
  const convertYouTubeURL = (url) => {
    if (!url) return '';
    
    // معالجة روابط يوتيوب المختلفة
    let videoId = '';
    
    // رابط البث المباشر: https://www.youtube.com/live/qK52qqYaS3o?feature=shared
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
    
    if (videoId) {
      // إعدادات YouTube مع منع fullscreen وإخفاء معلومات القناة
      return `https://www.youtube.com/embed/${videoId}?` +
        'autoplay=1&' +           // تشغيل تلقائي
        'mute=0&' +               // عدم كتم الصوت
        'controls=1&' +           // إظهار أزرار التحكم الأساسية
        'showinfo=0&' +           // إخفاء معلومات الفيديو
        'rel=0&' +                // عدم إظهار فيديوهات مقترحة من قنوات أخرى
        'modestbranding=1&' +     // إخفاء شعار YouTube قدر الإمكان
        'iv_load_policy=3&' +     // إخفاء التعليقات التوضيحية
        'cc_load_policy=0&' +     // إخفاء الترجمة التلقائية
        'fs=0&' +                 // منع fullscreen من YouTube
        'disablekb=0&' +          // السماح بالتحكم عبر الكيبورد
        'playsinline=1&' +        // تشغيل داخل المتصفح في الموبايل
        'enablejsapi=1&' +        // تفعيل JavaScript API
        'widget_referrer=' + encodeURIComponent(window.location.origin) + '&' + // تحديد المرجع
        'wmode=opaque&' +         // منع التداخل مع عناصر الصفحة
        'origin=' + window.location.origin; // تحديد المصدر للأمان
    }
    
    return url;
  };

  // دالة تكبير الشاشة المخصصة
  const toggleCustomFullscreen = () => {
    setIsCustomFullscreen(!isCustomFullscreen);
  };

  // دالة للخروج من تكبير الشاشة عند الضغط على Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCustomFullscreen) {
        setIsCustomFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCustomFullscreen]);

  // إضافة دالة لحقن CSS ديناميكياً ومراقبة DOM لمنع الشير مع تأثير blur متقدم
  useEffect(() => {
    // حقن CSS متقدم مع تأثير blur وزجاجي على أيقونات الشير ومنع fullscreen
    const advancedStyle = document.createElement('style');
    advancedStyle.id = 'youtube-share-blur-protection';
    advancedStyle.textContent = `
      /* تأثير blur وزجاجي متقدم على جميع أيقونات الشير */
      .ytp-share-button,
      .ytp-share-button-visible,
      .ytp-share-panel,
      .ytp-share-panel-visible,
      .ytp-share-panel-content,
      .ytp-share-panel-container,
      .ytp-panel.ytp-share-panel,
      .ytp-popup.ytp-share-panel,
      .ytp-overflow-button,
      .ytp-overflow-menu,
      .ytp-contextmenu,
      .ytp-popup.ytp-contextmenu,
      .ytp-menuitem[aria-label*="Share"],
      .ytp-menuitem[aria-label*="شارك"],
      .ytp-cards-button,
      .ytp-cards-teaser,
      .ytp-ce-element,
      .ytp-endscreen-element,
      .annotation,
      .video-annotations,
      .ytp-watch-later-button,
      .ytp-playlist-menu-button,
      .ytp-chrome-top-buttons,
      .ytp-fullscreen-button,
      .ytp-size-button,
      button[data-tooltip-target-id*="share"],
      button[aria-label*="Share"],
      button[aria-label*="شارك"],
      button[title*="Share"],
      button[title*="شارك"],
      button[aria-label*="Fullscreen"],
      button[aria-label*="ملء الشاشة"],
      button[title*="Fullscreen"],
      button[title*="ملء الشاشة"],
      .ytp-button[data-tooltip-target-id*="ytp-share"],
      .ytp-button[data-tooltip-target-id*="ytp-fullscreen"],
      [role="button"][aria-label*="Share"],
      [role="button"][aria-label*="شارك"],
      [role="button"][aria-label*="Fullscreen"],
      [role="button"][aria-label*="ملء الشاشة"],
      [role="dialog"][aria-label*="Share"],
      [role="dialog"][aria-label*="شارك"],
      div[class*="share" i]:not(.live-content):not(.empty-state),
      div[id*="share" i]:not(.live-content):not(.empty-state),
      *[class*="share" i]:not(.live-content):not(.empty-state),
      *[id*="share" i]:not(.live-content):not(.empty-state),
      *[data-tooltip*="share" i],
      *[aria-label*="share" i],
      *[class*="fullscreen" i]:not(.custom-fullscreen):not(.live-content):not(.empty-state),
      *[id*="fullscreen" i]:not(.custom-fullscreen):not(.live-content):not(.empty-state) {
        /* تأثير blur وتشويش قوي */
        filter: blur(20px) saturate(0) contrast(0.1) brightness(0.3) !important;
        backdrop-filter: blur(25px) saturate(0.2) !important;
        
        /* تأثير زجاجي شفاف */
        background: rgba(0, 0, 0, 0.9) !important;
        background-image: linear-gradient(45deg, 
          rgba(255, 255, 255, 0.1) 25%, 
          transparent 25%, 
          transparent 75%, 
          rgba(255, 255, 255, 0.1) 75%, 
          rgba(255, 255, 255, 0.1)
        ) !important;
        background-size: 4px 4px !important;
        
        /* تشويه إضافي */
        transform: scale(0.1) rotate(45deg) skew(30deg, 15deg) !important;
        opacity: 0.01 !important;
        visibility: hidden !important;
        
        /* منع التفاعل */
        pointer-events: none !important;
        user-select: none !important;
        
        /* إخفاء قوي */
        position: absolute !important;
        left: -99999px !important;
        top: -99999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        z-index: -99999 !important;
        
        /* تأثير انتقالي سلس */
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        
        /* تشويه النص */
        color: transparent !important;
        text-shadow: 0 0 20px rgba(0, 0, 0, 0.9) !important;
        
        /* حدود ضبابية */
        border: 1px solid rgba(0, 0, 0, 0.1) !important;
        border-radius: 50% !important;
        box-shadow: 
          inset 0 0 20px rgba(0, 0, 0, 0.9),
          0 0 20px rgba(0, 0, 0, 0.8),
          0 0 40px rgba(0, 0, 0, 0.6) !important;
        
        /* قطع المحتوى */
        clip: rect(0 0 0 0) !important;
        clip-path: polygon(0 0, 0 0, 0 0) !important;
        
        /* تأثير matrix للتشويه */
        transform-origin: center !important;
        animation: shareBlurGlitch 2s infinite linear !important;
      }
      
      /* تأثير خاص للوضع العادي */
      .ytp-chrome-controls .ytp-right-controls {
        position: relative !important;
      }
      
      .ytp-chrome-controls .ytp-right-controls::after {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        right: 0 !important;
        width: 200px !important;
        height: 100% !important;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(0, 0, 0, 0.3) 15%,
          rgba(0, 0, 0, 0.7) 30%,
          rgba(0, 0, 0, 0.9) 50%,
          rgba(0, 0, 0, 1) 70%,
          rgba(0, 0, 0, 1) 100%
        ) !important;
        backdrop-filter: blur(15px) saturate(0.3) !important;
        z-index: 999999 !important;
        pointer-events: auto !important;
        border-radius: 0 5px 5px 0 !important;
      }
      
      /* حماية إضافية للشريط العلوي */
      .ytp-chrome-top {
        filter: blur(30px) saturate(0) !important;
        backdrop-filter: blur(35px) !important;
        background: rgba(0, 0, 0, 0.95) !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transform: scale(0) !important;
      }
      
      /* تأثير blur على العناصر المنبثقة */
      .ytp-popup,
      .ytp-panel,
      .ytp-contextmenu,
      .ytp-overflow-menu,
      [role="dialog"]:not(.live-content):not(.empty-state):not(.custom-fullscreen),
      [role="menu"]:not(.live-content):not(.empty-state),
      [role="listbox"]:not(.live-content):not(.empty-state) {
        filter: blur(50px) saturate(0) contrast(0) brightness(0) !important;
        backdrop-filter: blur(60px) saturate(0) !important;
        background: rgba(0, 0, 0, 1) !important;
        transform: scale(0) rotate(180deg) !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -999999px !important;
        top: -999999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        z-index: -999999 !important;
        animation: glitchDestroy 0.1s infinite !important;
      }
      
      /* تأثيرات الحركة المضطربة */
      @keyframes shareBlurGlitch {
        0% { 
          transform: scale(0.01) rotate(0deg) skew(0deg, 0deg) translate(-999px, -999px);
          filter: blur(20px) saturate(0) contrast(0.1) brightness(0.1);
        }
        25% { 
          transform: scale(0.005) rotate(90deg) skew(15deg, 30deg) translate(-1999px, -1999px);
          filter: blur(35px) saturate(0) contrast(0.05) brightness(0.05);
        }
        50% { 
          transform: scale(0.002) rotate(180deg) skew(45deg, 60deg) translate(-2999px, -2999px);
          filter: blur(50px) saturate(0) contrast(0.02) brightness(0.02);
        }
        75% { 
          transform: scale(0.001) rotate(270deg) skew(75deg, 90deg) translate(-3999px, -3999px);
          filter: blur(65px) saturate(0) contrast(0.01) brightness(0.01);
        }
        100% { 
          transform: scale(0.0001) rotate(360deg) skew(90deg, 120deg) translate(-4999px, -4999px);
          filter: blur(80px) saturate(0) contrast(0) brightness(0);
        }
      }
      
      @keyframes glitchDestroy {
        0% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 0.001; transform: scale(0.001) rotate(180deg); }
        100% { opacity: 0; transform: scale(0) rotate(360deg); }
      }
      
      /* منع ظهور tooltips للأزرار المخفية */
      .ytp-tooltip,
      .ytp-tooltip-text,
      [role="tooltip"] {
        filter: blur(20px) !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transform: scale(0) !important;
      }
      
      /* حماية من JavaScript injection */
      [onclick*="share"],
      [onclick*="Share"],
      [onclick*="fullscreen"],
      [onclick*="Fullscreen"],
      [data-action*="share"],
      [data-action*="fullscreen"] {
        pointer-events: none !important;
        filter: blur(30px) !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }

      /* استايل تكبير الشاشة المخصص */
      .custom-fullscreen-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
      }

      .custom-fullscreen-content {
        width: 90vw;
        height: 90vh;
        max-width: 1200px;
        position: relative;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
      }

      .custom-fullscreen-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        color: #333;
        cursor: pointer;
        z-index: 1000000;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }

      .custom-fullscreen-close:hover {
        background: rgba(255, 255, 255, 1);
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
      }
    `;
    
    document.head.appendChild(advancedStyle);
    
    // مراقب DOM متقدم لتطبيق التأثيرات على العناصر الجديدة
    const advancedObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // تطبيق التأثيرات على العناصر الجديدة
            const applyBlurEffect = (element) => {
              if (element && !element.closest('.live-content, .empty-state, .custom-fullscreen')) {
                element.style.filter = 'blur(25px) saturate(0) contrast(0.1) brightness(0.2)';
                element.style.backdropFilter = 'blur(30px) saturate(0.1)';
                element.style.background = 'rgba(0, 0, 0, 0.95)';
                element.style.transform = 'scale(0.01) rotate(45deg)';
                element.style.opacity = '0';
                element.style.visibility = 'hidden';
                element.style.pointerEvents = 'none';
                element.style.position = 'absolute';
                element.style.left = '-99999px';
                element.style.top = '-99999px';
                element.style.zIndex = '-99999';
                
                // إزالة العنصر بعد تطبيق التأثيرات
                setTimeout(() => {
                  if (element.parentNode) {
                    element.remove();
                  }
                }, 100);
              }
            };
            
            // البحث عن عناصر الشير والـ fullscreen الجديدة
            const blockedSelectors = [
              '.ytp-share-button',
              '.ytp-share-panel',
              '.ytp-overflow-button',
              '.ytp-popup',
              '.ytp-panel',
              '.ytp-contextmenu',
              '.ytp-fullscreen-button',
              '.ytp-size-button',
              '[class*="share" i]',
              '[id*="share" i]',
              '[aria-label*="Share"]',
              '[aria-label*="شارك"]',
              '[aria-label*="Fullscreen"]',
              '[aria-label*="ملء الشاشة"]',
              '[role="dialog"]',
              '[role="menu"]',
              '[role="listbox"]',
              '[class*="fullscreen" i]',
              '[id*="fullscreen" i]'
            ];
            
            blockedSelectors.forEach(selector => {
              try {
                const elements = node.querySelectorAll ? node.querySelectorAll(selector) : [];
                elements.forEach(applyBlurEffect);
                
                // فحص العنصر نفسه
                if (node.matches && node.matches(selector)) {
                  applyBlurEffect(node);
                }
              } catch (e) {
                // تجاهل الأخطاء في التحديد
              }
            });
          }
        });
      });
    });
    
    // بدء المراقبة المتقدمة
    advancedObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'aria-label', 'role', 'id']
    });
    
    // تطبيق التأثيرات كل نصف ثانية
    const blurInterval = setInterval(() => {
      const blockedElements = document.querySelectorAll(`
        .ytp-share-button,
        .ytp-share-panel,
        .ytp-overflow-button,
        .ytp-popup:not(.live-content):not(.empty-state):not(.custom-fullscreen),
        .ytp-panel:not(.live-content):not(.empty-state):not(.custom-fullscreen),
        .ytp-contextmenu,
        .ytp-fullscreen-button,
        .ytp-size-button,
        [class*="share" i]:not(.live-content):not(.empty-state):not(.custom-fullscreen),
        [id*="share" i]:not(.live-content):not(.empty-state):not(.custom-fullscreen),
        [aria-label*="Share"],
        [aria-label*="شارك"],
        [aria-label*="Fullscreen"],
        [aria-label*="ملء الشاشة"],
        [role="dialog"]:not(.live-content):not(.empty-state):not(.custom-fullscreen),
        [role="menu"]:not(.live-content):not(.empty-state),
        [class*="fullscreen" i]:not(.custom-fullscreen):not(.live-content):not(.empty-state),
        [id*="fullscreen" i]:not(.custom-fullscreen):not(.live-content):not(.empty-state)
      `);
      
      blockedElements.forEach(el => {
        if (el && !el.closest('.live-content, .empty-state, .custom-fullscreen')) {
          // تطبيق تأثير blur متقدم
          el.style.filter = 'blur(30px) saturate(0) contrast(0) brightness(0)';
          el.style.backdropFilter = 'blur(35px) saturate(0)';
          el.style.background = 'rgba(0, 0, 0, 1)';
          el.style.transform = 'scale(0) rotate(180deg)';
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
          el.style.pointerEvents = 'none';
          el.style.position = 'absolute';
          el.style.left = '-999999px';
          el.style.top = '-999999px';
          el.style.zIndex = '-999999';
          
          // محاولة إزالة العنصر
          try {
            el.remove();
          } catch (e) {
            // تجاهل أخطاء الإزالة
          }
        }
      });
    }, 500);
    
    // تنظيف عند إلغاء المكون
    return () => {
      const style = document.getElementById('youtube-share-blur-protection');
      if (style && document.head.contains(style)) {
        document.head.removeChild(style);
      }
      advancedObserver.disconnect();
      clearInterval(blurInterval);
    };
  }, []);

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
          
          // تحويل الرابط إذا كان يوتيوب
          const convertedUrl = convertYouTubeURL(data.streamUrl || '');
          setLiveStreamUrl(convertedUrl);
          
          console.log('🔗 الرابط الأصلي:', data.streamUrl);
          console.log('🔗 الرابط المحول:', convertedUrl);
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
    
    // تحديث حالة البث كل 15 ثانية (أسرع من الفيديوهات والملفات)
    const interval = setInterval(fetchLiveStream, 15000);
    
    return () => clearInterval(interval);
  }, []);

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
          <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>🔴</div>
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
            boxShadow: `0 4px 12px ${isLiveStreamActive ? 'rgba(40, 167, 69, 0.3)' : 'rgba(108, 117, 125, 0.3)'}`
          }}>
            {isLiveStreamActive ? '🟢 البث نشط الآن' : '⏸️ لا يوجد بث حالياً'}
          </div>
        </div>

        {/* Content Container - متوسط للشاشات العادية */}
        <div style={{
          width: '100%',
          maxWidth: '900px', // عرض محدود للشاشات العادية
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
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              animation: 'slideInUp 0.8s ease-out',
              position: 'relative',
              maxWidth: '800px',
              width: '100%'
            }}>
              {/* نقطة البث المباشر */}
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

              {/* علامة LIVE */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '25px',
                background: '#ff0000',
                color: 'white',
                padding: '5px 12px',
                borderRadius: '15px',
                fontSize: '0.8rem',
                fontWeight: '700',
                zIndex: 10,
                boxShadow: '0 2px 8px rgba(255, 0, 0, 0.3)',
                animation: 'pulse 2s infinite'
              }}>
                🔴 LIVE
              </div>

              {/* زر تكبير الشاشة المخصص */}
              <button
                onClick={toggleCustomFullscreen}
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '15px',
                  padding: '8px 15px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  zIndex: 15,
                  color: '#333',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 1)';
                  e.target.style.transform = 'translateX(-50%) translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateX(-50%) translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>⛶</span>
                <span>تكبير الشاشة</span>
              </button>

              {/* الفيديو مع طبقة إخفاء متقدمة */}
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%', // نسبة 16:9
                height: 0,
                borderRadius: '20px',
                overflow: 'hidden',
                border: '3px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                background: '#000' // خلفية سوداء للفيديو
              }}>
                <iframe
                  src={liveStreamUrl}
                  title="البث المباشر التعليمي"
                  frameBorder="0"
                  allowFullScreen={false} // منع fullscreen من iframe
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
                  // إضافة sandbox للأمان مع منع الشير والتحميل والـ fullscreen
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                  // منع النقر الأيمن والسحب
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  onSelectStart={(e) => e.preventDefault()}
                />
                
                {/* طبقة إخفاء شاملة متقدمة لمنع أي تفاعل مع أزرار YouTube */}
                <div style={{
                  position: 'absolute',
                  bottom: '0px',
                  right: '0px',
                  width: '250px',
                  height: '60px',
                  background: 'rgba(0, 0, 0, 0.9)',
                  zIndex: 999999,
                  pointerEvents: 'auto',
                  borderRadius: '0 0 20px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.3)',
                  fontSize: '12px',
                  fontWeight: '600'
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
                style={{
                  cursor: 'not-allowed',
                  userSelect: 'none',
                  webkitUserSelect: 'none',
                  mozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
                >
                  🔒 محمي
                </div>
                
                {/* طبقة إخفاء علوية إضافية */}
                <div style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  width: '180px',
                  height: '60px',
                  background: 'rgba(0, 0, 0, 0.8)',
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
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation();
                  return false;
                }}
                ></div>
                
                {/* طبقة إخفاء وسطى يمنى */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0px',
                  width: '120px',
                  height: '80px',
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
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation();
                  return false;
                }}
                ></div>
                
                {/* طبقة حماية إضافية لمنع النقر الأيمن والشير */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    pointerEvents: 'none',
                    background: 'transparent'
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                  onSelectStart={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                ></div>
                
                {/* overlay متقدم لحجب كامل لمنطقة الأزرار */}
                <div 
                  className="youtube-share-blocker-advanced"
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '300px',
                    height: '100px',
                    background: 'transparent',
                    zIndex: 999999,
                    pointerEvents: 'auto',
                    cursor: 'not-allowed'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    // إزالة أي قوائم شير ظاهرة
                    setTimeout(() => {
                      const shareElements = document.querySelectorAll(`
                        .ytp-share-panel,
                        .ytp-popup,
                        .ytp-panel,
                        [role="dialog"],
                        [role="menu"],
                        [class*="share" i]:not(.live-content):not(.empty-state)
                      `);
                      shareElements.forEach(el => {
                        if (el && !el.closest('.live-content, .empty-state')) {
                          el.remove();
                        }
                      });
                    }, 0);
                    
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
                  onDoubleClick={(e) => {
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
                ></div>
              </div>

              {/* معلومات إضافية */}
              <div style={{
                marginTop: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '15px',
                  marginBottom: '15px'
                }}>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    fontWeight: '500',
                    margin: '0 0 10px 0',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}>
                    📺 استخدم زر "تكبير الشاشة" للحصول على تجربة أفضل
                  </p>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.9rem',
                    margin: 0,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}>
                    🎯 للحصول على أفضل جودة، تأكد من سرعة الإنترنت
                  </p>
                </div>
                
                {/* أزرار إضافية للتحكم */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => window.location.reload()}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '10px',
                      color: 'white',
                      padding: '8px 15px',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    🔄 تحديث البث
                  </button>
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
              <div className="icon" style={{ fontSize: '5rem', marginBottom: '25px', opacity: 0.7 }}>📺</div>
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
                padding: '20px',
                marginTop: '25px'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>💡 نصائح مهمة:</h4>
                <ul style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  textAlign: 'right',
                  listStyle: 'none',
                  padding: 0
                }}>
                  <li style={{ marginBottom: '8px' }}>🔄 تحديث الصفحة تلقائياً كل 15 ثانية</li>
                  <li style={{ marginBottom: '8px' }}>📱 يمكنك مشاهدة البث من الهاتف أو الكمبيوتر</li>
                  <li style={{ marginBottom: '8px' }}>🔔 ستظهر إشارة حمراء عند بدء البث</li>
                  <li>🌐 تأكد من قوة الإنترنت لأفضل جودة</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Fullscreen Overlay */}
      {isCustomFullscreen && (
        <div className="custom-fullscreen-overlay">
          <button
            className="custom-fullscreen-close"
            onClick={toggleCustomFullscreen}
          >
            ✕
          </button>
          <div className="custom-fullscreen-content">
            <iframe
              src={liveStreamUrl}
              title="البث المباشر التعليمي - شاشة كاملة"
              frameBorder="0"
              allowFullScreen={false} // منع fullscreen من iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                outline: 'none',
                borderRadius: '15px'
              }}
              sandbox="allow-scripts allow-same-origin allow-presentation"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onSelectStart={(e) => e.preventDefault()}
            />
            
            {/* طبقات حماية في الـ fullscreen */}
            <div style={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              width: '300px',
              height: '80px',
              background: 'rgba(0, 0, 0, 0.9)',
              zIndex: 999999,
              pointerEvents: 'auto',
              borderRadius: '0 0 15px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.3)',
              fontSize: '14px',
              fontWeight: '600'
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              return false;
            }}
            >
              🔒 محمي - شاشة كاملة
            </div>
            
            <div style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              width: '250px',
              height: '80px',
              background: 'rgba(0, 0, 0, 0.8)',
              zIndex: 999998,
              pointerEvents: 'auto',
              borderRadius: '0 15px 0 0'
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              return false;
            }}
            ></div>
          </div>
        </div>
      )}

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
          
          /* تحسين للشاشات الكبيرة - توسيط المحتوى */
          @media (min-width: 992px) {
            .live-content {
              max-width: 800px !important;
              margin: 0 auto !important;
            }
          }
          
          @media (min-width: 1200px) {
            .live-content {
              max-width: 900px !important;
            }
          }
          
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
            
            .pulse-dot {
              width: 16px !important;
              height: 16px !important;
              top: 20px !important;
              right: 20px !important;
            }
            
            .header-section h1 {
              font-size: 2rem !important;
            }
            
            .header-section p {
              font-size: 1rem !important;
            }
            
            .control-buttons {
              flex-direction: column !important;
              gap: 8px !important;
            }
            
            .control-buttons button {
              width: 100% !important;
            }

            .custom-fullscreen-content {
              width: 95vw !important;
              height: 85vh !important;
            }

            .custom-fullscreen-close {
              width: 40px !important;
              height: 40px !important;
              font-size: 1.2rem !important;
              top: 15px !important;
              right: 15px !important;
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
            
            .header-section {
              padding: 20px 0 !important;
            }
            
            .header-section h1 {
              font-size: 1.8rem !important;
            }
            
            .header-section .icon {
              font-size: 2.5rem !important;
            }
            
            .pulse-dot {
              width: 14px !important;
              height: 14px !important;
              top: 15px !important;
              right: 15px !important;
            }

            .custom-fullscreen-content {
              width: 98vw !important;
              height: 80vh !important;
            }

            .custom-fullscreen-close {
              width: 35px !important;
              height: 35px !important;
              font-size: 1rem !important;
              top: 10px !important;
              right: 10px !important;
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
            
            .header-content {
              padding: 0 10px !important;
            }
            
            .header-content h1 {
              font-size: 1.4rem !important;
            }
            
            .header-content p {
              font-size: 0.9rem !important;
            }
            
            .pulse-dot {
              width: 12px !important;
              height: 12px !important;
              top: 12px !important;
              right: 12px !important;
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
          
          /* إخفاء عناصر YouTube وأزرار الشير والـ fullscreen بقوة شديدة */
          iframe[src*="youtube.com"] ~ *,
          .ytp-chrome-top,
          .ytp-title,
          .ytp-title-text,
          .ytp-title-link,
          .ytp-chrome-top-buttons,
          .ytp-watermark,
          .ytp-cards-teaser,
          .ytp-ce-element,
          .ytp-share-button,
          .ytp-share-button-visible,
          .ytp-watch-later-button,
          .ytp-playlist-menu-button,
          .ytp-overflow-button,
          .ytp-contextmenu,
          .ytp-popup,
          .ytp-cards-button,
          .ytp-endscreen-element,
          .annotation,
          .video-annotations,
          .ytp-fullscreen-button,
          .ytp-size-button,
          button[data-tooltip-target-id*="share"],
          button[aria-label*="Share"],
          button[aria-label*="شارك"],
          button[title*="Share"],
          button[title*="شارك"],
          button[aria-label*="Fullscreen"],
          button[aria-label*="ملء الشاشة"],
          button[title*="Fullscreen"],
          button[title*="ملء الشاشة"],
          .ytp-button[data-tooltip-target-id*="ytp-share"],
          .ytp-button[data-tooltip-target-id*="ytp-fullscreen"],
          .ytp-share-panel,
          .ytp-menuitem[aria-label*="Share"],
          .ytp-menuitem[aria-label*="شارك"],
          [role="button"][aria-label*="Share"],
          [role="button"][aria-label*="شارك"],
          [role="button"][aria-label*="Fullscreen"],
          [role="button"][aria-label*="ملء الشاشة"],
          *[class*="share" i],
          *[id*="share" i],
          *[data-tooltip*="share" i],
          *[class*="fullscreen" i]:not(.custom-fullscreen):not(.live-content):not(.empty-state),
          *[id*="fullscreen" i]:not(.custom-fullscreen):not(.live-content):not(.empty-state),
          .ytp-overflow-menu,
          .ytp-settings-menu .ytp-menuitem:nth-child(n+3) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            left: -9999px !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            z-index: -9999 !important;
            transform: scale(0) !important;
          }
          
          /* إخفاء أزرار التحكم الإضافية */
          .ytp-chrome-controls .ytp-right-controls {
            max-width: 120px !important;
            overflow: hidden !important;
          }
          
          .ytp-chrome-controls .ytp-right-controls .ytp-button:nth-last-child(-n+4) {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* منع ظهور القوائم المنبثقة */
          .ytp-popup,
          .ytp-contextmenu,
          .ytp-overflow-menu {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* حماية قصوى ضد قوائم الشير والـ fullscreen */
          .ytp-share-panel,
          .ytp-share-panel-visible,
          .ytp-share-panel-content,
          .ytp-share-panel-container,
          .ytp-popup.ytp-share-panel,
          .ytp-panel.ytp-share-panel,
          div[class*="share"]:not(.live-content):not(.empty-state):not(.custom-fullscreen),
          div[id*="share"]:not(.live-content):not(.empty-state):not(.custom-fullscreen),
          div[class*="fullscreen"]:not(.custom-fullscreen):not(.live-content):not(.empty-state),
          div[id*="fullscreen"]:not(.custom-fullscreen):not(.live-content):not(.empty-state),
          [role="dialog"]:not(.live-content):not(.empty-state):not(.custom-fullscreen),
          [role="menu"]:not(.live-content):not(.empty-state),
          [role="listbox"]:not(.live-content):not(.empty-state) {
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
            transform: scale(0) translate(-99999px, -99999px) !important;
            clip: rect(0 0 0 0) !important;
            clip-path: polygon(0 0, 0 0, 0 0) !important;
          }
          
          /* منع ظهور أي نافذة منبثقة من YouTube */
          iframe[src*="youtube"] + *,
          .ytp-popup,
          .ytp-panel,
          .ytp-contextmenu,
          .ytp-overflow-menu {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
          
          /* حجب منطقة الأزرار اليمنى */
          .youtube-share-blocker-advanced {
            background: linear-gradient(45deg, transparent 49%, rgba(255, 0, 0, 0.01) 50%, transparent 51%) !important;
          }
          
          .youtube-share-blocker-advanced:hover {
            background: rgba(255, 0, 0, 0.05) !important;
          }
          
          .youtube-share-blocker-advanced:active {
            background: rgba(255, 0, 0, 0.1) !important;
          }
          
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* تحسين التباين للرؤية */
          @media (prefers-contrast: high) {
            .live-content {
              border: 3px solid #fff !important;
            }
            
            .empty-state {
              border: 3px solid #fff !important;
            }

            .custom-fullscreen-content {
              border: 3px solid #fff !important;
            }
          }
          
          /* تحسين للطباعة */
          @media print {
            .live-content iframe {
              display: none !important;
            }
            
            .live-content::after {
              content: "البث المباشر متاح على الموقع الإلكتروني" !important;
              display: block !important;
              text-align: center !important;
              padding: 50px !important;
              color: #000 !important;
              background: #fff !important;
            }

            .custom-fullscreen-overlay {
              display: none !important;
            }
          }
          
          /* منع النقر الأيمن والتحديد والسحب على الفيديو */
          .live-content {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
          }
          
          .live-content iframe,
          .custom-fullscreen-content iframe {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            pointer-events: auto !important;
          }
          
          /* منع النقر الأيمن */
          .live-content iframe,
          .live-content,
          .custom-fullscreen-content iframe,
          .custom-fullscreen-content {
            -webkit-context-menu: none !important;
            context-menu: none !important;
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

          /* استايل تكبير الشاشة المخصص */
          .custom-fullscreen-overlay {
            animation: fadeIn 0.3s ease-out;
          }

          .custom-fullscreen-content {
            animation: slideInScale 0.4s ease-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideInScale {
            from {
              opacity: 0;
              transform: scale(0.8) translateY(50px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          /* تحسين زر تكبير الشاشة */
          .live-content button[onclick*="toggleCustomFullscreen"] {
            animation: pulseGlow 2s infinite;
          }

          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            50% {
              box-shadow: 0 6px 25px rgba(255, 255, 255, 0.3);
            }
          }

          /* حماية إضافية للشاشة الكاملة */
          .custom-fullscreen-overlay .ytp-share-button,
          .custom-fullscreen-overlay .ytp-overflow-button,
          .custom-fullscreen-overlay .ytp-fullscreen-button,
          .custom-fullscreen-overlay .ytp-size-button,
          .custom-fullscreen-overlay [class*="share" i],
          .custom-fullscreen-overlay [id*="share" i],
          .custom-fullscreen-overlay [class*="fullscreen" i]:not(.custom-fullscreen),
          .custom-fullscreen-overlay [id*="fullscreen" i]:not(.custom-fullscreen) {
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
          }

          /* منع scroll في الخلفية عند تكبير الشاشة */
          body.custom-fullscreen-active {
            overflow: hidden !important;
            position: fixed !important;
            width: 100% !important;
            height: 100% !important;
          }

          /* تحسين الاستجابة للوحة اللمس */
          .custom-fullscreen-close {
            touch-action: manipulation !important;
          }

          .live-content button {
            touch-action: manipulation !important;
          }

          /* تحسين للشاشات اللمسية */
          @media (hover: none) and (pointer: coarse) {
            .custom-fullscreen-close {
              width: 60px !important;
              height: 60px !important;
              font-size: 1.8rem !important;
            }

            .live-content button {
              padding: 12px 20px !important;
              font-size: 1rem !important;
            }
          }

          /* تحسين للوضع الليلي */
          @media (prefers-color-scheme: dark) {
            .custom-fullscreen-close {
              background: rgba(40, 40, 40, 0.95) !important;
              color: #ffffff !important;
              border: 2px solid rgba(255, 255, 255, 0.3) !important;
            }

            .custom-fullscreen-close:hover {
              background: rgba(60, 60, 60, 1) !important;
              border-color: rgba(255, 255, 255, 0.5) !important;
            }
          }

          /* حماية من تسريب الذاكرة */
          .custom-fullscreen-overlay iframe {
            pointer-events: auto !important;
            isolation: isolate !important;
          }

          /* تحسين الأمان */
          iframe[src*="youtube.com"] {
            sandbox: allow-scripts allow-same-origin allow-presentation !important;
          }

          /* منع التلاعب بالـ DOM */
          .ytp-chrome-controls *[onclick],
          .ytp-chrome-controls *[onmousedown],
          .ytp-chrome-controls *[ontouchstart] {
            pointer-events: none !important;
            display: none !important;
          }

          /* تحسين النص للقراءة */
          .live-content p,
          .empty-state p,
          .live-content li,
          .empty-state li {
            line-height: 1.6 !important;
            letter-spacing: 0.5px !important;
          }

          /* تحسين التنقل بالكيبورد */
          .custom-fullscreen-close:focus {
            outline: 3px solid rgba(255, 255, 255, 0.8) !important;
            outline-offset: 3px !important;
          }

          .live-content button:focus {
            outline: 3px solid rgba(255, 255, 255, 0.6) !important;
            outline-offset: 2px !important;
          }

          /* منع التشويش البصري */
          .ytp-chrome-controls {
            filter: none !important;
            backdrop-filter: none !important;
          }

          .ytp-chrome-controls .ytp-left-controls {
            filter: none !important;
          }

          .ytp-chrome-controls .ytp-time-display {
            filter: none !important;
          }

          .ytp-chrome-controls .ytp-progress-bar-container {
            filter: none !important;
          }

          .ytp-chrome-controls .ytp-volume-area {
            filter: none !important;
          }

          /* السماح فقط بأزرار التحكم الأساسية */
          .ytp-play-button,
          .ytp-pause-button,
          .ytp-mute-button,
          .ytp-volume-slider,
          .ytp-time-display,
          .ytp-progress-bar,
          .ytp-scrubber-button,
          .ytp-progress-bar-container,
          .ytp-volume-area,
          .ytp-left-controls {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            pointer-events: auto !important;
            filter: none !important;
            transform: none !important;
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: auto !important;
            height: auto !important;
            z-index: auto !important;
          }
        `}
      </style>
    </>
  );
}

export default LiveGrade3;
