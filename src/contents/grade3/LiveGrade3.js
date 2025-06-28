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
