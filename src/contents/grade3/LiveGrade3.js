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

  // نظام حماية نهائي ومتطور جداً ضد أزرار الشير في YouTube
  useEffect(() => {
    // حقن CSS قوي جداً ومتطور لإخفاء أزرار YouTube نهائياً
    const style = document.createElement('style');
    style.textContent = `
      /* إخفاء نهائي وقوي جداً لجميع أزرار الشير والقوائل - المستوى الأول */
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
      .ytp-cards-button,
      .ytp-cards-teaser,
      .ytp-ce-element,
      .ytp-endscreen-element,
      .annotation,
      .video-annotations,
      .ytp-watch-later-button,
      .ytp-playlist-menu-button,
      .ytp-chrome-top-buttons,
      .ytp-watermark,
      .ytp-title,
      .ytp-title-text,
      .ytp-title-link,
      .ytp-chrome-top {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: fixed !important;
        left: -999999px !important;
        top: -999999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        z-index: -999999 !important;
        transform: scale(0) translate3d(-999999px, -999999px, -999999px) !important;
        clip: rect(0 0 0 0) !important;
        clip-path: polygon(0 0, 0 0, 0 0) !important;
        content-visibility: hidden !important;
        contain: strict !important;
        isolation: isolate !important;
        filter: opacity(0) !important;
      }
      
      /* المستوى الثاني - إخفاء بواسطة الخصائص المتقدمة */
      div[class*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"]),
      div[id*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"]),
      button[data-tooltip-target-id*="share" i],
      button[aria-label*="Share" i],
      button[aria-label*="شارك" i],
      button[title*="Share" i],
      button[title*="شارك" i],
      .ytp-button[data-tooltip-target-id*="ytp-share"],
      .ytp-menuitem[aria-label*="Share" i],
      .ytp-menuitem[aria-label*="شارك" i],
      [role="button"][aria-label*="Share" i],
      [role="button"][aria-label*="شارك" i],
      [role="dialog"][aria-label*="Share" i],
      [role="dialog"][aria-label*="شارك" i],
      [role="menu"]:not(.live-content):not(.empty-state),
      [role="listbox"]:not(.live-content):not(.empty-state),
      [role="menuitem"][aria-label*="Share" i],
      [role="menuitem"][aria-label*="شارك" i],
      *[class*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"]),
      *[id*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"]),
      *[data-tooltip*="share" i]:not(.live-content):not(.empty-state),
      *[aria-label*="share" i]:not(.live-content):not(.empty-state),
      *[title*="share" i]:not(.live-content):not(.empty-state),
      *[alt*="share" i]:not(.live-content):not(.empty-state) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: fixed !important;
        left: -999999px !important;
        top: -999999px !important;
        z-index: -999999 !important;
        transform: scale(0) !important;
        filter: opacity(0) blur(999px) !important;
        content-visibility: hidden !important;
      }
      
      /* المستوى الثالث - إخفاء الأزرار في الشريط الأيمن */
      .ytp-chrome-controls .ytp-right-controls {
        max-width: 40px !important;
        overflow: hidden !important;
        position: relative !important;
      }
      
      /* إخفاء آخر 8 أزرار في شريط التحكم */
      .ytp-chrome-controls .ytp-right-controls .ytp-button:nth-last-child(-n+8),
      .ytp-chrome-controls .ytp-right-controls .ytp-button:nth-child(n+2) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -99999px !important;
        width: 0 !important;
        height: 0 !important;
        transform: scale(0) !important;
      }
      
      /* المستوى الرابع - حجب أي نافذة منبثقة */
      .ytp-popup,
      .ytp-panel,
      [role="dialog"]:not(.live-content):not(.empty-state),
      [role="menu"]:not(.live-content):not(.empty-state),
      [role="listbox"]:not(.live-content):not(.empty-state),
      .ytp-overflow-menu,
      .ytp-contextmenu,
      .ytp-settings-menu .ytp-menuitem:nth-child(n+3) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: fixed !important;
        left: -999999px !important;
        top: -999999px !important;
        z-index: -999999 !important;
        transform: scale(0) !important;
        content-visibility: hidden !important;
      }
      
      /* المستوى الخامس - منع ظهور أي overlay من YouTube */
      .ytp-ce-element,
      .ytp-cards-teaser,
      .ytp-endscreen-element,
      .annotation,
      .video-annotations,
      .ytp-pause-overlay,
      .ytp-gradient-bottom,
      .ytp-chrome-top {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      
      /* المستوى السادس - حماية iframe بشكل كامل */
      iframe[src*="youtube"] {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      /* المستوى السابع - حجب المنطقة اليمنى بالكامل */
      .youtube-ultimate-blocker-physical-1,
      .youtube-ultimate-blocker-physical-2,
      .youtube-ultimate-blocker-physical-3 {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      /* المستوى الثامن - إزالة فورية لأي عنصر يحتوي على share */
      *[class*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"]) {
        animation: hideShareElement 0.001s forwards !important;
      }
      
      @keyframes hideShareElement {
        to {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          transform: scale(0) translate3d(-999999px, -999999px, -999999px) !important;
        }
      }
      
      /* المستوى التاسع - منع أي تفاعل مع العناصر المخفية */
      .ytp-share-button *,
      .ytp-share-panel *,
      .ytp-popup *,
      .ytp-panel *,
      .ytp-overflow-menu *,
      .ytp-contextmenu * {
        pointer-events: none !important;
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      
      /* المستوى العاشر - حماية أقوى للمحتوى */
      .live-content {
        position: relative !important;
        overflow: hidden !important;
      }
      
      .live-content iframe {
        pointer-events: auto !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        user-select: none !important;
      }
      
      /* المستوى الحادي عشر - منع ظهور أي قائمة سياق */
      iframe[src*="youtube"],
      iframe[src*="youtube"] * {
        -webkit-context-menu: none !important;
        context-menu: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // مراقب DOM متطور جداً ومتعدد المستويات
    const createAdvancedObserver = () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // معالجة العقد المضافة
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              processShareElements(node);
            }
          });
          
          // معالجة تغييرات الخصائص
          if (mutation.type === 'attributes') {
            const target = mutation.target;
            if (isShareElement(target)) {
              hideElementCompletely(target);
            }
          }
        });
      });
      
      return observer;
    };
    
    // دالة فحص العناصر للشير
    const isShareElement = (element) => {
      if (!element || !element.getAttribute) return false;
      
      const checkAttributes = [
        'class', 'id', 'aria-label', 'data-tooltip', 'title', 'role'
      ];
      
      const shareKeywords = [
        'share', 'شارك', 'ytp-share', 'ytp-popup', 'ytp-panel', 
        'ytp-overflow', 'ytp-contextmenu', 'ytp-cards', 'ytp-endscreen'
      ];
      
      return checkAttributes.some(attr => {
        const value = (element.getAttribute(attr) || '').toLowerCase();
        return shareKeywords.some(keyword => value.includes(keyword));
      }) || shareKeywords.some(keyword => 
        element.className && element.className.toLowerCase().includes(keyword)
      );
    };
    
    // دالة إخفاء العناصر بشكل كامل
    const hideElementCompletely = (element) => {
      if (!element || element.closest('.live-content, .empty-state') || 
          (element.className && element.className.includes('youtube-ultimate-blocker'))) {
        return;
      }
      
      try {
        // إخفاء فوري وقوي
        element.style.cssText = `
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          position: fixed !important;
          left: -999999px !important;
          top: -999999px !important;
          z-index: -999999 !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
          transform: scale(0) translate3d(-999999px, -999999px, -999999px) !important;
          clip: rect(0 0 0 0) !important;
          clip-path: polygon(0 0, 0 0, 0 0) !important;
          content-visibility: hidden !important;
          contain: strict !important;
          filter: opacity(0) blur(999px) !important;
        `;
        
        // محاولة إزالة العنصر نهائياً
        setTimeout(() => {
          try {
            if (element.parentNode && element.parentNode.contains(element)) {
              element.parentNode.removeChild(element);
            }
          } catch (e) {
            // تجاهل الأخطاء
          }
        }, 0);
        
      } catch (e) {
        // تجاهل الأخطاء
      }
    };
    
    // دالة معالجة العناصر
    const processShareElements = (node) => {
      try {
        // فحص العقدة نفسها
        if (isShareElement(node)) {
          hideElementCompletely(node);
          return;
        }
        
        // البحث في العقد الفرعية
        if (node.querySelectorAll) {
          const shareSelectors = [
            '.ytp-share-button', '.ytp-share-panel', '.ytp-popup', '.ytp-panel',
            '.ytp-overflow-menu', '.ytp-overflow-button', '.ytp-contextmenu', 
            '.ytp-cards-button', '.ytp-cards-teaser', '.ytp-endscreen-element', 
            '.ytp-ce-element', '.annotation', '.video-annotations',
            '.ytp-watch-later-button', '.ytp-playlist-menu-button',
            '.ytp-chrome-top-buttons', '.ytp-watermark', '.ytp-title',
            '[class*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"])', 
            '[id*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"])', 
            '[aria-label*="Share"]', '[aria-label*="شارك"]', '[role="dialog"]', 
            '[role="menu"]', '[role="listbox"]', '[role="menuitem"]', 
            '[data-tooltip*="share" i]', '[title*="share" i]', 
            'button[aria-label*="Share"]', 'button[aria-label*="شارك"]'
          ];
          
          shareSelectors.forEach(selector => {
            try {
              const elements = node.querySelectorAll(selector);
              elements.forEach(hideElementCompletely);
            } catch (e) {
              // تجاهل الأخطاء في العثور على العناصر
            }
          });
        }
      } catch (e) {
        // تجاهل الأخطاء
      }
    };
    
    // بدء المراقبة المتقدمة
    const observer = createAdvancedObserver();
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'aria-label', 'role', 'data-tooltip', 'title', 'id']
    });
    
    // تدمير دوري ومكثف كل 200ms
    const fastDestroyInterval = setInterval(() => {
      const allShareSelectors = [
        '.ytp-share-button', '.ytp-share-button-visible', '.ytp-share-panel',
        '.ytp-share-panel-visible', '.ytp-share-panel-content', 
        '.ytp-share-panel-container', '.ytp-panel.ytp-share-panel',
        '.ytp-popup.ytp-share-panel', '.ytp-overflow-button', '.ytp-overflow-menu',
        '.ytp-contextmenu', '.ytp-popup.ytp-contextmenu', '.ytp-cards-button',
        '.ytp-cards-teaser', '.ytp-endscreen-element', '.ytp-ce-element',
        '.annotation', '.video-annotations', '.ytp-watch-later-button',
        '.ytp-playlist-menu-button', '.ytp-chrome-top-buttons', '.ytp-watermark',
        '.ytp-title', '.ytp-title-text', '.ytp-title-link', '.ytp-chrome-top',
        '[class*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"])',
        '[id*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"])',
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
        'button[data-tooltip-target-id*="share" i]',
        'button[title*="Share" i]', 'button[title*="شارك" i]',
        '.ytp-button[data-tooltip-target-id*="ytp-share"]',
        '.ytp-menuitem[aria-label*="Share" i]',
        '.ytp-menuitem[aria-label*="شارك" i]'
      ];
      
      allShareSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(hideElementCompletely);
        } catch (e) {
          // تجاهل الأخطاء
        }
      });
    }, 200);
    
    // تدمير إضافي كل ثانية
    const mainDestroyInterval = setInterval(() => {
      // إزالة أي عناصر شير جديدة
      try {
        const allShareElements = document.querySelectorAll(`
          .ytp-share-button, .ytp-share-panel, .ytp-popup, .ytp-panel,
          .ytp-overflow-menu, .ytp-contextmenu, .ytp-cards-button,
          .ytp-endscreen-element, .ytp-ce-element, .annotation,
          [class*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"]),
          [aria-label*="Share"]:not(.live-content):not(.empty-state),
          [aria-label*="شارك"]:not(.live-content):not(.empty-state)
        `);
        
        allShareElements.forEach(hideElementCompletely);
      } catch (e) {
        // تجاهل الأخطاء
      }
    }, 1000);
    
    // تنظيف عند إزالة المكون
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      observer.disconnect();
      clearInterval(fastDestroyInterval);
      clearInterval(mainDestroyInterval);
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
                
                {/* الطبقة الفيزيائية الأولى - حجب كامل للجانب الأيمن */}
                <div 
                  className="youtube-ultimate-blocker-physical-1"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '400px',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.001) 50%, rgba(0,0,0,0.02) 100%)',
                    zIndex: 999999999,
                    pointerEvents: 'auto',
                    cursor: 'not-allowed',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
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
                        [class*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"]),
                        [aria-label*="Share"], [aria-label*="شارك"]
                      `);
                      shareElements.forEach(el => {
                        if (el && !el.closest('.live-content, .empty-state') && 
                            !el.className.includes('youtube-ultimate-blocker')) {
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
                  onWheel={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }}
                  onKeyDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }}
                />
                
                {/* الطبقة الفيزيائية الثانية - حجب المنطقة السفلية اليمنى */}
                <div 
                  className="youtube-ultimate-blocker-physical-2"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '450px',
                    height: '100px',
                    background: 'rgba(0, 0, 0, 0.9)',
                    zIndex: 999999998,
                    pointerEvents: 'auto',
                    cursor: 'not-allowed',
                    borderRadius: '0 0 20px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255, 255, 255, 0.3)',
                    fontSize: '11px',
                    fontWeight: '600',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
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
                  🔒 منطقة محمية بالكامل
                </div>
                
                {/* الطبقة الفيزيائية الثالثة - حجب المنطقة العلوية اليمنى */}
                <div 
                  className="youtube-ultimate-blocker-physical-3"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '300px',
                    height: '100px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    zIndex: 999999997,
                    pointerEvents: 'auto',
                    cursor: 'not-allowed',
                    borderRadius: '0 20px 0 0',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
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
                ></div>
                
                {/* الطبقة الفيزيائية الرابعة - حجب الوسط الأيمن */}
                <div 
                  className="youtube-ultimate-blocker-physical-4"
                  style={{
                    position: 'absolute',
                    top: '30%',
                    right: 0,
                    width: '180px',
                    height: '40%',
                    background: 'transparent',
                    zIndex: 999999996,
                    pointerEvents: 'auto',
                    cursor: 'not-allowed',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
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
                ></div>
                
                {/* الطبقة الفيزيائية الخامسة - حجب المنطقة السفلية بالكامل */}
                <div 
                  className="youtube-ultimate-blocker-physical-5"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '80px',
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.02) 0%, transparent 100%)',
                    zIndex: 999999995,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
                  }}
                ></div>
                
                {/* طبقة حماية شاملة ونهائية ضد أي تفاعل مع اليوتيوب */}
                <div 
                  className="youtube-ultimate-blocker-final-layer"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    pointerEvents: 'none',
                    background: 'transparent',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
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
          .youtube-ultimate-blocker-physical-1,
          .youtube-ultimate-blocker-physical-2,
          .youtube-ultimate-blocker-physical-3,
          .youtube-ultimate-blocker-physical-4,
          .youtube-ultimate-blocker-physical-5,
          .youtube-ultimate-blocker-final-layer {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
          }
          
          /* منع جميع أشكال التفاعل مع طبقات الحماية */
          .youtube-ultimate-blocker-physical-1 *,
          .youtube-ultimate-blocker-physical-2 *,
          .youtube-ultimate-blocker-physical-3 *,
          .youtube-ultimate-blocker-physical-4 *,
          .youtube-ultimate-blocker-physical-5 *,
          .youtube-ultimate-blocker-final-layer * {
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
            .youtube-ultimate-blocker-physical-1 {
              width: 320px !important;
            }
            
            .youtube-ultimate-blocker-physical-2 {
              width: 350px !important;
              height: 80px !important;
              font-size: 10px !important;
            }
            
            .youtube-ultimate-blocker-physical-3 {
              width: 250px !important;
              height: 80px !important;
            }
            
            .youtube-ultimate-blocker-physical-4 {
              width: 150px !important;
            }
            
            .youtube-ultimate-blocker-physical-5 {
              height: 70px !important;
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
            .youtube-ultimate-blocker-physical-1 {
              width: 280px !important;
            }
            
            .youtube-ultimate-blocker-physical-2 {
              width: 300px !important;
              height: 70px !important;
              font-size: 9px !important;
            }
            
            .youtube-ultimate-blocker-physical-3 {
              width: 200px !important;
              height: 70px !important;
            }
            
            .youtube-ultimate-blocker-physical-4 {
              width: 120px !important;
            }
            
            .youtube-ultimate-blocker-physical-5 {
              height: 60px !important;
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
            .youtube-ultimate-blocker-physical-1 {
              width: 220px !important;
            }
            
            .youtube-ultimate-blocker-physical-2 {
              width: 250px !important;
              height: 60px !important;
              font-size: 8px !important;
            }
            
            .youtube-ultimate-blocker-physical-3 {
              width: 150px !important;
              height: 60px !important;
            }
            
            .youtube-ultimate-blocker-physical-4 {
              width: 100px !important;
            }
            
            .youtube-ultimate-blocker-physical-5 {
              height: 50px !important;
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
          .youtube-ultimate-blocker-physical-1:hover,
          .youtube-ultimate-blocker-physical-2:hover,
          .youtube-ultimate-blocker-physical-3:hover,
          .youtube-ultimate-blocker-physical-4:hover {
            background: rgba(255, 0, 0, 0.03) !important;
          }
          
          .youtube-ultimate-blocker-physical-1:active,
          .youtube-ultimate-blocker-physical-2:active,
          .youtube-ultimate-blocker-physical-3:active,
          .youtube-ultimate-blocker-physical-4:active {
            background: rgba(255, 0, 0, 0.05) !important;
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
          
         /* حماية شاملة ضد جميع عناصر الشير */
          .youtube-ultimate-blocker-physical-1,
          .youtube-ultimate-blocker-physical-2,
          .youtube-ultimate-blocker-physical-3,
          .youtube-ultimate-blocker-physical-4,
          .youtube-ultimate-blocker-physical-5 {
            position: absolute !important;
            z-index: 999999999 !important;
            pointer-events: auto !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
            cursor: not-allowed !important;
          }
          
          /* منع أي تفاعل مع العناصر داخل طبقات الحماية */
          .youtube-ultimate-blocker-physical-1 *,
          .youtube-ultimate-blocker-physical-2 *,
          .youtube-ultimate-blocker-physical-3 *,
          .youtube-ultimate-blocker-physical-4 *,
          .youtube-ultimate-blocker-physical-5 * {
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            cursor: not-allowed !important;
          }
          
          /* حماية إضافية لمنع ظهور قوائم YouTube */
          .ytp-share-button,
          .ytp-share-panel,
          .ytp-popup,
          .ytp-panel,
          .ytp-overflow-menu,
          .ytp-contextmenu,
          .ytp-cards-button,
          .ytp-endscreen-element,
          .ytp-ce-element,
          .annotation,
          .video-annotations,
          .ytp-watch-later-button,
          .ytp-playlist-menu-button,
          .ytp-chrome-top-buttons,
          .ytp-watermark,
          .ytp-title,
          .ytp-chrome-top,
          [class*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"]),
          [id*="share" i]:not(.live-content):not(.empty-state):not([class*="youtube-ultimate-blocker"]),
          [aria-label*="Share"]:not(.live-content):not(.empty-state),
          [aria-label*="شارك"]:not(.live-content):not(.empty-state),
          [role="dialog"]:not(.live-content):not(.empty-state),
          [role="menu"]:not(.live-content):not(.empty-state),
          [role="listbox"]:not(.live-content):not(.empty-state) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            position: fixed !important;
            left: -999999px !important;
            top: -999999px !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            z-index: -999999 !important;
            transform: scale(0) translate3d(-999999px, -999999px, -999999px) !important;
            clip: rect(0 0 0 0) !important;
            clip-path: polygon(0 0, 0 0, 0 0) !important;
            content-visibility: hidden !important;
            contain: strict !important;
            filter: opacity(0) blur(999px) !important;
          }
          
          /* إخفاء قوي للغاية لأزرار شريط التحكم الأيمن */
          .ytp-chrome-controls .ytp-right-controls {
            max-width: 30px !important;
            overflow: hidden !important;
            position: relative !important;
          }
          
          .ytp-chrome-controls .ytp-right-controls .ytp-button:nth-last-child(-n+10),
          .ytp-chrome-controls .ytp-right-controls .ytp-button:nth-child(n+2) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            left: -99999px !important;
            width: 0 !important;
            height: 0 !important;
            transform: scale(0) !important;
          }
          
          /* حماية نهائية للفيديو */
          .live-content iframe {
            border: none !important;
            outline: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
            pointer-events: auto !important;
          }
          
          /* منع السحب والنقر الأيمن */
          .live-content,
          .live-content iframe,
          .live-content * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
            -webkit-context-menu: none !important;
            context-menu: none !important;
          }
        `}
      </style>
    </>
  );
}

export default LiveGrade3;
