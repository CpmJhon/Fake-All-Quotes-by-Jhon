// Elements
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');
const mainContainer = document.getElementById('mainContainer');
const imageBackground = document.getElementById('imageBackground');
const form = document.getElementById('quoteForm');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');
const imageInput = document.getElementById('image');
const fileName = document.getElementById('fileName');
const generateBtn = document.getElementById('generateBtn');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const resultImage = document.getElementById('resultImage');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');

// Reset button handler
resetBtn.addEventListener('click', () => {
    result.classList.add('hidden');
    form.reset();
    fileName.textContent = 'Pilih gambar...';
});

// Image preload
let progress = 0;
let imageLoaded = false;

const progressInterval = setInterval(() => {
    // Progress akan berjalan pelan sampai image loaded
    if (!imageLoaded && progress < 95) {
        progress += Math.random() * 3; // Lebih lambat
        loadingProgress.style.width = Math.min(progress, 95) + '%';
    }
}, 200);

// Check if image loaded
const bgImage = new Image();
bgImage.src = 'https://files.catbox.moe/fdqfws.png';

bgImage.onload = () => {
    console.log('Background image loaded successfully');
    imageLoaded = true;
    
    // Apply background image
    imageBackground.style.backgroundImage = `url('${bgImage.src}')`;
    
    // Setelah image loaded, complete progress bar dengan smooth
    const completeProgress = setInterval(() => {
        if (progress < 100) {
            progress += 2;
            loadingProgress.style.width = Math.min(progress, 100) + '%';
        } else {
            clearInterval(completeProgress);
            clearInterval(progressInterval);
            
            // Tunggu sebentar biar user liat 100%
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                mainContainer.classList.add('show');
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 300);
        }
    }, 30);
};

bgImage.onerror = () => {
    console.error('Background image failed to load');
    clearInterval(progressInterval);
    loadingProgress.style.width = '100%';
    
    // Set fallback gradient background
    imageBackground.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    loadingScreen.classList.add('fade-out');
    mainContainer.classList.add('show');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
};

// Fallback jika image tidak load dalam 3 detik
setTimeout(() => {
    if (!mainContainer.classList.contains('show')) {
        clearInterval(progressInterval);
        loadingProgress.style.width = '100%';
        loadingScreen.classList.add('fade-out');
        mainContainer.classList.add('show');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}, 3000);

// Update file name display
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = file.name;
    } else {
        fileName.textContent = 'Pilih gambar...';
    }
});

// Form submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();
    const file = imageInput.files[0];
    
    if (!name || !comment || !file) {
        alert('Mohon isi semua field!');
        return;
    }
    
    // Show loading
    loading.classList.remove('hidden');
    result.classList.add('hidden');
    generateBtn.disabled = true;
    generateBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="animation: spin 1s linear infinite;">
            <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66l1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14l-1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Processing...
    `;
    
    try {
        // Create FormData
        const formData = new FormData();
        formData.append('name', name);
        formData.append('comment', comment);
        formData.append('image', file);
        
        console.log('Sending request to generate function...');
        
        // Call Netlify Function
        const response = await fetch('/.netlify/functions/generate', {
            method: 'POST',
            body: formData
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Generate failed');
        }
        
        const data = await response.json();
        console.log('Generated successfully:', data);
        
        if (!data.success || !data.imageUrl) {
            throw new Error('Invalid response from server');
        }
        
        // Show result
        resultImage.src = data.imageUrl;
        result.classList.remove('hidden');
        loading.classList.add('hidden');
        
        // Setup download
        downloadBtn.onclick = async () => {
            try {
                console.log('Downloading image...');
                
                const downloadResponse = await fetch('/.netlify/functions/download', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageUrl: data.imageUrl })
                });
                
                if (!downloadResponse.ok) {
                    throw new Error('Download failed');
                }
                
                const blob = await downloadResponse.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `fake-fb-quote-${Date.now()}.jpg`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                console.log('Download complete');
            } catch (error) {
                console.error('Download error:', error);
                alert('Gagal download gambar: ' + error.message);
            }
        };
        
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat generate quote: ' + error.message);
        loading.classList.add('hidden');
    } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>
            </svg>
            Generate Quote
        `;
    }
});