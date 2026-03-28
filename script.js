// Daftar format mockup beserta endpoint & parameter
const formats = [
    { id: 'brat', name: 'Brat Text', icon: 'fas fa-font', endpoint: '/maker/brat', params: [{ name: 'text', label: 'Teks', type: 'text', placeholder: 'Masukkan teks untuk mockup Brat...' }] },
    { id: 'fakecall', name: 'Fake Call', icon: 'fas fa-phone-alt', endpoint: '/maker/fakecall', params: [
        { name: 'nama', label: 'Nama Penelepon', type: 'text', placeholder: 'Jhony' },
        { name: 'durasi', label: 'Durasi', type: 'text', placeholder: '19:31' },
        { name: 'avatar', label: 'URL Avatar', type: 'url', placeholder: 'https://cdn.discordapp.com/embed/avatars/0.png' }
    ] },
    { id: 'fakechannel', name: 'Fake Channel', icon: 'fab fa-youtube', endpoint: '/maker/fakechannel', params: [
        { name: 'url', label: 'URL Gambar Channel', type: 'url', placeholder: 'https://example.com/image.jpg' },
        { name: 'name', label: 'Nama Channel', type: 'text', placeholder: 'Cpmjhon' },
        { name: 'followers', label: 'Followers', type: 'text', placeholder: '1928' },
        { name: 'desc', label: 'Deskripsi', type: 'text', placeholder: 'Halo' },
        { name: 'date', label: 'Tanggal', type: 'text', placeholder: '29 des 102' }
    ] },
    { id: 'fakedana', name: 'Fake DANA', icon: 'fas fa-wallet', endpoint: '/maker/fakedanav2', params: [
        { name: 'nominal', label: 'Nominal', type: 'text', placeholder: 'Rp 100.000' }
    ] },
    { id: 'fbcomment', name: 'FB Comment', icon: 'fab fa-facebook', endpoint: '/maker/fakefbcomment', params: [
        { name: 'name', label: 'Nama', type: 'text', placeholder: 'Cpmjhon' },
        { name: 'comment', label: 'Komentar', type: 'text', placeholder: 'Halo' },
        { name: 'url', label: 'URL Foto Profil', type: 'url', placeholder: 'https://example.com/avatar.jpg' }
    ] },
    { id: 'wagroup', name: 'WA Group', icon: 'fab fa-whatsapp', endpoint: '/maker/fakegroup', params: [
        { name: 'url', label: 'URL Icon Group', type: 'url', placeholder: 'https://example.com/icon.jpg' },
        { name: 'title', label: 'Judul Group', type: 'text', placeholder: 'Hahah' },
        { name: 'number', label: 'Jumlah Pesan', type: 'text', placeholder: '8919292' },
        { name: 'time', label: 'Waktu', type: 'text', placeholder: '8919' }
    ] },
    { id: 'wagroupv2', name: 'WA Group V2', icon: 'fab fa-whatsapp', endpoint: '/maker/fakegroupv2', params: [
        { name: 'url', label: 'URL Avatar', type: 'url', placeholder: 'https://example.com/avatar.jpg' },
        { name: 'name', label: 'Nama Admin', type: 'text', placeholder: 'Cpmjhon' },
        { name: 'members', label: 'Jumlah Member', type: 'text', placeholder: '100' },
        { name: 'desc', label: 'Deskripsi', type: 'text', placeholder: 'Halo' },
        { name: 'author', label: 'Author', type: 'text', placeholder: 'Jhon' },
        { name: 'date', label: 'Tanggal', type: 'text', placeholder: '18929292' }
    ] },
    { id: 'igpost', name: 'IG Post', icon: 'fab fa-instagram', endpoint: '/maker/fakeigpost', params: [
        { name: 'avatar', label: 'URL Avatar', type: 'url', placeholder: 'https://cdn.popcat.xyz/popcat.png' },
        { name: 'content', label: 'URL Konten', type: 'url', placeholder: 'https://cdn.popcat.xyz/popcat.png' },
        { name: 'username', label: 'Username', type: 'text', placeholder: 'cpmjhon21' },
        { name: 'likes', label: 'Jumlah Like', type: 'text', placeholder: '100' },
        { name: 'comment', label: 'Jumlah Comment', type: 'text', placeholder: '1888' },
        { name: 'share', label: 'Share', type: 'text', placeholder: '1771' },
        { name: 'repost', label: 'Repost', type: 'text', placeholder: 'I18' },
        { name: 'date', label: 'Tanggal', type: 'text', placeholder: '7wjjs' },
        { name: 'desc', label: 'Caption', type: 'textarea', placeholder: 'Hwjsi' }
    ] },
    { id: 'tiktokprofile', name: 'TikTok Profile', icon: 'fab fa-tiktok', endpoint: '/maker/faketiktok', params: [
        { name: 'name', label: 'Nama', type: 'text', placeholder: 'Cpmjhon' },
        { name: 'username', label: 'Username', type: 'text', placeholder: 'Y2hwjsi' },
        { name: 'following', label: 'Following', type: 'text', placeholder: 'Ua8191881' },
        { name: 'followers', label: 'Followers', type: 'text', placeholder: 'Jakqow' },
        { name: 'likes', label: 'Likes', type: 'text', placeholder: 'Wjwjjw' },
        { name: 'url', label: 'URL Foto Profil', type: 'url', placeholder: 'https://example.com/avatar.jpg' }
    ] },
    { id: 'tiktokcomment', name: 'TikTok Comment', icon: 'fab fa-tiktok', endpoint: '/maker/fakettcomment', params: [
        { name: 'url', label: 'URL Foto Profil', type: 'url', placeholder: 'https://example.com/avatar.jpg' },
        { name: 'username', label: 'Username', type: 'text', placeholder: 'cpmjhon21' },
        { name: 'comment', label: 'Komentar', type: 'text', placeholder: 'Hao' },
        { name: 'date', label: 'Tanggal', type: 'text', placeholder: 'Uwiwo2' }
    ] },
    { id: 'ytcommunity', name: 'YT Community', icon: 'fab fa-youtube', endpoint: '/maker/fakeytcomunity', params: [
        { name: 'avatar', label: 'URL Avatar', type: 'url', placeholder: 'https://cdn.popcat.xyz/popcat.png' },
        { name: 'content', label: 'URL Konten', type: 'url', placeholder: 'https://cdn.popcat.xyz/popcat.png' },
        { name: 'username', label: 'Username', type: 'text', placeholder: 'cpmjhon21' },
        { name: 'desc', label: 'Deskripsi', type: 'text', placeholder: 'Balo' },
        { name: 'like', label: 'Jumlah Like', type: 'text', placeholder: '91019' },
        { name: 'comment', label: 'Jumlah Comment', type: 'text', placeholder: 'U18199' }
    ] }
];

let activeFormat = formats[0];

// ========== SPLASH SCREEN LOGIC ==========
function initSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    const progressFill = document.getElementById('progressFill');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const loadingStatus = document.getElementById('loadingStatus');
    
    const statusMessages = [
        { text: '🎨 Loading awesome features...', progress: 20 },
        { text: '⚡ Connecting to ZENZX API...', progress: 40 },
        { text: '✨ Preparing mockup generators...', progress: 60 },
        { text: '🚀 Almost ready...', progress: 80 },
        { text: '🎉 Welcome to QuickFake!', progress: 100 }
    ];
    
    let currentProgress = 0;
    let messageIndex = 0;
    
    // Create particles
    createParticles();
    
    function updateProgress() {
        const targetProgress = statusMessages[messageIndex]?.progress || 100;
        
        const interval = setInterval(() => {
            if (currentProgress < targetProgress) {
                currentProgress++;
                progressFill.style.width = currentProgress + '%';
                loadingPercentage.textContent = currentProgress;
            } else {
                clearInterval(interval);
                if (messageIndex < statusMessages.length - 1) {
                    messageIndex++;
                    loadingStatus.innerHTML = `<i class="fas fa-${messageIndex === 1 ? 'network-wired' : messageIndex === 2 ? 'palette' : messageIndex === 3 ? 'rocket' : 'check-circle'}"></i> ${statusMessages[messageIndex].text}`;
                    updateProgress();
                } else {
                    setTimeout(() => {
                        splashScreen.classList.add('fade-out');
                        mainContent.classList.remove('hidden');
                        setTimeout(() => {
                            mainContent.classList.add('visible');
                            splashScreen.style.display = 'none';
                        }, 800);
                    }, 500);
                }
            }
        }, 30);
    }
    
    updateProgress();
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = 2 + Math.random() * 2 + 's';
        particle.style.background = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
        particlesContainer.appendChild(particle);
    }
}

// ========== GENERATE LOADING REAL-TIME ==========
function showGenerateLoading() {
    const generateBtn = document.getElementById('generateBtn');
    const generateLoading = document.getElementById('generateLoading');
    const progressFill = document.getElementById('generateProgressFill');
    const progressPercent = document.getElementById('generateProgressPercent');
    const loadingMessage = document.getElementById('generateLoadingMessage');
    
    generateBtn.classList.add('hidden');
    generateLoading.classList.remove('hidden');
    
    const messages = [
        { icon: 'fa-paintbrush-fine', text: 'Creating your mockup...' },
        { icon: 'fa-cogs', text: 'Processing image...' },
        { icon: 'fa-magic', text: 'Applying effects...' },
        { icon: 'fa-check-circle', text: 'Finalizing...' }
    ];
    
    let progress = 0;
    let msgIndex = 0;
    
    const interval = setInterval(() => {
        if (progress < 95) {
            progress += Math.random() * 15;
            if (progress > 95) progress = 95;
            progressFill.style.width = progress + '%';
            progressPercent.textContent = Math.floor(progress);
        }
        
        if (progress >= 30 && msgIndex === 0) {
            msgIndex++;
            loadingMessage.innerHTML = `<i class="fas ${messages[msgIndex].icon}"></i> ${messages[msgIndex].text}`;
        } else if (progress >= 60 && msgIndex === 1) {
            msgIndex++;
            loadingMessage.innerHTML = `<i class="fas ${messages[msgIndex].icon}"></i> ${messages[msgIndex].text}`;
        } else if (progress >= 80 && msgIndex === 2) {
            msgIndex++;
            loadingMessage.innerHTML = `<i class="fas ${messages[msgIndex].icon}"></i> ${messages[msgIndex].text}`;
        }
    }, 200);
    
    return { interval, progressFill, progressPercent };
}

function hideGenerateLoading(loadingInterval, progressFill, progressPercent, success = true) {
    if (loadingInterval) clearInterval(loadingInterval);
    
    const generateBtn = document.getElementById('generateBtn');
    const generateLoading = document.getElementById('generateLoading');
    
    if (success) {
        if (progressFill && progressPercent) {
            progressFill.style.width = '100%';
            progressPercent.textContent = '100';
        }
        
        setTimeout(() => {
            generateLoading.classList.add('hidden');
            generateBtn.classList.remove('hidden');
        }, 500);
    } else {
        generateLoading.classList.add('hidden');
        generateBtn.classList.remove('hidden');
    }
}

// ========== MAIN FUNCTIONS ==========
function renderFormatGrid() {
    const grid = document.getElementById('formatGrid');
    grid.innerHTML = formats.map(f => `
        <div class="format-item ${activeFormat.id === f.id ? 'active' : ''}" data-id="${f.id}">
            <i class="${f.icon}"></i> ${f.name}
        </div>
    `).join('');
    
    document.querySelectorAll('.format-item').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.dataset.id;
            activeFormat = formats.find(f => f.id === id);
            renderFormatGrid();
            renderParamForm();
            const resultArea = document.getElementById('resultArea');
            resultArea.innerHTML = `<div class="result-placeholder"><i class="fas fa-image"></i><p>Hasil mockup akan tampil di sini</p></div>`;
        });
    });
}

function renderParamForm() {
    const container = document.getElementById('paramForm');
    if (!activeFormat.params || activeFormat.params.length === 0) {
        container.innerHTML = '<div class="input-group"><p style="color:#9ca3af;">Tidak ada parameter yang diperlukan</p></div>';
        return;
    }
    
    container.innerHTML = activeFormat.params.map(p => `
        <div class="input-group">
            <label>${p.label}</label>
            ${p.type === 'textarea' ? 
                `<textarea name="${p.name}" rows="3" placeholder="${p.placeholder || ''}"></textarea>` : 
                `<input type="${p.type}" name="${p.name}" placeholder="${p.placeholder || ''}" />`
            }
        </div>
    `).join('');
}

async function generateMockup() {
    const resultDiv = document.getElementById('resultArea');
    
    // Kumpulkan parameter dari form
    const inputs = document.querySelectorAll('#paramForm input, #paramForm textarea');
    let params = {};
    
    inputs.forEach(inp => {
        const value = inp.value.trim();
        if (value) {
            params[inp.name] = encodeURIComponent(value);
        }
    });
    
    // Validasi untuk brat text
    if (activeFormat.id === 'brat' && !params.text) {
        if (window.showToast) window.showToast('Mohon isi parameter teks', 'error');
        return;
    }
    
    // Tampilkan loading real-time
    const { interval, progressFill, progressPercent } = showGenerateLoading();
    
    // Buat URL endpoint API
    let apiUrl = `https://api.zenzxz.my.id${activeFormat.endpoint}?`;
    const queryParts = [];
    for (const [key, val] of Object.entries(params)) {
        queryParts.push(`${key}=${val}`);
    }
    apiUrl += queryParts.join('&');
    
    console.log('Requesting:', apiUrl);
    
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Accept': 'image/*' }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const blob = await response.blob();
        
        if (!blob.type.startsWith('image/')) {
            throw new Error('API tidak mengembalikan format gambar');
        }
        
        const imageUrl = URL.createObjectURL(blob);
        
        resultDiv.innerHTML = `
            <div class="result-content">
                <img src="${imageUrl}" alt="Mockup Result" id="resultImage" style="max-width:100%; border-radius:1rem; box-shadow:0 8px 20px rgba(0,0,0,0.3);" />
                <div style="margin-top: 20px; text-align: center;">
                    <button class="download-btn" id="downloadImageBtn">
                        <i class="fas fa-download"></i> Download Gambar
                    </button>
                </div>
            </div>
        `;
        
        const downloadBtn = document.getElementById('downloadImageBtn');
        if (downloadBtn) {
            downloadBtn.onclick = async (e) => {
                e.preventDefault();
                if (typeof window.downloadImage === 'function') {
                    await window.downloadImage(imageUrl, `${activeFormat.id}_mockup_${Date.now()}.png`);
                } else {
                    console.error('downloadImage function not found');
                    window.open(imageUrl, '_blank');
                }
            };
        }
        
        hideGenerateLoading(interval, progressFill, progressPercent, true);
        if (window.showToast) window.showToast('Mockup berhasil dibuat!', 'success');
        
    } catch (err) {
        console.error('Generate error:', err);
        resultDiv.innerHTML = `
            <div class="result-placeholder">
                <i class="fas fa-times-circle"></i>
                <p>❌ Gagal generate: ${err.message}</p>
                <p style="font-size:0.8rem; margin-top:8px;">Coba periksa koneksi internet dan parameter yang dimasukkan</p>
            </div>
        `;
        hideGenerateLoading(interval, progressFill, progressPercent, false);
        if (window.showToast) window.showToast(err.message, 'error');
    }
}

// ========== NAVBAR & PAGE NAVIGATION ==========
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = {
        home: document.getElementById('homePage'),
        howto: document.getElementById('howtoPage'),
        guide: document.getElementById('guidePage'),
        docs: document.getElementById('docsPage')
    };
    
    function switchPage(pageId) {
        Object.values(pages).forEach(page => {
            if (page) page.classList.remove('active-page');
        });
        
        if (pages[pageId]) {
            pages[pageId].classList.add('active-page');
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.dataset.page;
            if (pageId) switchPage(pageId);
        });
    });
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    switchPage('home');
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initSplashScreen();
    renderFormatGrid();
    renderParamForm();
    initNavigation();
    
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateMockup);
    }
});