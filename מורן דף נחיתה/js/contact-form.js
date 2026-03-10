// טיפול בטופס יצירת קשר - EmailJS + Firebase
// =============================================

// הגדרות EmailJS
const EMAILJS_CONFIG = {
    publicKey: 'JnVdYSURuFcqtx4mS',
    serviceId: 'service_gsmosso',
    templateId: 'template_8tsck59'
};

// פונקציה להמרת ערך המוסד לשם קריא
function getInstitutionName(value) {
    const institutions = {
        'kindergarten': 'גן ילדים',
        'school': 'בית ספר',
        'elderly': 'בית אבות / מועדון יום',
        'other': 'אחר'
    };
    return institutions[value] || 'לא צוין';
}

document.addEventListener('DOMContentLoaded', function() {
    // אתחול EmailJS
    emailjs.init(EMAILJS_CONFIG.publicKey);
    
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
                status: 'new'
            };
            
            // פרמטרים לתבנית המייל
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone || 'לא צוין',
                institution: getInstitutionName(formData.institution),
                message: formData.message
            };
            
            try {
                // שליחת מייל דרך EmailJS
                await emailjs.send(
                    EMAILJS_CONFIG.serviceId,
                    EMAILJS_CONFIG.templateId,
                    templateParams
                );
                
                // שמירה גם ב-Firebase כגיבוי
                try {
                    await db.collection('contacts').add(formData);
                } catch (fbError) {
                    console.warn('Firebase backup failed:', fbError);
                }
                
                // מעבר לדף תודה
                window.location.href = 'thank-you.html';
                
            } catch (error) {
                console.error('Error sending email:', error);
                alert('אירעה שגיאה בשליחת ההודעה. אנא נסה שוב או צור קשר בוואטסאפ.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
