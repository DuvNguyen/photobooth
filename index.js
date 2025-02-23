// Dòng kiểm tra JS đã chạy chưa
console.log("✅ index.js đã load thành công!");


// tự động zoom 180% với kích thước màn lớn
if (window.innerWidth >= 1024) { // Chỉ áp dụng trên máy tính
    document.body.style.zoom = "180%";
}

// nút nhảy xuống ảnh photobooth
document.getElementById("scrollToGallery").addEventListener("click", function() {
    document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
});

// Nút quay lên đầu trang
document.getElementById("scrollToTop").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* Theo dõi số người click chuột phải (trên máy tính) hoăc bấm giữ lâu (trên điện thoại) - có thể 
là họ đang tính tải ảnh về*/
document.addEventListener("DOMContentLoaded", function() {
    let timer;
    let longPressTime = 500; // 500ms để xác định nhấn giữ lâu

    let img = document.getElementById("myImage");

    // Theo dõi chuột phải trên PC
    img.addEventListener("contextmenu", function(event) {
        console.log("📌 Người dùng đã nhấp chuột phải vào ảnh.");
        gtag('event', 'download_image', {
            'event_category': 'Image',
            'event_label': 'My Image (Right Click)'
        });
    });

    // Theo dõi nhấn giữ trên điện thoại
    img.addEventListener("touchstart", function(event) {
        console.log("⏳ Người dùng bắt đầu nhấn giữ ảnh...");
        timer = setTimeout(function() {
            console.log("✅ Người dùng đã nhấn giữ đủ lâu, tính là tải ảnh.");
            gtag('event', 'download_image', {
                'event_category': 'Image',
                'event_label': 'My Image (Long Press)'
            });
        }, longPressTime);
    });

    img.addEventListener("touchend", function() {
        console.log("❌ Người dùng thả tay ra trước khi đủ lâu, không tính tải ảnh.");
        clearTimeout(timer); // Hủy nếu không nhấn đủ lâu
    });
});

//END SCRIPT