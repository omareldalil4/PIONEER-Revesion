// src/contents/grade3/LiveGrade3.js
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

function LiveGrade3() {
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(false);
  const [liveStreamUrl, setLiveStreamUrl] = useState('');
  const [loading, setLoading] = useState(true);

  // دالة لتحويل رابط يوتيوب إلى رابط embed مع إخفاء معلومات القناة
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
      // إعدادات YouTube لإخفاء معلومات القناة وإيقاف الشير
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
        'widget_referrer=' + encodeURIComponent(window.location.origin) + '&' + // تحديد المرجع
        'wmode=opaque&' +         // منع التداخل مع عناصر الصفحة
        'origin=' + window.location.origin; // تحديد المصدر للأمان
    }
    
    return url;
  };

  // نظام حماية متقدم ومتعدد الطبقات ضد أزرار الشير
  useEffect(() => {
    // حقن CSS قوي جداً لإخفاء أزرار YouTube
    const style = document.createElement('style');
    style.textContent = `
      /* إخفاء أزرار الشير في YouTube بقوة قصوى - طبقة 1 */
      .ytp-share-button,
      .ytp-share-button-visible,
      .ytp-share-panel,
      .ytp-share-panel-visible,
      .ytp-share-panel-content,
      .ytp-share-panel-container,
      .ytp-panel.ytp-share-panel,
      .ytp-popup.ytp-share-panel,
      div[class*="share" i]:not(.live-content):not(.empty-state),
      div[id*="share" i]:not(.live-content):not(.empty-state),
      button[data-tooltip-target-id*="share" i],
      button[aria-label*="Share" i],
      button[aria-label*="شارك" i],
      button[title*="Share" i],
      button[title*="شارك" i],
      .ytp-button[data-tooltip-target-id*="ytp-share"],
      .ytp-overflow-button,
      .ytp-overflow-menu,
      .ytp-contextmenu,
      .ytp-popup.ytp-contextmenu,
      .ytp-menuitem[aria-label*="Share" i],
      .ytp-menuitem[aria-label*="شارك" i],
      .ytp-cards-button,
      .ytp-cards-teaser,
      .ytp-ce-element,
      .ytp-endscreen-element,
      .annotation,
      .video-annotations,
      .ytp-watch-later-button,
      .ytp-playlist-menu-button,
      .ytp-chrome-top-buttons,
      .ytp-settings-menu .ytp-menuitem:nth-child(n+3),
      [role="button"][aria-label*="Share" i],
      [role="button"][aria-label*="شارك" i],
      [role="dialog"][aria-label*="Share" i],
      [role="dialog"][aria-label*="شارك" i],
      [role="menu"]:not(.live-content):not(.empty-state),
      [role="listbox"]:not(.live-content):not(.empty-state),
      [role="menuitem"][aria-label*="Share" i],
      [role="menuitem"][aria-label*="شارك" i] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: fixed !important;
        left: -99999px !important;
        top: -99999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        z-index: -999999 !important;
        transform: scale(0) translate3d(-99999px, -99999px, -99999px) !important;
        clip: rect(0 0 0 0) !important;
        clip-path: polygon(0 0, 0 0, 0 0) !important;
        content-visibility: hidden !important;
        contain: strict !important;
        isolation: isolate !important;
      }
      
      /* طبقة 2 - إخفاء العناصر التي تحتوي على كلمة Share بأي شكل */
      *[class*="share" i]:not(.live-content):not(.empty-state):not(.youtube-share-blocker),
      *[id*="share" i]:not(.live-content):not(.empty-state):not(.youtube-share-blocker),
      *[data-tooltip*="share" i]:not(.live-content):not(.empty-state),
      *[aria-label*="share" i]:not(.live-content):not(.empty-state),
      *[title*="share" i]:not(.live-content):not(.empty-state),
      *[alt*="share" i]:not(.live-content):not(.empty-state) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: fixed !important;
        left: -99999px !important;
        top: -99999px !important;
        z-index: -999999 !important;
        transform: scale(0) !important;
      }
      
      /* طبقة 3 - منع النقر الأيمن على الفيديو */
      .live-content iframe {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        user-select: none !important;
        pointer-events: auto !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      /* طبقة 4 - إخفاء شريط التحكم العلوي */
      .ytp-chrome-top,
      .ytp-title,
      .ytp-title-text,
      .ytp-title-link,
      .ytp-watermark {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      
      /* طبقة 5 - تقليل عرض شريط التحكم للتحكم في الأزرار */
      .ytp-chrome-controls .ytp-right-controls {
        max-width: 50px !important;
        overflow: hidden !important;
      }
      
      /* طبقة 6 - إخفاء آخر 6 أزرار في شريط التحكم بقوة */
      .ytp-chrome-controls .ytp-right-controls .ytp-button:nth-last-child(-n+6) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        width: 0 !important;
        height: 0 !important;
      }
      
      /* طبقة 7 - إخفاء أي نافذة منبثقة */
      .ytp-popup,
      .ytp-panel,
      [role="dialog"]:not(.live-content):not(.empty-state),
      [role="menu"]:not(.live-content):not(.empty-state),
      [role="listbox"]:not(.live-content):not(.empty-state),
      .ytp-overflow-menu,
      .ytp-contextmenu {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: fixed !important;
        left: -99999px !important;
        top: -99999px !important;
        z-index: -999999 !important;
        transform: scale(0) !important;
      }
      
      /* طبقة 8 - منع ظهور أي overlay من YouTube */
      .ytp-ce-element,
      .ytp-cards-teaser,
      .ytp-endscreen-element,
      .annotation,
      .video-annotations {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      
      /* طبقة 9 - حماية إضافية للعناصر التفاعلية */
      iframe[src*="youtube"] {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
      
      /* طبقة 10 - منع أي تفاعل مع المنطقة اليمنى */
      .youtube-share-blocker-ultimate {
        position: absolute !important;
        top: 0 !important;
        right: 0 !important;
        width: 200px !important;
        height: 100% !important;
        background: transparent !important;
        z-index: 999999 !important;
        pointer-events: auto !important;
        cursor: not-allowed !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
      }
      
      /* طبقة 11 - حجب المنطقة السفلية اليمنى */
      .youtube-bottom-blocker {
        position: absolute !important;
        bottom: 0 !important;
        right: 0 !important;
        width: 300px !important;
        height: 100px !important;
        background: rgba(0, 0, 0, 0.01) !important;
        z-index: 999999 !important;
        pointer-events: auto !important;
        cursor: not-allowed !important;
      }
      
      /* طبقة 12 - حجب المنطقة العلوية اليمنى */
      .youtube-top-blocker {
        position: absolute !important;
        top: 0 !important;
        right: 0 !important;
        width: 250px !important;
        height: 80px !important;
        background: transparent !important;
        z-index: 999999 !important;
        pointer-events: auto !important;
        cursor: not-allowed !important;
      }
    `;
    document.head.appendChild(style);
    
    // مراقب DOM متقدم لإزالة أي عناصر شير تظهر ديناميكياً
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            // البحث الشامل عن عناصر الشير
            const shareSelectors = [
              '.ytp-share-panel', '.ytp-share-button', '.ytp-popup', '.ytp-panel',
              '.ytp-overflow-menu', '.ytp-contextmenu', '.ytp-cards-button',
              '.ytp-endscreen-element', '.ytp-ce-element', '.annotation',
              '[class*="share" i]', '[id*="share" i]', '[aria-label*="Share"]',
              '[aria-label*="شارك"]', '[role="dialog"]', '[role="menu"]',
              '[role="listbox"]', '[role="menuitem"]', '[data-tooltip*="share" i]',
              '[title*="share" i]', 'button[aria-label*="Share"]',
              'button[aria-label*="شارك"]', '.ytp-watch-later-button',
              '.ytp-playlist-menu-button', '.ytp-chrome-top-buttons'
            ];
            
            const shareElements = node.querySelectorAll ? 
              node.querySelectorAll(shareSelectors.join(', ')) : [];
            
            // إزالة فورية وقوية للعناصر
            shareElements.forEach(el => {
              if (el && !el.closest('.live-content, .empty-state, .youtube-share-blocker')) {
                // إخفاء فوري
                el.style.cssText = `
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                  position: fixed !important;
                  left: -99999px !important;
                  top: -99999px !important;
                  z-index: -999999 !important;
                  width: 0 !important;
                  height: 0 !important;
                  overflow: hidden !important;
                  transform: scale(0) !important;
                `;
                
                // إزالة العنصر نهائياً بعد إخفائه
                setTimeout(() => {
                  try {
                    if (el.parentNode) {
                      el.parentNode.removeChild(el);
                    }
                  } catch (e) {
                    // تجاهل الأخطاء
                  }
                }, 0);
              }
            });
            
            // فحص العنصر نفسه
            if (node.classList && node.getAttribute) {
              const classList = Array.from(node.classList || []);
              const attributes = {
                class: node.className || '',
                id: node.id || '',
                role: node.getAttribute('role') || '',
                'aria-label': node.getAttribute('aria-label') || '',
                'data-tooltip': node.getAttribute('data-tooltip') || '',
                title: node.getAttribute('title') || ''
              };
              
              // فحص شامل للعقد
              const shouldRemove = 
                classList.some(cls => cls.toLowerCase().includes('share')) ||
                Object.values(attributes).some(attr => 
                  attr.toLowerCase().includes('share') || 
                  attr.toLowerCase().includes('شارك')
                ) ||
                ['ytp-popup', 'ytp-panel', 'ytp-overflow-menu', 'ytp-contextmenu'].some(cls => 
                  classList.includes(cls)
                ) ||
                ['dialog', 'menu', 'listbox', 'menuitem'].includes(attributes.role);
              
              if (shouldRemove && !node.closest('.live-content, .empty-state, .youtube-share-blocker')) {
                node.style.cssText = `
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                  position: fixed !important;
                  left: -99999px !important;
                  top: -99999px !important;
                  z-index: -999999 !important;
                `;
                
                setTimeout(() => {
                  try {
                    if (node.parentNode) {
                      node.parentNode.removeChild(node);
                    }
                  } catch (e) {
                    // تجاهل الأخطاء
                  }
                }, 0);
              }
            }
          }
        });
      });
    });
    
    // بدء مراقبة شاملة للتغييرات
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'aria-label', 'role', 'data-tooltip', 'title', 'id']
    });
    
    // تدمير منتظم ومكثف لأي عناصر شير
    const destroyInterval = setInterval(() => {
      const shareSelectors = [
        '.ytp-share-panel', '.ytp-share-button', '.ytp-popup', '.ytp-panel',
        '.ytp-overflow-menu', '.ytp-contextmenu', '.ytp-cards-button',
        '.ytp-endscreen-element', '.ytp-ce-element', '.annotation',
        '[class*="share" i]:not(.live-content):not(.empty-state):not(.youtube-share-blocker)',
        '[id*="share" i]:not(.live-content):not(.empty-state):not(.youtube-share-blocker)',
        '[aria-label*="Share"]:not(.live-content):not(.empty-state)',
        '[aria-label*="شارك"]:not(.live-content):not(.empty-state)',
        '[role="dialog"]:not(.live-content):not(.empty-state)',
        '[role="menu"]:not(.live-content):not(.empty-state)',
        '[role="listbox"]:not(.live-content):not(.empty-state)',
        '[role="menuitem"]:not(.live-content):not(.empty-state)',
        '[data-tooltip*="share" i]:not(.live-content):not(.empty-state)',
        '[title*="share" i]:not(.live-content):not(.empty-state)',
        'button[aria-label*="Share"]:not(.live-content):not(.empty-state)',
        'button[aria-label*="شارك"]:not(.live-content):not(.empty-state)',
        '.ytp-watch-later-button', '.ytp-playlist-menu-button',
        '.ytp-chrome-top-buttons', '.ytp-cards-teaser', '.video-annotations'
      ];
      
      shareSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            if (el && !el.closest('.live-content, .empty-state, .youtube-share-blocker')) {
              // إخفاء فوري
              el.style.cssText = `
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
                position: fixed !important;
                left: -99999px !important;
                top: -99999px !important;
                z-index: -999999 !important;
                width: 0 !important;
                height: 0 !important;
              `;
              
              // محاولة إزالة العنصر
              try {
                if (el.parentNode) {
                  el.parentNode.removeChild(el);
                }
              } catch (e) {
                // تجاهل الأخطاء
              }
            }
          });
        } catch (e) {
          // تجاهل الأخطاء في العثور على العناصر
        }
      });
    }, 500); // كل نصف ثانية للحماية القصوى
    
    // تدمير إضافي كل ثانية
    const extraDestroyInterval = setInterval(() => {
      // البحث عن أي iframe YouTube وحقن CSS إضافي
      const youtubeIframes = document.querySelectorAll('iframe[src*="youtube"]');
      youtubeIframes.forEach(iframe => {
        try {
          // منع أي تفاعل مع المنطقة اليمنى
          const container = iframe.closest('.live-content');
          if (container) {
            // التأكد من وجود طبقات الحماية
            if (!container.querySelector('.youtube-share-blocker-ultimate')) {
              const blocker = document.createElement('div');
              blocker.className = 'youtube-share-blocker-ultimate';
              blocker.style.cssText = `
                position: absolute !important;
                top: 0 !important;
                right: 0 !important;
                width: 200px !important;
                height: 100% !important;
                background: transparent !important;
                z-index: 999999 !important;
                pointer-events: auto !important;
                cursor: not-allowed !important;
              `;
              
              // منع جميع أنواع التفاعل
              ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'contextmenu', 'dblclick'].forEach(event => {
                blocker.addEventListener(event, (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation();
                  return false;
                }, true);
              });
              
              container.appendChild(blocker);
            }
          }
        } catch (e) {
          // تجاهل الأخطاء
        }
      });
    }, 1000);
    
    // تنظيف عند إزالة المكون
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      observer.disconnect();
      clearInterval(destroyInterval);
      clearInterval(extraDestroyInterval);
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
                  // إضافة sandbox للأمان مع منع الشير والتحميل
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                  // منع النقر الأيمن والسحب
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  onSelectStart={(e) => e.preventDefault()}
                />
                
                {/* طبقة حماية قصوى لمنع الوصول لأزرار YouTube - الطبقة الأولى */}
                <div 
                  className="youtube-share-blocker-layer-1"
                  style={{
                    position: 'absolute',
                    bottom: '0px',
                    right: '0px',
                    width: '350px',
                    height: '80px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    zIndex: 999999,
                    pointerEvents: 'auto',
                    borderRadius: '0 0 20px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'not-allowed',
                    userSelect: 'none',
                    webkitUserSelect: 'none',
                    mozUserSelect: 'none',
                    msUserSelect: 'none'
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
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    return false;
                  }}
                >
                  🔒 منطقة محمية
                </div>
                
                {/* طبقة حماية علوية يمنى - الطبقة الثانية */}
                <div 
                  className="youtube-share-blocker-layer-2"
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    width: '220px',
                    height: '80px',
                    background: 'rgba(0, 0, 0, 0.7)',
                    zIndex: 999998,
                    pointerEvents: 'auto',
                    borderRadius: '0 20px 0 0',
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
                ></div>
                
                {/* طبقة حماية وسطى يمنى - الطبقة الثالثة */}
                <div 
                  className="youtube-share-blocker-layer-3"
                  style={{
                    position: 'absolute',
                    top: '30%',
                    right: '0px',
                    width: '150px',
                    height: '40%',
                    background: 'transparent',
                    zIndex: 999997,
                    pointerEvents: 'auto',
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
                ></div>
                
                {/* طبقة حماية شاملة للجانب الأيمن بالكامل - الطبقة الرابعة */}
                <div 
                  className="youtube-share-blocker-layer-4"
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '300px',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.01) 70%, rgba(0,0,0,0.1) 100%)',
                    zIndex: 999996,
                    pointerEvents: 'auto',
                    cursor: 'not-allowed'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    // إزالة فورية لأي قوائم شير ظاهرة
                    setTimeout(() => {
                      const shareElements = document.querySelectorAll(`
                        .ytp-share-panel, .ytp-popup, .ytp-panel, .ytp-overflow-menu,
                        .ytp-contextmenu, [role="dialog"], [role="menu"], [role="listbox"],
                        [class*="share" i]:not(.live-content):not(.empty-state):not(.youtube-share-blocker),
                        [aria-label*="Share"], [aria-label*="شارك"]
                      `);
                      shareElements.forEach(el => {
                        if (el && !el.closest('.live-content, .empty-state, .youtube-share-blocker')) {
                          el.style.display = 'none !important';
                          el.style.visibility = 'hidden !important';
                          el.style.opacity = '0 !important';
                          el.style.pointerEvents = 'none !important';
                          el.style.position = 'fixed !important';
                          el.style.left = '-99999px !important';
                          el.style.top = '-99999px !important';
                          el.style.zIndex = '-999999 !important';
                          try {
                            if (el.parentNode) {
                              el.parentNode.removeChild(el);
                            }
                          } catch (e) {
                            // تجاهل الأخطاء
                          }
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
                
                {/* طبقة حماية للمنطقة السفلية بالكامل - الطبقة الخامسة */}
                <div 
                  className="youtube-share-blocker-layer-5"
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: '60px',
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.1) 0%, transparent 100%)',
                    zIndex: 999995,
                    pointerEvents: 'none'
                  }}
                ></div>
                
                {/* طبقة حماية نهائية وشاملة - الطبقة السادسة */}
                <div 
                  className="youtube-share-blocker-ultimate"
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
                    📺 يمكنك تكبير الشاشة للحصول على تجربة أفضل
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
          
          /* حماية قصوى ضد أزرار الشير - CSS إضافي */
          .youtube-share-blocker-layer-1,
          .youtube-share-blocker-layer-2,
          .youtube-share-blocker-layer-3,
          .youtube-share-blocker-layer-4,
          .youtube-share-blocker-layer-5,
          .youtube-share-blocker-ultimate {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
          }
          
          /* منع جميع أشكال التفاعل مع طبقات الحماية */
          .youtube-share-blocker-layer-1 *,
          .youtube-share-blocker-layer-2 *,
          .youtube-share-blocker-layer-3 *,
          .youtube-share-blocker-layer-4 *,
          .youtube-share-blocker-layer-5 *,
          .youtube-share-blocker-ultimate * {
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
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
            
            /* تقليل حجم طبقات الحماية للموبايل */
            .youtube-share-blocker-layer-1 {
              width: 280px !important;
              height: 70px !important;
            }
            
            .youtube-share-blocker-layer-2 {
              width: 180px !important;
              height: 60px !important;
            }
            
            .youtube-share-blocker-layer-3 {
              width: 120px !important;
            }
            
            .youtube-share-blocker-layer-4 {
              width: 250px !important;
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
            
            /* تقليل حجم طبقات الحماية أكثر للشاشات الصغيرة */
            .youtube-share-blocker-layer-1 {
              width: 250px !important;
              height: 60px !important;
              font-size: 10px !important;
            }
            
            .youtube-share-blocker-layer-2 {
              width: 150px !important;
              height: 50px !important;
            }
            
            .youtube-share-blocker-layer-3 {
              width: 100px !important;
            }
            
            .youtube-share-blocker-layer-4 {
              width: 200px !important;
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
            
            /* تقليل حجم طبقات الحماية للشاشات الصغيرة جداً */
            .youtube-share-blocker-layer-1 {
              width: 200px !important;
              height: 50px !important;
              font-size: 9px !important;
            }
            
            .youtube-share-blocker-layer-2 {
              width: 120px !important;
              height: 40px !important;
            }
            
            .youtube-share-blocker-layer-3 {
              width: 80px !important;
            }
            
            .youtube-share-blocker-layer-4 {
              width: 150px !important;
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
          
          /* منع النقر الأيمن والتحديد والسحب على الفيديو */
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
          
          /* منع النقر الأيمن */
          .live-content iframe,
          .live-content {
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
          
          /* حماية إضافية ضد طبقات YouTube */
          .youtube-share-blocker-layer-1:hover,
          .youtube-share-blocker-layer-2:hover,
          .youtube-share-blocker-layer-3:hover,
          .youtube-share-blocker-layer-4:hover {
            background: rgba(255, 0, 0, 0.05) !important;
          }
          
          .youtube-share-blocker-layer-1:active,
          .youtube-share-blocker-layer-2:active,
          .youtube-share-blocker-layer-3:active,
          .youtube-share-blocker-layer-4:active {
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
          }
        `}
      </style>
    </>
  );
}

export default LiveGrade3;
