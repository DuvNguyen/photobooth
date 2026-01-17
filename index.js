// Force scroll to top on first load
window.addEventListener("load", function () {
    setTimeout(() => window.scrollTo(0, 0), 0);
});

// Auto zoom for large screens
if (window.innerWidth >= 1000) {
    document.body.style.zoom = "120%";
}

// Scroll Buttons
document.getElementById("scrollToGallery").addEventListener("click", function() {
    document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("scrollToTop").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Change background smoothly
function changeBackgroundSmoothly(newImage) {
    let body = document.body;
    body.style.transition = "opacity 0.5s ease-in-out";
    body.style.opacity = "0";
    setTimeout(() => {
        body.style.backgroundImage = `url('${newImage}')`;
        body.style.opacity = "1";
    }, 500);
}

document.getElementById("changeBackgroundImg1").addEventListener("click", function () { changeBackgroundSmoothly("png/fullSreenBackGround2.jpg"); });
document.getElementById("changeBackgroundImg2").addEventListener("click", function () { changeBackgroundSmoothly("png/fullSreenBackGround1.jpg"); });
document.getElementById("changeBackgroundImg3").addEventListener("click", function () { changeBackgroundSmoothly("png/PinkGridBackGround.jpg"); });

// --- PAGINATION (MASONRY GALLERY) ---
document.addEventListener('DOMContentLoaded', () => {
    const photos = document.querySelectorAll('#gallery .photo');
    const photosPerPage = 4;
    const pagination = document.getElementById('pagination');

    function showPage(page, shouldScroll = true) {
        const start = (page - 1) * photosPerPage;
        const end = page * photosPerPage;
        photos.forEach((photo, index) => {
            photo.classList.remove('show');
            if (index >= start && index < end) {
                photo.style.display = 'block';
                setTimeout(() => photo.classList.add('show'), 10);
            } else {
                photo.style.display = 'none';
            }
        });
        if (shouldScroll) document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
        document.querySelectorAll('.pagination-btn').forEach(btn => btn.classList.remove('active'));
        if(document.querySelectorAll('.pagination-btn')[page - 1])
            document.querySelectorAll('.pagination-btn')[page - 1].classList.add('active');
    }

    function setupPagination() {
        const totalPages = Math.ceil(photos.length / photosPerPage);
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.classList.add('pagination-btn');
            btn.addEventListener('click', () => showPage(i, true));
            pagination.appendChild(btn);
        }
        showPage(1, false);
    }
    setupPagination();
});

// --- BIG PHOTO PAGINATION ---
const bigPhotos = document.querySelectorAll('.gallery1 .bigphoto');
const bigPhotosPerPage = 1;
const bigPhotoPagination = document.getElementById('bigphoto-pagination');

function showBigPhotoPage(page, shouldScroll = true) {
    const start = (page - 1) * bigPhotosPerPage;
    const end = page * bigPhotosPerPage;
    bigPhotos.forEach((photo, index) => {
        photo.style.display = (index >= start && index < end) ? 'block' : 'none';
    });
    document.querySelectorAll('.bigphoto-btn').forEach(btn => btn.classList.remove('active'));
    if(document.querySelectorAll('.bigphoto-btn')[page - 1])
        document.querySelectorAll('.bigphoto-btn')[page - 1].classList.add('active');
    if (shouldScroll) document.getElementById('gallery1').scrollIntoView({ behavior: 'smooth' });
}

function setupBigPhotoPagination() {
    const totalPages = Math.ceil(bigPhotos.length / bigPhotosPerPage);
    bigPhotoPagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('pagination-btn', 'bigphoto-btn');
        btn.addEventListener('click', () => showBigPhotoPage(i, true));
        bigPhotoPagination.appendChild(btn);
    }
    showBigPhotoPage(1, false);
}
setupBigPhotoPagination();

// --- MODAL LIGHTBOX LOGIC ---
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const closeBtn = document.querySelector(".close-modal");
    const gallery = document.getElementById("gallery");

    if (!modal || !modalImg || !closeBtn) return;

    if (gallery) {
        gallery.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('photo')) {
                modal.style.display = "block";
                modalImg.src = e.target.src;
                document.body.style.overflow = "hidden";
            }
        });
    }

    closeBtn.onclick = function() { modal.style.display = "none"; document.body.style.overflow = "auto"; }
    modal.onclick = function(e) {
        if (e.target === modal) { modal.style.display = "none"; document.body.style.overflow = "auto"; }
    }
});

// --- MUSIC PLAYER LOGIC ---
document.addEventListener("DOMContentLoaded", function() {
    const song = document.getElementById("song");
    const playBtn = document.getElementById("playPauseBtn");
    const playIcon = document.getElementById("playIcon");
    const progress = document.getElementById("progress");
    const currTime = document.getElementById("current-time");
    const durationTime = document.getElementById("duration");

    if(song) {
        song.onloadedmetadata = function() {
            progress.max = song.duration;
            progress.value = song.currentTime;
            durationTime.textContent = formatTime(song.duration);
        }

        playBtn.addEventListener("click", function() {
            if (playIcon.classList.contains("fa-play")) {
                song.play();
                playIcon.classList.remove("fa-play");
                playIcon.classList.add("fa-pause");
            } else {
                song.pause();
                playIcon.classList.remove("fa-pause");
                playIcon.classList.add("fa-play");
            }
        });

        if(song.play()){
            setInterval(() => {
                progress.value = song.currentTime;
                currTime.textContent = formatTime(song.currentTime);
                if(song.ended) {
                    playIcon.classList.remove("fa-pause");
                    playIcon.classList.add("fa-play");
                }
            }, 500);
        }

        progress.onchange = function() {
            song.currentTime = progress.value;
            if(song.paused) {
                 song.play();
                 playIcon.classList.remove("fa-play");
                 playIcon.classList.add("fa-pause");
            }
        }
    }

    function formatTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);
        if (sec < 10) sec = `0${sec}`;
        return `${min}:${sec}`;
    }
});