<<<<<<< HEAD
// src/components/NavbarCustom.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './NavbarCustom.css';

import logo from '../assets/aa.png';
import logo2 from '../assets/logo3.png';

function NavbarCustom({ currentUser, setCurrentUser }) {
  // دالة تسجيل الخروج
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    // مسح البيانات المؤقتة عند تسجيل الخروج
    localStorage.removeItem('tempRegistrations');
  };

  // نمط للبوردر الخاص بالصور
  const logoStyle = {
    width: '95px',
    height: 'auto',
    marginRight: '15px',
    transition: 'all 0.3s ease',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
  };

  const buttonStyle = {
    borderRadius: '25px',
    fontWeight: '600',
    padding: '10px 24px',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    border: '2px solid',
    marginLeft: '12px',
    fontSize: '14px',
    textTransform: 'none',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <>
      <Navbar 
        className="navbar-custom" 
        expand="lg" 
        fixed="top"
        style={{ 
          background: '#ffffff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          border: 'none',
          direction: 'ltr',
          padding: '10px 0',
          zIndex: 1030,
          borderRadius: '0 0 25px 25px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%'
        }}
      >
        <Container style={{ direction: 'ltr' }}>
          {/* الشعاران - في الجانب الأيسر */}
          <Navbar.Brand as={Link} to="/" style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginRight: 'auto',
            order: 1
          }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                ...logoStyle,
                marginRight: '10px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.08) rotate(2deg)';
                e.target.style.filter = 'drop-shadow(0 6px 20px rgba(195, 20, 50, 0.3))';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))';
              }}
            />
            <img
              src={logo2}
              alt="Second Logo"
              style={{
                ...logoStyle,
                width: '160px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05) rotate(-1deg)';
                e.target.style.filter = 'drop-shadow(0 6px 20px rgba(195, 20, 50, 0.3))';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))';
              }}
            />
          </Navbar.Brand>

          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            style={{ 
              order: 2,
              border: '2px solid rgba(195, 20, 50, 0.3)',
              borderRadius: '8px',
              padding: '8px 12px',
              background: 'rgba(195, 20, 50, 0.05)',
              color: '#c31432',
              position: 'relative',
              zIndex: 1031
            }} 
          />
          
          <Navbar.Collapse id="basic-navbar-nav" style={{ order: 3 }}>
            <Nav className="ms-auto" style={{ 
              alignItems: 'center',
              direction: 'ltr'
            }}>
              {currentUser ? (
                <>
                  {/* ترحيب بالمستخدم */}
                  <div style={{
                    background: 'linear-gradient(135deg, #c31432, #8e0000)',
                    color: 'white',
                    padding: '10px 18px',
                    borderRadius: '20px',
                    marginLeft: '15px',
                    fontSize: '14px',
                    fontWeight: '600',
                    boxShadow: '0 6px 20px rgba(195, 20, 50, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                    marginBottom: '8px',
                    marginTop: '8px'
                  }}>
                    👋 أهلاً {currentUser.isAdmin ? 'Admin' : currentUser.username}
                  </div>

                  {/* أزرار التنقل حسب نوع المستخدم */}
                  {currentUser.isAdmin && (
                    <>
                      <Button
                        variant="outline-primary"
                        as={Link}
                        to="/admin-dashboard"
                        style={{
                          ...buttonStyle,
                          borderColor: '#c31432',
                          color: '#c31432',
                          background: 'rgba(195, 20, 50, 0.05)',
                          marginBottom: '8px',
                          marginTop: '8px',
                          width: 'auto',
                          minWidth: '140px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, #c31432, #8e0000)';
                          e.target.style.color = 'white';
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.borderColor = '#c31432';
                          e.target.style.boxShadow = '0 8px 25px rgba(195, 20, 50, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(195, 20, 50, 0.05)';
                          e.target.style.color = '#c31432';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.borderColor = '#c31432';
                          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        👥 إدارة الطلبة
                      </Button>

                      <Button
                        variant="outline-success"
                        as={Link}
                        to="/admin-content"
                        style={{
                          ...buttonStyle,
                          borderColor: '#00b894',
                          color: '#00b894',
                          background: 'rgba(0, 184, 148, 0.05)',
                          marginBottom: '8px',
                          marginTop: '8px',
                          width: 'auto',
                          minWidth: '140px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
                          e.target.style.color = 'white';
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.borderColor = '#00b894';
                          e.target.style.boxShadow = '0 8px 25px rgba(0, 184, 148, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(0, 184, 148, 0.05)';
                          e.target.style.color = '#00b894';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.borderColor = '#00b894';
                          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        🎛️ إدارة المحتوى
                      </Button>
                    </>
                  )}

                  {currentUser.isStudent && (
                    <Button
                      variant="outline-success"
                      as={Link}
                      to="/review"
                      style={{
                        ...buttonStyle,
                        borderColor: '#00b894',
                        color: '#00b894',
                        background: 'rgba(0, 184, 148, 0.05)',
                        marginBottom: '8px',
                        marginTop: '8px',
                        width: 'auto',
                        minWidth: '140px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
                        e.target.style.color = 'white';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.borderColor = '#00b894';
                        e.target.style.boxShadow = '0 8px 25px rgba(0, 184, 148, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(0, 184, 148, 0.05)';
                        e.target.style.color = '#00b894';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.borderColor = '#00b894';
                        e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      📚 المراجعة
                    </Button>
                  )}

                  {/* زر تسجيل الخروج */}
                  <Button 
                    variant="outline-danger" 
                    onClick={handleLogout}
                    style={{
                      ...buttonStyle,
                      borderColor: '#e74c3c',
                      color: '#e74c3c',
                      background: 'rgba(231, 76, 60, 0.05)',
                      marginBottom: '8px',
                      marginTop: '8px',
                      width: 'auto',
                      minWidth: '140px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.borderColor = '#e74c3c';
                      e.target.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(231, 76, 60, 0.05)';
                      e.target.style.color = '#e74c3c';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.borderColor = '#e74c3c';
                      e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    🚪 تسجيل خروج
                  </Button>
                </>
              ) : (
                <>
                  {/* أزرار للمستخدمين غير المسجلين */}
                  <Button
                    variant="outline-primary"
                    as={Link}
                    to="/register"
                    style={{
                      ...buttonStyle,
                      borderColor: '#c31432',
                      color: '#c31432',
                      background: 'rgba(195, 20, 50, 0.05)',
                      marginBottom: '8px',
                      marginTop: '8px',
                      width: 'auto',
                      minWidth: '120px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #c31432, #8e0000)';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.borderColor = '#c31432';
                      e.target.style.boxShadow = '0 8px 25px rgba(195, 20, 50, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(195, 20, 50, 0.05)';
                      e.target.style.color = '#c31432';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.borderColor = '#c31432';
                      e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    📝 سجل الآن
                  </Button>
                  
                  <Button
                    variant=""
                    style={{ 
                      ...buttonStyle,
                      background: 'linear-gradient(135deg, #c31432, #8e0000)', 
                      color: '#fff',
                      borderColor: '#c31432',
                      boxShadow: '0 6px 20px rgba(195, 20, 50, 0.3)',
                      marginBottom: '8px',
                      marginTop: '8px',
                      width: 'auto',
                      minWidth: '120px'
                    }}
                    as={Link}
                    to="/login"
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #8e0000, #240b36)';
                      e.target.style.borderColor = '#8e0000';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 30px rgba(195, 20, 50, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #c31432, #8e0000)';
                      e.target.style.borderColor = '#c31432';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(195, 20, 50, 0.3)';
                    }}
                  >
                    🔑 دخول
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <style>
        {`
          /* إضافة مسافة للمحتوى تحت النافبار الثابت */
          body {
            padding-top: 0;
            margin-top: 70px;
          }
          
          /* تحسين النافبار */
          .navbar-custom {
            background: #ffffff !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            border-radius: 0 0 25px 25px !important;
            z-index: 1030 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
          }
          
          /* إزالة الخلفية في الأوضاع العادية */
          @media (min-width: 992px) {
            .navbar-collapse {
              background: transparent !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              margin-top: 0 !important;
              border: none !important;
              position: relative !important;
              z-index: auto !important;
            }
          }
          
          /* تحسين القائمة المنسدلة للموبايل فقط */
          @media (max-width: 991.98px) {
            .navbar-collapse {
              background: #ffffff !important;
              border-radius: 0 0 15px 15px !important;
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
              margin-top: 15px !important;
              border-top: 2px solid rgba(195, 20, 50, 0.1) !important;
              position: relative !important;
              z-index: 1029 !important;
              padding: 20px 15px !important;
            }
            
            body {
              margin-top: 75px;
            }
            
            .navbar-custom {
              padding: 8px 0 !important;
            }
            
            .navbar-nav {
              align-items: stretch !important;
              flex-direction: column !important;
              gap: 10px !important;
            }
            
            .navbar-nav > * {
              margin: 0 !important;
              width: 100% !important;
            }
            
            .navbar-nav .btn {
              width: 100% !important;
              margin: 5px 0 !important;
              text-align: center !important;
              justify-content: center !important;
              font-size: 13px !important;
              padding: 10px 16px !important;
            }
            
            .navbar-brand {
              padding: 0 !important;
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
            }
            
            .navbar-brand img {
              width: 60px !important;
              margin-right: 8px !important;
            }
            
            .navbar-brand img:last-child {
              width: 100px !important;
              margin-right: 0 !important;
            }
            
            .user-welcome {
              text-align: center !important;
              margin: 10px 0 !important;
              width: 100% !important;
              font-size: 13px !important;
              padding: 8px 15px !important;
            }
            
            .navbar-toggler {
              padding: 6px 10px !important;
              font-size: 12px !important;
            }
          }
          
          @media (max-width: 767.98px) {
            body {
              margin-top: 80px;
            }
            
            .navbar-custom {
              padding: 6px 0 !important;
              border-radius: 0 0 20px 20px !important;
            }
            
            .navbar-brand {
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
            }
            
            .navbar-brand img {
              width: 50px !important;
              margin-right: 6px !important;
            }
            
            .navbar-brand img:last-child {
              width: 85px !important;
              margin-right: 0 !important;
            }
            
            .navbar-collapse {
              padding: 15px 10px !important;
            }
            
            .navbar-nav .btn {
              font-size: 12px !important;
              padding: 8px 14px !important;
              min-height: 40px !important;
            }
            
            .user-welcome {
              font-size: 12px !important;
              padding: 6px 12px !important;
            }
          }
          
          @media (max-width: 575.98px) {
            body {
              margin-top: 85px;
            }
            
            .navbar-custom {
              padding: 5px 0 !important;
              border-radius: 0 0 18px 18px !important;
            }
            
            .navbar-brand {
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
            }
            
            .navbar-brand img {
              margin: 0 !important;
              margin-right: 5px !important;
              width: 45px !important;
            }
            
            .navbar-brand img:last-child {
              width: 75px !important;
              margin-right: 0 !important;
            }
            
            .btn {
              font-size: 11px !important;
              padding: 6px 12px !important;
              min-width: auto !important;
              min-height: 36px !important;
            }
            
            .navbar-collapse {
              padding: 12px 8px !important;
              margin-top: 10px !important;
            }
            
            .user-welcome {
              font-size: 11px !important;
              padding: 5px 10px !important;
            }
            
            .navbar-toggler {
              padding: 4px 8px !important;
              font-size: 10px !important;
            }
          }
          
          @media (max-width: 480px) {
            body {
              margin-top: 90px;
            }
            
            .navbar-custom {
              border-radius: 0 0 15px 15px !important;
            }
            
            .navbar-brand {
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
            }
            
            .navbar-brand img {
              width: 40px !important;
              margin-right: 4px !important;
            }
            
            .navbar-brand img:last-child {
              width: 65px !important;
              margin-right: 0 !important;
            }
          }
          
          @media (max-width: 360px) {
            body {
              margin-top: 95px;
            }
            
            .navbar-custom {
              padding: 4px 0 !important;
              border-radius: 0 0 12px 12px !important;
            }
            
            .navbar-brand {
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
              gap: 0 !important;
            }
            
            .navbar-brand img {
              width: 35px !important;
              margin: 0 !important;
              margin-right: 3px !important;
            }
            
            .navbar-brand img:last-child {
              width: 55px !important;
              margin-right: 0 !important;
            }
            
            .btn {
              font-size: 10px !important;
              padding: 5px 10px !important;
              min-height: 32px !important;
            }
            
            .navbar-collapse {
              padding: 10px 5px !important;
              margin-top: 8px !important;
            }
            
            .user-welcome {
              font-size: 10px !important;
              padding: 4px 8px !important;
            }
            
            .navbar-toggler {
              padding: 3px 6px !important;
            }
            
            .container {
              padding-left: 8px !important;
              padding-right: 8px !important;
            }
          }
          
          /* تحسين التنقل بالكيبورد */
          .navbar-nav .btn:focus,
          .navbar-brand:focus {
            outline: 3px solid rgba(195, 20, 50, 0.5) !important;
            outline-offset: 2px !important;
          }
          
          /* تحسين النقر على الموبايل */
          @media (pointer: coarse) {
            .btn {
              min-height: 44px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
          }
          
          /* تحسين زر القائمة */
          .navbar-toggler {
            border: 2px solid rgba(195, 20, 50, 0.3) !important;
            border-radius: 8px !important;
            padding: 8px 12px !important;
            background: rgba(195, 20, 50, 0.05) !important;
            position: relative !important;
            z-index: 1031 !important;
          }
          
          .navbar-toggler:focus {
            box-shadow: 0 0 0 3px rgba(195, 20, 50, 0.25) !important;
          }
          
          .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%23c31432' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
          }
          
          /* تحسين الانيميشن */
          .navbar-collapse.collapsing,
          .navbar-collapse.show {
            animation: slideDown 0.3s ease-out;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* تحسين الألوان والتباين */
          @media (prefers-contrast: high) {
            .navbar-custom {
              border-bottom: 4px solid #c31432 !important;
            }
            
            .btn {
              border-width: 3px !important;
            }
          }
          
          /* تحسين للحركة المنخفضة */
          @media (prefers-reduced-motion: reduce) {
            .navbar-collapse {
              animation: none !important;
            }
            
            .btn {
              transition: none !important;
            }
            
            .navbar-brand img {
              transition: none !important;
            }
          }
        `}
      </style>
    </>
  );
}

=======
// src/components/NavbarCustom.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './NavbarCustom.css';

import logo from '../assets/aa.png';
import logo2 from '../assets/logo3.png';

function NavbarCustom({ currentUser, setCurrentUser }) {
  // دالة تسجيل الخروج
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    // مسح البيانات المؤقتة عند تسجيل الخروج
    localStorage.removeItem('tempRegistrations');
  };

  // نمط للبوردر الخاص بالصور
  const logoStyle = {
    width: '95px',
    height: 'auto',
    marginRight: '15px',
    transition: 'all 0.3s ease',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
  };

  const buttonStyle = {
    borderRadius: '25px',
    fontWeight: '600',
    padding: '10px 24px',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    border: '2px solid',
    marginLeft: '12px',
    fontSize: '14px',
    textTransform: 'none',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <>
      <Navbar 
        className="navbar-custom" 
        expand="lg" 
        fixed="top"
        style={{ 
          background: '#ffffff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          border: 'none',
          direction: 'ltr',
          padding: '10px 0',
          zIndex: 1030,
          borderRadius: '0 0 25px 25px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%'
        }}
      >
        <Container style={{ direction: 'ltr' }}>
          {/* الشعاران - في الجانب الأيسر */}
          <Navbar.Brand as={Link} to="/" style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginRight: 'auto',
            order: 1
          }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                ...logoStyle,
                marginRight: '10px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.08) rotate(2deg)';
                e.target.style.filter = 'drop-shadow(0 6px 20px rgba(195, 20, 50, 0.3))';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))';
              }}
            />
            <img
              src={logo2}
              alt="Second Logo"
              style={{
                ...logoStyle,
                width: '160px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05) rotate(-1deg)';
                e.target.style.filter = 'drop-shadow(0 6px 20px rgba(195, 20, 50, 0.3))';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))';
              }}
            />
          </Navbar.Brand>

          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            style={{ 
              order: 2,
              border: '2px solid rgba(195, 20, 50, 0.3)',
              borderRadius: '8px',
              padding: '8px 12px',
              background: 'rgba(195, 20, 50, 0.05)',
              color: '#c31432',
              position: 'relative',
              zIndex: 1031
            }} 
          />
          
          <Navbar.Collapse id="basic-navbar-nav" style={{ order: 3 }}>
            <Nav className="ms-auto" style={{ 
              alignItems: 'center',
              direction: 'ltr'
            }}>
              {currentUser ? (
                <>
                  {/* ترحيب بالمستخدم */}
                  <div style={{
                    background: 'linear-gradient(135deg, #c31432, #8e0000)',
                    color: 'white',
                    padding: '10px 18px',
                    borderRadius: '20px',
                    marginLeft: '15px',
                    fontSize: '14px',
                    fontWeight: '600',
                    boxShadow: '0 6px 20px rgba(195, 20, 50, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                    marginBottom: '8px',
                    marginTop: '8px'
                  }}>
                    👋 أهلاً {currentUser.isAdmin ? 'Admin' : currentUser.username}
                  </div>

                  {/* أزرار التنقل حسب نوع المستخدم */}
                  {currentUser.isAdmin && (
                    <>
                      <Button
                        variant="outline-primary"
                        as={Link}
                        to="/admin-dashboard"
                        style={{
                          ...buttonStyle,
                          borderColor: '#c31432',
                          color: '#c31432',
                          background: 'rgba(195, 20, 50, 0.05)',
                          marginBottom: '8px',
                          marginTop: '8px',
                          width: 'auto',
                          minWidth: '140px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, #c31432, #8e0000)';
                          e.target.style.color = 'white';
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.borderColor = '#c31432';
                          e.target.style.boxShadow = '0 8px 25px rgba(195, 20, 50, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(195, 20, 50, 0.05)';
                          e.target.style.color = '#c31432';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.borderColor = '#c31432';
                          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        👥 إدارة الطلبة
                      </Button>

                      <Button
                        variant="outline-success"
                        as={Link}
                        to="/admin-content"
                        style={{
                          ...buttonStyle,
                          borderColor: '#00b894',
                          color: '#00b894',
                          background: 'rgba(0, 184, 148, 0.05)',
                          marginBottom: '8px',
                          marginTop: '8px',
                          width: 'auto',
                          minWidth: '140px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
                          e.target.style.color = 'white';
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.borderColor = '#00b894';
                          e.target.style.boxShadow = '0 8px 25px rgba(0, 184, 148, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(0, 184, 148, 0.05)';
                          e.target.style.color = '#00b894';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.borderColor = '#00b894';
                          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        🎛️ إدارة المحتوى
                      </Button>
                    </>
                  )}

                  {currentUser.isStudent && (
                    <Button
                      variant="outline-success"
                      as={Link}
                      to="/review"
                      style={{
                        ...buttonStyle,
                        borderColor: '#00b894',
                        color: '#00b894',
                        background: 'rgba(0, 184, 148, 0.05)',
                        marginBottom: '8px',
                        marginTop: '8px',
                        width: 'auto',
                        minWidth: '140px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
                        e.target.style.color = 'white';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.borderColor = '#00b894';
                        e.target.style.boxShadow = '0 8px 25px rgba(0, 184, 148, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(0, 184, 148, 0.05)';
                        e.target.style.color = '#00b894';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.borderColor = '#00b894';
                        e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      📚 المراجعة
                    </Button>
                  )}

                  {/* زر تسجيل الخروج */}
                  <Button 
                    variant="outline-danger" 
                    onClick={handleLogout}
                    style={{
                      ...buttonStyle,
                      borderColor: '#e74c3c',
                      color: '#e74c3c',
                      background: 'rgba(231, 76, 60, 0.05)',
                      marginBottom: '8px',
                      marginTop: '8px',
                      width: 'auto',
                      minWidth: '140px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.borderColor = '#e74c3c';
                      e.target.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(231, 76, 60, 0.05)';
                      e.target.style.color = '#e74c3c';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.borderColor = '#e74c3c';
                      e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    🚪 تسجيل خروج
                  </Button>
                </>
              ) : (
                <>
                  {/* أزرار للمستخدمين غير المسجلين */}
                  <Button
                    variant="outline-primary"
                    as={Link}
                    to="/register"
                    style={{
                      ...buttonStyle,
                      borderColor: '#c31432',
                      color: '#c31432',
                      background: 'rgba(195, 20, 50, 0.05)',
                      marginBottom: '8px',
                      marginTop: '8px',
                      width: 'auto',
                      minWidth: '120px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #c31432, #8e0000)';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.borderColor = '#c31432';
                      e.target.style.boxShadow = '0 8px 25px rgba(195, 20, 50, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(195, 20, 50, 0.05)';
                      e.target.style.color = '#c31432';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.borderColor = '#c31432';
                      e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    📝 سجل الآن
                  </Button>
                  
                  <Button
                    variant=""
                    style={{ 
                      ...buttonStyle,
                      background: 'linear-gradient(135deg, #c31432, #8e0000)', 
                      color: '#fff',
                      borderColor: '#c31432',
                      boxShadow: '0 6px 20px rgba(195, 20, 50, 0.3)',
                      marginBottom: '8px',
                      marginTop: '8px',
                      width: 'auto',
                      minWidth: '120px'
                    }}
                    as={Link}
                    to="/login"
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #8e0000, #240b36)';
                      e.target.style.borderColor = '#8e0000';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 30px rgba(195, 20, 50, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #c31432, #8e0000)';
                      e.target.style.borderColor = '#c31432';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(195, 20, 50, 0.3)';
                    }}
                  >
                    🔑 دخول
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <style>
        {`
          /* إضافة مسافة للمحتوى تحت النافبار الثابت */
          body {
            padding-top: 0;
            margin-top: 70px;
          }
          
          /* تحسين النافبار */
          .navbar-custom {
            background: #ffffff !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            border-radius: 0 0 25px 25px !important;
            z-index: 1030 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
          }
          
          /* إزالة الخلفية في الأوضاع العادية */
          @media (min-width: 992px) {
            .navbar-collapse {
              background: transparent !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              margin-top: 0 !important;
              border: none !important;
              position: relative !important;
              z-index: auto !important;
            }
          }
          
          /* تحسين القائمة المنسدلة للموبايل فقط */
          @media (max-width: 991.98px) {
            .navbar-collapse {
              background: #ffffff !important;
              border-radius: 0 0 15px 15px !important;
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
              margin-top: 15px !important;
              border-top: 2px solid rgba(195, 20, 50, 0.1) !important;
              position: relative !important;
              z-index: 1029 !important;
              padding: 20px 15px !important;
            }
            
            body {
              margin-top: 75px;
            }
            
            .navbar-custom {
              padding: 8px 0 !important;
            }
            
            .navbar-nav {
              align-items: stretch !important;
              flex-direction: column !important;
              gap: 10px !important;
            }
            
            .navbar-nav > * {
              margin: 0 !important;
              width: 100% !important;
            }
            
            .navbar-nav .btn {
              width: 100% !important;
              margin: 5px 0 !important;
              text-align: center !important;
              justify-content: center !important;
              font-size: 13px !important;
              padding: 10px 16px !important;
            }
            
            .navbar-brand {
              padding: 0 !important;
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
            }
            
            .navbar-brand img {
              width: 60px !important;
              margin-right: 8px !important;
            }
            
            .navbar-brand img:last-child {
              width: 100px !important;
              margin-right: 0 !important;
            }
            
            .user-welcome {
              text-align: center !important;
              margin: 10px 0 !important;
              width: 100% !important;
              font-size: 13px !important;
              padding: 8px 15px !important;
            }
            
            .navbar-toggler {
              padding: 6px 10px !important;
              font-size: 12px !important;
            }
          }
          
          @media (max-width: 767.98px) {
            body {
              margin-top: 80px;
            }
            
            .navbar-custom {
              padding: 6px 0 !important;
              border-radius: 0 0 20px 20px !important;
            }
            
            .navbar-brand {
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
            }
            
            .navbar-brand img {
              width: 50px !important;
              margin-right: 6px !important;
            }
            
            .navbar-brand img:last-child {
              width: 85px !important;
              margin-right: 0 !important;
            }
            
            .navbar-collapse {
              padding: 15px 10px !important;
            }
            
            .navbar-nav .btn {
              font-size: 12px !important;
              padding: 8px 14px !important;
              min-height: 40px !important;
            }
            
            .user-welcome {
              font-size: 12px !important;
              padding: 6px 12px !important;
            }
          }
          
          @media (max-width: 575.98px) {
            body {
              margin-top: 85px;
            }
            
            .navbar-custom {
              padding: 5px 0 !important;
              border-radius: 0 0 18px 18px !important;
            }
            
            .navbar-brand {
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
            }
            
            .navbar-brand img {
              margin: 0 !important;
              margin-right: 5px !important;
              width: 45px !important;
            }
            
            .navbar-brand img:last-child {
              width: 75px !important;
              margin-right: 0 !important;
            }
            
            .btn {
              font-size: 11px !important;
              padding: 6px 12px !important;
              min-width: auto !important;
              min-height: 36px !important;
            }
            
            .navbar-collapse {
              padding: 12px 8px !important;
              margin-top: 10px !important;
            }
            
            .user-welcome {
              font-size: 11px !important;
              padding: 5px 10px !important;
            }
            
            .navbar-toggler {
              padding: 4px 8px !important;
              font-size: 10px !important;
            }
          }
          
          @media (max-width: 480px) {
            body {
              margin-top: 90px;
            }
            
            .navbar-custom {
              border-radius: 0 0 15px 15px !important;
            }
            
            .navbar-brand {
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
            }
            
            .navbar-brand img {
              width: 40px !important;
              margin-right: 4px !important;
            }
            
            .navbar-brand img:last-child {
              width: 65px !important;
              margin-right: 0 !important;
            }
          }
          
          @media (max-width: 360px) {
            body {
              margin-top: 95px;
            }
            
            .navbar-custom {
              padding: 4px 0 !important;
              border-radius: 0 0 12px 12px !important;
            }
            
            .navbar-brand {
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
              gap: 0 !important;
            }
            
            .navbar-brand img {
              width: 35px !important;
              margin: 0 !important;
              margin-right: 3px !important;
            }
            
            .navbar-brand img:last-child {
              width: 55px !important;
              margin-right: 0 !important;
            }
            
            .btn {
              font-size: 10px !important;
              padding: 5px 10px !important;
              min-height: 32px !important;
            }
            
            .navbar-collapse {
              padding: 10px 5px !important;
              margin-top: 8px !important;
            }
            
            .user-welcome {
              font-size: 10px !important;
              padding: 4px 8px !important;
            }
            
            .navbar-toggler {
              padding: 3px 6px !important;
            }
            
            .container {
              padding-left: 8px !important;
              padding-right: 8px !important;
            }
          }
          
          /* تحسين التنقل بالكيبورد */
          .navbar-nav .btn:focus,
          .navbar-brand:focus {
            outline: 3px solid rgba(195, 20, 50, 0.5) !important;
            outline-offset: 2px !important;
          }
          
          /* تحسين النقر على الموبايل */
          @media (pointer: coarse) {
            .btn {
              min-height: 44px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
          }
          
          /* تحسين زر القائمة */
          .navbar-toggler {
            border: 2px solid rgba(195, 20, 50, 0.3) !important;
            border-radius: 8px !important;
            padding: 8px 12px !important;
            background: rgba(195, 20, 50, 0.05) !important;
            position: relative !important;
            z-index: 1031 !important;
          }
          
          .navbar-toggler:focus {
            box-shadow: 0 0 0 3px rgba(195, 20, 50, 0.25) !important;
          }
          
          .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%23c31432' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
          }
          
          /* تحسين الانيميشن */
          .navbar-collapse.collapsing,
          .navbar-collapse.show {
            animation: slideDown 0.3s ease-out;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* تحسين الألوان والتباين */
          @media (prefers-contrast: high) {
            .navbar-custom {
              border-bottom: 4px solid #c31432 !important;
            }
            
            .btn {
              border-width: 3px !important;
            }
          }
          
          /* تحسين للحركة المنخفضة */
          @media (prefers-reduced-motion: reduce) {
            .navbar-collapse {
              animation: none !important;
            }
            
            .btn {
              transition: none !important;
            }
            
            .navbar-brand img {
              transition: none !important;
            }
          }
        `}
      </style>
    </>
  );
}

>>>>>>> ed2528a9ce995e567ed2d9215c64d590e2982728
export default NavbarCustom;