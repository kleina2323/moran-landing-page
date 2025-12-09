// Google Drive API Integration for Videos
// This script loads videos from a Google Drive folder

const GOOGLE_DRIVE_CONFIG = {
    // הכנס כאן את ה-API Key מ-Google Cloud Console
    API_KEY: 'YOUR_GOOGLE_DRIVE_API_KEY',
    // הכנס כאן את ה-Folder ID מ-Google Drive (החלק שאחרי folders/ ב-URL)
    FOLDER_ID: 'YOUR_FOLDER_ID'
};

// דוגמה להחלפה:
// API_KEY: 'AIzaSyD1234567890abcdefghijklmnopqrstuv',
// FOLDER_ID: '1ABC123xyz-folder-id-from-drive-url'

// Load videos from Google Drive
async function loadVideosFromDrive() {
    const videoGrid = document.getElementById('video-grid');
    
    if (!GOOGLE_DRIVE_CONFIG.API_KEY || GOOGLE_DRIVE_CONFIG.API_KEY === 'YOUR_GOOGLE_DRIVE_API_KEY') {
        console.warn('Google Drive API key not configured');
        displayPlaceholderVideos();
        return;
    }
    
    try {
        const url = `https://www.googleapis.com/drive/v3/files?q='${GOOGLE_DRIVE_CONFIG.FOLDER_ID}'+in+parents&key=${GOOGLE_DRIVE_CONFIG.API_KEY}&fields=files(id,name,mimeType,thumbnailLink,webViewLink)`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.files && data.files.length > 0) {
            displayVideos(data.files);
        } else {
            displayPlaceholderVideos();
        }
    } catch (error) {
        console.error('Error loading videos from Google Drive:', error);
        displayPlaceholderVideos();
    }
}

// Display videos in the grid
function displayVideos(videos) {
    const videoGrid = document.getElementById('video-grid');
    videoGrid.innerHTML = '';
    
    videos.forEach(video => {
        if (video.mimeType.includes('video')) {
            const videoCard = createVideoCard(video);
            videoGrid.appendChild(videoCard);
        }
    });
}

// Create a video card element
function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    const thumbnail = video.thumbnailLink || 'images/video-placeholder.jpg';
    
    card.innerHTML = `
        <img src="${thumbnail}" alt="${video.name}" class="video-thumbnail" loading="lazy">
        <div class="video-info">
            <h3>${video.name}</h3>
            <a href="${video.webViewLink}" target="_blank" rel="noopener noreferrer" class="video-link">
                צפה בסרטון
            </a>
        </div>
    `;
    
    return card;
}

// Display placeholder videos when API is not configured
function displayPlaceholderVideos() {
    const videoGrid = document.getElementById('video-grid');
    videoGrid.innerHTML = '';
    
    const placeholderVideos = [
        {
            title: 'פעילות תנועה לגיל השלישי',
            description: 'תרגילים מותאמים למבוגרים - הדגמה מעשית',
            thumbnail: 'https://drive.google.com/thumbnail?id=1Tx3Q2rhD4VOJAgZfODyQjFaEoZdmzlR0&sz=w400',
            videoUrl: 'https://drive.google.com/file/d/1Tx3Q2rhD4VOJAgZfODyQjFaEoZdmzlR0/preview',
            isGoogleDrive: true
        },
        {
            title: 'ימי גיבוש',
            description: 'סדנאות תנועה מותאמות וימי גיבוש לצוותים',
            thumbnail: 'https://drive.google.com/thumbnail?id=1z1py44gczyDk_MFXnRiZTkokosRbgu0D&sz=w400',
            videoUrl: 'https://drive.google.com/file/d/1z1py44gczyDk_MFXnRiZTkokosRbgu0D/preview',
            isGoogleDrive: true
        },
        {
            title: 'פעילות בגן ילדים',
            description: 'פעילות תנועה מהנה וחווייתית לילדי הגן',
            thumbnail: 'https://drive.google.com/thumbnail?id=161eKzNZ9A1W-tSIv3tvQptkfHoJ9u80I&sz=w400',
            videoUrl: 'https://drive.google.com/file/d/161eKzNZ9A1W-tSIv3tvQptkfHoJ9u80I/preview',
            isGoogleDrive: true
        },
        {
            title: 'סדנת תנועה',
            description: 'סדנת תנועה מקצועית - הדגמה והדרכה',
            thumbnail: 'https://drive.google.com/thumbnail?id=16xeE8MSY303TM9G6p9MLr2FQDrs6TUWc&sz=w400',
            videoUrl: 'https://drive.google.com/file/d/16xeE8MSY303TM9G6p9MLr2FQDrs6TUWc/preview',
            isGoogleDrive: true
        }
    ];
    
    placeholderVideos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        
        if (video.isGoogleDrive && video.videoUrl) {
            // סרטון אמיתי מגוגל דרייב
            card.innerHTML = `
                <div class="video-embed-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                    <iframe 
                        src="${video.videoUrl}" 
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
                        allow="autoplay; encrypted-media" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.description}</p>
                </div>
            `;
        } else {
            // placeholder
            card.innerHTML = `
                <div class="video-thumbnail-placeholder">
                    <svg width="100%" height="200" viewBox="0 0 400 300">
                        <rect fill="#e0e0e0" width="400" height="300"/>
                        <circle cx="200" cy="150" r="40" fill="#999"/>
                        <polygon points="190,135 190,165 215,150" fill="white"/>
                    </svg>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.description}</p>
                </div>
            `;
        }
        
        videoGrid.appendChild(card);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Try to load videos from Google Drive
    loadVideosFromDrive();
});

// Instructions for setting up Google Drive API:
/*
1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable the Google Drive API
4. Create credentials (API Key)
5. Make your folder public:
   - Right-click on folder in Google Drive
   - Get link > Anyone with the link can view
6. Get the folder ID from the URL:
   https://drive.google.com/drive/folders/YOUR_FOLDER_ID
7. Replace YOUR_GOOGLE_DRIVE_API_KEY and YOUR_FOLDER_ID above
*/
