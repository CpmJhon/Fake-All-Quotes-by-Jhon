/**
 * download.js
 * Fungsi untuk mendownload gambar langsung otomatis - FIXED VERSION
 */

// Fungsi download utama - DOWNLOAD LANGSUNG TANPA BUKA TAB BARU
async function downloadImage(imageUrl, filename = 'mockup.png') {
    console.log('📥 Downloading image from:', imageUrl);
    console.log('📄 Filename:', filename);
    
    try {
        // Tampilkan notifikasi loading
        if (window.showToast) {
            window.showToast('⏳ Mengunduh gambar...', 'info');
        }
        
        // Pastikan URL valid
        if (!imageUrl || imageUrl === '') {
            throw new Error('URL gambar tidak valid');
        }
        
        // Fetch gambar dengan mode yang tepat
        const response = await fetch(imageUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'image/*'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const blob = await response.blob();
        console.log('✅ Blob size:', blob.size, 'bytes, Type:', blob.type);
        
        if (blob.size === 0) {
            throw new Error('File kosong (0 bytes)');
        }
        
        // Buat URL object untuk blob
        const blobUrl = URL.createObjectURL(blob);
        
        // Buat elemen link untuk download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.style.display = 'none';
        
        // Append ke body, klik, lalu remove
        document.body.appendChild(link);
        link.click();
        
        // Cleanup: hapus link dan revoke blob URL setelah download
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
            console.log('🧹 Cleanup completed');
        }, 100);
        
        // Notifikasi sukses
        if (window.showToast) {
            window.showToast('✅ Download berhasil!', 'success');
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ Download error:', error);
        
        // Notifikasi error
        if (window.showToast) {
            window.showToast('❌ Gagal download: ' + error.message, 'error');
        }
        
        return false;
    }
}

// Fungsi showToast yang elegant
function createToast(message, type = 'info') {
    // Hapus toast yang sudah ada
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();
    
    // Buat elemen toast
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <div class="toast-progress"></div>
    `;
    
    document.body.appendChild(toast);
    
    // Animasi muncul
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto hide setelah 3 detik
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Export fungsi untuk digunakan global
window.downloadImage = downloadImage;
window.showToast = createToast;

console.log('✅ download.js loaded - Auto download ready');