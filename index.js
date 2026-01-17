// 1. CHẠY KHI TRANG LOAD XONG
window.addEventListener("load", function () {
    // Cuộn lên đầu trang
    setTimeout(() => window.scrollTo(0, 0), 0);
    console.log("✅ Web đã sẵn sàng!");
    checkTextOverflow(); // Kiểm tra chữ chạy ngay khi load
});

// Tự động zoom nhẹ nếu màn hình lớn (PC)
if (window.innerWidth >= 1000) {
    document.body.style.zoom = "120%";
}

// 2. XỬ LÝ NÚT CUỘN TRANG
document.getElementById("scrollToGallery").addEventListener("click", function() {
    document.getElementById("gallery-title").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("scrollToTop").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// 3. ĐỔI HÌNH NỀN MƯỢT MÀ
function changeBackground(imgUrl) {
    document.body.style.transition = "background-image 0.5s ease-in-out";
    document.body.style.backgroundImage = `url('${imgUrl}')`;
}

document.getElementById("changeBackgroundImg1").onclick = () => changeBackground("png/fullSreenBackGround2.jpg");
document.getElementById("changeBackgroundImg2").onclick = () => changeBackground("png/fullSreenBackGround1.jpg");
document.getElementById("changeBackgroundImg3").onclick = () => changeBackground("png/PinkGridBackGround.jpg");

// 4. MÁY NGHE NHẠC (SPOTIFY LOGIC) - ĐÃ SỬA LỖI AUTOPLAY
document.addEventListener("DOMContentLoaded", function() {
    const song = document.getElementById("song");
    const playBtn = document.getElementById("playPauseBtn");
    const playIcon = document.getElementById("playIcon");
    const progress = document.getElementById("progress");
    const currTime = document.getElementById("current-time");
    const durationTime = document.getElementById("duration");

    if(song) {
        // Cập nhật tổng thời gian khi load nhạc xong (NHƯNG KHÔNG BẮT CHẠY)
        song.onloadedmetadata = function() {
            progress.max = song.duration;
            progress.value = song.currentTime;
            durationTime.textContent = formatTime(song.duration);
        };

        // Nút Play/Pause: Bấm vào mới chạy
        playBtn.addEventListener("click", function() {
            if (song.paused) {
                song.play();
                playIcon.classList.remove("fa-play");
                playIcon.classList.add("fa-pause");
            } else {
                song.pause();
                playIcon.classList.remove("fa-pause");
                playIcon.classList.add("fa-play");
            }
        });

        // Cập nhật thanh chạy LIÊN TỤC (nhưng chỉ khi nhạc không pause)
        setInterval(() => {
            if (!song.paused) {
                progress.value = song.currentTime;
                currTime.textContent = formatTime(song.currentTime);
            }
            
            // Khi hết bài -> Reset về nút Play
            if(song.ended) {
                playIcon.classList.remove("fa-pause");
                playIcon.classList.add("fa-play");
            }
        }, 500);

        // Tua nhạc
        progress.onchange = function() {
            song.currentTime = progress.value;
        };
    }

    function formatTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);
        if (sec < 10) sec = `0${sec}`;
        return `${min}:${sec}`;
    }
});

// 5. XỬ LÝ TÊN BÀI HÁT CHẠY (MARQUEE)
function checkTextOverflow() {
    const trackNameBox = document.querySelector('.track-name');
    if (!trackNameBox) return;

    const originalText = trackNameBox.getAttribute('data-text') || trackNameBox.innerText;
    trackNameBox.setAttribute('data-text', originalText);
    trackNameBox.innerHTML = originalText;

    if (trackNameBox.scrollWidth > trackNameBox.clientWidth) {
        trackNameBox.innerHTML = `
            <div class="track-name-scroll">
                <span>${originalText}</span>
                <span>${originalText}</span>
            </div>
        `;
    }
}
window.addEventListener('resize', checkTextOverflow);

// 6. PHÂN TRANG GALLERY (MASONRY) - CÁCH 1: FLEXBOX
document.addEventListener('DOMContentLoaded', () => {
    const photos = document.querySelectorAll('#gallery .photo');
    
    // --- SỬA LẠI THÀNH 4 ẢNH (NHƯ CŨ) ---
    const photosPerPage = 4; 
    // ------------------------------------

    const pagination = document.getElementById('pagination');

    function showPage(page) {
        const start = (page - 1) * photosPerPage;
        const end = page * photosPerPage;
        
        photos.forEach((photo, index) => {
            photo.classList.remove('show');
            if (index >= start && index < end) {
                photo.style.display = 'block';
                setTimeout(() => photo.classList.add('show'), 50);
            } else {
                photo.style.display = 'none';
            }
        });

        document.querySelectorAll('.pagination-btn').forEach(btn => btn.classList.remove('active'));
        if(pagination.children[page-1]) pagination.children[page-1].classList.add('active');
    }

    function setupPagination() {
        const totalPages = Math.ceil(photos.length / photosPerPage);
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = 'pagination-btn';
            btn.addEventListener('click', () => {
                showPage(i);
                document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
            });
            pagination.appendChild(btn);
        }
        showPage(1);
    }
    setupPagination();
});

// 7. PHÂN TRANG GALLERY LỚN
const bigPhotos = document.querySelectorAll('.gallery1 .bigphoto');

// --- SỬA LẠI THÀNH 1 ẢNH (XEM TỪNG CÁI MỘT) ---
const bigPerPage = 1; 
// ----------------------------------------------

const bigPagination = document.getElementById('bigphoto-pagination');

if(bigPhotos.length > 0) {
    function showBigPage(page) {
        const start = (page - 1) * bigPerPage;
        const end = page * bigPerPage;
        bigPhotos.forEach((photo, index) => {
            photo.style.display = (index >= start && index < end) ? 'block' : 'none';
        });
        
        Array.from(bigPagination.children).forEach(btn => btn.classList.remove('active'));
        if(bigPagination.children[page-1]) bigPagination.children[page-1].classList.add('active');
    }

    const totalBigPages = Math.ceil(bigPhotos.length / bigPerPage);
    bigPagination.innerHTML = '';
    for (let i = 1; i <= totalBigPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = 'pagination-btn';
        btn.addEventListener('click', () => {
            showBigPage(i);
            document.getElementById('gallery1').scrollIntoView({ behavior: 'smooth' });
        });
        bigPagination.appendChild(btn);
    }
    showBigPage(1);
}

// 8. MODAL (XEM ẢNH PHÓNG TO)
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const closeBtn = document.querySelector(".close-modal");
    const allImages = document.querySelectorAll('.photo, .bigphoto');

    allImages.forEach(img => {
        img.addEventListener('click', function() {
            if(this.tagName === 'IMG') {
                modal.style.display = "block";
                modalImg.src = this.src;
                document.body.style.overflow = "hidden"; 
            }
        });
    });

    if(closeBtn) {
        closeBtn.onclick = function() { 
            modal.style.display = "none"; 
            document.body.style.overflow = "auto"; 
        };
    }
    if(modal) {
        modal.onclick = function(e) {
            if (e.target === modal) { 
                modal.style.display = "none"; 
                document.body.style.overflow = "auto"; 
            }
        };
    }
});