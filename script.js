// Daftar format mockup beserta endpoint & parameter
const formats = [
    { id: 'brat', name: 'Brat Text', icon: 'fas fa-font', endpoint: '/maker/brat', params: [{ name: 'text', label: 'Teks', type: 'text', placeholder: 'Masukkan teks...' }] },
    { id: 'fakecall', name: 'Fake Call', icon: 'fas fa-phone-alt', endpoint: '/maker/fakecall', params: [{ name: 'nama', label: 'Nama Penelepon', type: 'text', placeholder: 'Jhony' }, { name: 'durasi', label: 'Durasi (19:31)', type: 'text', placeholder: '19:31' }, { name: 'avatar', label: 'URL Avatar', type: 'url', placeholder: 'https://...' }] },
    { id: 'fakechannel', name: 'Fake Channel', icon: 'fab fa-youtube', endpoint: '/maker/fakechannel', params: [{ name: 'url', label: 'URL Gambar Channel', type: 'url' }, { name: 'name', label: 'Nama Channel', type: 'text' }, { name: 'followers', label: 'Followers', type: 'text' }, { name: 'desc', label: 'Deskripsi', type: 'text' }, { name: 'date', label: 'Tanggal', type: 'text' }] },
    { id: 'fakedana', name: 'Fake DANA', icon: 'fas fa-wallet', endpoint: '/maker/fakedanav2', params: [{ name: 'nominal', label: 'Nominal', type: 'text', placeholder: 'Rp 100.000' }] },
    { id: 'fbcomment', name: 'FB Comment', icon: 'fab fa-facebook', endpoint: '/maker/fakefbcomment', params: [{ name: 'name', label: 'Nama', type: 'text' }, { name: 'comment', label: 'Komentar', type: 'text' }, { name: 'url', label: 'URL Foto Profil', type: 'url' }] },
    { id: 'wagroup', name: 'WA Group', icon: 'fab fa-whatsapp', endpoint: '/maker/fakegroup', params: [{ name: 'url', label: 'URL Icon Group', type: 'url' }, { name: 'title', label: 'Judul Group', type: 'text' }, { name: 'number', label: 'Jumlah Pesan', type: 'text' }, { name: 'time', label: 'Waktu', type: 'text' }] },
    { id: 'wagroupv2', name: 'WA Group V2', icon: 'fab fa-whatsapp', endpoint: '/maker/fakegroupv2', params: [{ name: 'url', label: 'URL Avatar', type: 'url' }, { name: 'name', label: 'Nama Admin', type: 'text' }, { name: 'members', label: 'Jumlah Member', type: 'text' }, { name: 'desc', label: 'Deskripsi', type: 'text' }, { name: 'author', label: 'Author', type: 'text' }, { name: 'date', label: 'Tanggal', type: 'text' }] },
    { id: 'igpost', name: 'IG Post', icon: 'fab fa-instagram', endpoint: '/maker/fakeigpost', params: [{ name: 'avatar', label: 'URL Avatar', type: 'url' }, { name: 'content', label: 'URL Konten', type: 'url' }, { name: 'username', label: 'Username', type: 'text' }, { name: 'likes', label: 'Jumlah Like', type: 'text' }, { name: 'comment', label: 'Jumlah Comment', type: 'text' }, { name: 'share', label: 'Share', type: 'text' }, { name: 'repost', label: 'Repost', type: 'text' }, { name: 'date', label: 'Tanggal', type: 'text' }, { name: 'desc', label: 'Caption', type: 'textarea' }] },
    { id: 'tiktokprofile', name: 'TikTok Profile', icon: 'fab fa-tiktok', endpoint: '/maker/faketiktok', params: [{ name: 'name', label: 'Nama', type: 'text' }, { name: 'username', label: 'Username', type: 'text' }, { name: 'following', label: 'Following', type: 'text' }, { name: 'followers', label: 'Followers', type: 'text' }, { name: 'likes', label: 'Likes', type: 'text' }, { name: 'url', label: 'URL Foto Profil', type: 'url' }] },
    { id: 'tiktokcomment', name: 'TikTok Comment', icon: 'fab fa-tiktok', endpoint: '/maker/fakettcomment', params: [{ name: 'url', label: 'URL Foto Profil', type: 'url' }, { name: 'username', label: 'Username', type: 'text' }, { name: 'comment', label: 'Komentar', type: 'text' }, { name: 'date', label: 'Tanggal', type: 'text' }] },
    { id: 'ytcommunity', name: 'YT Community', icon: 'fab fa-youtube', endpoint: '/maker/fakeytcomunity', params: [{ name: 'avatar', label: 'URL Avatar', type: 'url' }, { name: 'content', label: 'URL Konten', type: 'url' }, { name: 'username', label: 'Username', type: 'text' }, { name: 'desc', label: 'Deskripsi', type: 'text' }, { name: 'like', label: 'Jumlah Like', type: 'text' }, { name: 'comment', label: 'Jumlah Comment', type: 'text' }] }
];

let activeFormat = formats[0];

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
        });
    });
}

function renderParamForm() {
    const container = document.getElementById('paramForm');
    container.innerHTML = activeFormat.params.map(p => `
        <div class="input-group">
            <label>${p.label}</label>
            ${p.type === 'textarea' ? 
                `<textarea name="${p.name}" rows="2" placeholder="${p.placeholder || ''}"></textarea>` : 
                `<input type="${p.type}" name="${p.name}" placeholder="${p.placeholder || ''}" />`
            }
        </div>
    `).join('');
}

async function generateMockup() {
    const resultDiv = document.getElementById('resultArea');
    resultDiv.innerHTML = `<div class="result-placeholder"><i class="fas fa-spinner fa-pulse"></i><p>Memproses...</p></div>`;
    
    // Kumpulkan parameter dari form
    const inputs = document.querySelectorAll('#paramForm input, #paramForm textarea');
    let params = {};
    inputs.forEach(inp => {
        if (inp.value.trim()) params[inp.name] = encodeURIComponent(inp.value.trim());
    });
    
    // Buat URL endpoint API
    let apiUrl = `https://api.zenzxz.my.id${activeFormat.endpoint}?`;
    const queryParts = [];
    for (const [key, val] of Object.entries(params)) {
        queryParts.push(`${key}=${val}`);
    }
    apiUrl += queryParts.join('&');
    
    // Contoh jika endpoint brat hanya text
    if (activeFormat.id === 'brat' && !params.text) {
        resultDiv.innerHTML = `<div class="result-placeholder"><i class="fas fa-exclamation-triangle"></i><p>Masukkan teks terlebih dahulu</p></div>`;
        return;
    }
    
    try {
        // Fetch gambar dari API (API mengembalikan gambar langsung)
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Gagal: ${response.status}`);
        
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        
        resultDiv.innerHTML = `
            <div class="result-content">
                <img src="${imageUrl}" alt="Mockup Result" id="resultImage" />
                <div>
                    <button class="download-btn" id="downloadImageBtn"><i class="fas fa-download"></i> Download Gambar</button>
                </div>
            </div>
        `;
        
        // Pasang event download dari download.js
        const downloadBtn = document.getElementById('downloadImageBtn');
        if (downloadBtn) {
            downloadBtn.onclick = () => downloadImage(imageUrl, `${activeFormat.id}_mockup.png`);
        }
        
    } catch (err) {
        console.error(err);
        resultDiv.innerHTML = `<div class="result-placeholder"><i class="fas fa-times-circle"></i><p>Gagal generate: ${err.message}</p></div>`;
    }
}

// Inisialisasi & event listener
document.addEventListener('DOMContentLoaded', () => {
    renderFormatGrid();
    renderParamForm();
    document.getElementById('generateBtn').addEventListener('click', generateMockup);
});