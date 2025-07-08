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

// change background button
function changeBackgroundSmoothly(newImage) {
    let body = document.body;
    body.style.transition = "opacity 0.5s ease-in-out"; // Smooth fade transition
    body.style.opacity = "0"; // Fade out

    setTimeout(() => {
        body.style.backgroundImage = `url('${newImage}')`; // Change background
        body.style.opacity = "1"; // Fade in
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


// this block of code serves paging simulation - photos
document.addEventListener('DOMContentLoaded', () => {
  const photos = document.querySelectorAll('#gallery .photo');
  const photosPerPage = 4; // số ảnh mỗi trang
  const pagination = document.getElementById('pagination');

  function showPage(page) {
    const start = (page - 1) * photosPerPage;
    const end = page * photosPerPage;

    photos.forEach((photo, index) => {
  photo.classList.remove('show'); // reset hiệu ứng
  if (index >= start && index < end) {
    photo.style.display = 'inline-block';
    setTimeout(() => photo.classList.add('show'), 10); // thêm hiệu ứng mờ dần
  } else {
    photo.style.display = 'none';
  }
});

    
    // Xóa class active khỏi tất cả nút
    document.querySelectorAll('.pagination-btn').forEach(btn => {
    btn.classList.remove('active');
    });
    // Đánh dấu nút đang chọn
    document.querySelectorAll('.pagination-btn')[page - 1].classList.add('active');

  }

  function setupPagination() {
    const totalPages = Math.ceil(photos.length / photosPerPage);
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.classList.add('pagination-btn'); // thêm class CSS
      btn.style.margin = '0 5px';
      btn.addEventListener('click', () => showPage(i));
      pagination.appendChild(btn);
    }

    showPage(1); // Hiển thị trang đầu tiên khi tải trang
  }

  setupPagination();
});

// Paging for bigphotos
const bigPhotos = document.querySelectorAll('.gallery1 .bigphoto');
const bigPhotosPerPage = 1; // Hoặc 2 nếu bạn muốn
const bigPhotoPagination = document.getElementById('bigphoto-pagination');

function showBigPhotoPage(page) {
  const start = (page - 1) * bigPhotosPerPage;
  const end = page * bigPhotosPerPage;

  bigPhotos.forEach((photo, index) => {
    photo.style.display = (index >= start && index < end) ? 'block' : 'none';
  });

  document.querySelectorAll('.bigphoto-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.bigphoto-btn')[page - 1].classList.add('active');
}

function setupBigPhotoPagination() {
  const totalPages = Math.ceil(bigPhotos.length / bigPhotosPerPage);
  bigPhotoPagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('pagination-btn', 'bigphoto-btn'); // dùng CSS chung
    btn.addEventListener('click', () => showBigPhotoPage(i));
    bigPhotoPagination.appendChild(btn);
  }

  showBigPhotoPage(1); // Trang đầu tiên
}

setupBigPhotoPagination();
