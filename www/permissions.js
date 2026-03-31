// request-permissions.js
document.addEventListener('deviceready', function() {
    console.log('Device Ready - Meminta izin akses...');
    
    // Fungsi untuk meminta izin di Android
    function requestAndroidPermissions() {
        if (typeof cordova !== 'undefined' && 
            cordova.plugins && 
            cordova.plugins.permissions) {
            
            var permissions = [
                cordova.plugins.permissions.ACCESS_FINE_LOCATION,
                cordova.plugins.permissions.ACCESS_COARSE_LOCATION,
                cordova.plugins.permissions.CAMERA,
                cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE,
                cordova.plugins.permissions.READ_EXTERNAL_STORAGE
            ];
            
            cordova.plugins.permissions.requestPermissions(
                permissions,
                function(status) {
                    console.log('✅ Semua izin diberikan:', status);
                    showToast('Akses GPS, Kamera, dan Storage telah diizinkan');
                },
                function(error) {
                    console.error('❌ Izin ditolak:', error);
                    showToast('Beberapa izin ditolak, beberapa fitur mungkin tidak berfungsi');
                }
            );
        }
    }
    
    // Fungsi Toast sederhana
    function showToast(msg) {
        if (window.plugins && window.plugins.toast) {
            window.plugins.toast.showShortBottom(msg);
        } else {
            alert(msg);
        }
    }
    
    // ============ FUNGSI GPS ============
    window.getCurrentLocation = function() {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                showToast('📍 Lokasi: ' + lat + ', ' + lng);
                console.log('Location:', lat, lng);
                return {lat: lat, lng: lng};
            },
            function(error) {
                console.error('GPS Error:', error);
                showToast('❌ Error GPS: ' + error.message);
            },
            {enableHighAccuracy: true, timeout: 10000}
        );
    };
    
    // ============ FUNGSI KAMERA ============
    window.takePhoto = function() {
        navigator.camera.getPicture(
            function(imageData) {
                var img = document.createElement('img');
                img.src = 'data:image/jpeg;base64,' + imageData;
                img.style.maxWidth = '100%';
                img.style.margin = '10px 0';
                img.style.borderRadius = '10px';
                document.body.appendChild(img);
                showToast('✅ Foto berhasil diambil!');
            },
            function(error) {
                console.error('Camera Error:', error);
                showToast('❌ Error Kamera: ' + error);
            },
            {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE
            }
        );
    };
    
    // ============ FUNGSI DOWNLOAD FILE ============
    window.downloadFile = function(fileUrl, fileName) {
        if (!fileName) {
            fileName = fileUrl.split('/').pop();
        }
        
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(fileUrl);
        
        // Gunakan externalDataDirectory untuk akses storage
        var fileURL = cordova.file.externalDataDirectory + fileName;
        
        showToast('⏬ Mulai download: ' + fileName);
        
        fileTransfer.download(
            uri, fileURL,
            function(entry) {
                showToast('✅ Download selesai! File tersimpan di: ' + entry.toURL());
                console.log('Download complete:', entry.toURL());
            },
            function(error) {
                console.error('Download Error:', error);
                showToast('❌ Download gagal: ' + error.code);
            },
            true,
            {
                headers: {
                    "Authorization": "Bearer " // jika perlu token
                }
            }
        );
    };
    
    // ============ FUNGSI BACA FILE ============
    window.listDownloads = function() {
        window.resolveLocalFileSystemURL(
            cordova.file.externalDataDirectory,
            function(dirEntry) {
                var reader = dirEntry.createReader();
                reader.readEntries(function(entries) {
                    var fileList = entries.map(e => e.name).join('\n');
                    showToast('📁 File tersimpan:\n' + (fileList || 'Tidak ada file'));
                });
            },
            function(error) {
                console.error('Read Error:', error);
            }
        );
    };
    
    // ============ COBA FUNGSI SEDERHANA ============
    window.testGPS = function() {
        getCurrentLocation();
    };
    
    window.testCamera = function() {
        takePhoto();
    };
    
    window.testDownload = function() {
        // Contoh download file (ganti dengan URL file yang valid)
        var testUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
        downloadFile(testUrl, 'sample.pdf');
    };
    
    // Panggil request izin saat aplikasi siap
    requestAndroidPermissions();
    
    // Tampilkan notifikasi bahwa plugin sudah siap
    setTimeout(function() {
        console.log('✅ Semua plugin siap digunakan!');
    }, 1000);
});
