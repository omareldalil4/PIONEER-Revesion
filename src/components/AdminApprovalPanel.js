// src/components/AdminApprovalPanel.js
import React, { useState, useEffect } from 'react';

function AdminApprovalPanel() {
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processingAction, setProcessingAction] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);

  // إعدادات GitHub المصححة
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_PAT;
  const REPO_OWNER = 'omareldalil24';
  const REPO_NAME = 'PIONEER';
  const REGISTRATIONS_FILE_PATH = 'public/trash/control/registrations.json';

  // دالة لجلب البيانات من GitHub
  const fetchStudentsFromGitHub = async () => {
    try {
      console.log('📥 جاري جلب بيانات الطلاب من GitHub...');
      
      const cacheBuster = Date.now();
      const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${REGISTRATIONS_FILE_PATH}?t=${cacheBuster}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ تم جلب البيانات بنجاح:', data);
        console.log('👥 عدد الطلاب المسجلين:', data.approvedStudents?.length || 0);
        
        return data;
      } else {
        console.log('⚠️ فشل في جلب البيانات، status:', response.status);
      }
    } catch (error) {
      console.error('❌ خطأ في جلب البيانات:', error);
    }
    
    return { approvedStudents: [] };
  };

  // دالة لحفظ البيانات إلى GitHub مع معالجة تضارب الإصدارات
  const saveStudentsToGitHub = async (data, retryCount = 0) => {
    const maxRetries = 3;
    
    try {
      console.log('💾 جاري حفظ بيانات الطلاب في GitHub...');
      
      if (!GITHUB_TOKEN) {
        throw new Error('GITHUB_TOKEN غير موجود في متغيرات البيئة');
      }
      
      // نستخدم نفس طريقة جلب البيانات الأولية للحصول على SHA محدث
      let sha = null;
      try {
        console.log('🔄 جاري جلب أحدث إصدار من الملف...');
        
        // جلب البيانات الحديثة مع cache buster
        const cacheBuster = Date.now();
        const rawResponse = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${REGISTRATIONS_FILE_PATH}?t=${cacheBuster}`);
        
        if (rawResponse.ok) {
          // إذا تم العثور على الملف، نجلب SHA من API
          const apiResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${REGISTRATIONS_FILE_PATH}`, {
            headers: {
              'Authorization': `Bearer ${GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          
          if (apiResponse.ok) {
            const fileData = await apiResponse.json();
            sha = fileData.sha;
            console.log('🔑 تم الحصول على أحدث SHA:', sha);
          }
        } else {
          console.log('📝 الملف غير موجود، سيتم إنشاء ملف جديد');
        }
      } catch (shaError) {
        console.log('📝 لم يتم العثور على الملف، سيتم إنشاء ملف جديد');
      }

      const jsonContent = JSON.stringify(data, null, 2);
      const base64Content = btoa(unescape(encodeURIComponent(jsonContent)));

      const requestBody = {
        message: `تحديث قائمة الطلاب - ${new Date().toLocaleString('ar-EG')} (محاولة ${retryCount + 1})`,
        content: base64Content,
        branch: 'main'
      };

      if (sha) {
        requestBody.sha = sha;
      }

      console.log('📤 إرسال البيانات مع SHA:', sha);
      const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${REGISTRATIONS_FILE_PATH}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        console.log('✅ تم حفظ بيانات الطلاب في GitHub بنجاح');
        return await response.json();
      } else {
        const errorData = await response.json();
        console.error('❌ فشل في حفظ البيانات:', errorData);
        
        // إذا كان خطأ تضارب SHA وهناك محاولات متبقية
        if (response.status === 409 && retryCount < maxRetries) {
          console.log(`🔄 محاولة إعادة الحفظ (${retryCount + 1}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // انتظار متزايد
          return await saveStudentsToGitHub(data, retryCount + 1);
        }
        
        throw new Error(`فشل في حفظ البيانات: ${errorData.message || 'خطأ غير معروف'}`);
      }
    } catch (error) {
      // إذا كان خطأ شبكة وهناك محاولات متبقية
      if (retryCount < maxRetries && (error.name === 'TypeError' || error.message.includes('fetch') || error.message.includes('CORS'))) {
        console.log(`🔄 محاولة إعادة الاتصال (${retryCount + 1}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
        return await saveStudentsToGitHub(data, retryCount + 1);
      }
      
      console.error('💥 خطأ في حفظ البيانات:', error);
      throw error;
    }
  };

  // جلب البيانات عند تحميل الصفحة فقط (بدون تحديث تلقائي)
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await fetchStudentsFromGitHub();
      setApprovedStudents(data.approvedStudents || []);
      console.log('📋 قائمة الطلاب المحملة:', data.approvedStudents || []);
    } catch (error) {
      console.error('خطأ في تحميل بيانات الطلاب:', error);
      alert('❌ خطأ في تحميل بيانات الطلاب. تحقق من الاتصال.');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    console.log('🔄 تحديث بيانات الطلاب يدوياً...');
    setRefreshing(true);
    try {
      await loadStudents();
      alert('✅ تم تحديث بيانات الطلاب بنجاح!');
    } catch (error) {
      console.error('خطأ في التحديث:', error);
      alert('❌ خطأ في تحديث بيانات الطلاب');
    } finally {
      setRefreshing(false);
    }
  };

  const handleAddStudent = async () => {
    if (!newStudentName.trim()) {
      alert('⚠️ يرجى إدخال اسم الطالب');
      return;
    }

    if (processingAction === 'add') return;
    
    setProcessingAction('add');
    try {
      console.log('➕ جاري إضافة طالب جديد:', newStudentName);
      
      // جلب أحدث البيانات قبل التعديل مباشرة
      console.log('📥 جلب أحدث البيانات...');
      const currentData = await fetchStudentsFromGitHub();
      
      // التحقق من عدم وجود الطالب مسبقاً
      const existingStudent = currentData.approvedStudents?.find(
        student => student.name.toLowerCase().trim() === newStudentName.toLowerCase().trim()
      );
      
      if (existingStudent) {
        alert('⚠️ هذا الطالب موجود بالفعل في القائمة!');
        return;
      }

      if (!currentData.approvedStudents) {
        currentData.approvedStudents = [];
      }
      
      const newStudent = {
        id: Date.now(),
        name: newStudentName.trim(),
        addedDate: new Date().toISOString(),
        addedBy: 'admin'
      };
      
      currentData.approvedStudents.push(newStudent);
      
      const updatedData = {
        approvedStudents: currentData.approvedStudents
      };
      
      console.log('💾 حفظ البيانات المحدثة...');
      await saveStudentsToGitHub(updatedData);
      
      // تحديث الواجهة المحلية
      setApprovedStudents(currentData.approvedStudents);
      setNewStudentName('');
      setShowAddModal(false);
      
      alert(`✅ تم إضافة الطالب "${newStudentName}" بنجاح!\n\n🎓 يمكن للطالب الآن تسجيل الدخول باستخدام هذا الاسم.`);
      console.log('🎉 تم إضافة الطالب بنجاح');
    } catch (error) {
      console.error('❌ خطأ في إضافة الطالب:', error);
      alert(`❌ حدث خطأ أثناء إضافة الطالب: ${error.message}\n\nيرجى المحاولة مرة أخرى.`);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleEditStudent = async (index) => {
    if (!editingStudent.name.trim()) {
      alert('⚠️ يرجى إدخال اسم الطالب');
      return;
    }

    if (processingAction === `edit-${index}`) return;
    
    setProcessingAction(`edit-${index}`);
    try {
      console.log('✏️ جاري تعديل بيانات الطالب:', editingStudent.name);
      
      // جلب أحدث البيانات قبل التعديل مباشرة
      console.log('📥 جلب أحدث البيانات...');
      const currentData = await fetchStudentsFromGitHub();
      
      // التحقق من عدم وجود اسم مشابه لطالب آخر
      const duplicateStudent = currentData.approvedStudents?.find(
        (student, i) => i !== index && student.name.toLowerCase().trim() === editingStudent.name.toLowerCase().trim()
      );
      
      if (duplicateStudent) {
        alert('⚠️ يوجد طالب آخر بنفس هذا الاسم!');
        return;
      }
      
      const updatedStudents = [...currentData.approvedStudents];
      updatedStudents[index] = {
        ...updatedStudents[index],
        name: editingStudent.name.trim(),
        lastModified: new Date().toISOString(),
        modifiedBy: 'admin'
      };
      
      const updatedData = {
        approvedStudents: updatedStudents
      };
      
      console.log('💾 حفظ البيانات المحدثة...');
      await saveStudentsToGitHub(updatedData);
      
      // تحديث الواجهة المحلية
      setApprovedStudents(updatedStudents);
      setEditingStudent(null);
      
      alert(`✅ تم تحديث بيانات الطالب بنجاح!`);
      console.log('📝 تم تعديل بيانات الطالب');
    } catch (error) {
      console.error('❌ خطأ في تعديل بيانات الطالب:', error);
      alert(`❌ حدث خطأ أثناء تعديل بيانات الطالب: ${error.message}\n\nيرجى المحاولة مرة أخرى.`);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleDeleteStudent = async (index) => {
    if (processingAction === `delete-${index}`) return;
    
    const student = approvedStudents[index];
    const confirmDelete = window.confirm(`🗑️ هل أنت متأكد من حذف الطالب "${student?.name}" نهائياً؟\n\n⚠️ هذا الإجراء لا يمكن التراجع عنه!\n🚫 لن يتمكن الطالب من تسجيل الدخول بعد الحذف.`);
    if (!confirmDelete) return;

    setProcessingAction(`delete-${index}`);
    try {
      console.log('🗑️ جاري حذف الطالب:', student.name);
      
      // جلب أحدث البيانات قبل التعديل مباشرة
      console.log('📥 جلب أحدث البيانات...');
      const currentData = await fetchStudentsFromGitHub();
      
      const updatedStudents = currentData.approvedStudents.filter((_, i) => i !== index);
      
      const updatedData = {
        approvedStudents: updatedStudents
      };
      
      console.log('💾 حفظ البيانات المحدثة...');
      await saveStudentsToGitHub(updatedData);
      
      // تحديث الواجهة المحلية
      setApprovedStudents(updatedStudents);
      
      alert(`🗑️ تم حذف الطالب "${student?.name}" نهائياً.`);
      console.log('🗑️ تم حذف الطالب نهائياً');
    } catch (error) {
      console.error('❌ خطأ في حذف الطالب:', error);
      alert(`❌ حدث خطأ أثناء حذف الطالب: ${error.message}\n\nيرجى المحاولة مرة أخرى.`);
    } finally {
      setProcessingAction(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div className="loading-spinner" style={{
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
          }}>
            📥 جاري تحميل قائمة الطلاب...
          </h3>
          <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>
            قد يستغرق هذا بضع ثوان
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #c31432, #8e0000, #240b36)',
        backgroundAttachment: 'fixed',
        paddingTop: '100px',
        padding: '100px 20px 20px 20px',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif"
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* العنوان والإحصائيات */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '25px',
            padding: '35px',
            marginBottom: '30px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: 'slideInUp 0.6s ease-out'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '25px', 
              flexWrap: 'wrap', 
              gap: '15px' 
            }}>
              <div>
                <h1 style={{ 
                  color: '#2c3e50', 
                  margin: 0, 
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #c31432, #8e0000)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: 'none'
                }}>
                  👥 إدارة الطلاب المسجلين
                </h1>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowAddModal(true)}
                  style={{
                    background: 'linear-gradient(135deg, #00b894, #00a085)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '600',
                    boxShadow: '0 6px 20px rgba(0, 184, 148, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 30px rgba(0, 184, 148, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 184, 148, 0.3)';
                  }}
                >
                  ➕ إضافة طالب جديد
                </button>
                
                <button
                  onClick={refreshData}
                  disabled={refreshing}
                  style={{
                    background: refreshing ? 
                      'linear-gradient(135deg, #6c757d, #5a6268)' : 
                      'linear-gradient(135deg, #c31432, #8e0000)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    cursor: refreshing ? 'not-allowed' : 'pointer',
                    opacity: refreshing ? 0.7 : 1,
                    transition: 'all 0.3s ease',
                    fontWeight: '600',
                    boxShadow: '0 6px 20px rgba(195, 20, 50, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (!refreshing) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 30px rgba(195, 20, 50, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!refreshing) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(195, 20, 50, 0.3)';
                    }
                  }}
                >
                  {refreshing ? (
                    <>
                      <span style={{ 
                        display: 'inline-block',
                        width: '16px',
                        height: '16px',
                        border: '2px solid #ffffff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginLeft: '8px'
                      }}></span>
                      جاري التحديث...
                    </>
                  ) : (
                    '🔄 تحديث البيانات'
                  )}
                </button>
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '25px',
              marginTop: '25px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #00b894, #00a085)',
                color: 'white',
                padding: '25px',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0, 184, 148, 0.3)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '2.2rem', fontWeight: '700' }}>{approvedStudents.length}</h3>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>👥 إجمالي الطلاب</p>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #17a2b8, #138496)',
                color: 'white',
                padding: '25px',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(23, 162, 184, 0.3)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '2.2rem', fontWeight: '700' }}>{approvedStudents.length > 0 ? '✅' : '❌'}</h3>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>🔐 النظام نشط</p>
              </div>
            </div>
          </div>

          {/* قائمة الطلاب */}
          <div style={{
            display: 'grid',
            gap: '20px'
          }}>
            {approvedStudents.map((student, index) => (
              <div key={student.id} style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '30px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '25px',
                alignItems: 'center',
                direction: 'rtl',
                border: '3px solid #00b894',
                position: 'relative',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.08)';
              }}
              >
                {(processingAction === `edit-${index}` || processingAction === `delete-${index}`) && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(5px)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #c31432',
                        borderTop: '4px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 15px'
                      }}></div>
                      <p style={{ color: '#2c3e50', fontWeight: '700', fontSize: '1.1rem' }}>جاري المعالجة...</p>
                    </div>
                  </div>
                )}
                
                <div>
                  {editingStudent?.index === index ? (
                    <div style={{ marginBottom: '15px' }}>
                      <input
                        type="text"
                        value={editingStudent.name}
                        onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: '2px solid rgba(0, 184, 148, 0.3)',
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          textAlign: 'right',
                          direction: 'rtl',
                          background: 'rgba(255, 255, 255, 0.9)',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#00b894';
                          e.target.style.boxShadow = '0 0 0 3px rgba(0, 184, 148, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(0, 184, 148, 0.3)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <h3 style={{ 
                      color: '#2c3e50', 
                      marginBottom: '12px',
                      fontSize: '1.5rem',
                      fontWeight: '700'
                    }}>
                      👤 {student.name}
                    </h3>
                  )}
                  
                  <p style={{ 
                    color: '#6c757d', 
                    marginBottom: '18px',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}>
                    📅 تاريخ الإضافة: {formatDate(student.addedDate)}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '18px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #00b894, #00a085)',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                      boxShadow: '0 4px 15px rgba(0, 184, 148, 0.4)'
                    }}>
                      ✅ مسجل ونشط
                    </span>
                    
                    <span style={{ 
                      color: '#6c757d', 
                      fontSize: '0.9rem',
                      padding: '10px 16px',
                      background: 'rgba(0, 184, 148, 0.1)',
                      borderRadius: '12px',
                      fontWeight: '500'
                    }}>
                      🆔 ID: {student.id}
                    </span>
                  </div>
                  
                  {student.lastModified && (
                    <p style={{ 
                      color: '#f39c12', 
                      fontSize: '0.9rem', 
                      marginTop: '12px',
                      fontWeight: '600',
                      padding: '8px 16px',
                      background: 'rgba(243, 156, 18, 0.1)',
                      borderRadius: '8px',
                      display: 'inline-block'
                    }}>
                      ✏️ آخر تعديل: {formatDate(student.lastModified)}
                    </p>
                  )}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {editingStudent?.index === index ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEditStudent(index)}
                        disabled={processingAction === `edit-${index}`}
                        style={{
                          background: 'linear-gradient(135deg, #00b894, #00a085)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 20px',
                          borderRadius: '12px',
                          cursor: processingAction === `edit-${index}` ? 'not-allowed' : 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '700',
                          transition: 'all 0.3s ease',
                          opacity: processingAction === `edit-${index}` ? 0.6 : 1,
                          boxShadow: '0 6px 20px rgba(0, 184, 148, 0.3)'
                        }}
                      >
                        ✅ حفظ
                      </button>
                      
                      <button
                        onClick={() => setEditingStudent(null)}
                        style={{
                          background: 'linear-gradient(135deg, #6c757d, #5a6268)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 20px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '700',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 6px 20px rgba(108, 117, 125, 0.3)'
                        }}
                      >
                        ❌ إلغاء
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingStudent({...student, index})}
                        disabled={processingAction === `edit-${index}` || processingAction === `delete-${index}`}
                        style={{
                          background: 'linear-gradient(135deg, #f39c12, #e67e22)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '12px',
                          cursor: (processingAction === `edit-${index}` || processingAction === `delete-${index}`) ? 'not-allowed' : 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '700',
                          transition: 'all 0.3s ease',
                          opacity: (processingAction === `edit-${index}` || processingAction === `delete-${index}`) ? 0.6 : 1,
                          boxShadow: '0 6px 20px rgba(243, 156, 18, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          if (!processingAction) {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 8px 25px rgba(243, 156, 18, 0.4)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!processingAction) {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 6px 20px rgba(243, 156, 18, 0.3)';
                          }
                        }}
                      >
                        ✏️ تعديل
                      </button>
                      
                      <button
                        onClick={() => handleDeleteStudent(index)}
                        disabled={processingAction === `edit-${index}` || processingAction === `delete-${index}`}
                        style={{
                          background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '12px',
                          cursor: (processingAction === `edit-${index}` || processingAction === `delete-${index}`) ? 'not-allowed' : 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '700',
                          transition: 'all 0.3s ease',
                          opacity: (processingAction === `edit-${index}` || processingAction === `delete-${index}`) ? 0.6 : 1,
                          boxShadow: '0 6px 20px rgba(231, 76, 60, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          if (!processingAction) {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.4)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!processingAction) {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.3)';
                          }
                        }}
                      >
                        🗑️ حذف
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {approvedStudents.length === 0 && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '50px',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              animation: 'slideInUp 0.6s ease-out'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '25px' }}>👥</div>
              <h3 style={{ 
                color: '#6c757d', 
                fontSize: '1.6rem', 
                marginBottom: '18px',
                fontWeight: '700'
              }}>
                لا يوجد طلاب مسجلين حالياً
              </h3>
              <p style={{ 
                color: '#7f8c8d', 
                marginBottom: '25px',
                fontSize: '1.1rem'
              }}>
                انقر على "إضافة طالب جديد" لبدء تسجيل الطلاب
              </p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowAddModal(true)}
                  style={{
                    background: 'linear-gradient(135deg, #00b894, #00a085)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '15px 30px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    fontWeight: '700',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(0, 184, 148, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(0, 184, 148, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 184, 148, 0.3)';
                  }}
                >
                  ➕ إضافة أول طالب
                </button>
                <button
                  onClick={refreshData}
                  style={{
                    background: 'linear-gradient(135deg, #c31432, #8e0000)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '15px 30px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    fontWeight: '700',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(195, 20, 50, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(195, 20, 50, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(195, 20, 50, 0.3)';
                  }}
                >
                  🔄 تحديث البيانات
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* مودال إضافة طالب جديد */}
      {showAddModal && (
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
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '40px',
              maxWidth: '500px',
              width: '90%',
              direction: 'rtl',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              animation: 'slideInUp 0.4s ease-out'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ 
              textAlign: 'center', 
              marginBottom: '25px', 
              color: '#2c3e50',
              fontSize: '1.6rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              ➕ إضافة طالب جديد
            </h3>

            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>
                👤 اسم الطالب:
              </label>
              <input
                type="text"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="أدخل اسم الطالب كاملاً"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(0, 184, 148, 0.2)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '16px',
                  textAlign: 'right',
                  boxSizing: 'border-box',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  direction: 'rtl'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00b894';
                  e.target.style.background = 'rgba(255, 255, 255, 1)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 184, 148, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 184, 148, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.boxShadow = 'none';
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddStudent();
                  }
                }}
              />
              <small style={{
                color: '#7f8c8d',
                fontSize: '13px',
                display: 'block',
                marginTop: '8px',
                fontWeight: '500'
              }}>
                💡 سيتمكن الطالب من تسجيل الدخول باستخدام هذا الاسم بالضبط
              </small>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={handleAddStudent}
                disabled={!newStudentName.trim() || processingAction === 'add'}
                style={{
                  flex: 1,
                  padding: '15px',
                  background: (!newStudentName.trim() || processingAction === 'add') ? 
                    'linear-gradient(135deg, #6c757d, #5a6268)' :
                    'linear-gradient(135deg, #00b894, #00a085)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: (!newStudentName.trim() || processingAction === 'add') ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: (!newStudentName.trim() || processingAction === 'add') ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (newStudentName.trim() && processingAction !== 'add') {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 184, 148, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (newStudentName.trim() && processingAction !== 'add') {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {processingAction === 'add' ? (
                  <>
                    <span style={{ 
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      border: '2px solid #ffffff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginLeft: '8px'
                    }}></span>
                    جاري الإضافة...
                  </>
                ) : (
                  '✅ إضافة الطالب'
                )}
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewStudentName('');
                }}
                disabled={processingAction === 'add'}
                style={{
                  flex: 1,
                  padding: '15px',
                  background: 'linear-gradient(135deg, #6c757d, #5a6268)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: processingAction === 'add' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: processingAction === 'add' ? 0.6 : 1
                }}
              >
                ❌ إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
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
          
          /* تحسين الاستجابة للموبايل */
          @media (max-width: 768px) {
            .student-card {
              grid-template-columns: 1fr !important;
              text-align: center;
              gap: 20px !important;
            }
            
            .stats-grid {
              grid-template-columns: 1fr !important;
              gap: 15px !important;
            }
            
            .action-buttons {
              flex-direction: column !important;
              gap: 8px !important;
            }
            
            .action-buttons button {
              width: 100% !important;
              font-size: 0.9rem !important;
              padding: 10px 16px !important;
            }
            
            .header-section {
              flex-direction: column !important;
              gap: 15px !important;
              text-align: center;
            }
            
            .header-buttons {
              flex-direction: column !important;
              width: 100% !important;
            }
            
            .header-buttons button {
              width: 100% !important;
            }
            
            h1 {
              font-size: 2rem !important;
            }
            
            .modal-content-responsive {
              margin: 10px !important;
              width: calc(100% - 20px) !important;
            }
          }
          
          @media (max-width: 480px) {
            .student-card {
              padding: 20px !important;
            }
            
            h1 {
              font-size: 1.8rem !important;
            }
            
            .action-buttons button {
              font-size: 0.8rem !important;
              padding: 8px 12px !important;
            }
          }
          
          /* تحسين التركيز للوصولية */
          button:focus,
          input:focus {
            outline: 3px solid rgba(0, 184, 148, 0.5);
            outline-offset: 2px;
          }
          
          /* تحسين الطباعة */
          @media print {
            .no-print {
              display: none !important;
            }
            
            .student-card {
              break-inside: avoid;
              margin-bottom: 20px;
            }
            
            body {
              background: white !important;
            }
            
            .student-card {
              border: 2px solid #333 !important;
              background: white !important;
            }
          }
          
          /* تحسين الأداء */
          .gpu-accelerated {
            transform: translateZ(0);
            will-change: transform;
          }
          
          /* تحسين التمرير السلس */
          html {
            scroll-behavior: smooth;
          }
          
          /* تحسين التباين للرؤية */
          @media (prefers-contrast: high) {
            .student-card {
              border-width: 4px !important;
            }
            
            button {
              border: 2px solid currentColor !important;
            }
          }
          
          /* تحسين للحركة المنخفضة */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </>
  );
}

export default AdminApprovalPanel;
