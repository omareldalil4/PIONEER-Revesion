<<<<<<< HEAD
// src/components/StudentRegistration.js - الجزء الأول
import React, { useState, useEffect } from 'react';

function StudentRegistration() {
  const [formData, setFormData] = useState({
    studentName: '',
    paymentReceipt: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showNumbers, setShowNumbers] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null); // null, 'pending', 'approved', 'rejected'
  const [isLoading, setIsLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);

  // أرقام الواتساب
  const whatsappNumbers = [
    '+201508833552',
    '+201508833122', 
    '+201551013615',
  ];

  // إعدادات GitHub
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_PAT;
  const REPO_OWNER = 'omareldalil24';
  const REPO_NAME = 'PIONEER';

  // دالة للتحقق من حالة التسجيل
  const checkRegistrationStatus = async (studentName) => {
    if (!studentName.trim()) return null;
    
    try {
      const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/public/trash/control/registrations.json?${Date.now()}`);
      
      if (response.ok) {
        const data = await response.json();
        
        // البحث في التسجيلات المعلقة
        const pendingRegistration = data.registrations?.find(
          reg => reg.studentName.toLowerCase().trim() === studentName.toLowerCase().trim()
        );
        
        if (pendingRegistration) {
          return { status: 'pending', data: pendingRegistration };
        }
        
        // البحث في الطلاب المقبولين
        const approvedStudent = data.approvedStudents?.find(
          student => student.studentName.toLowerCase().trim() === studentName.toLowerCase().trim()
        );
        
        if (approvedStudent) {
          return { status: 'approved', data: approvedStudent };
        }
        
        return null;
      }
    } catch (error) {
      console.error('خطأ في التحقق من حالة التسجيل:', error);
    }
    
    return null;
  };

  // التحقق من التسجيل المحفوظ محلياً عند تحميل الصفحة
  useEffect(() => {
    const checkSavedRegistration = async () => {
      setIsLoading(true);
      const savedName = localStorage.getItem('studentRegistrationName');
      
      if (savedName) {
        const status = await checkRegistrationStatus(savedName);
        if (status) {
          setRegistrationStatus(status);
          setFormData(prev => ({ ...prev, studentName: savedName }));
        } else {
          // إذا لم توجد بيانات، احذف الاسم المحفوظ
          localStorage.removeItem('studentRegistrationName');
        }
      }
      
      setIsLoading(false);
    };
    
    checkSavedRegistration();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('⚠️ يرجى رفع صورة فقط (JPG, PNG)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('⚠️ حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
        return;
      }
      console.log('📎 تم اختيار الملف:', file.name, file.size, 'bytes');
      setFormData(prev => ({
        ...prev,
        paymentReceipt: file
      }));
    }
  };

  // دالة لتحويل الملف إلى Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log('✅ تم تحويل الصورة إلى Base64');
        resolve(reader.result.split(',')[1]);
      };
      reader.onerror = error => {
        console.error('❌ خطأ في تحويل الصورة:', error);
        reject(error);
      };
    });
  };

  // دالة لجلب البيانات الحالية
  const fetchCurrentRegistrations = async () => {
    try {
      console.log('📥 جاري جلب البيانات الحالية...');
      const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/public/trash/control/registrations.json?${Date.now()}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ تم جلب البيانات بنجاح:', data);
        return data;
      } else {
        console.log('⚠️ لم يتم العثور على ملف البيانات، سيتم إنشاء هيكل جديد');
      }
    } catch (error) {
      console.error('❌ خطأ في جلب البيانات:', error);
    }
    
    return { registrations: [], approvedStudents: [] };
  };

  // دالة لحفظ البيانات
  const saveRegistrationsToGitHub = async (data) => {
    try {
      console.log('💾 جاري حفظ البيانات في GitHub...');
      
      const filePath = 'public/trash/control/registrations.json';
      let sha = null;
      
      // محاولة جلب SHA للملف الموجود
      try {
        const fileResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
          }
        });
        
        if (fileResponse.ok) {
          const fileData = await fileResponse.json();
          sha = fileData.sha;
          console.log('🔑 تم الحصول على SHA:', sha);
        }
      } catch (error) {
        console.log('📝 الملف غير موجود، سيتم إنشاء ملف جديد');
      }

      const jsonContent = JSON.stringify(data, null, 2);
      const base64Content = btoa(unescape(encodeURIComponent(jsonContent)));

      const requestBody = {
        message: `تسجيل طالب جديد: ${data.registrations[data.registrations.length - 1]?.studentName || 'غير معروف'}`,
        content: base64Content,
        branch: 'main'
      };

      if (sha) {
        requestBody.sha = sha;
      }

      const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        console.log('✅ تم حفظ البيانات في GitHub بنجاح');
        return await response.json();
      } else {
        const errorData = await response.json();
        console.error('❌ فشل في حفظ البيانات:', errorData);
        throw new Error(`فشل في حفظ البيانات: ${errorData.message || 'خطأ غير معروف'}`);
      }
    } catch (error) {
      console.error('💥 خطأ في حفظ البيانات:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من البيانات
    if (!formData.studentName.trim()) {
      alert('⚠️ يرجى إدخال اسمك');
      return;
    }
    
    if (!formData.paymentReceipt) {
      alert('⚠️ يرجى رفع صورة وصل الدفع');
      return;
    }

    if (!GITHUB_TOKEN) {
      alert('❌ خطأ في الإعدادات. يرجى التواصل مع الإدارة.');
      console.error('❌ GITHUB_TOKEN غير موجود');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      console.log('🚀 بدء عملية التسجيل للطالب:', formData.studentName);
      
      const timestamp = Date.now();
      const fileExtension = formData.paymentReceipt.name.split('.').pop();
      const fileName = `receipt_${timestamp}.${fileExtension}`;

      setSubmitMessage('🔄 جاري معالجة صورة الوصل...');
      
      // تحويل الصورة إلى Base64 للحفظ مع البيانات
      const imageBase64 = await convertFileToBase64(formData.paymentReceipt);

      setSubmitMessage('📥 جاري جلب البيانات الحالية...');
      const currentData = await fetchCurrentRegistrations();

      // إذا كان هناك تسجيل سابق، احذفه قبل إضافة الجديد
      if (registrationStatus?.status === 'pending') {
        currentData.registrations = currentData.registrations.filter(
          reg => reg.studentName.toLowerCase().trim() !== formData.studentName.toLowerCase().trim()
        );
      }

      setSubmitMessage('💾 جاري حفظ البيانات...');

      const newRegistration = {
        id: timestamp,
        studentName: formData.studentName.trim(),
        paymentReceiptBase64: imageBase64,
        paymentReceiptFileName: fileName,
        paymentReceiptType: formData.paymentReceipt.type,
        submissionDate: new Date().toISOString(),
        status: 'pending'
      };

      console.log('📝 بيانات التسجيل الجديد:', {
        id: newRegistration.id,
        studentName: newRegistration.studentName,
        fileName: newRegistration.paymentReceiptFileName,
        status: newRegistration.status
      });

      currentData.registrations.push(newRegistration);
      await saveRegistrationsToGitHub(currentData);
      
      // حفظ الاسم محلياً وتحديث الحالة
      localStorage.setItem('studentRegistrationName', formData.studentName.trim());
      setRegistrationStatus({ status: 'pending', data: newRegistration });
      setShowEditForm(false);
      
      setSubmitMessage('🎉 تم إرسال طلبك بنجاح! سيتم مراجعته والرد عليك قريباً.');
      console.log('✅ تم التسجيل بنجاح');
      
      // مسح النموذج
      setFormData({ studentName: formData.studentName, paymentReceipt: null });
      
      const fileInput = document.getElementById('paymentReceipt');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('💥 خطأ في إرسال الطلب:', error);
      setSubmitMessage(`❌ حدث خطأ في إرسال الطلب: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // دالة لإعادة التحقق من الحالة
  const recheckStatus = async () => {
    setIsLoading(true);
    const status = await checkRegistrationStatus(formData.studentName);
    setRegistrationStatus(status);
    setIsLoading(false);
  };

  // دالة لبدء تسجيل جديد
  const startNewRegistration = () => {
    setRegistrationStatus(null);
    setFormData({ studentName: '', paymentReceipt: null });
    setShowEditForm(false);
    localStorage.removeItem('studentRegistrationName');
    
    const fileInput = document.getElementById('paymentReceipt');
    if (fileInput) fileInput.value = '';
  };
  // الجزء الثاني - عرض شاشة التحميل
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif"
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #00b894',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#2c3e50', fontSize: '1.1rem' }}>جاري التحقق من حالة التسجيل...</p>
        </div>
      </div>
    );
  }

  // عرض صفحة المحتوى للطلاب المقبولين
  if (registrationStatus?.status === 'approved') {
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
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          padding: '40px',
          borderRadius: '25px',
          background: 'linear-gradient(135deg, #00b894, #00a085)',
          color: 'white',
          boxShadow: '0 20px 60px rgba(0, 184, 148, 0.3)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
          <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>
            مرحباً {registrationStatus.data.studentName}!
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
            تم قبول طلبك بنجاح! يمكنك الآن الوصول للمحتوى التعليمي
          </p>
          <button
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid white',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '30px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '20px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#00b894';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.color = 'white';
            }}
          >
            🚀 دخول للمحتوى التعليمي
          </button>
          <br />
          <button
            onClick={startNewRegistration}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            تسجيل حساب جديد
          </button>
        </div>
      </div>
    );
  }

  // عرض صفحة الانتظار للطلاب تحت المراجعة
  if (registrationStatus?.status === 'pending' && !showEditForm) {
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
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          padding: '40px',
          borderRadius: '25px',
          background: 'linear-gradient(135deg, #ffc107, #e0a800)',
          color: 'white',
          boxShadow: '0 20px 60px rgba(255, 193, 7, 0.3)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⏳</div>
          <h2 style={{ marginBottom: '15px', fontSize: '1.8rem' }}>
            طلبك قيد المراجعة
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px', opacity: 0.9 }}>
            مرحباً {registrationStatus.data.studentName}
          </p>
          <p style={{ fontSize: '1rem', marginBottom: '30px', opacity: 0.8 }}>
            تم استلام طلبك بتاريخ {new Date(registrationStatus.data.submissionDate).toLocaleDateString('ar-EG')}
            <br />
            سيتم مراجعته والرد عليك قريباً
          </p>
          
          <div style={{ marginBottom: '25px' }}>
            <button
              onClick={recheckStatus}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid white',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginRight: '10px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#ffc107';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.color = 'white';
              }}
            >
              🔄 تحديث الحالة
            </button>
            
            <button
              onClick={() => setShowEditForm(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '25px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              ✏️ تعديل البيانات
            </button>
          </div>
          
          <button
            onClick={startNewRegistration}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '15px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            تسجيل حساب جديد
          </button>
          
          {/* معلومات التواصل */}
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.3)' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '15px', opacity: 0.8 }}>
              للاستفسار عن حالة طلبك
            </p>
            <button
              onClick={() => setShowNumbers(true)}
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '10px 20px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
              تواصل معنا
            </button>
          </div>
        </div>
      </div>
    );
  }

  // عرض نموذج التسجيل (الحالة الافتراضية أو عند التعديل)
  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #c31432, #8e0000, #240b36)',
        backgroundAttachment: 'fixed',
        // تم تقليل المسافة العلوية للوضع المتجاوب
        paddingTop: window.innerWidth <= 768 ? '80px' : '100px',
        padding: window.innerWidth <= 768 ? '80px 20px 20px 20px' : '100px 20px 20px 20px',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif"
      }}>
        <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
          <div
            className="glass-effect"
            style={{
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              padding: '40px',
              animation: 'slideInUp 0.6s ease-out'
            }}
          >
            {/* عرض رسالة التعديل إذا كان الطالب يعدل بياناته */}
            {showEditForm && registrationStatus?.status === 'pending' && (
              <div style={{
                padding: '15px',
                marginBottom: '25px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(230, 126, 34, 0.1))',
                border: '1px solid rgba(255, 193, 7, 0.3)',
                textAlign: 'center'
              }}>
                <p style={{ color: '#e67e22', margin: 0, fontSize: '1rem', fontWeight: '500' }}>
                  🔄 تعديل البيانات المرسلة سابقاً
                </p>
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '15px'
              }}>
                <span style={{ 
                  filter: 'hue-rotate(0deg)',
                  display: 'inline-block'
                }}>🎓</span>
              </div>
              <h2 style={{ 
                color: '#2c3e50', 
                fontWeight: '700',
                marginBottom: '10px',
                fontSize: '2.2rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                مراجعة ليلة الامتحان
              </h2>
              <h4 style={{ 
                color: '#34495e', 
                fontSize: '1.4rem',
                fontWeight: '500',
                marginBottom: '15px'
              }}>
                الصف الثالث الثانوي
              </h4>
              <p style={{ 
                color: '#7f8c8d', 
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}>
                 اشترك الآن للحصول على مراجعة شاملة مع مستر ربيع جلال لمادة اللغة الإنجليزية
              </p>
            </div>

            {submitMessage && (
              <div
                style={{
                  padding: '18px 25px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  textAlign: 'center',
                  background: submitMessage.includes('🎉') || submitMessage.includes('✅') ? 
                    'linear-gradient(135deg, rgba(40, 167, 69, 0.9), rgba(32, 201, 151, 0.9))' : 
                    submitMessage.includes('🔄') || submitMessage.includes('📥') || submitMessage.includes('💾') ? 
                    'linear-gradient(135deg, rgba(23, 162, 184, 0.9), rgba(19, 132, 150, 0.9))' : 
                    submitMessage.includes('⚠️') ? 
                    'linear-gradient(135deg, rgba(255, 193, 7, 0.9), rgba(230, 126, 34, 0.9))' : 
                    'linear-gradient(135deg, rgba(220, 53, 69, 0.9), rgba(200, 35, 51, 0.9))',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  animation: 'slideInUp 0.4s ease-out'
                }}
              >
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ direction: 'rtl' }}>
              <div style={{ marginBottom: '30px' }}>
                <label style={{ 
                  display: 'block',
                  marginBottom: '12px',
                  fontWeight: '600', 
                  color: '#2c3e50',
                  fontSize: '1.1rem'
                }}>
                  📝 الاسم كاملاً
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="أدخل اسمك الثلاثي بالضبط"
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    border: '2px solid rgba(195, 20, 50, 0.2)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '16px 20px',
                    fontSize: '16px',
                    textAlign: 'right',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease',
                    opacity: isSubmitting ? 0.6 : 1,
                    direction: 'rtl',
                    fontWeight: '500',
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
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ 
                  display: 'block',
                  marginBottom: '12px',
                  fontWeight: '600', 
                  color: '#2c3e50',
                  fontSize: '1.1rem'
                }}>
                  📸 صورة وصل الدفع
                </label>
                <div
                  style={{
                    border: '2px dashed rgba(195, 20, 50, 0.3)',
                    borderRadius: '15px',
                    padding: '40px',
                    textAlign: 'center',
                    background: isSubmitting ? 'rgba(248, 249, 250, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isSubmitting ? 0.6 : 1,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => !isSubmitting && document.getElementById('paymentReceipt').click()}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.background = 'rgba(195, 20, 50, 0.05)';
                      e.target.style.borderColor = 'rgba(195, 20, 50, 0.5)';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.5)';
                      e.target.style.borderColor = 'rgba(195, 20, 50, 0.3)';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div style={{ 
                    fontSize: '3.5rem', 
                    marginBottom: '15px',
                    background: formData.paymentReceipt ? 
                      'linear-gradient(135deg, #00b894, #00a085)' : 
                      'linear-gradient(135deg, #c31432, #8e0000)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {formData.paymentReceipt ? '✅' : '📤'}
                  </div>
                  <p style={{ 
                    margin: '10px 0', 
                    color: '#2c3e50', 
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    {formData.paymentReceipt 
                      ? `✅ تم اختيار: ${formData.paymentReceipt.name}`
                      : '📤 اضغط هنا لرفع صورة وصل الدفع'
                    }
                  </p>
                  <small style={{ 
                    color: '#7f8c8d',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    صيغ مدعومة: JPG, PNG (حجم أقصى: 5 ميجابايت)
                  </small>
                </div>
                <input
                  type="file"
                  id="paymentReceipt"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '20px',
                  borderRadius: '15px',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  background: isSubmitting ? 
                    'linear-gradient(135deg, #6c757d, #5a6268)' : 
                    'linear-gradient(135deg, #c31432, #8e0000)',
                  border: 'none',
                  color: 'white',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isSubmitting ? 0.7 : 1,
                  boxShadow: '0 8px 25px rgba(195, 20, 50, 0.3)',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 15px 35px rgba(195, 20, 50, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(195, 20, 50, 0.3)';
                  }
                }}
              >
                {isSubmitting ? (
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
                    جاري الإرسال...
                  </>
                ) : (
                  showEditForm ? '🔄 تحديث البيانات' : '🚀 إرسال طلب الاشتراك'
                )}
              </button>
            </form>

            {/* أزرار إضافية للتعديل */}
            {showEditForm && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => setShowEditForm(false)}
                  style={{
                    background: 'linear-gradient(135deg, #6c757d, #5a6268)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '12px 25px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '600'
                  }}
                >
                  إلغاء التعديل
                </button>
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <p style={{ 
                color: '#7f8c8d', 
                fontSize: '1rem',
                marginBottom: '15px',
                fontWeight: '500'
              }}>
                للاستفسار والدعم الفني
              </p>
              <div style={{ 
                display: 'flex', 
                gap: '15px', 
                justifyContent: 'center',
                flexWrap: 'wrap' 
              }}>
                <button
                  onClick={() => setShowNumbers(true)}
                  style={{
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '600',
                    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.3)';
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                  <span style={{ textDecoration: 'none' }}>تواصل معنا</span>
                </button>

                <button
                  onClick={() => window.location.href = '/login'}
                  style={{
                    background: 'linear-gradient(135deg, #c31432, #8e0000)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '600',
                    boxShadow: '0 8px 25px rgba(195, 20, 50, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(195, 20, 50, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(195, 20, 50, 0.3)';
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span style={{ textDecoration: 'none' }}>تسجيل دخول</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مودال أرقام الواتساب */}
      {showNumbers && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(5px)'
          }}
          onClick={() => setShowNumbers(false)}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '35px',
              maxWidth: '450px',
              width: '90%',
              direction: 'rtl',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              animation: 'slideInUp 0.4s ease-out'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h4 style={{ 
              textAlign: 'center', 
              marginBottom: '25px', 
              color: '#2c3e50',
              fontSize: '1.4rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="#25D366"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
              أرقام الواتساب للدعم الفني
            </h4>
            {whatsappNumbers.map((number, index) => (
              <button
                key={index}
                style={{ 
                  width: '100%', 
                  marginBottom: '15px',
                  borderRadius: '15px',
                  padding: '18px',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  color: 'white',
                  border: 'none',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '600',
                  boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  textDecoration: 'none'
                }}
                onClick={() => window.open(`https://wa.me/${number}`, '_blank')}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #128C7E, #075E54)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 25px rgba(37, 211, 102, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.3)';
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
                <span style={{ textDecoration: 'none' }}>{number}</span>
              </button>
            ))}
            <button
              style={{ 
                width: '100%', 
                marginTop: '20px', 
                borderRadius: '15px',
                padding: '15px',
                background: 'linear-gradient(135deg, #6c757d, #5a6268)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onClick={() => setShowNumbers(false)}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #5a6268, #495057)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #6c757d, #5a6268)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* أيقونة واتساب عائمة */}
      <div
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '25px',
          zIndex: 9999,
        }}
      >
        <div
          onClick={() => setShowNumbers(true)}
          className="floating-icon"
          style={{
            width: '65px',
            height: '65px',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
            transition: 'all 0.3s ease',
            border: '3px solid rgba(255, 255, 255, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(37, 211, 102, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.4)';
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
          </svg>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
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
          
          .floating-icon {
            animation: float 3s ease-in-out infinite;
          }
          
          .floating-icon:hover {
            animation-play-state: paused;
          }
          
          /* تحسين الاستجابة للموبايل */
          @media (max-width: 768px) {
            .glass-effect {
              margin: 10px;
              padding: 25px !important;
            }
            
            h2 {
              font-size: 1.8rem !important;
            }
            
            h4 {
              font-size: 1.2rem !important;
            }
            
            .floating-icon {
              width: 55px !important;
              height: 55px !important;
              bottom: 20px !important;
              right: 20px !important;
            }
            
            .floating-icon svg {
              width: 28px !important;
              height: 28px !important;
            }
            
            /* إصلاح المسافة العلوية للموبايل - مسافة أصغر */
            div[style*="paddingTop: window.innerWidth <= 768 ? '80px' : '100px'"] {
              padding-top: 40px !important;
              padding: 40px 15px 20px 15px !important;
            }
            
            /* الأزرار جنب بعض في الموبايل تبقى تحت بعض */
            div[style*="display: flex"][style*="gap: 15px"] {
              flex-direction: column !important;
              align-items: center !important;
            }
            
            div[style*="display: flex"][style*="gap: 15px"] button {
              width: 100% !important;
              max-width: 280px !important;
            }
          }
          
          @media (max-width: 480px) {
            .glass-effect {
              margin: 5px;
              padding: 20px !important;
            }
            
            h2 {
              font-size: 1.6rem !important;
            }
            
            button {
              font-size: 1.1rem !important;
              padding: 15px !important;
            }
            
            /* إصلاح أكثر للشاشات الصغيرة جداً - مسافة أصغر جداً */
            div[style*="paddingTop: window.innerWidth <= 768 ? '80px' : '100px'"] {
              padding-top: 25px !important;
              padding: 25px 10px 20px 10px !important;
            }
          }
          
          /* إصلاح خاص للتابلت */
          @media (min-width: 769px) and (max-width: 1024px) {
            div[style*="paddingTop: window.innerWidth <= 768 ? '80px' : '100px'"] {
              padding-top: 60px !important;
              padding: 60px 30px 20px 30px !important;
            }
          }
        `}
      </style>
    </>
  );
}

export default StudentRegistration;
=======
// src/components/StudentRegistration.js - الجزء الأول
import React, { useState, useEffect } from 'react';

function StudentRegistration() {
  const [formData, setFormData] = useState({
    studentName: '',
    paymentReceipt: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showNumbers, setShowNumbers] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null); // null, 'pending', 'approved', 'rejected'
  const [isLoading, setIsLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);

  // أرقام الواتساب
  const whatsappNumbers = [
    '+201508833552',
    '+201508833122', 
    '+201551013615',
  ];

  // إعدادات GitHub
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_PAT;
  const REPO_OWNER = 'omareldalil24';
  const REPO_NAME = 'PIONEER';

  // دالة للتحقق من حالة التسجيل
  const checkRegistrationStatus = async (studentName) => {
    if (!studentName.trim()) return null;
    
    try {
      const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/public/trash/control/registrations.json?${Date.now()}`);
      
      if (response.ok) {
        const data = await response.json();
        
        // البحث في التسجيلات المعلقة
        const pendingRegistration = data.registrations?.find(
          reg => reg.studentName.toLowerCase().trim() === studentName.toLowerCase().trim()
        );
        
        if (pendingRegistration) {
          return { status: 'pending', data: pendingRegistration };
        }
        
        // البحث في الطلاب المقبولين
        const approvedStudent = data.approvedStudents?.find(
          student => student.studentName.toLowerCase().trim() === studentName.toLowerCase().trim()
        );
        
        if (approvedStudent) {
          return { status: 'approved', data: approvedStudent };
        }
        
        return null;
      }
    } catch (error) {
      console.error('خطأ في التحقق من حالة التسجيل:', error);
    }
    
    return null;
  };

  // التحقق من التسجيل المحفوظ محلياً عند تحميل الصفحة
  useEffect(() => {
    const checkSavedRegistration = async () => {
      setIsLoading(true);
      const savedName = localStorage.getItem('studentRegistrationName');
      
      if (savedName) {
        const status = await checkRegistrationStatus(savedName);
        if (status) {
          setRegistrationStatus(status);
          setFormData(prev => ({ ...prev, studentName: savedName }));
        } else {
          // إذا لم توجد بيانات، احذف الاسم المحفوظ
          localStorage.removeItem('studentRegistrationName');
        }
      }
      
      setIsLoading(false);
    };
    
    checkSavedRegistration();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('⚠️ يرجى رفع صورة فقط (JPG, PNG)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('⚠️ حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
        return;
      }
      console.log('📎 تم اختيار الملف:', file.name, file.size, 'bytes');
      setFormData(prev => ({
        ...prev,
        paymentReceipt: file
      }));
    }
  };

  // دالة لتحويل الملف إلى Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log('✅ تم تحويل الصورة إلى Base64');
        resolve(reader.result.split(',')[1]);
      };
      reader.onerror = error => {
        console.error('❌ خطأ في تحويل الصورة:', error);
        reject(error);
      };
    });
  };

  // دالة لجلب البيانات الحالية
  const fetchCurrentRegistrations = async () => {
    try {
      console.log('📥 جاري جلب البيانات الحالية...');
      const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/public/trash/control/registrations.json?${Date.now()}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ تم جلب البيانات بنجاح:', data);
        return data;
      } else {
        console.log('⚠️ لم يتم العثور على ملف البيانات، سيتم إنشاء هيكل جديد');
      }
    } catch (error) {
      console.error('❌ خطأ في جلب البيانات:', error);
    }
    
    return { registrations: [], approvedStudents: [] };
  };

  // دالة لحفظ البيانات
  const saveRegistrationsToGitHub = async (data) => {
    try {
      console.log('💾 جاري حفظ البيانات في GitHub...');
      
      const filePath = 'public/trash/control/registrations.json';
      let sha = null;
      
      // محاولة جلب SHA للملف الموجود
      try {
        const fileResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
          }
        });
        
        if (fileResponse.ok) {
          const fileData = await fileResponse.json();
          sha = fileData.sha;
          console.log('🔑 تم الحصول على SHA:', sha);
        }
      } catch (error) {
        console.log('📝 الملف غير موجود، سيتم إنشاء ملف جديد');
      }

      const jsonContent = JSON.stringify(data, null, 2);
      const base64Content = btoa(unescape(encodeURIComponent(jsonContent)));

      const requestBody = {
        message: `تسجيل طالب جديد: ${data.registrations[data.registrations.length - 1]?.studentName || 'غير معروف'}`,
        content: base64Content,
        branch: 'main'
      };

      if (sha) {
        requestBody.sha = sha;
      }

      const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        console.log('✅ تم حفظ البيانات في GitHub بنجاح');
        return await response.json();
      } else {
        const errorData = await response.json();
        console.error('❌ فشل في حفظ البيانات:', errorData);
        throw new Error(`فشل في حفظ البيانات: ${errorData.message || 'خطأ غير معروف'}`);
      }
    } catch (error) {
      console.error('💥 خطأ في حفظ البيانات:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من البيانات
    if (!formData.studentName.trim()) {
      alert('⚠️ يرجى إدخال اسمك');
      return;
    }
    
    if (!formData.paymentReceipt) {
      alert('⚠️ يرجى رفع صورة وصل الدفع');
      return;
    }

    if (!GITHUB_TOKEN) {
      alert('❌ خطأ في الإعدادات. يرجى التواصل مع الإدارة.');
      console.error('❌ GITHUB_TOKEN غير موجود');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      console.log('🚀 بدء عملية التسجيل للطالب:', formData.studentName);
      
      const timestamp = Date.now();
      const fileExtension = formData.paymentReceipt.name.split('.').pop();
      const fileName = `receipt_${timestamp}.${fileExtension}`;

      setSubmitMessage('🔄 جاري معالجة صورة الوصل...');
      
      // تحويل الصورة إلى Base64 للحفظ مع البيانات
      const imageBase64 = await convertFileToBase64(formData.paymentReceipt);

      setSubmitMessage('📥 جاري جلب البيانات الحالية...');
      const currentData = await fetchCurrentRegistrations();

      // إذا كان هناك تسجيل سابق، احذفه قبل إضافة الجديد
      if (registrationStatus?.status === 'pending') {
        currentData.registrations = currentData.registrations.filter(
          reg => reg.studentName.toLowerCase().trim() !== formData.studentName.toLowerCase().trim()
        );
      }

      setSubmitMessage('💾 جاري حفظ البيانات...');

      const newRegistration = {
        id: timestamp,
        studentName: formData.studentName.trim(),
        paymentReceiptBase64: imageBase64,
        paymentReceiptFileName: fileName,
        paymentReceiptType: formData.paymentReceipt.type,
        submissionDate: new Date().toISOString(),
        status: 'pending'
      };

      console.log('📝 بيانات التسجيل الجديد:', {
        id: newRegistration.id,
        studentName: newRegistration.studentName,
        fileName: newRegistration.paymentReceiptFileName,
        status: newRegistration.status
      });

      currentData.registrations.push(newRegistration);
      await saveRegistrationsToGitHub(currentData);
      
      // حفظ الاسم محلياً وتحديث الحالة
      localStorage.setItem('studentRegistrationName', formData.studentName.trim());
      setRegistrationStatus({ status: 'pending', data: newRegistration });
      setShowEditForm(false);
      
      setSubmitMessage('🎉 تم إرسال طلبك بنجاح! سيتم مراجعته والرد عليك قريباً.');
      console.log('✅ تم التسجيل بنجاح');
      
      // مسح النموذج
      setFormData({ studentName: formData.studentName, paymentReceipt: null });
      
      const fileInput = document.getElementById('paymentReceipt');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('💥 خطأ في إرسال الطلب:', error);
      setSubmitMessage(`❌ حدث خطأ في إرسال الطلب: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // دالة لإعادة التحقق من الحالة
  const recheckStatus = async () => {
    setIsLoading(true);
    const status = await checkRegistrationStatus(formData.studentName);
    setRegistrationStatus(status);
    setIsLoading(false);
  };

  // دالة لبدء تسجيل جديد
  const startNewRegistration = () => {
    setRegistrationStatus(null);
    setFormData({ studentName: '', paymentReceipt: null });
    setShowEditForm(false);
    localStorage.removeItem('studentRegistrationName');
    
    const fileInput = document.getElementById('paymentReceipt');
    if (fileInput) fileInput.value = '';
  };
  // الجزء الثاني - عرض شاشة التحميل
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif"
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #00b894',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#2c3e50', fontSize: '1.1rem' }}>جاري التحقق من حالة التسجيل...</p>
        </div>
      </div>
    );
  }

  // عرض صفحة المحتوى للطلاب المقبولين
  if (registrationStatus?.status === 'approved') {
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
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          padding: '40px',
          borderRadius: '25px',
          background: 'linear-gradient(135deg, #00b894, #00a085)',
          color: 'white',
          boxShadow: '0 20px 60px rgba(0, 184, 148, 0.3)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
          <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>
            مرحباً {registrationStatus.data.studentName}!
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
            تم قبول طلبك بنجاح! يمكنك الآن الوصول للمحتوى التعليمي
          </p>
          <button
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid white',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '30px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '20px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#00b894';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.color = 'white';
            }}
          >
            🚀 دخول للمحتوى التعليمي
          </button>
          <br />
          <button
            onClick={startNewRegistration}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            تسجيل حساب جديد
          </button>
        </div>
      </div>
    );
  }

  // عرض صفحة الانتظار للطلاب تحت المراجعة
  if (registrationStatus?.status === 'pending' && !showEditForm) {
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
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          padding: '40px',
          borderRadius: '25px',
          background: 'linear-gradient(135deg, #ffc107, #e0a800)',
          color: 'white',
          boxShadow: '0 20px 60px rgba(255, 193, 7, 0.3)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⏳</div>
          <h2 style={{ marginBottom: '15px', fontSize: '1.8rem' }}>
            طلبك قيد المراجعة
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px', opacity: 0.9 }}>
            مرحباً {registrationStatus.data.studentName}
          </p>
          <p style={{ fontSize: '1rem', marginBottom: '30px', opacity: 0.8 }}>
            تم استلام طلبك بتاريخ {new Date(registrationStatus.data.submissionDate).toLocaleDateString('ar-EG')}
            <br />
            سيتم مراجعته والرد عليك قريباً
          </p>
          
          <div style={{ marginBottom: '25px' }}>
            <button
              onClick={recheckStatus}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid white',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginRight: '10px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#ffc107';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.color = 'white';
              }}
            >
              🔄 تحديث الحالة
            </button>
            
            <button
              onClick={() => setShowEditForm(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '25px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              ✏️ تعديل البيانات
            </button>
          </div>
          
          <button
            onClick={startNewRegistration}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '15px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            تسجيل حساب جديد
          </button>
          
          {/* معلومات التواصل */}
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.3)' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '15px', opacity: 0.8 }}>
              للاستفسار عن حالة طلبك
            </p>
            <button
              onClick={() => setShowNumbers(true)}
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '10px 20px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
              تواصل معنا
            </button>
          </div>
        </div>
      </div>
    );
  }

  // عرض نموذج التسجيل (الحالة الافتراضية أو عند التعديل)
  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #c31432, #8e0000, #240b36)',
        backgroundAttachment: 'fixed',
        // تم تقليل المسافة العلوية للوضع المتجاوب
        paddingTop: window.innerWidth <= 768 ? '80px' : '100px',
        padding: window.innerWidth <= 768 ? '80px 20px 20px 20px' : '100px 20px 20px 20px',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif"
      }}>
        <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
          <div
            className="glass-effect"
            style={{
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              padding: '40px',
              animation: 'slideInUp 0.6s ease-out'
            }}
          >
            {/* عرض رسالة التعديل إذا كان الطالب يعدل بياناته */}
            {showEditForm && registrationStatus?.status === 'pending' && (
              <div style={{
                padding: '15px',
                marginBottom: '25px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(230, 126, 34, 0.1))',
                border: '1px solid rgba(255, 193, 7, 0.3)',
                textAlign: 'center'
              }}>
                <p style={{ color: '#e67e22', margin: 0, fontSize: '1rem', fontWeight: '500' }}>
                  🔄 تعديل البيانات المرسلة سابقاً
                </p>
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '15px'
              }}>
                <span style={{ 
                  filter: 'hue-rotate(0deg)',
                  display: 'inline-block'
                }}>🎓</span>
              </div>
              <h2 style={{ 
                color: '#2c3e50', 
                fontWeight: '700',
                marginBottom: '10px',
                fontSize: '2.2rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                مراجعة ليلة الامتحان
              </h2>
              <h4 style={{ 
                color: '#34495e', 
                fontSize: '1.4rem',
                fontWeight: '500',
                marginBottom: '15px'
              }}>
                الصف الثالث الثانوي
              </h4>
              <p style={{ 
                color: '#7f8c8d', 
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}>
                 اشترك الآن للحصول على مراجعة شاملة مع مستر ربيع جلال لمادة اللغة الإنجليزية
              </p>
            </div>

            {submitMessage && (
              <div
                style={{
                  padding: '18px 25px',
                  borderRadius: '15px',
                  marginBottom: '25px',
                  textAlign: 'center',
                  background: submitMessage.includes('🎉') || submitMessage.includes('✅') ? 
                    'linear-gradient(135deg, rgba(40, 167, 69, 0.9), rgba(32, 201, 151, 0.9))' : 
                    submitMessage.includes('🔄') || submitMessage.includes('📥') || submitMessage.includes('💾') ? 
                    'linear-gradient(135deg, rgba(23, 162, 184, 0.9), rgba(19, 132, 150, 0.9))' : 
                    submitMessage.includes('⚠️') ? 
                    'linear-gradient(135deg, rgba(255, 193, 7, 0.9), rgba(230, 126, 34, 0.9))' : 
                    'linear-gradient(135deg, rgba(220, 53, 69, 0.9), rgba(200, 35, 51, 0.9))',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  animation: 'slideInUp 0.4s ease-out'
                }}
              >
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ direction: 'rtl' }}>
              <div style={{ marginBottom: '30px' }}>
                <label style={{ 
                  display: 'block',
                  marginBottom: '12px',
                  fontWeight: '600', 
                  color: '#2c3e50',
                  fontSize: '1.1rem'
                }}>
                  📝 الاسم كاملاً
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="أدخل اسمك الثلاثي بالضبط"
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    border: '2px solid rgba(195, 20, 50, 0.2)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '16px 20px',
                    fontSize: '16px',
                    textAlign: 'right',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease',
                    opacity: isSubmitting ? 0.6 : 1,
                    direction: 'rtl',
                    fontWeight: '500',
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
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ 
                  display: 'block',
                  marginBottom: '12px',
                  fontWeight: '600', 
                  color: '#2c3e50',
                  fontSize: '1.1rem'
                }}>
                  📸 صورة وصل الدفع
                </label>
                <div
                  style={{
                    border: '2px dashed rgba(195, 20, 50, 0.3)',
                    borderRadius: '15px',
                    padding: '40px',
                    textAlign: 'center',
                    background: isSubmitting ? 'rgba(248, 249, 250, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isSubmitting ? 0.6 : 1,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => !isSubmitting && document.getElementById('paymentReceipt').click()}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.background = 'rgba(195, 20, 50, 0.05)';
                      e.target.style.borderColor = 'rgba(195, 20, 50, 0.5)';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.5)';
                      e.target.style.borderColor = 'rgba(195, 20, 50, 0.3)';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div style={{ 
                    fontSize: '3.5rem', 
                    marginBottom: '15px',
                    background: formData.paymentReceipt ? 
                      'linear-gradient(135deg, #00b894, #00a085)' : 
                      'linear-gradient(135deg, #c31432, #8e0000)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {formData.paymentReceipt ? '✅' : '📤'}
                  </div>
                  <p style={{ 
                    margin: '10px 0', 
                    color: '#2c3e50', 
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    {formData.paymentReceipt 
                      ? `✅ تم اختيار: ${formData.paymentReceipt.name}`
                      : '📤 اضغط هنا لرفع صورة وصل الدفع'
                    }
                  </p>
                  <small style={{ 
                    color: '#7f8c8d',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    صيغ مدعومة: JPG, PNG (حجم أقصى: 5 ميجابايت)
                  </small>
                </div>
                <input
                  type="file"
                  id="paymentReceipt"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '20px',
                  borderRadius: '15px',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  background: isSubmitting ? 
                    'linear-gradient(135deg, #6c757d, #5a6268)' : 
                    'linear-gradient(135deg, #c31432, #8e0000)',
                  border: 'none',
                  color: 'white',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isSubmitting ? 0.7 : 1,
                  boxShadow: '0 8px 25px rgba(195, 20, 50, 0.3)',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 15px 35px rgba(195, 20, 50, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(195, 20, 50, 0.3)';
                  }
                }}
              >
                {isSubmitting ? (
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
                    جاري الإرسال...
                  </>
                ) : (
                  showEditForm ? '🔄 تحديث البيانات' : '🚀 إرسال طلب الاشتراك'
                )}
              </button>
            </form>

            {/* أزرار إضافية للتعديل */}
            {showEditForm && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => setShowEditForm(false)}
                  style={{
                    background: 'linear-gradient(135deg, #6c757d, #5a6268)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '12px 25px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '600'
                  }}
                >
                  إلغاء التعديل
                </button>
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <p style={{ 
                color: '#7f8c8d', 
                fontSize: '1rem',
                marginBottom: '15px',
                fontWeight: '500'
              }}>
                للاستفسار والدعم الفني
              </p>
              <div style={{ 
                display: 'flex', 
                gap: '15px', 
                justifyContent: 'center',
                flexWrap: 'wrap' 
              }}>
                <button
                  onClick={() => setShowNumbers(true)}
                  style={{
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '600',
                    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.3)';
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                  <span style={{ textDecoration: 'none' }}>تواصل معنا</span>
                </button>

                <button
                  onClick={() => window.location.href = '/login'}
                  style={{
                    background: 'linear-gradient(135deg, #c31432, #8e0000)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '600',
                    boxShadow: '0 8px 25px rgba(195, 20, 50, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(195, 20, 50, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(195, 20, 50, 0.3)';
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span style={{ textDecoration: 'none' }}>تسجيل دخول</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مودال أرقام الواتساب */}
      {showNumbers && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(5px)'
          }}
          onClick={() => setShowNumbers(false)}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '35px',
              maxWidth: '450px',
              width: '90%',
              direction: 'rtl',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              animation: 'slideInUp 0.4s ease-out'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h4 style={{ 
              textAlign: 'center', 
              marginBottom: '25px', 
              color: '#2c3e50',
              fontSize: '1.4rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="#25D366"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
              أرقام الواتساب للدعم الفني
            </h4>
            {whatsappNumbers.map((number, index) => (
              <button
                key={index}
                style={{ 
                  width: '100%', 
                  marginBottom: '15px',
                  borderRadius: '15px',
                  padding: '18px',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  color: 'white',
                  border: 'none',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '600',
                  boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  textDecoration: 'none'
                }}
                onClick={() => window.open(`https://wa.me/${number}`, '_blank')}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #128C7E, #075E54)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 25px rgba(37, 211, 102, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.3)';
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
                <span style={{ textDecoration: 'none' }}>{number}</span>
              </button>
            ))}
            <button
              style={{ 
                width: '100%', 
                marginTop: '20px', 
                borderRadius: '15px',
                padding: '15px',
                background: 'linear-gradient(135deg, #6c757d, #5a6268)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onClick={() => setShowNumbers(false)}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #5a6268, #495057)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #6c757d, #5a6268)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* أيقونة واتساب عائمة */}
      <div
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '25px',
          zIndex: 9999,
        }}
      >
        <div
          onClick={() => setShowNumbers(true)}
          className="floating-icon"
          style={{
            width: '65px',
            height: '65px',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
            transition: 'all 0.3s ease',
            border: '3px solid rgba(255, 255, 255, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(37, 211, 102, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.4)';
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
          </svg>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
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
          
          .floating-icon {
            animation: float 3s ease-in-out infinite;
          }
          
          .floating-icon:hover {
            animation-play-state: paused;
          }
          
          /* تحسين الاستجابة للموبايل */
          @media (max-width: 768px) {
            .glass-effect {
              margin: 10px;
              padding: 25px !important;
            }
            
            h2 {
              font-size: 1.8rem !important;
            }
            
            h4 {
              font-size: 1.2rem !important;
            }
            
            .floating-icon {
              width: 55px !important;
              height: 55px !important;
              bottom: 20px !important;
              right: 20px !important;
            }
            
            .floating-icon svg {
              width: 28px !important;
              height: 28px !important;
            }
            
            /* إصلاح المسافة العلوية للموبايل - مسافة أصغر */
            div[style*="paddingTop: window.innerWidth <= 768 ? '80px' : '100px'"] {
              padding-top: 40px !important;
              padding: 40px 15px 20px 15px !important;
            }
            
            /* الأزرار جنب بعض في الموبايل تبقى تحت بعض */
            div[style*="display: flex"][style*="gap: 15px"] {
              flex-direction: column !important;
              align-items: center !important;
            }
            
            div[style*="display: flex"][style*="gap: 15px"] button {
              width: 100% !important;
              max-width: 280px !important;
            }
          }
          
          @media (max-width: 480px) {
            .glass-effect {
              margin: 5px;
              padding: 20px !important;
            }
            
            h2 {
              font-size: 1.6rem !important;
            }
            
            button {
              font-size: 1.1rem !important;
              padding: 15px !important;
            }
            
            /* إصلاح أكثر للشاشات الصغيرة جداً - مسافة أصغر جداً */
            div[style*="paddingTop: window.innerWidth <= 768 ? '80px' : '100px'"] {
              padding-top: 25px !important;
              padding: 25px 10px 20px 10px !important;
            }
          }
          
          /* إصلاح خاص للتابلت */
          @media (min-width: 769px) and (max-width: 1024px) {
            div[style*="paddingTop: window.innerWidth <= 768 ? '80px' : '100px'"] {
              padding-top: 60px !important;
              padding: 60px 30px 20px 30px !important;
            }
          }
        `}
      </style>
    </>
  );
}

export default StudentRegistration;
>>>>>>> ed2528a9ce995e567ed2d9215c64d590e2982728
