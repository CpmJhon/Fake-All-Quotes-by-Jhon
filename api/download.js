/**
 * download.js
 * Fungsi untuk mendownload gambar langsung otomatis - FINAL VERSION
 */

async function downloadImage(imageUrl, filename = 'mockup.png') {
    console.log('📥 Downloading image from:', imageUrl);
    
    try {
        if (window.showToast) window.showToast('⏳ Mengunduh gambar...', 'info');
        
        if (!imageUrl || imageUrl === '') throw new Error('URL gambar tidak valid');
        
        const response = await fetch(imageUrl, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Accept': 'image/*' }
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const blob = await response.blob();
        
        if (blob.size === 0) throw new Error('File kosong');
        
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        }, 100);
        
        if (window.showToast) window.showToast('✅ Download berhasil!', 'success');
        return true;
        
    } catch (error) {
        console.error('❌ Download error:', error);
        if (window.showToast) window.showToast('❌ Gagal download: ' + error.message, 'error');
        return false;
    }
}

function createToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span><div class="toast-progress"></div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

if (typeof window.showToast === 'undefined') {
    window.showToast = createToast;
}

window.downloadImage = downloadImage;
window.showToast = window.showToast || createToast;

console.log('✅ download.js loaded');