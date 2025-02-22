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