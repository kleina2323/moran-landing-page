// טיפול בטופס יצירת קשר - שמירה ב-Firebase
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // קבלת הכפתור והחלפת טקסט
            const submitBtn = contactForm.querySelector('.submit-button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'שולח...';
            submitBtn.disabled = true;
            
            // איסוף נתונים מהטופס
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                institution: document.getElementById('institution').value,
                message: document.getElementById('message').value.trim(),
                createdAt: new Date().toISOString(),
                status: 'new' // לסימון פניות חדשות
            };
            
            try {
                // שמירה ב-Firestore
                await db.collection('contacts').add(formData);
                
                // מעבר לדף תודה
                window.location.href = 'thank-you.html';
                
            } catch (error) {
                console.error('Error saving contact:', error);
                alert('אירעה שגיאה בשליחת ההודעה. אנא נסה שוב או צור קשר בוואטסאפ.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
