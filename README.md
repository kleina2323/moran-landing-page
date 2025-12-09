# מורן קליין - דף נחיתה עסקי

דף נחיתה מקצועי לתכניות תנועה מקצועיות לגנים, בתי ספר, בתי אבות ומועדוני יום.

## תכונות

- 🎨 עיצוב מודרני ורספונסיבי
- 📱 תמיכה מלאה במובייל
- 🔄 תמיכה בעברית (RTL)
- 📧 טופס יצירת קשר משולב
- 🎥 אינטגרציה עם Google Drive לסרטונים
- ⚡ אירוח חינמי ב-Netlify

## התקנה והעלאה ל-Netlify

### שלב 1: הכנת הפרויקט

1. וודא שכל הקבצים נמצאים בתיקייה
2. ערוך את `js/google-drive.js` והכנס את מפתח ה-API ואת ה-Folder ID שלך מ-Google Drive (אופציונלי)

### שלב 2: יצירת חשבון Netlify

1. גש לאתר https://www.netlify.com
2. הירשם בחינם (ניתן להשתמש ב-GitHub, GitLab או אימייל)

### שלב 3: העלאת האתר

#### אופציה 1: העלאה ידנית (הכי קלה)

1. התחבר ל-Netlify
2. לחץ על "Add new site" -> "Deploy manually"
3. גרור את כל התיקייה (או zip של התיקייה) לאזור ההעלאה
4. המתן להעלאה להסתיים
5. האתר יהיה זמין בכתובת אוטומטית (לדוגמה: `random-name-12345.netlify.app`)

#### אופציה 2: דרך Git (מומלץ)

1. העלה את הקוד ל-GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. ב-Netlify:
   - לחץ על "Add new site" -> "Import an existing project"
   - בחר GitHub
   - בחר את ה-repository שלך
   - Netlify יזהה אוטומטית את ההגדרות
   - לחץ על "Deploy site"

### שלב 4: הגדרת דומיין מותאם אישית (אופציונלי)

1. ב-Netlify Dashboard, לחץ על "Domain settings"
2. לחץ על "Add custom domain"
3. הזן את שם הדומיין שלך
4. עקוב אחר ההוראות להגדרת DNS

### שלב 5: הגדרת Google Drive (אופציונלי)

לטעינת סרטונים מ-Google Drive:

1. צור פרויקט ב-Google Cloud Console: https://console.cloud.google.com/
2. הפעל את Google Drive API
3. צור API Key
4. שתף את התיקייה עם סרטונים כ"public" (כל מי שיש לו את הקישור יכול לצפות)
5. העתק את ה-Folder ID מה-URL של התיקייה
6. ב-Netlify Dashboard:
   - לך ל-Site settings -> Environment variables
   - הוסף:
     - `GOOGLE_DRIVE_API_KEY`: המפתח שלך
     - `GOOGLE_DRIVE_FOLDER_ID`: ה-ID של התיקייה

## עריכת תוכן

### שינוי טקסטים

ערוך את הקובץ `index.html` ושנה את הטקסטים בעברית.

### שינוי צבעים

ערוך את הקובץ `css/style.css` בחלק `:root`:
```css
:root {
    --primary-color: #2c5aa0;    /* צבע ראשי */
    --secondary-color: #ff6b6b;  /* צבע משני */
    --accent-color: #4ecdc4;     /* צבע מבטא */
}
```

### הוספת תמונות

1. צור תיקייה `images` אם היא לא קיימת
2. העלה תמונות לתיקייה
3. עדכן את ה-`src` בקובץ HTML

## תמיכה טכנית

לשאלות נוספות:
- תיעוד Netlify: https://docs.netlify.com/
- תיעוד Google Drive API: https://developers.google.com/drive/api/v3

## רישיון

MIT License - חופשי לשימוש אישי ומסחרי
