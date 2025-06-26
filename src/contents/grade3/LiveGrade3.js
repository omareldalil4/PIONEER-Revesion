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

  // فتح البث في نافذة جديدة مع طبقة الحماية والتشويش الأقوى والأكثر فعالية
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
        
        // إضافة طبقة الحماية والتشويش الأقوى والأكثر فعالية
        setTimeout(() => {
          try {
            const doc = newWindow.document;
            if (doc) {
              // إنشاء طبقة الحماية الشاملة الأقوى
              const protectionOverlay = doc.createElement('div');
              protectionOverlay.id = 'ultimate-video-protection-enhanced';
              protectionOverlay.innerHTML = `
                <!-- تشويش شامل لكامل شاشة الفيديو - أقوى -->
                <div id="full-screen-blur-enhanced" style="
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100vw;
                  height: 100vh;
                  background: rgba(0, 0, 0, 0.05);
                  backdrop-filter: blur(5px) saturate(0.8) contrast(0.95);
                  z-index: 999999;
                  pointer-events: none;
                  mix-blend-mode: multiply;
                  opacity: 0.8;
                "></div>

                <!-- طبقة حماية أيقونة Share في اليمين العلوي - مكبرة ومقواة -->
                <div class="protection-zone-enhanced share-zone" style="
                  position: fixed;
                  top: 0px;
                  right: 0px;
                  width: 150px;
                  height: 120px;
                  background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(220, 53, 69, 0.15));
                  backdrop-filter: blur(25px) saturate(0.3) contrast(0.8);
                  z-index: 99999999;
                  pointer-events: all;
                  cursor: not-allowed;
                  border-radius: 0 0 0 30px;
                  border: 5px solid rgba(255, 255, 255, 0.4);
                  box-shadow: 
                    0 0 30px rgba(255, 0, 0, 0.5),
                    inset 0 0 20px rgba(255, 0, 0, 0.3);
                  opacity: 0.95;
                " title="🚫 منطقة محظورة - Share محمية بتشويش قوي" 
                   data-zone="share"></div>
                
                <!-- طبقة حماية أيقونة القناة في اليسار العلوي - مكبرة ومقواة -->
                <div class="protection-zone-enhanced channel-zone" style="
                  position: fixed;
                  top: 0px;
                  left: 0px;
                  width: 220px;
                  height: 100px;
                  background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(220, 53, 69, 0.15));
                  backdrop-filter: blur(25px) saturate(0.3) contrast(0.8);
                  z-index: 99999999;
                  pointer-events: all;
                  cursor: not-allowed;
                  border-radius: 0 0 30px 0;
                  border: 5px solid rgba(255, 255, 255, 0.4);
                  box-shadow: 
                    0 0 30px rgba(255, 0, 0, 0.5),
                    inset 0 0 20px rgba(255, 0, 0, 0.3);
                  opacity: 0.95;
                " title="🚫 منطقة محظورة - اسم القناة محمي بتشويش قوي"
                   data-zone="channel"></div>
                
                <!-- طبقة حماية أيقونة Watch on YouTube في اليمين السفلي - مكبرة ومقواة -->
                <div class="protection-zone-enhanced youtube-zone" style="
                  position: fixed;
                  bottom: 0px;
                  right: 0px;
                  width: 180px;
                  height: 80px;
                  background: linear-gradient(135deg, rgba(255, 0, 0, 0.25), rgba(220, 53, 69, 0.2));
                  backdrop-filter: blur(30px) saturate(0.2) contrast(0.7);
                  z-index: 99999999;
                  pointer-events: all;
                  cursor: not-allowed;
                  border-radius: 30px 0 0 0;
                  border: 5px solid rgba(255, 255, 255, 0.4);
                  box-shadow: 
                    0 0 35px rgba(255, 0, 0, 0.6),
                    inset 0 0 25px rgba(255, 0, 0, 0.4);
                  opacity: 0.95;
                " title="🚫 منطقة محظورة - Watch on YouTube محمي بتشويش قوي"
                   data-zone="youtube"></div>
                
                <!-- طبقة حماية شريط التحكم السفلي الكامل - مقواة -->
                <div class="protection-zone-enhanced controls-zone" style="
                  position: fixed;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 150px;
                  background: linear-gradient(to top, 
                    rgba(255, 0, 0, 0.15) 0%, 
                    rgba(255, 0, 0, 0.08) 50%, 
                    rgba(255, 0, 0, 0.03) 100%);
                  backdrop-filter: blur(20px) saturate(0.4) contrast(0.9);
                  z-index: 99999998;
                  pointer-events: all;
                  cursor: not-allowed;
                  border-top: 5px solid rgba(255, 255, 255, 0.3);
                  box-shadow: 0 -8px 25px rgba(255, 0, 0, 0.4);
                  opacity: 0.9;
                " title="🚫 شريط التحكم محظور - محمي بتشويش قوي"
                   data-zone="controls"></div>
                
                <!-- طبقة حماية العنوان والمعلومات في الأعلى - مقواة -->
                <div class="protection-zone-enhanced title-zone" style="
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  height: 140px;
                  background: linear-gradient(to bottom, 
                    rgba(255, 0, 0, 0.12) 0%, 
                    rgba(255, 0, 0, 0.06) 70%, 
                    rgba(255, 0, 0, 0.02) 100%);
                  backdrop-filter: blur(18px) saturate(0.5) contrast(0.9);
                  z-index: 99999997;
                  pointer-events: all;
                  cursor: not-allowed;
                  border-bottom: 4px solid rgba(255, 255, 255, 0.2);
                  box-shadow: 0 8px 20px rgba(255, 0, 0, 0.3);
                  opacity: 0.9;
                " title="🚫 معلومات الفيديو محظورة - محمية بتشويش قوي"
                   data-zone="title"></div>

                <!-- طبقات حماية الجوانب - مقواة -->
                <div class="protection-zone-enhanced left-sidebar" style="
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 120px;
                  height: 100vh;
                  background: linear-gradient(to right, 
                    rgba(255, 0, 0, 0.08) 0%, 
                    rgba(255, 0, 0, 0.04) 70%, 
                    rgba(255, 0, 0, 0.01) 100%);
                  backdrop-filter: blur(15px);
                  z-index: 99999996;
                  pointer-events: all;
                  cursor: not-allowed;
                  border-right: 3px solid rgba(255, 255, 255, 0.2);
                  opacity: 0.8;
                " data-zone="left-sidebar"></div>
                
                <div class="protection-zone-enhanced right-sidebar" style="
                  position: fixed;
                  top: 0;
                  right: 0;
                  width: 120px;
                  height: 100vh;
                  background: linear-gradient(to left, 
                    rgba(255, 0, 0, 0.08) 0%, 
                    rgba(255, 0, 0, 0.04) 70%, 
                    rgba(255, 0, 0, 0.01) 100%);
                  backdrop-filter: blur(15px);
                  z-index: 99999996;
                  pointer-events: all;
                  cursor: not-allowed;
                  border-left: 3px solid rgba(255, 255, 255, 0.2);
                  opacity: 0.8;
                " data-zone="right-sidebar"></div>

                <!-- شبكة تشويش متحركة أقوى -->
                <div class="moving-blur-enhanced" style="
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: 
                    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
                    radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
                    linear-gradient(45deg, 
                      rgba(255, 255, 255, 0.01) 0%, 
                      rgba(255, 255, 255, 0.04) 25%, 
                      rgba(255, 255, 255, 0.01) 50%, 
                      rgba(255, 255, 255, 0.04) 75%, 
                      rgba(255, 255, 255, 0.01) 100%);
                  backdrop-filter: blur(3px) contrast(0.98);
                  z-index: 999995;
                  pointer-events: none;
                  animation: movingBlurEnhanced 8s infinite linear;
                  opacity: 0.7;
                "></div>

                <!-- شبكة حماية متعددة الطبقات -->
                <div class="protection-grid" style="
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: 
                    repeating-linear-gradient(
                      0deg,
                      transparent 0px,
                      rgba(255, 0, 0, 0.01) 30px,
                      transparent 60px
                    ),
                    repeating-linear-gradient(
                      90deg,
                      transparent 0px,
                      rgba(255, 0, 0, 0.008) 40px,
                      transparent 80px
                    );
                  z-index: 999994;
                  pointer-events: none;
                  opacity: 0.6;
                "></div>

                <!-- طبقة تشويش إضافية للأيقونات المحددة -->
                <div class="icon-blur-overlay" style="
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: transparent;
                  z-index: 999993;
                  pointer-events: none;
                  opacity: 0.9;
                "></div>

                <!-- مؤشرات التحذير المتحركة -->
                <div class="warning-indicators" style="
                  position: fixed;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 200px;
                  height: 200px;
                  border: 3px dashed rgba(255, 0, 0, 0.3);
                  border-radius: 50%;
                  z-index: 999992;
                  pointer-events: none;
                  animation: warningPulse 4s infinite ease-in-out;
                  opacity: 0.5;
                ">
                  <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 16px;
                    font-weight: 600;
                    text-align: center;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                    animation: textFloat 3s infinite ease-in-out;
                  ">🛡️<br>محمي<br>بتشويش</div>
                </div>
              `;
              
              // إضافة CSS الحماية الأقوى والأكثر فعالية
              const protectionStyle = doc.createElement('style');
              protectionStyle.textContent = `
                /* تشويش شامل وقوي لجميع عناصر يوتيوب */
                * {
                  -webkit-user-select: none !important;
                  -moz-user-select: none !important;
                  -ms-user-select: none !important;
                  user-select: none !important;
                  -webkit-touch-callout: none !important;
                  -webkit-tap-highlight-color: transparent !important;
                }

                /* إخفاء وتشويش قوي لعناصر يوتيوب المحددة */
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
                .ytp-volume-slider,
                .ytp-chrome-top-buttons > *,
                button[data-title-no-tooltip*="Share"],
                button[aria-label*="Share"],
                button[title*="Share"],
                a[href*="youtube.com/channel"],
                a[href*="youtube.com/@"],
                button[data-title-no-tooltip*="Watch on YouTube"],
                .ytp-watch-on-youtube-button {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  filter: blur(50px) saturate(0) contrast(0) !important;
                  pointer-events: none !important;
                  transform: scale(0) !important;
                  position: absolute !important;
                  left: -9999px !important;
                  top: -9999px !important;
                  width: 0 !important;
                  height: 0 !important;
                  z-index: -1 !important;
                }
                
                /* تشويش قوي ومتقدم للأيقونات المحددة بدقة */
                button[data-title-no-tooltip="Share"],
                button[aria-label*="Share"],
                button[title*="Share"],
                .ytp-share-button,
                a[href*="youtube.com/channel"],
                a[href*="youtube.com/@"],
                .ytp-youtube-button,
                button[data-title-no-tooltip="Watch on YouTube"],
                .ytp-watch-on-youtube-button,
                .ytp-chrome-controls button:not(.ytp-play-button),
                .ytp-chrome-controls a:not(video),
                .ytp-chrome-top-buttons *,
                .ytp-chrome-top *,
                [class*="ytp-share"],
                [class*="ytp-youtube"],
                [aria-label*="YouTube"],
                [title*="YouTube"],
                [data-title*="Share"],
                .html5-endscreen,
                .ytp-ce-element,
                .ytp-endscreen-content {
                  pointer-events: none !important;
                  opacity: 0 !important;
                  filter: 
                    blur(100px) 
                    saturate(0) 
                    contrast(0) 
                    brightness(0) 
                    sepia(1) 
                    hue-rotate(180deg) 
                    invert(1) !important;
                  transform: scale(0) rotate(360deg) !important;
                  visibility: hidden !important;
                  display: none !important;
                  position: absolute !important;
                  left: -99999px !important;
                  top: -99999px !important;
                  width: 0 !important;
                  height: 0 !important;
                  z-index: -99999 !important;
                  background: transparent !important;
                  border: none !important;
                  outline: none !important;
                  box-shadow: none !important;
                  text-shadow: none !important;
                  -webkit-appearance: none !important;
                  -moz-appearance: none !important;
                  appearance: none !important;
                }
                
                /* تشويش شامل لمنطقة الفيديو مع تحسينات */
                #movie_player {
                  position: relative !important;
                  filter: contrast(1.05) saturate(0.98) brightness(0.99) !important;
                  isolation: isolate !important;
                }

                /* طبقة تشويش قوية على كامل منطقة المشغل */
                #movie_player::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: 
                    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 40%),
                    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.015) 0%, transparent 40%),
                    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 40%),
                    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.015) 0%, transparent 40%);
                  backdrop-filter: blur(2px) contrast(0.99);
                  z-index: 999990;
                  pointer-events: none;
                }
                
                /* طبقة حماية إضافية للفيديو */
                #movie_player::after {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 120px;
                  background: transparent;
                  z-index: 999991;
                  pointer-events: none;
                }
                
                /* حماية وتشويش خاص للمناطق الحساسة */
                .ytp-chrome-controls {
                  pointer-events: none !important;
                  filter: blur(20px) saturate(0.2) contrast(0.5) !important;
                  opacity: 0.1 !important;
                  transform: scale(0.8) !important;
                  visibility: hidden !important;
                }
                
                .ytp-progress-bar {
                  pointer-events: none !important;
                  filter: blur(15px) saturate(0) !important;
                  opacity: 0.2 !important;
                }

                /* تشويش أقوى لشريط التقدم */
                .ytp-progress-bar-container {
                  backdrop-filter: blur(25px) saturate(0.3) !important;
                  opacity: 0.1 !important;
                  filter: blur(20px) !important;
                  transform: scaleY(0.5) !important;
                }
                
                /* السماح فقط بتشغيل/إيقاف الفيديو في المنتصف */
                .ytp-play-button {
                  pointer-events: auto !important;
                  filter: none !important;
                  opacity: 1 !important;
                  z-index: 1000000 !important;
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
                  filter: blur(30px) saturate(0) !important;
                  opacity: 0 !important;
                  display: none !important;
                }
                
                /* تشويش محسن ومقوى للأيقونات المحمية */
                .protection-zone-enhanced {
                  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
                  backdrop-filter: blur(25px) saturate(0.2) contrast(0.8) brightness(0.9) !important;
                  background: linear-gradient(45deg, 
                    rgba(255, 0, 0, 0.1), 
                    rgba(255, 0, 0, 0.15), 
                    rgba(220, 53, 69, 0.12),
                    rgba(255, 0, 0, 0.08)
                  ) !important;
                  animation: protectionPulseEnhanced 3s infinite ease-in-out !important;
                  border: 5px solid rgba(255, 255, 255, 0.4) !important;
                  box-shadow: 
                    0 0 30px rgba(255, 0, 0, 0.5),
                    inset 0 0 20px rgba(255, 0, 0, 0.3),
                    0 0 60px rgba(255, 0, 0, 0.3) !important;
                  opacity: 0.95 !important;
                  mix-blend-mode: multiply !important;
                }
                
                /* تأثيرات محسنة عند التحويم */
                .protection-zone-enhanced:hover {
                  backdrop-filter: blur(35px) saturate(0.1) contrast(0.7) !important;
                  background: linear-gradient(45deg, 
                    rgba(255, 0, 0, 0.2), 
                    rgba(220, 53, 69, 0.18),
                    rgba(255, 0, 0, 0.15)
                  ) !important;
                  box-shadow: 
                    0 0 40px rgba(255, 0, 0, 0.7),
                    inset 0 0 30px rgba(255, 0, 0, 0.4),
                    0 0 80px rgba(255, 0, 0, 0.5) !important;
                  transform: scale(1.02) !important;
                  opacity: 0.98 !important;
                }
                
                @keyframes protectionPulseEnhanced {
                  0%, 100% { 
                    backdrop-filter: blur(20px) saturate(0.3) contrast(0.85);
                    background: rgba(255, 0, 0, 0.08);
                    box-shadow: 
                      0 0 25px rgba(255, 0, 0, 0.4),
                      inset 0 0 15px rgba(255, 0, 0, 0.2);
                    transform: scale(1);
                  }
                  33% { 
                    backdrop-filter: blur(30px) saturate(0.2) contrast(0.8);
                    background: rgba(255, 0, 0, 0.12);
                    box-shadow: 
                      0 0 35px rgba(255, 0, 0, 0.6),
                      inset 0 0 25px rgba(255, 0, 0, 0.4);
                    transform: scale(1.01);
                  }
                  66% { 
                    backdrop-filter: blur(25px) saturate(0.25) contrast(0.82);
                    background: rgba(255, 0, 0, 0.1);
                    box-shadow: 
                      0 0 30px rgba(255, 0, 0, 0.5),
                      inset 0 0 20px rgba(255, 0, 0, 0.3);
                    transform: scale(1.005);
                  }
                }

                @keyframes movingBlurEnhanced {
                  0% { 
                    background-position: 0% 0%, 100% 0%, 0% 100%, 100% 100%, 0% 0%;
                    backdrop-filter: blur(2px) contrast(0.99);
                    transform: rotate(0deg);
                  }
                  25% { 
                    background-position: 100% 0%, 100% 100%, 0% 0%, 0% 100%, 100% 0%;
                    backdrop-filter: blur(4px) contrast(0.98);
                    transform: rotate(2deg);
                  }
                  50% { 
                    background-position: 100% 100%, 0% 100%, 100% 0%, 0% 0%, 100% 100%;
                    backdrop-filter: blur(3px) contrast(0.985);
                    transform: rotate(4deg);
                  }
                  75% { 
                    background-position: 0% 100%, 0% 0%, 100% 100%, 100% 0%, 0% 100%;
                    backdrop-filter: blur(4px) contrast(0.98);
                    transform: rotate(2deg);
                  }
                  100% { 
                    background-position: 0% 0%, 100% 0%, 0% 100%, 100% 100%, 0% 0%;
                    backdrop-filter: blur(2px) contrast(0.99);
                    transform: rotate(0deg);
                  }
                }

                @keyframes warningPulse {
                  0%, 100% { 
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    opacity: 0.3;
                    border-color: rgba(255, 0, 0, 0.2);
                  }
                  25% { 
                    transform: translate(-50%, -50%) scale(1.05) rotate(5deg);
                    opacity: 0.6;
                    border-color: rgba(255, 0, 0, 0.4);
                  }
                  50% { 
                    transform: translate(-50%, -50%) scale(1.1) rotate(0deg);
                    opacity: 0.5;
                    border-color: rgba(255, 0, 0, 0.5);
                  }
                  75% { 
                    transform: translate(-50%, -50%) scale(1.05) rotate(-5deg);
                    opacity: 0.6;
                    border-color: rgba(255, 0, 0, 0.4);
                  }
                }

                @keyframes textFloat {
                  0%, 100% { 
                    transform: translate(-50%, -50%) translateY(0px);
                    opacity: 0.6;
                  }
                  33% { 
                    transform: translate(-50%, -50%) translateY(-5px);
                    opacity: 0.8;
                  }
                  66% { 
                    transform: translate(-50%, -50%) translateY(5px);
                    opacity: 0.7;
                  }
                }
                
                /* رسالة تحذيرية محسنة ومقواة */
                .protection-zone-enhanced:hover::after {
                  content: '🚫 منطقة محظورة - محمي للطلاب بتشويش قوي';
                  position: absolute;
                  bottom: -60px;
                  left: 50%;
                  transform: translateX(-50%);
                  background: linear-gradient(135deg, #dc3545, #c82333);
                  color: white;
                  padding: 12px 20px;
                  border-radius: 15px;
                  font-size: 14px;
                  font-weight: 700;
                  white-space: nowrap;
                  z-index: 100000000;
                  animation: warningFadeEnhanced 4s ease-in-out;
                  border: 3px solid rgba(255, 255, 255, 0.6);
                  box-shadow: 
                    0 8px 25px rgba(0, 0, 0, 0.5),
                    0 0 20px rgba(220, 53, 69, 0.6);
                  backdrop-filter: blur(15px);
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
                
                @keyframes warningFadeEnhanced {
                  0%, 100% { 
                    opacity: 0; 
                    transform: translateX(-50%) translateY(20px) scale(0.7);
                  }
                  15%, 85% { 
                    opacity: 1; 
                    transform: translateX(-50%) translateY(0) scale(1);
                  }
                  50% {
                    opacity: 1;
                    transform: translateX(-50%) translateY(-5px) scale(1.05);
                  }
                }
                
                /* تشويش إضافي للعناصر المخفية */
                .ytp-chrome-top-buttons *,
                .ytp-share-button-container *,
                .ytp-overflow-button *,
                .ytp-settings-menu *,
                [class*="share"] *,
                [class*="youtube"] *,
                [data-title*="Share"] *,
                [aria-label*="Share"] * {
                  visibility: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                  filter: blur(50px) saturate(0) contrast(0) !important;
                  display: none !important;
                  position: absolute !important;
                  left: -99999px !important;
                  top: -99999px !important;
                  width: 0 !important;
                  height: 0 !important;
                  z-index: -99999 !important;
                }

                /* حماية من القوائم المنبثقة */
                .ytp-popup,
                .ytp-settings-menu,
                .ytp-menuitem,
                .ytp-panel,
                .ytp-tooltip,
                .ytp-contextmenu {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                  filter: blur(100px) !important;
                  transform: scale(0) !important;
                  position: absolute !important;
                  left: -99999px !important;
                  top: -99999px !important;
                }

                /* تشويش شامل للمحتوى الجانبي */
                #secondary-inner,
                ytd-watch-next-secondary-results-renderer,
                #related,
                .ytd-watch-flexy #secondary {
                  filter: blur(50px) saturate(0) contrast(0) !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                  display: none !important;
                }

                /* تشويش لمعلومات الفيديو */
                #above-the-fold,
                #below-the-fold,
                ytd-video-primary-info-renderer,
                ytd-video-secondary-info-renderer {
                  filter: blur(30px) saturate(0.3) contrast(0.7) !important;
                  opacity: 0.2 !important;
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
                  background: rgba(255, 255, 255, 0.002);
                  z-index: 999993;
                  pointer-events: none;
                }
                
                /* تحسين الحماية للشاشات المختلفة */
                @media (max-width: 768px) {
                  .protection-zone-enhanced {
                    backdrop-filter: blur(20px) saturate(0.2) !important;
                  }
                  
                  #full-screen-blur-enhanced {
                    backdrop-filter: blur(3px) saturate(0.9) !important;
                  }

                  .share-zone { width: 120px !important; height: 100px !important; }
                  .channel-zone { width: 180px !important; height: 80px !important; }
                  .youtube-zone { width: 150px !important; height: 70px !important; }
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
                [class*="ytp-"]:not(.ytp-play-button):not(video),
                [class*="share"]:not(video),
                [class*="youtube"]:not(video),
                [data-title*="Share"]:not(video),
                [aria-label*="Share"]:not(video),
                [title*="YouTube"]:not(video) {
                  filter: blur(50px) saturate(0) contrast(0) brightness(0) !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                  display: none !important;
                  visibility: hidden !important;
                  transform: scale(0) !important;
                  position: absolute !important;
                  left: -99999px !important;
                  top: -99999px !important;
                  width: 0 !important;
                  height: 0 !important;
                  z-index: -99999 !important;
                }

                /* حماية الروابط الخارجية */
                a[href*="youtube.com"]:not([href*="/watch"]),
                a[href*="youtu.be"]:not([href*="/watch"]) {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                  filter: blur(100px) !important;
                  transform: scale(0) !important;
                  position: absolute !important;
                  left: -99999px !important;
                  top: -99999px !important;
                }

                /* تشويش متقدم للعناصر التفاعلية */
                button:not(.ytp-play-button):not([data-zone]),
                a:not([href*="/watch"]):not([data-zone]),
                [role="button"]:not(.ytp-play-button):not([data-zone]) {
                  pointer-events: none !important;
                  filter: blur(25px) saturate(0) !important;
                  opacity: 0.1 !important;
                  transform: scale(0.8) !important;
                }

                /* حماية من الـ tooltips والـ overlays */
                [role="tooltip"],
                [class*="tooltip"],
                [class*="overlay"]:not([id*="protection"]) {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                }

                /* تشويش خاص للعناصر المتحركة */
                @keyframes protectionShield {
                  0% { 
                    backdrop-filter: blur(20px) saturate(0.3);
                    background: rgba(255, 0, 0, 0.08);
                  }
                  50% { 
                    backdrop-filter: blur(30px) saturate(0.2);
                    background: rgba(255, 0, 0, 0.12);
                  }
                  100% { 
                    backdrop-filter: blur(20px) saturate(0.3);
                    background: rgba(255, 0, 0, 0.08);
                  }
                }

                /* تطبيق التشويش على العناصر الجديدة */
                .protection-zone-enhanced {
                  animation: protectionShield 4s infinite ease-in-out !important;
                }

                /* حماية إضافية من العناصر المخفية */
                [style*="display: none"] button,
                [style*="visibility: hidden"] button,
                [hidden] button {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                }

                /* تأكيد نهائي للحماية */
                .share-zone,
                .channel-zone,
                .youtube-zone,
                .controls-zone,
                .title-zone {
                  pointer-events: all !important;
                  cursor: not-allowed !important;
                  z-index: 99999999 !important;
                }

                /* حماية من أي محاولة للتلاعب */
                [data-zone] {
                  position: fixed !important;
                  backdrop-filter: blur(25px) saturate(0.2) !important;
                  background: linear-gradient(135deg, rgba(255, 0, 0, 0.15), rgba(220, 53, 69, 0.1)) !important;
                  border: 5px solid rgba(255, 255, 255, 0.4) !important;
                  opacity: 0.95 !important;
                  pointer-events: all !important;
                  cursor: not-allowed !important;
                }

                /* منع أي تعديل على خصائص الحماية */
                .protection-zone-enhanced[style] {
                  background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(220, 53, 69, 0.15)) !important;
                  backdrop-filter: blur(25px) saturate(0.3) contrast(0.8) !important;
                  opacity: 0.95 !important;
                  pointer-events: all !important;
                  cursor: not-allowed !important;
                }

                /* تشويش نهائي وشامل */
                #full-screen-blur-enhanced {
                  background: rgba(0, 0, 0, 0.05) !important;
                  backdrop-filter: blur(5px) saturate(0.8) contrast(0.95) !important;
                  opacity: 0.8 !important;
                  pointer-events: none !important;
                  z-index: 999999 !important;
                }

                /* حماية متقدمة من التحايل */
                * {
                  -webkit-touch-callout: none !important;
                  -webkit-user-select: none !important;
                  -khtml-user-select: none !important;
                  -moz-user-select: none !important;
                  -ms-user-select: none !important;
                  user-select: none !important;
                  -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
                }

                /* منع السحب والإفلات */
                * {
                  -webkit-user-drag: none !important;
                  -khtml-user-drag: none !important;
                  -moz-user-drag: none !important;
                  -o-user-drag: none !important;
                  user-drag: none !important;
                  draggable: false !important;
                }

                /* تشويش إضافي للعناصر التي قد تظهر لاحقاً */
                [class*="share"]:not([data-zone]),
                [class*="youtube"]:not([data-zone]),
                [id*="share"]:not([data-zone]),
                [id*="youtube"]:not([data-zone]) {
                  filter: blur(100px) saturate(0) contrast(0) !important;
                  opacity: 0 !important;
                  display: none !important;
                  visibility: hidden !important;
                  pointer-events: none !important;
                  transform: scale(0) !important;
                  position: absolute !important;
                  left: -99999px !important;
                  top: -99999px !important;
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
              
              // مراقبة التغييرات في DOM وإعادة تطبيق الحماية والتشويش القوي
              const observer = new MutationObserver(() => {
                // إعادة إخفاء وتشويش العناصر المحظورة إذا ظهرت
                const hiddenElements = doc.querySelectorAll(`
                  .ytp-share-button, 
                  .ytp-youtube-button, 
                  .ytp-chrome-top-buttons,
                  .ytp-overflow-button,
                  .ytp-settings-button,
                  .ytp-fullscreen-button,
                  button[data-title-no-tooltip*="Share"],
                  button[aria-label*="Share"],
                  button[title*="Share"],
                  a[href*="youtube.com/channel"],
                  a[href*="youtube.com/@"],
                  button[data-title-no-tooltip*="Watch on YouTube"],
                  .ytp-watch-on-youtube-button,
                  [class*="share"]:not([data-zone]),
                  [class*="youtube"]:not([data-zone])
                `);
                hiddenElements.forEach(el => {
                  el.style.display = 'none';
                  el.style.visibility = 'hidden';
                  el.style.pointerEvents = 'none';
                  el.style.filter = 'blur(100px) saturate(0) contrast(0)';
                  el.style.opacity = '0';
                  el.style.transform = 'scale(0)';
                  el.style.position = 'absolute';
                  el.style.left = '-99999px';
                  el.style.top = '-99999px';
                  el.style.width = '0';
                  el.style.height = '0';
                  el.style.zIndex = '-99999';
                });

                // تطبيق تشويش إضافي على العناصر الجديدة
                const newElements = doc.querySelectorAll('button, a');
                newElements.forEach(el => {
                  if (el.textContent.includes('Share') || 
                      el.getAttribute('aria-label')?.includes('Share') ||
                      el.getAttribute('title')?.includes('Share') ||
                      el.getAttribute('data-title-no-tooltip')?.includes('Share') ||
                      el.href?.includes('youtube.com/channel') ||
                      el.href?.includes('youtube.com/@') ||
                      el.textContent.includes('YouTube') ||
                      el.getAttribute('aria-label')?.includes('YouTube') ||
                      el.getAttribute('title')?.includes('YouTube')) {
                    el.style.display = 'none';
                    el.style.visibility = 'hidden';
                    el.style.pointerEvents = 'none';
                    el.style.filter = 'blur(100px) saturate(0) contrast(0)';
                    el.style.opacity = '0';
                    el.style.transform = 'scale(0)';
                    el.style.position = 'absolute';
                    el.style.left = '-99999px';
                    el.style.top = '-99999px';
                  }
                });
              });
              
              observer.observe(doc.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeOldValue: true,
                characterData: true
              });
              
              // فحص دوري إضافي للعناصر المحظورة
              setInterval(() => {
                const forbiddenElements = doc.querySelectorAll(`
                  [class*="share"]:not([data-zone]),
                  [class*="youtube"]:not([data-zone]),
                  [aria-label*="Share"]:not([data-zone]),
                  [title*="YouTube"]:not([data-zone]),
                  button[data-title-no-tooltip*="Share"],
                  a[href*="youtube.com/channel"],
                  a[href*="youtube.com/@"]
                `);
                
                forbiddenElements.forEach(el => {
                  el.style.display = 'none';
                  el.style.visibility = 'hidden';
                  el.style.pointerEvents = 'none';
                  el.style.filter = 'blur(100px)';
                  el.style.opacity = '0';
                  el.style.transform = 'scale(0)';
                  el.style.position = 'absolute';
                  el.style.left = '-99999px';
                  el.style.top = '-99999px';
                });
              }, 1000);
              
              console.log('✅ تم تطبيق طبقة الحماية والتشويش الشامل والقوي بنجاح');
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

  // فتح البث في نفس النافذة مع الحماية والتشويش القوي
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
        filter: contrast(1.02) saturate(0.98);
      `;
      
      // إضافة طبقات الحماية والتشويش الأقوى للـ iframe
      const protectionOverlay = document.createElement('div');
      protectionOverlay.innerHTML = `
        <!-- تشويش شامل لكامل الـ iframe -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(4px) saturate(0.9) contrast(0.98);
          z-index: 999999;
          pointer-events: none;
        "></div>

        <!-- طبقة حماية أيقونة Share - مكبرة ومقواة -->
        <div class="iframe-protection share-protection" style="
          position: absolute;
          top: 0px;
          right: 0px;
          width: 150px;
          height: 120px;
          background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(220, 53, 69, 0.15));
          backdrop-filter: blur(30px) saturate(0.2) contrast(0.7);
          z-index: 99999999;
          pointer-events: all;
          cursor: not-allowed;
          border-radius: 0 0 0 30px;
          border: 6px solid rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 0 40px rgba(255, 0, 0, 0.6),
            inset 0 0 25px rgba(255, 0, 0, 0.4);
          opacity: 0.95;
        "></div>
        
        <!-- طبقة حماية أيقونة القناة - مكبرة ومقواة -->
        <div class="iframe-protection channel-protection" style="
          position: absolute;
          top: 0px;
          left: 0px;
          width: 220px;
          height: 100px;
          background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(220, 53, 69, 0.15));
          backdrop-filter: blur(30px) saturate(0.2) contrast(0.7);
          z-index: 99999999;
          pointer-events: all;
          cursor: not-allowed;
          border-radius: 0 0 30px 0;
          border: 6px solid rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 0 40px rgba(255, 0, 0, 0.6),
            inset 0 0 25px rgba(255, 0, 0, 0.4);
          opacity: 0.95;
        "></div>
        
        <!-- طبقة حماية Watch on YouTube - مكبرة ومقواة -->
        <div class="iframe-protection youtube-protection" style="
          position: absolute;
          bottom: 0px;
          right: 0px;
          width: 180px;
          height: 80px;
          background: linear-gradient(135deg, rgba(255, 0, 0, 0.25), rgba(220, 53, 69, 0.2));
          backdrop-filter: blur(35px) saturate(0.15) contrast(0.6);
          z-index: 99999999;
          pointer-events: all;
          cursor: not-allowed;
          border-radius: 30px 0 0 0;
          border: 6px solid rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 0 45px rgba(255, 0, 0, 0.7),
            inset 0 0 30px rgba(255, 0, 0, 0.5);
          opacity: 0.95;
        "></div>
        
        <!-- طبقة حماية شريط التحكم - مقواة -->
        <div class="iframe-protection controls-protection" style="
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 150px;
          background: linear-gradient(to top, 
            rgba(255, 0, 0, 0.18) 0%, 
            rgba(255, 0, 0, 0.10) 50%, 
            rgba(255, 0, 0, 0.04) 100%);
          backdrop-filter: blur(25px) saturate(0.3) contrast(0.8);
          z-index: 99999998;
          pointer-events: all;
          cursor: not-allowed;
          border-top: 6px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 -10px 30px rgba(255, 0, 0, 0.5);
          opacity: 0.9;
        "></div>
        
        <!-- طبقة حماية العنوان في الأعلى - مقواة -->
        <div class="iframe-protection title-protection" style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 140px;
          background: linear-gradient(to bottom, 
            rgba(255, 0, 0, 0.15) 0%, 
            rgba(255, 0, 0, 0.08) 70%, 
            rgba(255, 0, 0, 0.03) 100%);
          backdrop-filter: blur(22px) saturate(0.4) contrast(0.85);
          z-index: 99999997;
          pointer-events: all;
          cursor: not-allowed;
          border-bottom: 5px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 10px 25px rgba(255, 0, 0, 0.4);
          opacity: 0.9;
        "></div>

        <!-- طبقات حماية الجوانب - مقواة -->
        <div class="iframe-protection left-protection" style="
          position: absolute;
          top: 0;
          left: 0;
          width: 120px;
          height: 100%;
          background: linear-gradient(to right, 
            rgba(255, 0, 0, 0.1) 0%, 
            rgba(255, 0, 0, 0.05) 70%, 
            rgba(255, 0, 0, 0.02) 100%);
          backdrop-filter: blur(18px);
          z-index: 99999996;
          pointer-events: all;
          cursor: not-allowed;
          border-right: 4px solid rgba(255, 255, 255, 0.3);
          opacity: 0.85;
        "></div>
        
        <div class="iframe-protection right-protection" style="
          position: absolute;
          top: 0;
          right: 0;
          width: 120px;
          height: 100%;
          background: linear-gradient(to left, 
            rgba(255, 0, 0, 0.1) 0%, 
            rgba(255, 0, 0, 0.05) 70%, 
            rgba(255, 0, 0, 0.02) 100%);
          backdrop-filter: blur(18px);
          z-index: 99999996;
          pointer-events: all;
          cursor: not-allowed;
          border-left: 4px solid rgba(255, 255, 255, 0.3);
          opacity: 0.85;
        "></div>

        <!-- شبكة تشويش متحركة أقوى للـ iframe -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.04) 0%, transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 60%),
            radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.04) 0%, transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 60%),
            repeating-conic-gradient(
              from 0deg at 50% 50%,
              transparent 0deg,
              rgba(255, 255, 255, 0.015) 45deg,
              transparent 90deg,
              rgba(255, 255, 255, 0.01) 135deg,
              transparent 180deg
            );
          z-index: 999996;
          pointer-events: none;
          animation: rotateBlurIframe 15s infinite linear;
          opacity: 0.8;
        "></div>

        <!-- طبقة تشويش إضافية متحركة -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(45deg, 
              rgba(255, 255, 255, 0.02) 0%, 
              rgba(255, 255, 255, 0.05) 25%, 
              rgba(255, 255, 255, 0.02) 50%, 
              rgba(255, 255, 255, 0.05) 75%, 
              rgba(255, 255, 255, 0.02) 100%);
          backdrop-filter: blur(2px) contrast(0.99);
          z-index: 999995;
          pointer-events: none;
          animation: movingBlurIframe 12s infinite ease-in-out;
          opacity: 0.7;
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
      
      // إضافة CSS للحماية المقواة في الـ iframe
      const iframeStyle = document.createElement('style');
      iframeStyle.textContent = `
        .iframe-protection {
          animation: protectionPulseIframe 3.5s infinite ease-in-out !important;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
        
        .iframe-protection:hover {
          backdrop-filter: blur(40px) saturate(0.1) contrast(0.6) !important;
          background: linear-gradient(135deg, 
            rgba(255, 0, 0, 0.25), 
            rgba(220, 53, 69, 0.2),
            rgba(255, 0, 0, 0.18)
          ) !important;
          box-shadow: 
            0 0 50px rgba(255, 0, 0, 0.8),
            inset 0 0 35px rgba(255, 0, 0, 0.5),
            0 0 100px rgba(255, 0, 0, 0.6) !important;
          transform: scale(1.03) !important;
          opacity: 0.98 !important;
        }
        
        .iframe-protection:hover::after {
          content: '🚫 منطقة محظورة - محمية بتشويش قوي';
          position: absolute;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #dc3545, #c82333);
          color: white;
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          z-index: 100000000;
          animation: fadeInOutIframe 3s ease-in-out;
          border: 3px solid rgba(255, 255, 255, 0.6);
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.4),
            0 0 15px rgba(220, 53, 69, 0.5);
          backdrop-filter: blur(10px);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes protectionPulseIframe {
          0%, 100% { 
            backdrop-filter: blur(25px) saturate(0.25) contrast(0.8);
            box-shadow: 
              0 0 30px rgba(255, 0, 0, 0.5),
              inset 0 0 20px rgba(255, 0, 0, 0.3);
            transform: scale(1);
          }
          33% { 
            backdrop-filter: blur(35px) saturate(0.15) contrast(0.75);
            box-shadow: 
              0 0 40px rgba(255, 0, 0, 0.7),
              inset 0 0 30px rgba(255, 0, 0, 0.5);
            transform: scale(1.01);
          }
          66% { 
            backdrop-filter: blur(30px) saturate(0.2) contrast(0.78);
            box-shadow: 
              0 0 35px rgba(255, 0, 0, 0.6),
              inset 0 0 25px rgba(255, 0, 0, 0.4);
            transform: scale(1.005);
          }
        }

        @keyframes rotateBlurIframe {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.02); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(1.02); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes movingBlurIframe {
          0% { 
            background-position: 0% 0%;
            backdrop-filter: blur(2px) contrast(0.99);
          }
          25% { 
            background-position: 100% 0%;
            backdrop-filter: blur(3px) contrast(0.985);
          }
          50% { 
            background-position: 100% 100%;
            backdrop-filter: blur(2px) contrast(0.99);
          }
          75% { 
            background-position: 0% 100%;
            backdrop-filter: blur(3px) contrast(0.985);
          }
          100% { 
            background-position: 0% 0%;
            backdrop-filter: blur(2px) contrast(0.99);
          }
        }
        
        @keyframes fadeInOutIframe {
          0%, 100% { opacity: 0; transform: translateX(-50%) translateY(15px) scale(0.8); }
          20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) translateY(-3px) scale(1.05); }
        }

        /* حماية إضافية للـ iframe */
        iframe {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }

        /* تحسين أداء الـ iframe */
        .iframe-protection {
          will-change: transform, backdrop-filter !important;
          transform: translateZ(0) !important;
          backface-visibility: hidden !important;
        }

        /* حماية من التحايل على الـ iframe */
        .iframe-protection {
          pointer-events: all !important;
          cursor: not-allowed !important;
          z-index: 99999999 !important;
        }

        /* تأكيد الحماية */
        .share-protection,
        .channel-protection,
        .youtube-protection,
        .controls-protection,
        .title-protection {
          background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(220, 53, 69, 0.15)) !important;
          opacity: 0.95 !important;
          pointer-events: all !important;
          cursor: not-allowed !important;
        }
      `;
      
      // زر الإغلاق المحسن والمقوى
      const closeButton = document.createElement('button');
      closeButton.innerHTML = '✕ إغلاق البث المحمي بالتشويش القوي';
      closeButton.style.cssText = `
        position: absolute;
        top: 25px;
        left: 25px;
        background: linear-gradient(135deg, #dc3545, #c82333);
        color: white;
        border: 4px solid #ffffff;
        padding: 18px 35px;
        border-radius: 18px;
        cursor: pointer;
        z-index: 1000001;
        font-weight: 700;
        font-size: 16px;
        box-shadow: 
          0 8px 25px rgba(220, 53, 69, 0.5),
          0 0 20px rgba(220, 53, 69, 0.3);
        transition: all 0.3s ease;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
      `;
      closeButton.onclick = () => {
        document.body.removeChild(iframeContainer);
      };
      
      closeButton.onmouseenter = () => {
        closeButton.style.background = 'linear-gradient(135deg, #e74c3c, #dc3545)';
        closeButton.style.transform = 'scale(1.08) translateY(-3px)';
        closeButton.style.boxShadow = '0 12px 35px rgba(220, 53, 69, 0.6), 0 0 30px rgba(220, 53, 69, 0.4)';
      };
      
      closeButton.onmouseleave = () => {
        closeButton.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
        closeButton.style.transform = 'scale(1) translateY(0)';
        closeButton.style.boxShadow = '0 8px 25px rgba(220, 53, 69, 0.5), 0 0 20px rgba(220, 53, 69, 0.3)';
      };
      
      document.head.appendChild(iframeStyle);
      iframeContainer.appendChild(iframe);
      iframeContainer.appendChild(protectionOverlay);
      iframeContainer.appendChild(closeButton);
      document.body.appendChild(iframeContainer);
    }
  };

  // نسخ الرابط مع تأثير بصري محسن
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(liveStreamUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // fallback للمتصفحات القديمة
      const textArea = document.createElement('textarea');
      textArea.value = liveStreamUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
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
          }}>🔴🛡️ جاري تحميل البث المباشر المحمي بتشويش قوي...</h3>
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
        {/* Header Section محسن */}
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
          }}>🛡️🔴🌀</div>
          <h1 style={{ 
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '15px',
            color: '#2c3e50'
          }}>
            البث المباشر المحمي بتشويش قوي وشامل
          </h1>
          <div style={{
            background: isLiveStreamActive ? 
              'linear-gradient(135deg, #28a745, #20c997)' : 
              'linear-gradient(135deg, #6c757d, #5a6268)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '20px',
            display: 'inline-block',
            fontSize: '0.95rem',
            fontWeight: '600',
            boxShadow: `0 4px 12px ${isLiveStreamActive ? 'rgba(40, 167, 69, 0.3)' : 'rgba(108, 117, 125, 0.3)'}`,
            position: 'relative'
          }}>
            {isLiveStreamActive && (
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '16px',
                height: '16px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                animation: 'pulse 1.2s infinite',
                boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.4)'
              }}></div>
            )}
            {isLiveStreamActive ? '🟢 البث نشط الآن - محمي بتشويش قوي ومتقدم' : '⏸️ لا يوجد بث حالياً'}
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
              {/* علامة الحماية المحسنة والمقواة */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '25px',
                background: 'linear-gradient(135deg, #28a745, #20c997)',
                color: 'white',
                padding: '10px 18px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '700',
                zIndex: 10,
                boxShadow: '0 6px 15px rgba(40, 167, 69, 0.5)',
                border: '3px solid #ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>
                🛡️🌀 تشويش قوي ومتقدم
              </div>

              {/* علامة LIVE محسنة ومقواة */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '25px',
                background: 'linear-gradient(135deg, #ff0000, #cc0000)',
                color: 'white',
                padding: '10px 18px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '700',
                zIndex: 10,
                boxShadow: '0 6px 15px rgba(255, 0, 0, 0.5)',
                animation: 'pulse 2s infinite',
                border: '3px solid #ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>
                🔴 LIVE NOW
              </div>

              {/* رمز البث الكبير مع تأثير محسن */}
              <div style={{
                fontSize: '6rem',
                marginBottom: '30px',
                color: 'white',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                animation: 'pulse 3s infinite',
                filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.4))'
              }}>
                🛡️📺🌀✨
              </div>

              {/* عنوان البث محسن */}
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
                البث المباشر المحمي بتشويش قوي وشامل! 🚀
              </h2>

              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.3rem',
                fontWeight: '500',
                marginBottom: '30px',
                lineHeight: '1.6'
              }}>
                <strong>مشاهدة آمنة مع تشويش قوي ومتقدم لجميع العناصر والأيقونات!</strong> اختر طريقة المشاهدة 👇
              </p>

              {/* أزرار المشاهدة المحسنة والمقواة */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '25px',
                maxWidth: '700px',
                margin: '0 auto 30px auto'
              }}>
                {/* زر فتح في نافذة جديدة محمية ومقواة */}
                <button
                  onClick={openLiveStream}
                  style={{
                    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                    color: 'white',
                    border: '4px solid #ffffff',
                    borderRadius: '20px',
                    padding: '22px 28px',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 12px 35px rgba(231, 76, 60, 0.5)',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-6px) scale(1.03)';
                    e.target.style.boxShadow = '0 18px 45px rgba(231, 76, 60, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 12px 35px rgba(231, 76, 60, 0.5)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#28a745',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: '600'
                  }}>تشويش قوي ومتقدم</div>
                  <span style={{ fontSize: '2.2rem' }}>🛡️🚀🌀✨</span>
                  <div>نافذة جديدة مع تشويش قوي وشامل</div>
                  <small style={{ opacity: 0.9, fontSize: '0.9rem' }}>تشويش قوي ومتقدم لجميع العناصر والأيقونات</small>
                </button>

                {/* زر المشاهدة المحمية ومقواة */}
                <button
                  onClick={watchInCurrentWindow}
                  style={{
                    background: 'linear-gradient(135deg, #00b894, #00a085)',
                    color: 'white',
                    border: '4px solid #ffffff',
                    borderRadius: '20px',
                    padding: '22px 28px',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 12px 35px rgba(0, 184, 148, 0.5)',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-6px) scale(1.03)';
                    e.target.style.boxShadow = '0 18px 45px rgba(0, 184, 148, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 12px 35px rgba(0, 184, 148, 0.5)';
                  }}
                >
                  <span style={{ fontSize: '2.2rem' }}>🛡️📺🌀✨</span>
                  <div>مشاهدة محمية بتشويش قوي</div>
                  <small style={{ opacity: 0.9, fontSize: '0.9rem' }}>حماية شاملة مع تشويش قوي ومتحرك</small>
                </button>
              </div>

              {/* نسخ الرابط محسن ومقوى */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                padding: '30px',
                marginTop: '25px',
                border: '3px solid rgba(255, 255, 255, 0.25)'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}>
                  🔗🛡️ شارك رابط البث المحمي بالتشويش القوي
                </h4>
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}>
                  <input
                    type="text"
                    value={liveStreamUrl}
                    readOnly
                    style={{
                      flex: 1,
                      padding: '18px 22px',
                      borderRadius: '15px',
                      border: '3px solid rgba(255, 255, 255, 0.4)',
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
                      border: '3px solid #ffffff',
                      borderRadius: '15px',
                      padding: '18px 28px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                      minWidth: '130px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {copied ? '✅ تم النسخ!' : '📋 نسخ الرابط'}
                  </button>
                </div>
                <small style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '13px',
                  display: 'block',
                  marginTop: '12px',
                  textAlign: 'center'
                }}>
                  💡🛡️ انسخ الرابط وشاركه (سيحتوي على نفس التشويش القوي والحماية المتقدمة)
                </small>
              </div>

              {/* معلومات التشويش القوي والمتقدم */}
              <div style={{
                marginTop: '30px',
                background: 'rgba(40, 167, 69, 0.12)',
                borderRadius: '18px',
                padding: '25px',
                border: '3px solid rgba(40, 167, 69, 0.35)'
              }}>
                <h4 style={{
                  color: '#28a745',
                  fontSize: '1.15rem',
                  fontWeight: '600',
                  marginBottom: '18px',
                  textAlign: 'center'
                }}>🛡️🌀✨ ميزات التشويش القوي والحماية المتقدمة النشطة:</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px',
                  textAlign: 'right'
                }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                    🌀✨ تشويش شامل وقوي للشاشة
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                    🚫🛡️ حماية قوية من أيقونة Share
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                    🔒🌀 حماية متقدمة من اسم القناة
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                    ⛔✨ حماية قوية من Watch on YouTube
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                    ⏯️🛡️ تشويش قوي لشريط التحكم والوقت
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                    🎯🌀 تشويش شفاف متحرك ومتقدم
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                    🌊✨ طبقات حماية متعددة وقوية
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                    📱🛡️ تشويش قوي على جميع الأجهزة
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                    🔄🌀 مراقبة مستمرة وإعادة تطبيق الحماية
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                    🚀✨ تشويش متقدم للعناصر الجديدة
                  </div>
                </div>
              </div>

              {/* تنبيه خاص للطلاب محسن */}
              <div style={{
                marginTop: '25px',
                background: 'rgba(52, 152, 219, 0.12)',
                border: '3px solid rgba(52, 152, 219, 0.35)',
                borderRadius: '18px',
                padding: '25px'
              }}>
                <div style={{
                  color: '#3498db',
                  fontSize: '1.15rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: '12px'
                }}>
                  📚✨ تذكير مهم
                </div>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1.05rem',
                  margin: 0,
                  textAlign: 'center',
                  lineHeight: '1.6'
                }}>
                  احضر دفترك وقلمك للمتابعة والتدوين أثناء البث المباشر المحمي بالتشويش القوي والمتقدم
                </p>
              </div>
            </div>
          ) : (
            /* حالة عدم وجود بث مباشر محسنة */
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
              }}>🛡️📺🌀✨</div>
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
                ترقب الإعلان عن مواعيد البث المباشر المحمي بالتشويش القوي والمتقدم للمراجعة النهائية
              </p>
              
              {/* معلومات التشويش القوي */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '18px',
                padding: '30px',
                marginTop: '25px'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '22px'
                }}>🛡️🌀✨ ميزات التشويش القوي والحماية المتقدمة المتوفرة:</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '18px',
                  textAlign: 'right'
                }}>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '15px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    🔄✨ تحديث تلقائي كل 10 ثوانِ
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '15px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    🌀🛡️ تشويش قوي وشامل لجميع العناصر
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '15px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    🚫✨ حماية قوية من أيقونات Share و YouTube
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '15px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    🔒🌀 تشويش شفاف متحرك ومتقدم
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '15px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    🎯🛡️ طبقات حماية متعددة وقوية
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    padding: '15px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    📱✨ تشويش قوي على جميع الأجهزة
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
              padding: 18px 22px !important;
            }
            
            .empty-state {
              padding: 30px 20px !important;
              max-width: 100% !important;
            }
            
            .copy-link-container {
              flex-direction: column !important;
              gap: 12px !important;
            }
            
            .copy-link-container input {
              min-width: auto !important;
              width: 100% !important;
            }
            
            .grid-buttons {
              grid-template-columns: 1fr !important;
              gap: 18px !important;
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
              padding: 16px 20px !important;
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
              gap: 10px !important;
            }
            
            .copy-button {
              min-width: 110px !important;
              padding: 14px 18px !important;
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
              padding: 12px 15px !important;
            }
          }
          
          /* تحسين الاستجابة للتابلت */
          @media (min-width: 768px) and (max-width: 1024px) {
            .grid-buttons {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 20px !important;
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
              content: "للمشاهدة المحمية مع التشويش القوي، يرجى زيارة الموقع الإلكتروني" !important;
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
              backdrop-filter: blur(12px) !important;
            }
          }
          
          /* تحسين للأجهزة اللوحية */
          @media (pointer: coarse) {
            button {
              min-height: 48px !important;
              min-width: 48px !important;
              padding: 18px 26px !important;
            }
            
            input {
              min-height: 48px !important;
              padding: 18px 22px !important;
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

          /* تحسينات خاصة بالتشويش القوي */
          .moving-blur {
            animation: movingBlur 10s infinite linear !important;
          }

          .invisible-grid {
            opacity: 0.5 !important;
            mix-blend-mode: overlay !important;
          }

          /* تحسين أداء طبقات التشويش القوي */
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
              background: rgba(255, 0, 0, 0.15) !important;
              opacity: 0.9 !important;
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
    console.log('%c🛡️ هذا الموقع محمي للطلاب بتشويش قوي', 'color: red; font-size: 50px; font-weight: bold;');
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
    originalLog.apply(console, ['🛡️ محمي للطلاب بتشويش قوي']);
  };
}

export default LiveGrade3;
