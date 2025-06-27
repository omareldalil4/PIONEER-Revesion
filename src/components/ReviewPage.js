// src/components/ReviewPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ReviewPage({ studentName = "الطالب" }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #c31432, #8e0000, #240b36)',
        backgroundAttachment: 'fixed',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        paddingTop: '100px', // مساحة للنافبار
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Welcome Box - متوسط دائماً */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          margin: '0 auto 40px auto',
          padding: '25px 35px',
          borderRadius: '20px',
          maxWidth: '600px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          animation: 'slideInUp 0.6s ease-out',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, rgba(195, 20, 50, 0.1), rgba(142, 0, 0, 0.05))',
            borderRadius: '50%',
            zIndex: 0
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-30%',
            left: '-10%',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(135deg, rgba(195, 20, 50, 0.05), rgba(142, 0, 0, 0.1))',
            borderRadius: '50%',
            zIndex: 0
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              background: 'linear-gradient(135deg, #c31432, #8e0000)',
              color: 'white',
              padding: '15px 25px',
              borderRadius: '25px',
              fontSize: '1.2rem',
              fontWeight: '700',
              marginBottom: '15px',
              display: 'inline-block',
              boxShadow: '0 8px 25px rgba(195, 20, 50, 0.3)',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              lineHeight: '1.4'
            }}>
              <div>👋 مرحباً بك</div>
              <div style={{ marginTop: '5px' }}>{studentName}</div>
            </div>
            <p style={{
              color: '#2c3e50',
              fontSize: '1.1rem',
              fontWeight: '500',
              margin: '10px 0 0 0',
              lineHeight: '1.5'
            }}>
              أهلاً وسهلاً بك في منصة المراجعة الشاملة
            </p>
          </div>
        </div>

        {/* Main Title Section */}
        <div style={{
          textAlign: 'center',
          padding: '20px 20px 40px 20px',
          color: 'white',
          maxWidth: '800px',
          width: '100%'
        }}>
          <div style={{
            fontSize: '5rem',
            marginBottom: '20px',
            animation: 'float 3s ease-in-out infinite',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
          }}>
            🎓
          </div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '15px',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(135deg, #fff, #f8f9fa)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'slideInUp 0.8s ease-out 0.2s both'
          }}>
            مراجعة الصف الثالث الثانوي
          </h1>
        </div>

        {/* Content Boxes */}
        <div style={{
          maxWidth: '1400px', // زيادة العرض الأقصى
          width: '100%',
          padding: '20px 20px 50px 20px'
        }}>
          <div className="content-boxes-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', // زيادة الحد الأدنى للعرض
            gap: '50px', // زيادة المسافة بين البوكسات
            direction: 'rtl',
            justifyItems: 'center'
          }}>
            {/* بوكس الفيديوهات */}
            <div
              onClick={() => handleNavigate('/videos')}
              className="content-box"
              style={{
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                animation: 'slideInUp 0.6s ease-out 0.6s both',
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
              <img 
                src="/ContentPages/videos.png" 
                alt="فيديوهات المراجعة"
                style={{
                  width: '100%',
                  maxWidth: '400px', // زيادة الحجم من 320px إلى 400px
                  height: 'auto',
                  borderRadius: '25px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.4s ease',
                  border: '3px solid rgba(255, 255, 255, 0.8)'
                }}
                onError={(e) => {
                  e.target.style.display = 'block';
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgcng9IjI1Ii8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I2MzMTQzMiIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4ZTAwMDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8dGV4dCB4PSIyMDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+2YHZitiv2YrZiNmH2KfYqiDYp9mE2YXYsdin2KzYudipPC90ZXh0Pgo8L3N2Zz4K';
                }}
              />
            </div>

            {/* بوكس الملفات */}
            <div
              onClick={() => handleNavigate('/files')}
              className="content-box"
              style={{
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                animation: 'slideInUp 0.6s ease-out 0.8s both',
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
              <img 
                src="/ContentPages/files.png" 
                alt="ملفات الدراسة"
                style={{
                  width: '100%',
                  maxWidth: '400px', // زيادة الحجم من 320px إلى 400px
                  height: 'auto',
                  borderRadius: '25px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.4s ease',
                  border: '3px solid rgba(255, 255, 255, 0.8)'
                }}
                onError={(e) => {
                  e.target.style.display = 'block';
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgcng9IjI1Ii8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwYjg5NCIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMGEwODUiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8dGV4dCB4PSIyMDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+2YXZhNmB2KfYqiDYp9mE2K/Ysdin2LPYqTwvdGV4dD4KPC9zdmc+Cg==';
                }}
              />
            </div>

            {/* بوكس البث المباشر */}
            <div
              onClick={() => handleNavigate('/live')}
              className="content-box"
              style={{
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                animation: 'slideInUp 0.6s ease-out 1s both',
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
              {/* نقطة البث المباشر */}
              <div className="pulse-dot" style={{
                position: 'absolute',
                top: '25px', // زيادة المسافة
                right: '25px', // زيادة المسافة
                width: '20px', // زيادة الحجم
                height: '20px', // زيادة الحجم
                backgroundColor: '#e74c3c',
                borderRadius: '50%',
                animation: 'pulse 1.5s infinite',
                boxShadow: '0 0 0 8px rgba(231, 76, 60, 0.3)', // زيادة الظل
                zIndex: 10,
                border: '3px solid white'
              }}></div>
              
              <img 
                src="/ContentPages/live.png" 
                alt="البث المباشر"
                style={{
                  width: '100%',
                  maxWidth: '400px', // زيادة الحجم من 320px إلى 400px
                  height: 'auto',
                  borderRadius: '25px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.4s ease',
                  border: '3px solid rgba(255, 255, 255, 0.8)'
                }}
                onError={(e) => {
                  e.target.style.display = 'block';
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgcng9IjI1Ii8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I2U3NGMzYyIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNjMDM5MmIiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8dGV4dCB4PSIyMDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+2KfZhNio2K8g2KfZhNmF2KjYp9i02LEgPC90ZXh0Pgo8L3N2Zz4K';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { 
              opacity: 1; 
              transform: scale(1);
            }
            50% { 
              opacity: 0.5; 
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
          
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px); 
            }
            50% { 
              transform: translateY(-10px); 
            }
          }
          
          /* تحسين للشاشات الكبيرة */
          @media (min-width: 1200px) {
            .content-boxes-grid {
              max-width: 1300px !important;
              margin: 0 auto !important;
              gap: 60px !important;
            }
          }
          
          @media (min-width: 1400px) {
            .content-boxes-grid {
              max-width: 1400px !important;
              gap: 70px !important;
            }
          }
          
          /* تحسين الاستجابة للموبايل */
          @media (max-width: 768px) {
            .content-boxes-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
              padding: 15px 15px 40px 15px !important;
            }
            
            .content-box img {
              max-width: 370px !important; /* زيادة حجم الصور للموبايل */
            }
            
            .welcome-box {
              margin: 0 15px 35px 15px !important;
              padding: 20px 25px !important;
              width: calc(100% - 30px) !important;
            }
            
            .main-container {
              padding-top: 110px !important;
            }
            
            .welcome-title {
              font-size: 1rem !important;
              padding: 12px 20px !important;
            }
            
            .welcome-text {
              font-size: 1rem !important;
            }
            
            .main-title {
              padding: 30px 15px !important;
            }
            
            .main-title h1 {
              font-size: 2.2rem !important;
            }
            
            .main-title p {
              font-size: 1.2rem !important;
            }
            
            .graduation-cap {
              font-size: 4rem !important;
              margin-bottom: 15px !important;
            }
            
            .pulse-dot {
              width: 18px !important;
              height: 18px !important;
              top: 20px !important;
              right: 20px !important;
            }
          }
          
          @media (max-width: 480px) {
            .content-boxes-grid {
              gap: 35px !important;
              padding: 10px 10px 35px 10px !important;
            }
            
            .content-box img {
              max-width: 340px !important;
            }
            
            .welcome-box {
              margin: 0 10px 30px 10px !important;
              padding: 15px 20px !important;
              width: calc(100% - 20px) !important;
            }
            
            .main-container {
              padding-top: 120px !important;
            }
            
            .welcome-title {
              font-size: 0.9rem !important;
              padding: 10px 15px !important;
            }
            
            .welcome-text {
              font-size: 0.9rem !important;
            }
            
            .main-title {
              padding: 25px 10px !important;
            }
            
            .main-title h1 {
              font-size: 1.8rem !important;
            }
            
            .main-title p {
              font-size: 1rem !important;
            }
            
            .graduation-cap {
              font-size: 3.5rem !important;
              margin-bottom: 12px !important;
            }
            
            .pulse-dot {
              width: 16px !important;
              height: 16px !important;
              top: 18px !important;
              right: 18px !important;
            }
          }
          
          @media (max-width: 360px) {
            .content-boxes-grid {
              gap: 30px !important;
              padding: 8px 8px 30px 8px !important;
            }
            
            .content-box img {
              max-width: 310px !important;
            }
            
            .welcome-box {
              margin: 0 8px 25px 8px !important;
              padding: 12px 15px !important;
              width: calc(100% - 16px) !important;
            }
            
            .main-container {
              padding-top: 125px !important;
            }
            
            .welcome-title {
              font-size: 0.8rem !important;
              padding: 8px 12px !important;
            }
            
            .welcome-text {
              font-size: 0.8rem !important;
            }
            
            .main-title h1 {
              font-size: 1.6rem !important;
            }
            
            .main-title p {
              font-size: 0.9rem !important;
            }
            
            .graduation-cap {
              font-size: 3rem !important;
            }
            
            .pulse-dot {
              width: 14px !important;
              height: 14px !important;
              top: 15px !important;
              right: 15px !important;
            }
          }
          
          /* تحسين للتابلت */
          @media (min-width: 768px) and (max-width: 1024px) {
            .content-boxes-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 45px !important;
            }
            
            .content-box:last-child {
              grid-column: 1 / -1 !important;
              justify-self: center !important;
            }
            
            .content-box img {
              max-width: 380px !important;
            }
          }
          
          /* تحسين للشاشات المتوسطة */
          @media (min-width: 992px) and (max-width: 1199px) {
            .content-boxes-grid {
              gap: 45px !important;
            }
            
            .content-box img {
              max-width: 380px !important;
            }
          }
          
          /* تحسين التركيز للوصولية */
          .content-box:focus {
            outline: 3px solid rgba(255, 255, 255, 0.5);
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
          
          /* تحسين التباين للرؤية */
          @media (prefers-contrast: high) {
            .welcome-box {
              border: 3px solid #000 !important;
            }
            
            .content-box img {
              border: 4px solid #000 !important;
            }
          }
          
          /* تحسين للطباعة */
          @media print {
            .content-boxes-grid {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
            
            .content-box img {
              max-width: 300px !important;
            }
          }
        `}
      </style>
    </>
  );
}

export default ReviewPage;
