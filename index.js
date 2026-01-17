// Force scroll to top on first load
window.addEventListener("load", function () {
  setTimeout(() => window.scrollTo(0, 0), 0);
});

// Dòng kiểm tra JS đã chạy chưa
console.log("✅ index.js đã load thành công!");

// tự động zoom 130% với kích thước màn lớn
if (window.innerWidth >= 1000) {
  document.body.style.zoom = "120%";
}

// nút nhảy xuống ảnh photobooth
document.getElementById("scrollToGallery").addEventListener("click", function() {
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
});

// Nút quay lên đầu trang
document.getElementById("scrollToTop").addEventListener("click", function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Theo dõi click chuột phải / nhấn giữ lâu trên ảnh
document.addEventListener("DOMContentLoaded", function() {
  let timer;
  let longPressTime = 500; // 500ms để xác định nhấn giữ lâu
  let img = document.getElementById("myImage");

  img.addEventListener("contextmenu", function() {
    console.log("📌 Người dùng đã nhấp chuột phải vào ảnh.");
    gtag('event', 'download_image', {
      'event_category': 'Image',
      'event_label': 'My Image (Right Click)'
    });
  });

  img.addEventListener("touchstart", function() {
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
    clearTimeout(timer);
  });
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

// Change background when Button 1 is clicked
document.getElementById("changeBackgroundImg1").addEventListener("click", function () {
  changeBackgroundSmoothly("png/fullSreenBackGround2.jpg");
});

// Change background when Button 2 is clicked
document.getElementById("changeBackgroundImg2").addEventListener("click", function () {
  changeBackgroundSmoothly("png/fullSreenBackGround1.jpg");
});

// Change background when Button 3 is clicked
document.getElementById("changeBackgroundImg3").addEventListener("click", function () {
  changeBackgroundSmoothly("png/PinkGridBackGround.jpg");
});

// Paging simulation - photos
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
        photo.style.display = 'inline-block';
        setTimeout(() => photo.classList.add('show'), 10);
      } else {
        photo.style.display = 'none';
      }
    });

    if (shouldScroll) {
      document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    }

    document.querySelectorAll('.pagination-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelectorAll('.pagination-btn')[page - 1].classList.add('active');
  }

  function setupPagination() {
    const totalPages = Math.ceil(photos.length / photosPerPage);
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.classList.add('pagination-btn');
      btn.style.margin = '0 5px';
      btn.addEventListener('click', () => showPage(i, true));
      pagination.appendChild(btn);
    }

    showPage(1, false); // do NOT scroll on initial load
  }

  setupPagination();
});

// Paging for big photos
const bigPhotos = document.querySelectorAll('.gallery1 .bigphoto');
const bigPhotosPerPage = 1;
const bigPhotoPagination = document.getElementById('bigphoto-pagination');

function showBigPhotoPage(page, shouldScroll = true) {
  const start = (page - 1) * bigPhotosPerPage;
  const end = page * bigPhotosPerPage;

  bigPhotos.forEach((photo, index) => {
    photo.style.display = (index >= start && index < end) ? 'block' : 'none';
  });

  document.querySelectorAll('.bigphoto-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.bigphoto-btn')[page - 1].classList.add('active');

  if (shouldScroll) {
    document.getElementById('gallery1').scrollIntoView({ behavior: 'smooth' });
  }
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

  showBigPhotoPage(1, false); // do NOT scroll on initial load
}

setupBigPhotoPagination();


// --- Code Modal Lightbox ---

// Lấy các phần tử modal
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("img01");
var closeBtn = document.getElementsByClassName("close-modal")[0];

// Gán sự kiện click cho TẤT CẢ các ảnh có class .photo
// Sử dụng Delegation để code gọn hơn và hoạt động tốt với phân trang
document.getElementById('gallery').addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('photo')) {
    modal.style.display = "block";
    modalImg.src = e.target.src; // Lấy src của ảnh vừa bấm gán vào modal
    
    // Khóa cuộn trang web lại khi đang xem ảnh
    document.body.style.overflow = "hidden";
  }
});

// Xử lý đóng modal khi bấm nút X
closeBtn.onclick = function() {
  closeModal();
}

// Xử lý đóng modal khi bấm ra vùng đen bên ngoài ảnh
modal.onclick = function(e) {
  if (e.target === modal) {
    closeModal();
  }
}

// Hàm đóng modal chung
function closeModal() {
  modal.style.display = "none";
  // Mở lại cuộn trang
  document.body.style.overflow = "auto";
}




// --- MUSIC PLAYER LOGIC ---

document.addEventListener("DOMContentLoaded", function() {
    const song = document.getElementById("song");
    const playBtn = document.getElementById("playPauseBtn");
    const playIcon = document.getElementById("playIcon");
    const progress = document.getElementById("progress");
    const currTime = document.getElementById("current-time");
    const durationTime = document.getElementById("duration");

    // 1. Load thông tin khi nhạc tải xong
    song.onloadedmetadata = function() {
        progress.max = song.duration;
        progress.value = song.currentTime;
        durationTime.textContent = formatTime(song.duration);
    }

    // 2. Xử lý nút Play/Pause
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

    // 3. Thanh chạy tự động theo nhạc
    if(song.play()){
        setInterval(() => {
            progress.value = song.currentTime;
            currTime.textContent = formatTime(song.currentTime);
            
            // Nếu hát hết bài thì reset nút về Play
            if(song.ended) {
                playIcon.classList.remove("fa-pause");
                playIcon.classList.add("fa-play");
            }
        }, 500);
    }

    // 4. Tua nhạc khi kéo thanh trượt
    progress.onchange = function() {
        song.currentTime = progress.value;
        if(song.paused) {
             song.play();
             playIcon.classList.remove("fa-play");
             playIcon.classList.add("fa-pause");
        }
    }

    // Hàm định dạng giây sang phút:giây (VD: 65s -> 1:05)
    function formatTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);
        if (sec < 10) {
            sec = `0${sec}`;
        }
        return `${min}:${sec}`;
    }
});