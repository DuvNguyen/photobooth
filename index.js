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
