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

  // فتح البث في نافذة جديدة مع طبقة الحماية والتشويش المحسنة
  const openLiveStream = () => {
    if (liveStreamUrl) {
      // فتح في نافذة جديدة عادية
      const newWindow = window.open(
        liveStreamUrl, 
        'liveBroadcast',
        'width=1200,height=800,scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no'
      );
      
      if (newWindow) {
        newWindow.focus();
        console.log('✅ تم فتح البث في نافذة جديدة');
        
        // إضافة طبقة الحماية والتشويش المحسنة الكاملة
        setTimeout(() => {
          try {
            const doc = newWindow.document;
            if (doc) {
              // إنشاء طبقة الحماية الشاملة المحسنة
              const protectionOverlay = doc.createElement('div');
              protectionOverlay.id = 'ultimate-video-protection';
              protectionOverlay.innerHTML = `
                <!-- تشويش شامل لكامل شاشة الفيديو -->
                <div id="full-screen-blur" style="
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100vw;
                  height: 100vh;
                  background: rgba(0, 0, 0, 0.02);
                  backdrop-filter: blur(3px) saturate(0.9);
                  z-index: 999999;
                  pointer-events: none;
                  mix-blend-mode: multiply;
                "></div>

                <!-- طبقة حماية أيقونة Share في اليمين العلوي -->
                <div class="protection-zone share-zone" style="
                  position: fixed;
                  top: 8px;
                  right: 8px;
                  width: 80px;
                  height: 80px;
                  background: rgba(255, 0, 0, 0.1);
                  backdrop-filter: blur(15px) saturate(0.5);
                  z-index: 9999999;
                  pointer-events: all;
                  cursor: not-allowed;
                  border-radius: 50%;
                  border: 3px solid rgba(255, 255, 255, 0.3);
                  box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
                " title="🚫 منطقة محظورة - Share"></div>
                
                <!-- طبقة حماية أيقونة القناة في اليسار العلوي -->
                <div class="protection-zone channel-zone" style="
                  position: fixed;
                  top: 8px;
                  left: 8px;
                  width: 150px;
                  height: 60px;
                  background: rgba(255, 0, 0, 0.1);
                  backdrop-filter: blur(15px) saturate(0.5);
                  z-index: 9999999;
                  pointer-events: all;
                  cursor: not-allowed;
                  border-radius: 30px;
                  border: 3px solid rgba(255, 255, 255, 0.3);
                  box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
                " title="🚫 منطقة محظورة - اسم القناة"></div>
                
                <!-- طبقة حماية أيقونة Watch on YouTube في اليمين السفلي -->
                <div class="protection-zone youtube-zone" style="
                  position: fixed;
                  bottom: 12px;
                  right: 12px;
                  width: 120px;
                  height: 50px;
                  background: rgba(255, 0, 0, 0.1);
                  backdrop-filter: blur(15px) saturate(0.5);
                  z-index: 9999999;
                  pointer-events: all;
                  cursor: not-allowed;
                  border-radius: 25px;
                  border: 3px solid rgba(255, 255, 255, 0.3);
                  box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
                " title="🚫 منطقة محظورة - Watch on YouTube"></div>
                
                <!-- طبقة حماية شريط التحكم السفلي الكامل -->
                <div class="protection-zone controls-zone" style="
                  position: fixed;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 100px;
                  background: rgba(255, 0, 0, 0.05);
                  backdrop-filter: blur(12px) saturate(0.6);
                  z-index: 9999998;
                  pointer-events: all;
                  cursor: not-allowed;
                  border-top: 3px solid rgba(255, 255, 255, 0.2);
                  box-shadow: 0 -5px 15px rgba(255, 0, 0, 0.2);
                " title="🚫 شريط التحكم محظور"></div>
                
                <!-- طبقة حماية العنوان والمعلومات في الأعلى -->
                <div class="protection-zone title-zone" style="
                  position: fixed;
                  top: 0;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 60%;
                  height: 100px;
                  background: rgba(255, 0, 0, 0.05);
                  backdrop-filter: blur(12px) saturate(0.6);
                  z-index: 9999998;
                  pointer-events: all;
                  cursor: not-allowed;
                  border-radius: 0 0 20px 20px;
                  border: 3px solid rgba(255, 255, 255, 0.2);
                  box-shadow: 0 5px 15px rgba(255, 0, 0, 0.2);
                " title="🚫 معلومات الفيديو محظورة"></div>

                <!-- طبقة حماية الجوانب اليمين واليسار -->
                <div class="protection-zone left-sidebar" style="
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 80px;
                  height: 100vh;
                  background: rgba(255, 0, 0, 0.03);
                  backdrop-filter: blur(8px);
                  z-index: 9999997;
                  pointer-events: all;
                  cursor: not-allowed;
                "></div>
                
                <div class="protection-zone right-sidebar" style="
                  position: fixed;
                  top: 0;
                  right: 0;
                  width: 80px;
                  height: 100vh;
                  background: rgba(255, 0, 0, 0.03);
                  backdrop-filter: blur(8px);
                  z-index: 9999997;
                  pointer-events: all;
                  cursor: not-allowed;
                "></div>

                <!-- طبقة تشويش متحركة إضافية -->
                <div class="moving-blur" style="
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(45deg, 
                    rgba(255, 255, 255, 0.01) 0%, 
                    rgba(255, 255, 255, 0.03) 25%, 
                    rgba(255, 255, 255, 0.01) 50%, 
                    rgba(255, 255, 255, 0.03) 75%, 
                    rgba(255, 255, 255, 0.01) 100%);
                  backdrop-filter: blur(2px);
                  z-index: 999996;
                  pointer-events: none;
                  animation: movingBlur 10s infinite linear;
                "></div>

                <!-- شبكة حماية غير مرئية لتغطية أي منطقة مفقودة -->
                <div class="invisible-grid" style="
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    rgba(255, 0, 0, 0.005) 50px,
                    transparent 100px
                  );
                  z-index: 999995;
                  pointer-events: none;
                "></div>
              `;
              
              // إضافة CSS الحماية المحسن والتشويش الشامل
              const protectionStyle = doc.createElement('style');
              protectionStyle.textContent = `
                /* تشويش شامل لجميع عناصر يوتيوب */
                * {
                  -webkit-user-select: none !important;
                  -moz-user-select: none !important;
                  -ms-user-select: none !important;
                  user-select: none !important;
                  -webkit-touch-callout: none !important;
                  -webkit-tap-highlight-color: transparent !important;
                }

                /* إخفاء وتشويش عناصر يوتيوب المحددة */
                .ytp-chrome-top, 
                .ytp-title,
                .ytp-chrome-top-buttons,
                .ytp-watermark,
                .ytp-youtube-button,
                .ytp-show-cards-title,
                .ytp-cards-button,
                .ytp-videowall-still,
                .ytp-ce-element,
                #movie_player .ytp-chrome-top,
                #movie_player .ytp-title,
                ytd-watch-next-secondary-results-renderer,
                ytd-compact-video-renderer,
                .ytd-watch-next-secondary-results-renderer,
                #secondary,
                #related,
                .ytp-time-display,
                .ytp-time-current,
                .ytp-time-separator,
                .ytp-time-duration,
                .ytp-chapter-title,
                .ytp-progress-bar-container,
                .ytp-scrubber-container,
                .ytp-share-button,
                .ytp-watch-later-button,
                .ytp-miniplayer-button,
                .ytp-overflow-button,
                .ytp-settings-button,
                .ytp-fullscreen-button,
                .ytp-volume-area,
                .ytp-mute-button,
                .ytp-volume-slider {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  filter: blur(20px) !important;
                  pointer-events: none !important;
                }
                
                /* تشويش خاص للأيقونات المحددة */
                button[data-title-no-tooltip="Share"],
                button[aria-label*="Share"],
                button[title*="Share"],
                .ytp-share-button,
                a[href*="youtube.com/channel"],
                a[href*="youtube.com/@"],
                .ytp-youtube-button,
                button[data-title-no-tooltip="Watch on YouTube"],
                .ytp-watch-on-youtube-button,
                .ytp-chrome-controls button,
                .ytp-chrome-controls a {
                  pointer-events: none !important;
                  opacity: 0.1 !important;
                  filter: blur(10px) saturate(0.3) !important;
                  transform: scale(0.8) !important;
                  visibility: hidden !important;
                }
                
                /* تشويش شامل لمنطقة الفيديو */
                #movie_player {
                  position: relative !important;
                  filter: contrast(1.1) saturate(0.95) !important;
                }

                /* طبقة تشويش على كامل منطقة المشغل */
                #movie_player::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(255, 255, 255, 0.01);
                  backdrop-filter: blur(1px);
                  z-index: 999990;
                  pointer-events: none;
                }
                
                /* طبقة حماية شاملة للفيديو */
                #movie_player::after {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 80px;
                  background: transparent;
                  z-index: 999991;
                  pointer-events: none;
                }
                
                /* حماية خاصة للمناطق الحساسة */
                .ytp-chrome-controls {
                  pointer-events: none !important;
                  filter: blur(8px) !important;
                  opacity: 0.3 !important;
                }
                
                .ytp-progress-bar {
                  pointer-events: none !important;
                  filter: blur(5px) !important;
                }

                /* تشويش إضافي لشريط التقدم */
                .ytp-progress-bar-container {
                  backdrop-filter: blur(10px) !important;
                  opacity: 0.2 !important;
                }
                
                /* السماح فقط بتشغيل/إيقاف الفيديو في المنتصف */
                .ytp-play-button {
                  pointer-events: auto !important;
                  filter: none !important;
                  opacity: 1 !important;
                }
                
                .html5-video-container {
                  pointer-events: auto !important;
                }
                
                video {
                  pointer-events: auto !important;
                }
                
                /* منع عرض الروابط في شريط الحالة */
                a:not(video):not(.ytp-play-button) {
                  pointer-events: none !important;
                  filter: blur(5px) !important;
                }
                
                /* تشويش محسن للأيقونات المحمية */
                .protection-zone {
                  transition: all 0.3s ease !important;
                  backdrop-filter: blur(12px) saturate(0.7) !important;
                  background: linear-gradient(45deg, 
                    rgba(255, 0, 0, 0.05), 
                    rgba(255, 0, 0, 0.08), 
                    rgba(255, 0, 0, 0.05)
                  ) !important;
                  animation: protectionPulse 4s infinite ease-in-out !important;
                }
                
                @keyframes protectionPulse {
                  0%, 100% { 
                    backdrop-filter: blur(10px) saturate(0.8);
                    background: rgba(255, 0, 0, 0.05);
                    box-shadow: 0 0 15px rgba(255, 0, 0, 0.2);
                  }
                  50% { 
                    backdrop-filter: blur(15px) saturate(0.6);
                    background: rgba(255, 0, 0, 0.08);
                    box-shadow: 0 0 25px rgba(255, 0, 0, 0.4);
                  }
                }

                @keyframes movingBlur {
                  0% { 
                    background-position: 0% 0%;
                    backdrop-filter: blur(1px);
                  }
                  25% { 
                    background-position: 100% 0%;
                    backdrop-filter: blur(2px);
                  }
                  50% { 
                    background-position: 100% 100%;
                    backdrop-filter: blur(1px);
                  }
                  75% { 
                    background-position: 0% 100%;
                    backdrop-filter: blur(2px);
                  }
                  100% { 
                    background-position: 0% 0%;
                    backdrop-filter: blur(1px);
                  }
                }
                
                /* رسالة تحذيرية محسنة */
                .protection-zone:hover::after {
                  content: '🚫 منطقة محظورة - محمي للطلاب';
                  position: absolute;
                  bottom: -45px;
                  left: 50%;
                  transform: translateX(-50%);
                  background: rgba(220, 53, 69, 0.95);
                  color: white;
                  padding: 8px 16px;
                  border-radius: 10px;
                  font-size: 12px;
                  font-weight: 600;
                  white-space: nowrap;
                  z-index: 10000000;
                  animation: warningFade 3s ease-in-out;
                  border: 2px solid rgba(255, 255, 255, 0.5);
                  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
                  backdrop-filter: blur(10px);
                }
                
                @keyframes warningFade {
                  0%, 100% { 
                    opacity: 0; 
                    transform: translateX(-50%) translateY(15px) scale(0.8);
                  }
                  20%, 80% { 
                    opacity: 1; 
                    transform: translateX(-50%) translateY(0) scale(1);
                  }
                }
                
                /* تشويش إضافي للعناصر المخفية */
                .ytp-chrome-top-buttons *,
                .ytp-share-button-container *,
                .ytp-overflow-button *,
                .ytp-settings-menu * {
                  visibility: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                  filter: blur(20px) !important;
                }

                /* حماية من القوائم المنبثقة */
                .ytp-popup,
                .ytp-settings-menu,
                .ytp-menuitem,
                .ytp-panel {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                }

                /* تشويش شامل للمحتوى الجانبي */
                #secondary-inner,
                ytd-watch-next-secondary-results-renderer,
                #related,
                .ytd-watch-flexy #secondary {
                  filter: blur(20px) !important;
                  opacity: 0.1 !important;
                  pointer-events: none !important;
                }

                /* تشويش لمعلومات الفيديو */
                #above-the-fold,
                #below-the-fold,
                ytd-video-primary-info-renderer,
                ytd-video-secondary-info-renderer {
                  filter: blur(15px) !important;
                  opacity: 0.3 !important;
                  pointer-events: none !important;
                }

                /* حماية خاصة من النقر في أي مكان */
                body::before {
                  content: '';
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: rgba(255, 255, 255, 0.001);
                  z-index: 999994;
                  pointer-events: none;
                }
                
                /* تحسين الحماية للشاشات المختلفة */
                @media (max-width: 768px) {
                  .protection-zone {
                    backdrop-filter: blur(8px) !important;
                  }
                  
                  #full-screen-blur {
                    backdrop-filter: blur(2px) !important;
                  }
                }

                /* تحسين أداء التشويش */
                * {
                  will-change: auto;
                  transform: translateZ(0);
                  backface-visibility: hidden;
                }

                /* حماية إضافية من التفتيش */
                html {
                  -webkit-user-select: none !important;
                  -khtml-user-select: none !important;
                  -moz-user-select: none !important;
                  -ms-user-select: none !important;
                  user-select: none !important;
                }

                /* تشويش نهائي لأي عنصر مفقود */
                [class*="ytp-"]:not(.ytp-play-button):not(video) {
                  filter: blur(10px) saturate(0.5) !important;
                  opacity: 0.2 !important;
                  pointer-events: none !important;
                }

                /* حماية الروابط الخارجية */
                a[href*="youtube.com"]:not([href*="/watch"]) {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                }
              `;
              
              // إضافة العناصر للصفحة
              doc.head.appendChild(protectionStyle);
              doc.body.appendChild(protectionOverlay);
              
              // منع النقر الأيمن والاختصارات
              doc.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
              });
              
              doc.addEventListener('keydown', (e) => {
                // منع جميع الاختصارات
                if (e.key === 'F12' || 
                    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                    (e.ctrlKey && e.shiftKey && e.key === 'C') ||
                    (e.ctrlKey && e.key === 'u') ||
                    (e.ctrlKey && e.key === 's') ||
                    e.key === 'F5' ||
                    (e.ctrlKey && e.key === 'r')) {
                  e.preventDefault();
                  return false;
                }
              });
              
              // حماية إضافية للفيديو
              const video = doc.querySelector('video');
              if (video) {
                video.addEventListener('contextmenu', (e) => {
                  e.preventDefault();
                  return false;
                });
              }
              
              // مراقبة التغييرات في DOM وإعادة تطبيق الحماية والتشويش
              const observer = new MutationObserver(() => {
                // إعادة إخفاء وتشويش العناصر المحظورة إذا ظهرت
                const hiddenElements = doc.querySelectorAll(`
                  .ytp-share-button, 
                  .ytp-youtube-button, 
                  .ytp-chrome-top-buttons,
                  .ytp-overflow-button,
                  .ytp-settings-button,
                  .ytp-fullscreen-button
                `);
                hiddenElements.forEach(el => {
                  el.style.display = 'none';
                  el.style.visibility = 'hidden';
                  el.style.pointerEvents = 'none';
                  el.style.filter = 'blur(20px)';
                  el.style.opacity = '0';
                });
              });
              
              observer.observe(doc.body, {
                childList: true,
                subtree: true,
                attributes: true
              });
              
              console.log('✅ تم تطبيق طبقة الحماية والتشويش الشامل بنجاح');
            }
          } catch (e) {
            console.log('⚠️ لا يمكن تطبيق الحماية الكاملة لأسباب أمنية، لكن الإعدادات الأساسية مطبقة');
          }
        }, 3000);
      } else {
        // إذا فشل فتح النافذة الجديدة، جرب الطريقة العادية
        window.open(liveStreamUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // فتح البث في نفس النافذة مع الحماية والتشويش
  const watchInCurrentWindow = () => {
    if (liveStreamUrl) {
      // إنشاء iframe محمي بدلاً من الانتقال المباشر
      const iframeContainer = document.createElement('div');
      iframeContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 999999;
      `;
      
      const iframe = document.createElement('iframe');
      iframe.src = liveStreamUrl;
      iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        position: relative;
        filter: contrast(1.05) saturate(0.95);
      `;
      
      // إضافة طبقات الحماية والتشويش المحسنة للـ iframe
      const protectionOverlay = document.createElement('div');
      protectionOverlay.innerHTML = `
        <!-- تشويش شامل لكامل الـ iframe -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.02);
          backdrop-filter: blur(2px) saturate(0.95);
          z-index: 999999;
          pointer-events: none;
        "></div>

        <!-- طبقة حماية أيقونة Share -->
        <div class="iframe-protection share-protection" style="
          position: absolute;
          top: 8px;
          right: 8px;
          width: 80px;
          height: 80px;
          background: rgba(255, 0, 0, 0.1);
          backdrop-filter: blur(15px) saturate(0.5);
          z-index: 9999999;
          pointer-events: all;
          cursor: not-allowed;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.4);
        "></div>
        
        <!-- طبقة حماية أيقونة القناة -->
        <div class="iframe-protection channel-protection" style="
          position: absolute;
          top: 8px;
          left: 8px;
          width: 150px;
          height: 60px;
          background: rgba(255, 0, 0, 0.1);
          backdrop-filter: blur(15px) saturate(0.5);
          z-index: 9999999;
          pointer-events: all;
          cursor: not-allowed;
          border-radius: 30px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.4);
        "></div>
        
        <!-- طبقة حماية Watch on YouTube -->
        <div class="iframe-protection youtube-protection" style="
          position: absolute;
          bottom: 12px;
          right: 12px;
          width: 120px;
          height: 50px;
          background: rgba(255, 0, 0, 0.1);
          backdrop-filter: blur(15px) saturate(0.5);
          z-index: 9999999;
          pointer-events: all;
          cursor: not-allowed;
          border-radius: 25px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.4);
        "></div>
        
        <!-- طبقة حماية شريط التحكم -->
        <div class="iframe-protection controls-protection" style="
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: rgba(255, 0, 0, 0.08);
          backdrop-filter: blur(12px) saturate(0.6);
          z-index: 9999998;
          pointer-events: all;
          cursor: not-allowed;
          border-top: 3px solid rgba(255, 255, 255, 0.2);
        "></div>
        
        <!-- طبقة حماية العنوان في الأعلى -->
        <div class="iframe-protection title-protection" style="
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 100px;
          background: rgba(255, 0, 0, 0.08);
          backdrop-filter: blur(12px) saturate(0.6);
          z-index: 9999998;
          pointer-events: all;
          cursor: not-allowed;
          border-radius: 0 0 20px 20px;
        "></div>

        <!-- طبقات حماية الجوانب -->
        <div class="iframe-protection left-protection" style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 100%;
          background: rgba(255, 0, 0, 0.05);
          backdrop-filter: blur(8px);
          z-index: 9999997;
          pointer-events: all;
          cursor: not-allowed;
        "></div>
        
        <div class="iframe-protection right-protection" style="
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100%;
          background: rgba(255, 0, 0, 0.05);
          backdrop-filter: blur(8px);
          z-index: 9999997;
          pointer-events: all;
          cursor: not-allowed;
        "></div>

        <!-- شبكة تشويش متحركة -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            rgba(255, 255, 255, 0.01) 90deg,
            transparent 180deg,
            rgba(255, 255, 255, 0.01) 270deg
          );
          z-index: 999996;
          pointer-events: none;
          animation: rotateBlur 20s infinite linear;
        "></div>
      `;
      protectionOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000000;
      `;
      
      // إضافة CSS للحماية في الـ iframe
      const iframeStyle = document.createElement('style');
      iframeStyle.textContent = `
        .iframe-protection {
          animation: protectionPulse 4s infinite ease-in-out !important;
          transition: all 0.3s ease !important;
        }
        
        .iframe-protection:hover::after {
          content: '🚫 منطقة محظورة';
          position: absolute;
          bottom: -35px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(220, 53, 69, 0.95);
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 11px;
          white-space: nowrap;
          z-index: 10000000;
          animation: fadeInOut 2.5s ease-in-out;
        }
        
        @keyframes protectionPulse {
          0%, 100% { 
            backdrop-filter: blur(12px) saturate(0.7);
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
          }
          50% { 
            backdrop-filter: blur(18px) saturate(0.5);
            box-shadow: 0 0 25px rgba(255, 0, 0, 0.5);
          }
        }

        @keyframes rotateBlur {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
          20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `;
      
      // زر الإغلاق المحسن
      const closeButton = document.createElement('button');
      closeButton.innerHTML = '✕ إغلاق البث المحمي';
      closeButton.style.cssText = `
        position: absolute;
        top: 20px;
        left: 20px;
        background: linear-gradient(135deg, #dc3545, #c82333);
        color: white;
        border: 3px solid #ffffff;
        padding: 15px 30px;
        border-radius: 15px;
        cursor: pointer;
        z-index: 1000001;
        font-weight: 700;
        font-size: 16px;
        box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
        transition: all 0.3s ease;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      `;
      closeButton.onclick = () => {
        document.body.removeChild(iframeContainer);
      };
      
      closeButton.onmouseenter = () => {
        closeButton.style.background = 'linear-gradient(135deg, #e74c3c, #dc3545)';
        closeButton.style.transform = 'scale(1.05) translateY(-2px)';
        closeButton.style.boxShadow = '0 8px 25px rgba(220, 53, 69, 0.5)';
      };
      
      closeButton.onmouseleave = () => {
        closeButton.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
        closeButton.style.transform = 'scale(1) translateY(0)';
        closeButton.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.4)';
      };
      
      document.head.appendChild(iframeStyle);
      iframeContainer.appendChild(iframe);
      iframeContainer.appendChild(protectionOverlay);
      iframeContainer.appendChild(closeButton);
      document.body.appendChild(iframeContainer);
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
          }}>🔴 جاري تحميل البث المباشر المحمي...</h3>
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
          }}>🛡️🔴</div>
          <h1 style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '15px',
            color: '#2c3e50'
          }}>
            البث المباشر المحمي مع تشويش شامل
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
            {isLiveStreamActive ? '🟢 البث نشط الآن - محمي بتشويش متقدم' : '⏸️ لا يوجد بث حالياً'}
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
              {/* علامة الحماية المحسنة */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '25px',
                background: 'linear-gradient(135deg, #28a745, #20c997)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '700',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(40, 167, 69, 0.4)',
                border: '2px solid #ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>
                🛡️ تشويش متقدم
              </div>

              {/* علامة LIVE محسنة */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '25px',
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
                🛡️📺🌀
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
                البث المباشر المحمي بتشويش شامل! 🚀
              </h2>

              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.3rem',
                fontWeight: '500',
                marginBottom: '30px',
                lineHeight: '1.6'
              }}>
                <strong>مشاهدة آمنة مع تشويش متقدم لجميع العناصر!</strong> اختر طريقة المشاهدة 👇
              </p>

              {/* أزار المشاهدة المحسنة */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                maxWidth: '700px',
                margin: '0 auto 30px auto'
              }}>
                {/* زر فتح في نافذة جديدة محمية */}
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
                  }}>تشويش متقدم</div>
                  <span style={{ fontSize: '2rem' }}>🛡️🚀🌀</span>
                  <div>نافذة جديدة مع تشويش شامل</div>
                  <small style={{ opacity: 0.9, fontSize: '0.9rem' }}>تشويش كامل لجميع العناصر والأيقونات</small>
                </button>

                {/* زر المشاهدة المحمية */}
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
                  <span style={{ fontSize: '2rem' }}>🛡️📺🌀</span>
                  <div>مشاهدة محمية بتشويش</div>
                  <small style={{ opacity: 0.9, fontSize: '0.9rem' }}>حماية شاملة مع تشويش متحرك</small>
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
                  🔗 شارك رابط البث المحمي بالتشويش
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
                  💡 انسخ الرابط وشاركه (سيحتوي على نفس التشويش والحماية المتقدمة)
                </small>
              </div>

              {/* معلومات التشويش المتقدم */}
              <div style={{
                marginTop: '25px',
                background: 'rgba(40, 167, 69, 0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: '2px solid rgba(40, 167, 69, 0.3)'
              }}>
                <h4 style={{
                  color: '#28a745',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>🛡️🌀 ميزات التشويش والحماية المتقدمة النشطة:</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '10px',
                  textAlign: 'right'
                }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    🌀 تشويش شامل للشاشة
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    🚫 حماية من أيقونة Share
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    🔒 حماية من اسم القناة
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    ⛔ حماية من Watch on YouTube
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    ⏯️ تشويش شريط التحكم والوقت
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    🎯 تشويش شفاف متحرك
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    🌊 طبقات حماية متعددة
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    📱 تشويش على جميع الأجهزة
                  </div>
                </div>
              </div>

              {/* تنبيه خاص للطلاب */}
              <div style={{
                marginTop: '20px',
                background: 'rgba(52, 152, 219, 0.1)',
                border: '2px solid rgba(52, 152, 219, 0.3)',
                borderRadius: '15px',
                padding: '20px'
              }}>
                <div style={{
                  color: '#3498db',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: '10px'
                }}>
                  📚 تذكير مهم
                </div>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  margin: 0,
                  textAlign: 'center',
                  lineHeight: '1.5'
                }}>
                  احضر دفترك وقلمك للمتابعة والتدوين أثناء البث المباشر المحمي بالتشويش المتقدم
                </p>
              </div>
            </div>
          ) : (
            /* حالة عدم وجود بث مباشر */}
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
              }}>🛡️📺🌀</div>
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
                ترقب الإعلان عن مواعيد البث المباشر المحمي بالتشويش المتقدم للمراجعة النهائية
              </p>
              
              {/* معلومات التشويش */}
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
                }}>🛡️🌀 ميزات التشويش والحماية المتقدمة المتوفرة:</h4>
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
                    🌀 تشويش شامل لجميع العناصر
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px'
                  }}>
                    🚫 حماية من أيقونات Share و YouTube
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px'
                  }}>
                    🔒 تشويش شفاف متحرك
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px'
                  }}>
                    🎯 طبقات حماية متعددة
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px'
                  }}>
                    📱 تشويش على جميع الأجهزة
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

          @keyframes protectionPulse {
            0%, 100% { 
              backdrop-filter: blur(10px) saturate(0.8);
              background: rgba(255, 0, 0, 0.05);
              box-shadow: 0 0 15px rgba(255, 0, 0, 0.2);
            }
            50% { 
              backdrop-filter: blur(15px) saturate(0.6);
              background: rgba(255, 0, 0, 0.08);
              box-shadow: 0 0 25px rgba(255, 0, 0, 0.4);
            }
          }

          @keyframes movingBlur {
            0% { 
              background-position: 0% 0%;
              backdrop-filter: blur(1px);
            }
            25% { 
              background-position: 100% 0%;
              backdrop-filter: blur(2px);
            }
            50% { 
              background-position: 100% 100%;
              backdrop-filter: blur(1px);
            }
            75% { 
              background-position: 0% 100%;
              backdrop-filter: blur(2px);
            }
            100% { 
              background-position: 0% 0%;
              backdrop-filter: blur(1px);
            }
          }

          @keyframes rotateBlur {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes warningFade {
            0%, 100% { 
              opacity: 0; 
              transform: translateX(-50%) translateY(15px) scale(0.8);
            }
            20%, 80% { 
              opacity: 1; 
              transform: translateX(-50%) translateY(0) scale(1);
            }
          }

          /* حماية عامة ضد النقر الأيمن والاختصارات */
          * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
          }

          body {
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
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
              content: "للمشاهدة المحمية مع التشويش، يرجى زيارة الموقع الإلكتروني" !important;
              display: block !important;
              color: #000 !important;
              background: #fff !important;
              padding: 20px !important;
              margin-top: 20px !important;
              text-align: center !important;
            }
          }
          
          /* تحسين أداء الانيميشن والتشويش */
          .live-content,
          .empty-state,
          button,
          .protection-zone,
          .iframe-protection {
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
            
            .protection-zone,
            .iframe-protection {
              backdrop-filter: blur(8px) !important;
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
            
            .protection-zone,
            .iframe-protection {
              min-width: 44px !important;
              min-height: 44px !important;
            }
          }
          
          /* تحسين نهائي للتنسيق */
          .tips-grid > div {
            transition: transform 0.2s ease !important;
          }
          
          .tips-grid > div:hover {
            transform: translateY(-2px) !important;
          }

          /* تحسينات خاصة بالتشويش */
          .moving-blur {
            animation: movingBlur 10s infinite linear !important;
          }

          .invisible-grid {
            opacity: 0.5 !important;
            mix-blend-mode: overlay !important;
          }

          /* تحسين أداء طبقات التشويش */
          #full-screen-blur,
          .moving-blur,
          .invisible-grid {
            will-change: backdrop-filter, transform !important;
            contain: layout style paint !important;
          }

          /* ضمان عدم تأثير التشويش على الأداء */
          @supports not (backdrop-filter: blur(1px)) {
            .protection-zone,
            .iframe-protection,
            #full-screen-blur {
              background: rgba(255, 0, 0, 0.1) !important;
              opacity: 0.8 !important;
            }
          }

          /* حماية إضافية من التداخل */
          .protection-zone {
            isolation: isolate !important;
          }

          .iframe-protection {
            isolation: isolate !important;
          }
          
          /* انتهاء CSS */
        `}
      </style>
    </>
  );
}

// إضافة حماية إضافية ضد النقر الأيمن والاختصارات
if (typeof document !== 'undefined') {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
  
  document.addEventListener('keydown', (e) => {
    // منع جميع الاختصارات المحتملة
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 's') ||
        e.key === 'F5' ||
        (e.ctrlKey && e.key === 'r') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J')) {
      e.preventDefault();
      return false;
    }
  });

  // حماية إضافية من المحاولات المتقدمة للوصول للمطور
  let devtools = {open: false, orientation: null};
  const threshold = 160;

  const emitEvent = (state, orientation) => {
    console.clear();
    console.log('%c🛡️ هذا الموقع محمي للطلاب', 'color: red; font-size: 50px; font-weight: bold;');
    console.log('%c🚫 استخدام أدوات المطور ممنوع', 'color: red; font-size: 20px;');
  };

  const setDevtoolsStatus = (open, orientation) => {
    if (devtools.open !== open || devtools.orientation !== orientation) {
      devtools.open = open;
      devtools.orientation = orientation;
      emitEvent(open, orientation);
    }
  };

  // فحص دوري لحالة أدوات المطور
  setInterval(() => {
    if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
      setDevtoolsStatus(true, 'vertical');
    } else {
      setDevtoolsStatus(false, null);
    }
  }, 500);

  // حماية من console.log وأدوات التطوير
  const originalLog = console.log;
  console.log = (...args) => {
    if (args.some(arg => typeof arg === 'string' && arg.includes('✅'))) {
      return originalLog.apply(console, args);
    }
    originalLog.apply(console, ['🛡️ محمي للطلاب']);
  };
}

export default LiveGrade3;
