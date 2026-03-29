/**
 * download.js - Auto Download Function
 */

async function downloadImage(imageUrl, filename = 'screenshot.png') {
    console.log('📥 Downloading:', imageUrl);
    
    try {
        if (window.showToast) window.showToast('⏳ Mengunduh...', 'info');
        
        if (!imageUrl) throw new Error('URL tidak valid');
        
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
        console.error('Download error:', error);
        if (window.showToast) window.showToast('❌ Gagal: ' + error.message, 'error');
        return false;
    }
}

function createToast(message, type = 'info') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    toast.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span><div class="toast-progress"></div>`;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Tambah CSS toast jika belum ada
if (!document.querySelector('#toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
        .toast-notification {
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);
            background: rgba(0,0,0,0.95); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);
            border-radius: 50px; padding: 12px 24px; display: flex; align-items: center; gap: 12px;
            color: white; font-size: 0.9rem; font-weight: 500; z-index: 10000;
            transition: transform 0.3s ease; overflow: hidden;
        }
        .toast-notification.show { transform: translateX(-50%) translateY(0); }
        .toast-notification i { font-size: 1.2rem; }
        .toast-success i { color: #10b981; }
        .toast-error i { color: #ef4444; }
        .toast-info i { color: #3b82f6; }
        .toast-progress {
            position: absolute; bottom: 0; left: 0; width: 100%; height: 3px;
            background: rgba(255,255,255,0.3); animation: toastProgress 3s linear forwards;
        }
        @keyframes toastProgress {
            from { transform: scaleX(1); }
            to { transform: scaleX(0); }
        }
    `;
    document.head.appendChild(style);
}

window.downloadImage = downloadImage;
window.showToast = createToast;

console.log('✅ download.js loaded - Auto download ready');