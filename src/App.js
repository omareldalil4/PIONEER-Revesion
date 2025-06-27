// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarCustom from './components/NavbarCustom';
import AdminApprovalPanel from './components/AdminApprovalPanel';
import AdminContentManagement from './components/AdminContentManagement';
import ReviewPage from './components/ReviewPage';
import VideosGrade3 from './contents/grade3/VideosGrade3';
import FilesGrade3 from './contents/grade3/FilesGrade3';
import LiveGrade3 from './contents/grade3/LiveGrade3';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // إعدادات GitHub المصححة
  const REPO_OWNER = 'omareldalil24';
  const REPO_NAME = 'PIONEER';
  const REGISTRATIONS_FILE_PATH = 'public/trash/control/registrations.json';

  // دالة للتحقق من موافقة الطالب من GitHub
  const checkStudentApprovalFromGitHub = async (studentName) => {
    try {
      console.log('🔍 جاري البحث عن الطالب:', studentName);
      
      const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${REGISTRATIONS_FILE_PATH}?${Date.now()}`);
      
      if (!response.ok) {
        console.log('❌ فشل في جلب ملف البيانات');
        return null;
      }
      
      const data = await response.json();
      console.log('📊 البيانات المجلبة:', data);
      
      const approvedStudents = data.approvedStudents || [];
      console.log('👥 الطلاب المقبولين:', approvedStudents);
      
      const foundStudent = approvedStudents.find(student => {
        const studentNameLower = student.name.toLowerCase().trim();
        const searchNameLower = studentName.toLowerCase().trim();
        console.log(`🔎 مقارنة: "${studentNameLower}" مع "${searchNameLower}"`);
        return studentNameLower === searchNameLower;
      });
      
      if (foundStudent) {
        console.log('✅ تم العثور على الطالب:', foundStudent);
      } else {
        console.log('❌ لم يتم العثور على الطالب');
        console.log('📋 الأسماء المتاحة:', approvedStudents.map(s => s.name));
      }
      
      return foundStudent;
    } catch (error) {
      console.error('💥 خطأ في التحقق من موافقة الطالب:', error);
      return null;
    }
  };

  // التحقق من المستخدم المسجل
  useEffect(() => {
    const checkLoggedInUser = () => {
      const storedUser = localStorage.getItem('currentUser');
      
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          console.log('👤 مستخدم محفوظ:', user);
          setCurrentUser(user);
        } catch (error) {
          console.error('خطأ في قراءة بيانات المستخدم المحفوظة:', error);
          localStorage.removeItem('currentUser');
        }
      }
      
      setLoadingUser(false);
    };

    checkLoggedInUser();
  }, []);

  // دالة تسجيل الدخول للأدمن
  const handleAdminLogin = (username, password) => {
    console.log('🔐 محاولة تسجيل دخول أدمن:', username);
    
    if (username === 'admin' && password === 'admin123') {
      const adminUser = { username: 'admin', isAdmin: true };
      setCurrentUser(adminUser);
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      console.log('✅ تم تسجيل دخول الأدمن بنجاح');
      return true;
    }
    
    console.log('❌ بيانات الأدمن غير صحيحة');
    return false;
  };

  // دالة تسجيل دخول الطالب
  const handleStudentLogin = async (studentName) => {
    console.log('🎓 محاولة تسجيل دخول طالب:', studentName);
    
    const approvedStudent = await checkStudentApprovalFromGitHub(studentName);
    
    if (approvedStudent) {
      const studentUser = { 
        username: studentName, 
        isStudent: true,
        id: approvedStudent.id 
      };
      setCurrentUser(studentUser);
      localStorage.setItem('currentUser', JSON.stringify(studentUser));
      console.log('✅ تم تسجيل دخول الطالب بنجاح');
      return true;
    }
    
    console.log('❌ الطالب غير مقبول أو غير موجود');
    return false;
  };

  // مكوّن تسجيل الدخول للطلاب
  function SimpleLogin() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isLogging, setIsLogging] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsLogging(true);

      console.log('📝 محاولة تسجيل دخول طالب:', username);

      try {
        const success = await handleStudentLogin(username);
        if (!success) {
          setError(`❌ الطالب "${username}" غير موجود في قائمة المقبولين.\n\n🔍 تأكد من كتابة الاسم بالضبط كما قدمته أو تواصل مع الإدارة.`);
        }
      } catch (error) {
        console.error('خطأ في تسجيل الدخول:', error);
        setError('💥 حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
      } finally {
        setIsLogging(false);
      }
    };

    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif"
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          padding: '40px',
          maxWidth: '450px',
          width: '100%',
          direction: 'rtl',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: 'slideInUp 0.6s ease-out'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '15px'
            }}>
              🎓
            </div>
            <h2 style={{ 
              color: '#2c3e50',
              fontWeight: '700',
              fontSize: '2rem',
              marginBottom: '10px'
            }}>
              تسجيل دخول الطلاب
            </h2>
            <p style={{ 
              color: '#7f8c8d', 
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '0'
            }}>
              أدخل اسمك للوصول للمراجعة
            </p>
          </div>

          {error && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.9), rgba(192, 57, 43, 0.9))',
              color: 'white',
              padding: '18px',
              borderRadius: '12px',
              marginBottom: '25px',
              textAlign: 'center',
              whiteSpace: 'pre-line',
              fontSize: '14px',
              lineHeight: '1.5',
              fontWeight: '600',
              boxShadow: '0 8px 25px rgba(231, 76, 60, 0.3)',
              animation: 'slideInUp 0.4s ease-out'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>
                🎓 اسم الطالب:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسمك الكامل كما قدمته تماماً"
                required
                disabled={isLogging}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(195, 20, 50, 0.2)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '16px',
                  textAlign: 'right',
                  boxSizing: 'border-box',
                  opacity: isLogging ? 0.6 : 1,
                  direction: 'rtl',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#c31432';
                  e.target.style.background = 'rgba(255, 255, 255, 1)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(195, 20, 50, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(195, 20, 50, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                }}
              />
              <small style={{ 
                color: '#7f8c8d', 
                fontSize: '13px', 
                display: 'block', 
                marginTop: '8px',
                fontWeight: '500'
              }}>
                ⚠️ اكتب اسمك بالضبط كما قدمته في طلب التسجيل
              </small>
            </div>

            <button
              type="submit"
              disabled={isLogging}
              style={{
                width: '100%',
                padding: '18px',
                background: isLogging ? 
                  'linear-gradient(135deg, #6c757d, #5a6268)' : 
                  'linear-gradient(135deg, #c31432, #8e0000)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                fontSize: '1.2rem',
                fontWeight: '700',
                cursor: isLogging ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isLogging ? 0.7 : 1,
                boxShadow: '0 8px 25px rgba(195, 20, 50, 0.3)',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                if (!isLogging) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 30px rgba(195, 20, 50, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLogging) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(195, 20, 50, 0.3)';
                }
              }}
            >
              {isLogging ? (
                <>
                  <span style={{ 
                    display: 'inline-block',
                    width: '22px',
                    height: '22px',
                    border: '3px solid #ffffff',
                    borderTop: '3px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginLeft: '12px'
                  }}></span>
                  جاري التحقق...
                </>
              ) : (
                '🚀 تسجيل الدخول'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // مكوّن صفحة تسجيل دخول الأدمن
  function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogging, setIsLogging] = useState(false);

    const handleAdminSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsLogging(true);

      console.log('🔐 محاولة تسجيل دخول أدمن:', username);

      try {
        if (handleAdminLogin(username, password)) {
          // تم تسجيل الدخول بنجاح، سيتم التوجيه تلقائياً
        } else {
          setError('❌ بيانات الأدمن غير صحيحة');
        }
      } catch (error) {
        console.error('خطأ في تسجيل الدخول:', error);
        setError('💥 حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
      } finally {
        setIsLogging(false);
      }
    };

    // إذا كان المستخدم أدمن بالفعل، وجهه للوحة التحكم
    if (currentUser && currentUser.isAdmin) {
      return <Navigate to="/admin-dashboard" replace />;
    }

    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif"
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          padding: '40px',
          maxWidth: '450px',
          width: '100%',
          direction: 'rtl',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: 'slideInUp 0.6s ease-out'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '15px'
            }}>
              🛡️
            </div>
            <h2 style={{ 
              color: '#2c3e50',
              fontWeight: '700',
              fontSize: '2rem',
              marginBottom: '10px'
            }}>
              تسجيل دخول الأدمن
            </h2>
            <p style={{ 
              color: '#7f8c8d', 
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '0'
            }}>
              أدخل بيانات الأدمن للوصول للوحة التحكم
            </p>
          </div>

          {error && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.9), rgba(192, 57, 43, 0.9))',
              color: 'white',
              padding: '18px',
              borderRadius: '12px',
              marginBottom: '25px',
              textAlign: 'center',
              whiteSpace: 'pre-line',
              fontSize: '14px',
              lineHeight: '1.5',
              fontWeight: '600',
              boxShadow: '0 8px 25px rgba(231, 76, 60, 0.3)',
              animation: 'slideInUp 0.4s ease-out'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleAdminSubmit}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>
                👤 اسم المستخدم:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                required
                disabled={isLogging}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(195, 20, 50, 0.2)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '16px',
                  textAlign: 'right',
                  boxSizing: 'border-box',
                  opacity: isLogging ? 0.6 : 1,
                  direction: 'rtl',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>
                🔒 كلمة المرور:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                required
                disabled={isLogging}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(195, 20, 50, 0.2)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '16px',
                  textAlign: 'right',
                  boxSizing: 'border-box',
                  opacity: isLogging ? 0.6 : 1,
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLogging}
              style={{
                width: '100%',
                padding: '18px',
                background: isLogging ? 
                  'linear-gradient(135deg, #6c757d, #5a6268)' : 
                  'linear-gradient(135deg, #c31432, #8e0000)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                fontSize: '1.2rem',
                fontWeight: '700',
                cursor: isLogging ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isLogging ? 0.7 : 1,
                boxShadow: '0 8px 25px rgba(195, 20, 50, 0.3)',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              {isLogging ? (
                <>
                  <span style={{ 
                    display: 'inline-block',
                    width: '22px',
                    height: '22px',
                    border: '3px solid #ffffff',
                    borderTop: '3px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginLeft: '12px'
                  }}></span>
                  جاري التحقق...
                </>
              ) : (
                '🛡️ دخول لوحة التحكم'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // مكوّن حماية للمسارات
  function ProtectedRoute({ children, requireAdmin = false }) {
    if (loadingUser) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              borderTop: '4px solid #c31432',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 25px'
            }}></div>
            <h3 style={{ 
              fontWeight: '700', 
              fontSize: '1.8rem',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>🔄 جاري التحميل...</h3>
          </div>
        </div>
      );
    }

    if (!currentUser) {
      console.log('🚫 لا يوجد مستخدم، إعادة توجيه لتسجيل الدخول');
      return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !currentUser.isAdmin) {
      console.log('🚫 مطلوب صلاحيات أدمن، إعادة توجيه لتسجيل الدخول');
      return <Navigate to="/admin" replace />;
    }

    if (!requireAdmin && currentUser.isAdmin) {
      console.log('📊 أدمن، إعادة توجيه للوحة التحكم');
      return <Navigate to="/admin-dashboard" replace />;
    }

    return children;
  }

  if (loadingUser) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid #c31432',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 25px'
          }}></div>
          <h3 style={{ 
            fontWeight: '700', 
            fontSize: '1.8rem',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>⚡ بدء التطبيق...</h3>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {/* النافبار ثابت في كل الصفحات */}
      <NavbarCustom currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <Routes>
        {/* الصفحة الرئيسية - تسجيل الدخول */}
        <Route path="/" element={
          currentUser ? (
            currentUser.isAdmin ? (
              <Navigate to="/admin-dashboard" replace />
            ) : (
              <Navigate to="/review" replace />
            )
          ) : (
            <SimpleLogin />
          )
        } />

        {/* صفحة تسجيل الدخول للطلاب */}
        <Route path="/login" element={
          currentUser ? (
            currentUser.isAdmin ? (
              <Navigate to="/admin-dashboard" replace />
            ) : (
              <Navigate to="/review" replace />
            )
          ) : (
            <SimpleLogin />
          )
        } />

        {/* صفحة المراجعة للطلاب - الصفحة الرئيسية مع البوكسات الثلاثة */}
        <Route path="/review" element={
          <ProtectedRoute>
            <ReviewPage studentName={currentUser?.username} />
          </ProtectedRoute>
        } />

        {/* صفحة الفيديوهات */}
        <Route path="/videos" element={
          <ProtectedRoute>
            <VideosGrade3 />
          </ProtectedRoute>
        } />

        {/* صفحة الملفات */}
        <Route path="/files" element={
          <ProtectedRoute>
            <FilesGrade3 />
          </ProtectedRoute>
        } />

        {/* صفحة البث المباشر */}
        <Route path="/live" element={
          <ProtectedRoute>
            <LiveGrade3 />
          </ProtectedRoute>
        } />

        {/* صفحة تسجيل دخول الأدمن */}
        <Route path="/admin" element={<AdminLoginPage />} />

        {/* لوحة تحكم الأدمن - إدارة الطلبة */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminApprovalPanel />
          </ProtectedRoute>
        } />

        {/* إدارة المحتوى للأدمن */}
        <Route path="/admin-content" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminContentManagement />
          </ProtectedRoute>
        } />

        {/* أي مسار غير معروف */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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
        `}
      </style>
    </Router>
  );
}

export default App;
