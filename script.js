// Daftar format mockup (13 format termasuk YTComment)
const formats = [
    { id: 'brat', name: 'Brat Text', icon: 'fas fa-font', endpoint: '/maker/brat', baseUrl: 'https://api.zenzxz.my.id', params: [{ name: 'text', label: 'Teks', type: 'text', placeholder: 'Masukkan teks...' }] },
    { id: 'fakecall', name: 'Fake Call', icon: 'fas fa-phone-alt', endpoint: '/maker/fakecall', baseUrl: 'https://api.zenzxz.my.id', params: [
        { name: 'nama', label: 'Nama Penelepon', type: 'text', placeholder: 'Jhony' },
        { name: 'durasi', label: 'Durasi', type: 'text', placeholder: '19:31' },
        { name: 'avatar', label: 'URL Avatar', type: 'url', placeholder: 'https://cdn.discordapp.com/embed/avatars/0.png' }
    ] },
    { id: 'fakechannel', name: 'Fake Channel', icon: 'fab fa-youtube', endpoint: '/maker/fakechannel', baseUrl: 'https://api.zenzxz.my.id', params: [
        { name: 'url', label: 'URL Gambar', type: 'url' }, { name: 'name', label: 'Nama Channel', type: 'text' },
        { name: 'followers', label: 'Followers', type: 'text' }, { name: 'desc', label: 'Deskripsi', type: 'text' },
        { name: 'date', label: 'Tanggal', type: 'text' }
    ] },
    { id: 'fakedana', name: 'Fake DANA', icon: 'fas fa-wallet', endpoint: '/maker/fakedanav2', baseUrl: 'https://api.zenzxz.my.id', params: [{ name: 'nominal', label: 'Nominal', type: 'text', placeholder: 'Rp 100.000' }] },
    { id: 'fbcomment', name: 'FB Comment', icon: 'fab fa-facebook', endpoint: '/maker/fakefbcomment', baseUrl: 'https://api.zenzxz.my.id', params: [
        { name: 'name', label: 'Nama', type: 'text' }, { name: 'comment', label: 'Komentar', type: 'text' },
        { name: 'url', label: 'URL Foto Profil', type: 'url' }
    ] },
    { id: 'wagroup', name: 'WA Group', icon: 'fab fa-whatsapp', endpoint: '/maker/fakegroup', baseUrl: 'https://api.zenzxz.my.id', params: [
        { name: 'url', label: 'URL Icon', type: 'url' }, { name: 'title', label: 'Judul', type: 'text' },
        { name: 'number', label: 'Jumlah Pesan', type: 'text' }, { name: 'time', label: 'Waktu', type: 'text' }
    ] },
    { id: 'wagroupv2', name: 'WA Group V2', icon: 'fab fa-whatsapp', endpoint: '/maker/fakegroupv2', baseUrl: 'https://api.zenzxz.my.id', params: [
        { name: 'url', label: 'URL Avatar', type: 'url' }, { name: 'name', label: 'Nama Admin', type: 'text' },
        { name: 'members', label: 'Member', type: 'text' }, { name: 'desc', label: 'Deskripsi', type: 'text' },
        { name: 'author', label: 'Author', type: 'text' }, { name: 'date', label: 'Tanggal', type: 'text' }
    ] },
    { id: 'igpost', name: 'IG Post', icon: 'fab fa-instagram', endpoint: '/maker/fakeigpost', baseUrl: 'https://api.zenzxz.my.id', params: [
        { name: 'avatar', label: 'URL Avatar', type: 'url' }, { name: 'content', label: 'URL Konten', type: 'url' },
        { name: 'username', label: 'Username', type: 'text' }, { name: 'likes', label: 'Likes', type: 'text' },
        { name: 'comment', label: 'Comments', type: 'text' }, { name: 'share', label: 'Share', type: 'text' },
        { name: 'repost', label: 'Repost', type: 'text' }, { name: 'date', label: 'Tanggal', type: 'text' },
        { name: 'desc', label: 'Caption', type: 'textarea' }
    ] },
    { id: 'tiktokprofile', name: 'TikTok Profile', icon: 'fab fa-tiktok', endpoint: '/maker/faketiktok', baseUrl: 'https://api.zenzxz.my.id', params: [
        { name: 'name', label: 'Nama', type: 'text' }, { name: 'username', label: 'Username', type: 'text' },
        { name: 'following', label: 'Following', type: 'text' }, { name: 'followers', label: 'Followers', type: 'text' },
        { name: 'likes', label: 'Likes', type: 'text' }, { name: 'url', label: 'URL Foto', type: 'url' }
    ] },
    { id: 'tiktokcomment', name: 'TikTok Comment', icon: 'fab fa-tiktok', endpoint: '/maker/fakettcomment', baseUrl: 'https://api.zenzxz.my.id', params: [
        { name: 'url', label: 'URL Foto', type: 'url' }, { name: 'username', label: 'Username', type: 'text' },
        { name: 'comment', label: 'Komentar', type: 'text' }, { name: 'date', label: 'Tanggal', type: 'text' }
    ] },
    { id: 'ytcommunity', name: 'YT Community', icon: 'fab fa-youtube', endpoint: '/maker/fakeytcomunity', baseUrl: 'https://api.zenzxz.my.id', params: [
        { name: 'avatar', label: 'URL Avatar', type: 'url' }, { name: 'content', label: 'URL Konten', type: 'url' },
        { name: 'username', label: 'Username', type: 'text' }, { name: 'desc', label: 'Deskripsi', type: 'text' },
        { name: 'like', label: 'Like', type: 'text' }, { name: 'comment', label: 'Comment', type: 'text' }
    ] },
    // YTCOMMENT - MENGGUNAKAN API DARI deline.web.id
    { id: 'ytcomment', name: 'YT Comment', icon: 'fab fa-youtube', endpoint: '/maker/ytcomment', baseUrl: 'https://api.deline.web.id', params: [
        { name: 'username', label: 'Username', type: 'text', placeholder: 'cpmjhon21' },
        { name: 'text', label: 'Komentar', type: 'textarea', placeholder: 'Tulis komentar di sini...' },
        { name: 'avatar', label: 'URL Avatar', type: 'url', placeholder: 'https://example.com/avatar.jpg' }
    ] }
];

let activeFormat = formats[0];

// ========== VERIFICATION GATE ==========
let isFollowed = false;
let isShared = false;
let verificationCompleted = false;

// Cek apakah user sudah pernah verifikasi sebelumnya (localStorage)
if (localStorage.getItem('quickfake_verified') === 'true') {
    verificationCompleted = true;
    document.getElementById('gatePage').classList.add('hidden');
    document.getElementById('splashScreen').style.display = 'flex';
    // Lanjutkan ke splash screen dan main content
    initSplashScreen();
    renderFormatGrid();
    renderParamForm();
    initNavigation();
    
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) generateBtn.addEventListener('click', generateMockup);
    
    const sswebBtn = document.getElementById('sswebGenerateBtn');
    if (sswebBtn) sswebBtn.addEventListener('click', generateSSWeb);
} else {
    // Tampilkan gate page, sembunyikan main content
    document.getElementById('gatePage').style.display = 'flex';
    document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('mainContent').classList.add('hidden');
}

function followSaluran() {
    // Link saluran WhatsApp
    window.open('https://whatsapp.com/channel/0029VaLiUSS5q08hPj5mcH0m', '_blank');
    isFollowed = true;
    cekProgress();
}

function shareWA() {
    // Format chat sesuai permintaan
    const waText = `*WEBSITE QuickFake By Jhon*\n> ${window.location.href}\n\n*SUMBER UTAMA*\n> https://whatsapp.com/channel/0029VaLiUSS5q08hPj5mcH0m`;
    const encodedText = encodeURIComponent(waText);
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
    isShared = true;
    cekProgress();
}

function cekProgress() {
    const pBar = document.getElementById('pBar');
    const statusText = document.getElementById('statusText');
    let progress = 0;
    
    if (isFollowed) progress += 50;
    if (isShared) progress += 50;
    
    pBar.style.width = progress + '%';
    statusText.style.display = 'block';
    
    if (progress === 100) {
        statusText.innerHTML = '✅ Verifikasi berhasil! Mengalihkan...';
        statusText.style.color = '#10b981';
        
        // Simpan status verifikasi ke localStorage
        localStorage.setItem('quickfake_verified', 'true');
        
        setTimeout(() => {
            // Sembunyikan gate page
            const gatePage = document.getElementById('gatePage');
            gatePage.classList.add('hidden');
            
            // Tampilkan splash screen dan main content
            document.getElementById('splashScreen').style.display = 'flex';
            document.getElementById('mainContent').classList.remove('hidden');
            
            // Jalankan inisialisasi
            initSplashScreen();
            renderFormatGrid();
            renderParamForm();
            initNavigation();
            
            const generateBtn = document.getElementById('generateBtn');
            if (generateBtn) generateBtn.addEventListener('click', generateMockup);
            
            const sswebBtn = document.getElementById('sswebGenerateBtn');
            if (sswebBtn) sswebBtn.addEventListener('click', generateSSWeb);
            
        }, 1500);
    } else {
        statusText.innerHTML = `Progress: ${progress}% - Selesaikan kedua tugas!`;
        statusText.style.color = '#f59e0b';
    }
}

// ========== SPLASH SCREEN ==========
function initSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    const progressFill = document.getElementById('progressFill');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const loadingStatus = document.getElementById('loadingStatus');
    
    const messages = [
        { text: '🎨 Loading features...', progress: 20 },
        { text: '⚡ Connecting to API...', progress: 40 },
        { text: '✨ Preparing generators...', progress: 60 },
        { text: '📸 Adding SSWeb...', progress: 75 },
        { text: '💬 Adding YT Comment...', progress: 90 },
        { text: '🎉 Welcome to QuickFake!', progress: 100 }
    ];
    
    let currentProgress = 0;
    let msgIndex = 0;
    
    createParticles();
    
    function updateProgress() {
        const target = messages[msgIndex]?.progress || 100;
        const interval = setInterval(() => {
            if (currentProgress < target) {
                currentProgress++;
                progressFill.style.width = currentProgress + '%';
                loadingPercentage.textContent = currentProgress;
            } else {
                clearInterval(interval);
                if (msgIndex < messages.length - 1) {
                    msgIndex++;
                    const icons = ['', 'network-wired', 'palette', 'camera', 'comment', 'check-circle'];
                    loadingStatus.innerHTML = `<i class="fas fa-${icons[msgIndex]}"></i> ${messages[msgIndex].text}`;
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
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.position = 'absolute';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 3 + 's';
        p.style.animationDuration = 2 + Math.random() * 2 + 's';
        p.style.background = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
        container.appendChild(p);
    }
}

// ========== GENERATE LOADING ==========
function showGenerateLoading(prefix = '') {
    const btn = document.getElementById(`${prefix}generateBtn`);
    const loading = document.getElementById(`${prefix}generateLoading`);
    const fill = document.getElementById(`${prefix}generateProgressFill`);
    const percent = document.getElementById(`${prefix}generateProgressPercent`);
    const msg = document.getElementById(`${prefix}generateLoadingMessage`);
    
    if (btn) btn.classList.add('hidden');
    if (loading) loading.classList.remove('hidden');
    
    const texts = [
        { icon: 'fa-paintbrush-fine', text: 'Processing...' },
        { icon: 'fa-cogs', text: 'Almost there...' },
        { icon: 'fa-magic', text: 'Finalizing...' }
    ];
    
    let progress = 0, idx = 0;
    const interval = setInterval(() => {
        if (progress < 95) {
            progress += Math.random() * 12;
            if (progress > 95) progress = 95;
            if (fill) fill.style.width = progress + '%';
            if (percent) percent.textContent = Math.floor(progress);
        }
        if (progress >= 30 && idx === 0 && msg) { idx++; msg.innerHTML = `<i class="fas ${texts[1].icon}"></i> ${texts[1].text}`; }
        if (progress >= 60 && idx === 1 && msg) { idx++; msg.innerHTML = `<i class="fas ${texts[2].icon}"></i> ${texts[2].text}`; }
    }, 180);
    
    return { interval, fill, percent };
}

function hideGenerateLoading(loading, fill, percent, success = true, prefix = '') {
    if (loading) clearInterval(loading);
    const btn = document.getElementById(`${prefix}generateBtn`);
    const container = document.getElementById(`${prefix}generateLoading`);
    if (success && fill && percent) {
        fill.style.width = '100%';
        percent.textContent = '100';
        setTimeout(() => { 
            if (container) container.classList.add('hidden'); 
            if (btn) btn.classList.remove('hidden'); 
        }, 500);
    } else {
        if (container) container.classList.add('hidden');
        if (btn) btn.classList.remove('hidden');
    }
}

// ========== MOCKUP FUNCTIONS ==========
function renderFormatGrid() {
    const grid = document.getElementById('formatGrid');
    if (!grid) return;
    grid.innerHTML = formats.map(f => `
        <div class="format-item ${activeFormat.id === f.id ? 'active' : ''}" data-id="${f.id}">
            <i class="${f.icon}"></i> ${f.name}
        </div>
    `).join('');
    
    document.querySelectorAll('.format-item').forEach(el => {
        el.addEventListener('click', () => {
            activeFormat = formats.find(f => f.id === el.dataset.id);
            renderFormatGrid();
            renderParamForm();
            const resultArea = document.getElementById('resultArea');
            if (resultArea) resultArea.innerHTML = `<div class="result-placeholder"><i class="fas fa-image"></i><p>Hasil mockup akan tampil di sini</p></div>`;
        });
    });
}

function renderParamForm() {
    const container = document.getElementById('paramForm');
    if (!container) return;
    if (!activeFormat.params?.length) {
        container.innerHTML = '<div class="input-group"><p style="color:#9ca3af;">Tidak ada parameter</p></div>';
        return;
    }
    container.innerHTML = activeFormat.params.map(p => `
        <div class="input-group">
            <label>${p.label}</label>
            ${p.type === 'textarea' ? 
                `<textarea name="${p.name}" rows="3" placeholder="${p.placeholder || ''}"></textarea>` : 
                `<input type="${p.type}" name="${p.name}" placeholder="${p.placeholder || ''}" />`}
        </div>
    `).join('');
}

async function generateMockup() {
    const resultDiv = document.getElementById('resultArea');
    const inputs = document.querySelectorAll('#paramForm input, #paramForm textarea');
    let params = {};
    inputs.forEach(inp => { if (inp.value.trim()) params[inp.name] = encodeURIComponent(inp.value.trim()); });
    
    if (activeFormat.id === 'brat' && !params.text) {
        if (window.showToast) window.showToast('Masukkan teks terlebih dahulu', 'error');
        return;
    }
    
    if (activeFormat.id === 'ytcomment') {
        if (!params.username) {
            if (window.showToast) window.showToast('Masukkan username terlebih dahulu', 'error');
            return;
        }
        if (!params.text) {
            if (window.showToast) window.showToast('Masukkan komentar terlebih dahulu', 'error');
            return;
        }
        if (!params.avatar) {
            if (window.showToast) window.showToast('Masukkan URL avatar terlebih dahulu', 'error');
            return;
        }
    }
    
    const { interval, fill, percent } = showGenerateLoading('');
    
    const baseUrl = activeFormat.baseUrl || 'https://api.zenzxz.my.id';
    let apiUrl = `${baseUrl}${activeFormat.endpoint}?`;
    apiUrl += Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');
    
    try {
        const response = await fetch(apiUrl, { method: 'GET', mode: 'cors', headers: { 'Accept': 'image/*' } });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const blob = await response.blob();
        if (!blob.type.startsWith('image/')) throw new Error('Bukan format gambar');
        
        const imageUrl = URL.createObjectURL(blob);
        
        resultDiv.innerHTML = `
            <div class="result-content">
                <img src="${imageUrl}" alt="Mockup" style="max-width:100%; border-radius:1rem; box-shadow:0 8px 20px rgba(0,0,0,0.3);" />
                <div style="margin-top:20px; text-align:center;">
                    <button class="download-btn" id="downloadImageBtn">
                        <i class="fas fa-download"></i> Download Gambar
                    </button>
                </div>
            </div>
        `;
        
        const downloadBtn = document.getElementById('downloadImageBtn');
        if (downloadBtn) {
            const newBtn = downloadBtn.cloneNode(true);
            downloadBtn.parentNode.replaceChild(newBtn, downloadBtn);
            
            newBtn.onclick = async (e) => {
                e.preventDefault();
                if (typeof window.downloadImage === 'function') {
                    await window.downloadImage(imageUrl, `${activeFormat.id}_mockup_${Date.now()}.png`);
                } else {
                    const a = document.createElement('a');
                    a.href = imageUrl;
                    a.download = `${activeFormat.id}_mockup_${Date.now()}.png`;
                    a.click();
                }
            };
        }
        
        hideGenerateLoading(interval, fill, percent, true, '');
        if (window.showToast) window.showToast('Mockup berhasil dibuat!', 'success');
        
    } catch (err) {
        resultDiv.innerHTML = `<div class="result-placeholder"><i class="fas fa-times-circle"></i><p>Gagal: ${err.message}</p></div>`;
        hideGenerateLoading(interval, fill, percent, false, '');
        if (window.showToast) window.showToast(err.message, 'error');
    }
}

// ========== SSWEB FUNCTIONS ==========
async function generateSSWeb() {
    const url = document.getElementById('sswebUrl')?.value;
    const device = document.getElementById('sswebDevice')?.value;
    const fullPage = document.getElementById('sswebFullPage')?.value;
    const scale = document.getElementById('sswebScale')?.value;
    
    if (!url) {
        if (window.showToast) window.showToast('Masukkan URL website terlebih dahulu', 'error');
        return;
    }
    if (!device) {
        if (window.showToast) window.showToast('Pilih perangkat (Desktop/Mobile/Tablet)', 'error');
        return;
    }
    if (!fullPage) {
        if (window.showToast) window.showToast('Pilih opsi Halaman Penuh (Ya/Tidak)', 'error');
        return;
    }
    if (!scale) {
        if (window.showToast) window.showToast('Pilih skala (1x/2x/3x)', 'error');
        return;
    }
    
    const resultDiv = document.getElementById('sswebResultArea');
    const generateBtn = document.getElementById('sswebGenerateBtn');
    const loadingDiv = document.getElementById('sswebLoading');
    const loadingFill = document.getElementById('sswebProgressFill');
    const loadingPercent = document.getElementById('sswebProgressPercent');
    const loadingMessage = document.getElementById('sswebLoadingMessage');
    
    generateBtn.classList.add('hidden');
    loadingDiv.classList.remove('hidden');
    
    loadingFill.style.width = '0%';
    loadingPercent.textContent = '0';
    loadingMessage.innerHTML = '<i class="fas fa-globe"></i> Menghubungkan ke server...';
    
    let progress = 0;
    let msgIndex = 0;
    const loadingMessages = [
        { icon: 'fa-globe', text: 'Menghubungkan ke server...' },
        { icon: 'fa-camera', text: 'Mengambil screenshot...' },
        { icon: 'fa-image', text: 'Memproses gambar...' },
        { icon: 'fa-check-circle', text: 'Menyelesaikan...' }
    ];
    
    const progressInterval = setInterval(() => {
        if (progress < 90) {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90;
            loadingFill.style.width = progress + '%';
            loadingPercent.textContent = Math.floor(progress);
        }
        
        if (progress >= 20 && msgIndex === 0) {
            msgIndex++;
            loadingMessage.innerHTML = `<i class="fas ${loadingMessages[msgIndex].icon}"></i> ${loadingMessages[msgIndex].text}`;
        } else if (progress >= 50 && msgIndex === 1) {
            msgIndex++;
            loadingMessage.innerHTML = `<i class="fas ${loadingMessages[msgIndex].icon}"></i> ${loadingMessages[msgIndex].text}`;
        } else if (progress >= 75 && msgIndex === 2) {
            msgIndex++;
            loadingMessage.innerHTML = `<i class="fas ${loadingMessages[msgIndex].icon}"></i> ${loadingMessages[msgIndex].text}`;
        }
    }, 200);
    
    let apiUrl = `https://api.zenzxz.my.id/tools/ssweb?url=${encodeURIComponent(url)}`;
    if (device) apiUrl += `&device=${device}`;
    if (fullPage) apiUrl += `&full_page=${fullPage}`;
    if (scale) apiUrl += `&scale=${scale}`;
    
    try {
        const response = await fetch(apiUrl, { method: 'GET', mode: 'cors' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        
        if (!data.status || !data.result?.url) {
            throw new Error(data.message || 'Gagal mengambil screenshot');
        }
        
        const imageUrl = data.result.url;
        
        clearInterval(progressInterval);
        loadingFill.style.width = '100%';
        loadingPercent.textContent = '100';
        loadingMessage.innerHTML = '<i class="fas fa-check-circle"></i> Selesai!';
        
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="result-content">
                    <img src="${imageUrl}" alt="Screenshot" style="max-width:100%; border-radius:1rem; box-shadow:0 8px 20px rgba(0,0,0,0.3);" />
                    <div style="margin-top:20px; text-align:center;">
                        <button class="download-btn" id="sswebDownloadBtn">
                            <i class="fas fa-download"></i> Download Screenshot
                        </button>
                    </div>
                    <p style="font-size:0.7rem; color:#6c757d; margin-top:12px;">📸 ${url.substring(0, 50)}${url.length > 50 ? '...' : ''}</p>
                </div>
            `;
            
            const downloadBtn = document.getElementById('sswebDownloadBtn');
            if (downloadBtn) {
                const newBtn = downloadBtn.cloneNode(true);
                downloadBtn.parentNode.replaceChild(newBtn, downloadBtn);
                
                newBtn.onclick = async (e) => {
                    e.preventDefault();
                    if (typeof window.downloadImage === 'function') {
                        await window.downloadImage(imageUrl, `screenshot_${Date.now()}.png`);
                    } else {
                        const a = document.createElement('a');
                        a.href = imageUrl;
                        a.download = `screenshot_${Date.now()}.png`;
                        a.click();
                    }
                };
            }
            
            loadingDiv.classList.add('hidden');
            generateBtn.classList.remove('hidden');
        }, 500);
        
        if (window.showToast) window.showToast('Screenshot berhasil diambil!', 'success');
        
    } catch (err) {
        clearInterval(progressInterval);
        
        resultDiv.innerHTML = `
            <div class="result-placeholder">
                <i class="fas fa-times-circle"></i>
                <p>❌ Gagal: ${err.message}</p>
                <p style="font-size:0.8rem; margin-top:8px;">Pastikan URL valid dan semua parameter telah diisi</p>
            </div>
        `;
        
        loadingDiv.classList.add('hidden');
        generateBtn.classList.remove('hidden');
        
        if (window.showToast) window.showToast(err.message, 'error');
    }
}

// ========== NAVIGATION ==========
function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    const pages = {
        home: document.getElementById('homePage'),
        ssweb: document.getElementById('sswebPage'),
        howto: document.getElementById('howtoPage'),
        guide: document.getElementById('guidePage'),
        docs: document.getElementById('docsPage')
    };
    
    function switchPage(pageId) {
        Object.values(pages).forEach(p => p?.classList.remove('active-page'));
        if (pages[pageId]) pages[pageId].classList.add('active-page');
        links.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
        if (activeLink) activeLink.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    links.forEach(l => {
        l.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage(l.dataset.page);
            document.getElementById('navMenu')?.classList.remove('active');
        });
    });
    
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            document.getElementById('navMenu')?.classList.toggle('active');
        });
    }
    
    switchPage('home');
}

// ========== INITIALIZATION ==========
// Note: Initialization is handled by verification gate
// Only run if already verified
if (verificationCompleted) {
    // Already handled above
} else {
    // Gate page is active, nothing to initialize yet
    console.log('Waiting for verification...');
}