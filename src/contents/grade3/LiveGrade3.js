// src/contents/grade3/LiveGrade3.js
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

function LiveGrade3() {
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(false);
  const [liveStreamUrl, setLiveStreamUrl] = useState('');
  const [loading, setLoading] = useState(true);

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
        'end_screen_info=0&' +    // إخفاء شاشة النهاية
        'hl=ar&' +                // اللغة العربية
        'cc_lang_pref=ar&' +      // تفضيل اللغة العربية للترجمة
        'disablekb=0&' +          // السماح بالتحكم عبر الكيبورد
        'playsinline=1&' +        // تشغيل داخل المتصفح في الموبايل
        'enablejsapi=1&' +        // تفعيل JavaScript API
        'widget_referrer=' + encodeURIComponent(window.location.origin) + '&' + // تحديد المرجع
        'wmode=opaque&' +         // منع التداخل مع عناصر الصفحة
        'origin=' + window.location.origin; // تحديد المصدر للأمان
    }
    
    return url;
  };

  // إضافة دالة لحقن CSS ديناميكياً ومراقبة DOM لمنع الشير مع تأثير blur متقدم
  useEffect(() => {
    // حقن CSS متقدم مع تأثير blur وزجاجي على أيقونات الشير ومنع fullscreen
    const advancedStyle = document.createElement('style');
    advancedStyle.id = 'youtube-share-blur-protection';
    advancedStyle.textContent = `
      /* تأثير blur وتشويش متقدم على جميع أيقونات الشير - حماية شاملة لجميع الأجهزة */
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
      .ytp-menuitem[aria-label*="مشاركة"],
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
      .ytp-miniplayer-button,
      .ytp-remote-button,
      .ytp-cast-button,
      button[data-tooltip-target-id*="share"],
      button[aria-label*="Share"],
      button[aria-label*="شارك"],
      button[aria-label*="مشاركة"],
      button[title*="Share"],
      button[title*="شارك"],
      button[title*="مشاركة"],
      button[aria-label*="Fullscreen"],
      button[aria-label*="ملء الشاشة"],
      button[title*="Fullscreen"],
      button[title*="ملء الشاشة"],
      .ytp-button[data-tooltip-target-id*="ytp-share"],
      .ytp-button[data-tooltip-target-id*="ytp-fullscreen"],
      .ytp-button[aria-label*="Share"],
      .ytp-button[aria-label*="شارك"],
      .ytp-button[aria-label*="مشاركة"],
      .ytp-button[aria-label*="Fullscreen"],
      .ytp-button[aria-label*="ملء الشاشة"],
      [role="button"][aria-label*="Share"],
      [role="button"][aria-label*="شارك"],
      [role="button"][aria-label*="مشاركة"],
      [role="button"][aria-label*="Fullscreen"],
      [role="button"][aria-label*="ملء الشاشة"],
      [role="dialog"][aria-label*="Share"],
      [role="dialog"][aria-label*="شارك"],
      [role="dialog"][aria-label*="مشاركة"],
      div[class*="share" i]:not(.live-content):not(.empty-state),
      div[id*="share" i]:not(.live-content):not(.empty-state),
      *[class*="share" i]:not(.live-content):not(.empty-state),
      *[id*="share" i]:not(.live-content):not(.empty-state),
      *[data-tooltip*="share" i],
      *[aria-label*="share" i],
      *[aria-label*="مشاركة" i],
      *[class*="fullscreen" i]:not(.live-content):not(.empty-state),
      *[id*="fullscreen" i]:not(.live-content):not(.empty-state),
      /* حماية خاصة للموبايل والآيفون */
      .ytp-mobile-a11y-hidden-seek-button,
      .ytp-mobile-overflow-button,
      .ytp-mobile-share-button,
      .ytp-mobile-fullscreen-button,
      .ytp-mobile-a11y-share-button,
      .ytp-touch-device-share-button,
      .ytp-ios-share-button,
      .ytp-android-share-button,
      /* حماية إضافية لجميع الأجهزة */
      [data-tooltip-target-id="ytp-share-button"],
      [data-tooltip-target-id="ytp-fullscreen-button"],
      [aria-keyshortcuts*="f"],
      [aria-keyshortcuts*="F"],
      /* حماية للآيفون خاصة */
      .ytp-webkit-airplay-button,
      .ytp-ios-overflow-button,
      .ytp-touch-overflow-button,
      /* حماية شاملة للتابلت */
      .ytp-tablet-share-button,
      .ytp-tablet-overflow-button,
      /* حماية لأجهزة اللمس */
      [data-touch="true"] .ytp-share-button,
      [data-touch="true"] .ytp-overflow-button,
      /* حماية CSS متقدمة */
      button[class*="share"],
      button[id*="share"],
      svg[class*="share"],
      svg[id*="share"],
      path[d*="share"],
      /* حماية للتطبيقات المدمجة */
      .ytp-webview-share-button,
      .ytp-embedded-share-button {
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
      
      /* حجب كامل لشريط التحكم مع السماح فقط بزر Play وسط الشاشة */
      .ytp-chrome-controls {
        pointer-events: none !important;
        user-select: none !important;
      }
      
      /* السماح فقط بزر Play الكبير في المنتصف */
      .ytp-large-play-button,
      .ytp-large-play-button-red-bg {
        pointer-events: auto !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        filter: none !important;
        transform: none !important;
        position: relative !important;
        left: auto !important;
        top: auto !important;
        width: auto !important;
        height: auto !important;
        z-index: auto !important;
      }
      
      /* حجب كامل للمنطقة اليمنى في جميع الأوضاع */
      .ytp-chrome-controls .ytp-right-controls,
      .ytp-chrome-controls .ytp-right-controls * {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transform: scale(0) !important;
        position: absolute !important;
        left: -99999px !important;
        top: -99999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        z-index: -99999 !important;
      }
      
      /* حجب شريط التقدم وأزرار التحكم السفلية */
      .ytp-progress-bar-container,
      .ytp-chrome-bottom,
      .ytp-left-controls,
      .ytp-time-display,
      .ytp-volume-area,
      .ytp-play-button,
      .ytp-pause-button,
      .ytp-mute-button,
      .ytp-volume-slider,
      .ytp-progress-bar,
      .ytp-scrubber-button {
        pointer-events: none !important;
        user-select: none !important;
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
      [role="dialog"]:not(.live-content):not(.empty-state),
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
      
      /* إخفاء أزرار التحكم الإضافية بالكامل */
      .ytp-chrome-controls .ytp-right-controls {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        position: absolute !important;
        left: -99999px !important;
        top: -99999px !important;
        z-index: -99999 !important;
        transform: scale(0) !important;
      }
      
      .ytp-chrome-controls .ytp-right-controls * {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
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
      div[class*="share"]:not(.live-content):not(.empty-state),
      div[id*="share"]:not(.live-content):not(.empty-state),
      div[class*="fullscreen"]:not(.live-content):not(.empty-state),
      div[id*="fullscreen"]:not(.live-content):not(.empty-state),
      [role="dialog"]:not(.live-content):not(.empty-state),
      [role="menu"]:not(.live-content):not(.empty-state),
      [role="listbox"]:not(.live-content):not(.empty-state),
      /* حماية إضافية شاملة */
      .ytp-chrome-controls .ytp-right-controls,
      .ytp-chrome-controls .ytp-right-controls *,
      .ytp-mobile-a11y-hidden-seek-button,
      .ytp-mobile-overflow-button,
      .ytp-mobile-share-button,
      .ytp-mobile-fullscreen-button {
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
      
      /* حماية خاصة للآيفون وSafari */
      @media screen and (-webkit-min-device-pixel-ratio: 2) {
        .ytp-chrome-controls .ytp-right-controls,
        .ytp-share-button,
        .ytp-overflow-button,
        .ytp-fullscreen-button,
        .ytp-ios-share-button,
        .ytp-webkit-airplay-button {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          transform: scale(0) !important;
          position: absolute !important;
          left: -99999px !important;
          top: -99999px !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
          z-index: -99999 !important;
        }
      }
      
      /* حماية خاصة للأندرويد */
      @media screen and (orientation: portrait) {
        .ytp-android-share-button,
        .ytp-mobile-share-button,
        .ytp-touch-device-share-button,
        .ytp-chrome-controls .ytp-right-controls {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          transform: scale(0) !important;
          position: absolute !important;
          left: -99999px !important;
          top: -99999px !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
          z-index: -99999 !important;
        }
      }
      
      /* حماية للتابلت في جميع الاتجاهات */
      @media screen and (min-width: 768px) and (max-width: 1024px) {
        .ytp-tablet-share-button,
        .ytp-tablet-overflow-button,
        .ytp-chrome-controls .ytp-right-controls {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          transform: scale(0) !important;
          position: absolute !important;
          left: -99999px !important;
          top: -99999px !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
          z-index: -99999 !important;
        }
      }
      
      /* حماية إضافية للWebView والتطبيقات المدمجة */
      .ytp-webview-share-button,
      .ytp-embedded-share-button,
      iframe[src*="youtube"] .ytp-share-button,
      iframe[src*="youtube"] .ytp-overflow-button {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transform: scale(0) !important;
        position: absolute !important;
        left: -99999px !important;
        top: -99999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        z-index: -99999 !important;
      }
      
      /* حماية شاملة لجميع SVG icons للشير */
      svg[class*="share"],
      svg[id*="share"],
      path[d*="share" i],
      use[href*="share" i],
      symbol[id*="share" i] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        fill: transparent !important;
        stroke: transparent !important;
      }
      
      /* حماية CSS متقدمة للعناصر الديناميكية */
      [data-title*="Share"],
      [data-title*="شارك"],
      [data-title*="مشاركة"],
      [data-tooltip*="Share"],
      [data-tooltip*="شارك"],
      [data-tooltip*="مشاركة"],
      [aria-describedby*="share"],
      [aria-describedby*="Share"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transform: scale(0) !important;
        position: absolute !important;
        left: -99999px !important;
        top: -99999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        z-index: -99999 !important;
      }
      
      /* حماية نهائية شاملة */
      *[class*="share" i]:not(.live-content):not(.empty-state),
      *[id*="share" i]:not(.live-content):not(.empty-state),
      *[data-*="share" i]:not(.live-content):not(.empty-state),
      *[aria-*="share" i]:not(.live-content):not(.empty-state),
      *[title*="share" i]:not(.live-content):not(.empty-state) {
        filter: blur(50px) saturate(0) contrast(0) brightness(0) !important;
        backdrop-filter: blur(60px) saturate(0) !important;
        background: rgba(0, 0, 0, 1) !important;
        transform: scale(0) rotate(360deg) translate(-99999px, -99999px) !important;
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
        clip: rect(0 0 0 0) !important;
        clip-path: polygon(0 0, 0 0, 0 0) !important;
        animation: shareDestroy 0.1s infinite !important;
      }
      
      @keyframes shareDestroy {
        0% { 
          opacity: 0; 
          transform: scale(0) rotate(0deg) translate(-999999px, -999999px); 
          filter: blur(100px) saturate(0) contrast(0) brightness(0);
        }
        100% { 
          opacity: 0; 
          transform: scale(0) rotate(360deg) translate(-999999px, -999999px); 
          filter: blur(100px) saturate(0) contrast(0) brightness(0);
        }
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
              if (element && !element.closest('.live-content, .empty-state')) {
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
            
            // البحث عن عناصر الشير والـ fullscreen الجديدة مع حماية شاملة
            const blockedSelectors = [
              '.ytp-share-button',
              '.ytp-share-panel',
              '.ytp-overflow-button',
              '.ytp-popup',
              '.ytp-panel',
              '.ytp-contextmenu',
              '.ytp-fullscreen-button',
              '.ytp-size-button',
              '.ytp-miniplayer-button',
              '.ytp-remote-button',
              '.ytp-cast-button',
              '.ytp-mobile-share-button',
              '.ytp-mobile-fullscreen-button',
              '.ytp-mobile-overflow-button',
              '[class*="share" i]',
              '[id*="share" i]',
              '[aria-label*="Share"]',
              '[aria-label*="شارك"]',
              '[aria-label*="مشاركة"]',
              '[aria-label*="Fullscreen"]',
              '[aria-label*="ملء الشاشة"]',
              '[role="dialog"]',
              '[role="menu"]',
              '[role="listbox"]',
              '[class*="fullscreen" i]',
              '[id*="fullscreen" i]',
              '[data-tooltip-target-id*="share"]',
              '[data-tooltip-target-id*="fullscreen"]',
              'button[title*="Share"]',
              'button[title*="شارك"]',
              'button[title*="مشاركة"]',
              'button[title*="Fullscreen"]',
              'button[title*="ملء الشاشة"]',
              '.ytp-ios-share-button',
              '.ytp-android-share-button',
              '.ytp-webkit-airplay-button'
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
    
    // تطبيق التأثيرات كل نصف ثانية مع حماية شاملة
    const blurInterval = setInterval(() => {
      const blockedElements = document.querySelectorAll(`
        .ytp-share-button,
        .ytp-share-panel,
        .ytp-overflow-button,
        .ytp-popup:not(.live-content):not(.empty-state),
        .ytp-panel:not(.live-content):not(.empty-state),
        .ytp-contextmenu,
        .ytp-fullscreen-button,
        .ytp-size-button,
        .ytp-miniplayer-button,
        .ytp-remote-button,
        .ytp-cast-button,
        .ytp-mobile-share-button,
        .ytp-mobile-fullscreen-button,
        .ytp-mobile-overflow-button,
        [class*="share" i]:not(.live-content):not(.empty-state),
        [id*="share" i]:not(.live-content):not(.empty-state),
        [aria-label*="Share"],
        [aria-label*="شارك"],
        [aria-label*="مشاركة"],
        [aria-label*="Fullscreen"],
        [aria-label*="ملء الشاشة"],
        [role="dialog"]:not(.live-content):not(.empty-state),
        [role="menu"]:not(.live-content):not(.empty-state),
        [class*="fullscreen" i]:not(.live-content):not(.empty-state),
        [id*="fullscreen" i]:not(.live-content):not(.empty-state),
        [data-tooltip-target-id*="share"],
        [data-tooltip-target-id*="fullscreen"],
        button[title*="Share"],
        button[title*="شارك"],
        button[title*="مشاركة"],
        button[title*="Fullscreen"],
        button[title*="ملء الشاشة"],
        .ytp-chrome-controls .ytp-right-controls > *,
        .ytp-ios-share-button,
        .ytp-android-share-button,
        .ytp-webkit-airplay-button
      `);
      
      blockedElements.forEach(el => {
        if (el && !el.closest('.live-content, .empty-state')) {
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

              {/* الفيديو مع طبقة إخفاء شفافة غير مرئية */}
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
                
                {/* طبقة حماية شفافة غير مرئية - تغطي كامل الفيديو عدا منتصف الشاشة */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  zIndex: 999999,
                  pointerEvents: 'auto'
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
                  {/* فتحة في المنتصف للسماح بزر Play فقط */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '80px',
                    height: '80px',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    background: 'transparent'
                  }}></div>
                </div>
                
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
                    📺 استمتع بمشاهدة البث المباشر بأفضل جودة
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
          }
        `}
      </style>
    </>
  );
}

export default LiveGrade3;
