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
const resultContainer = document.getElementById('resultContainer');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');

let currentResultUrl = '';
let currentIsHtml = false;

// Reset button handler
resetBtn.addEventListener('click', () => {
    result.classList.add('hidden');
    resultContainer.innerHTML = '';
    form.reset();
    fileName.textContent = 'Pilih gambar...';
    currentResultUrl = '';
    currentIsHtml = false;
});

// Image preload
let progress = 0;
let imageLoaded = false;

const progressInterval = setInterval(() => {
    if (!imageLoaded && progress < 95) {
        progress += Math.random() * 3;
        loadingProgress.style.width = Math.min(progress, 95) + '%';
    }
}, 200);

// Check if image loaded
const bgImage = new Image();
bgImage.src = 'https://files.catbox.moe/fdqfws.png';

bgImage.onload = () => {
    console.log('Background image loaded successfully');
    imageLoaded = true;
    
    imageBackground.style.backgroundImage = `url('${bgImage.src}')`;
    
    const completeProgress = setInterval(() => {
        if (progress < 100) {
            progress += 2;
            loadingProgress.style.width = Math.min(progress, 100) + '%';
        } else {
            clearInterval(completeProgress);
            clearInterval(progressInterval);
            
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
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran gambar maksimal 5MB!');
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar!');
        return;
    }
    
    // Show loading
    loading.classList.remove('hidden');
    result.classList.add('hidden');
    resultContainer.innerHTML = '';
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
        
        // Set timeout for fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 second timeout
        
        // Call Netlify Function
        const response = await fetch('/.netlify/functions/generate', {
            method: 'POST',
            body: formData,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            let errorMessage = 'Generate failed';
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorMessage;
            } catch (e) {
                errorMessage = `Server error: ${response.status}`;
            }
            throw new Error(errorMessage);
        }
        
        const data = await response.json();
        console.log('Generated successfully:', data);
        
        if (!data.success || !data.imageUrl) {
            throw new Error(data.error || 'Invalid response from server');
        }
        
        currentResultUrl = data.imageUrl;
        currentIsHtml = data.isHtml || false;
        
        // Display result
        if (currentIsHtml) {
            // Create iframe for HTML preview
            const iframe = document.createElement('iframe');
            iframe.src = data.imageUrl;
            iframe.style.width = '100%';
            iframe.style.height = '500px';
            iframe.style.border = 'none';
            iframe.style.borderRadius = '12px';
            iframe.style.backgroundColor = '#fff';
            
            resultContainer.innerHTML = '';
            resultContainer.appendChild(iframe);
        } else {
            // Create image element
            const img = document.createElement('img');
            img.id = 'resultImage';
            img.src = data.imageUrl;
            img.alt = 'Generated Quote';
            img.style.width = '100%';
            img.style.borderRadius = '12px';
            img.style.marginBottom = '20px';
            
            resultContainer.innerHTML = '';
            resultContainer.appendChild(img);
        }
        
        result.classList.remove('hidden');
        loading.classList.add('hidden');
        
        // Setup download button
        downloadBtn.onclick = async () => {
            try {
                console.log('Downloading file...');
                downloadBtn.disabled = true;
                downloadBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="animation: spin 1s linear infinite;">
                        <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66l1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14l-1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Downloading...
                `;
                
                const downloadResponse = await fetch('/.netlify/functions/download', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageUrl: currentResultUrl })
                });
                
                if (!downloadResponse.ok) {
                    throw new Error('Download failed');
                }
                
                const blob = await downloadResponse.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                const extension = currentIsHtml ? 'html' : 'jpg';
                a.download = `fake-fb-quote-${Date.now()}.${extension}`;
                a.href = url;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                console.log('Download complete');
            } catch (error) {
                console.error('Download error:', error);
                alert('Gagal download: ' + error.message + '. Silakan coba lagi.');
            } finally {
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" fill="currentColor"/>
                    </svg>
                    Download
                `;
            }
        };
        
    } catch (error) {
        console.error('Error:', error);
        
        let errorMessage = 'Terjadi kesalahan saat generate quote: ';
        
        if (error.name === 'AbortError') {
            errorMessage += 'Waktu habis. Server mungkin sedang sibuk. Silakan coba lagi.';
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage += 'Koneksi gagal. Periksa koneksi internet Anda.';
        } else if (error.message.includes('Unexpected token')) {
            errorMessage += 'Server mengembalikan respons yang tidak valid. Silakan coba lagi nanti.';
        } else {
            errorMessage += error.message;
        }
        
        alert(errorMessage);
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