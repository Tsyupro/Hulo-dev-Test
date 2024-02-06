document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".swiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      slidesPerView: 4,
      spaceBetween: 10,
    });
  
    let vimeoVideos = [
      "909556066",
      "889793639",
      "909556066", 
      "885725676", 
      "850096821", 
      "825147634", 
      "825137865", 
      "706958109", 
      "668990005", 
      "632819572", 
      "527943135", 
      "538276543", 
    ];
  
    vimeoVideos.forEach(function (videoId) {
      fetch(`https://api.vimeo.com/videos/${videoId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer TOKEN",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.pictures && data.pictures.sizes) {
            const slide = document.createElement("div");
            slide.classList.add("swiper-slide");
  
            const iframePlaceholder = document.createElement("img");
            const thumbnailIndex = 3; 
            if (data.pictures.sizes[thumbnailIndex]) {
              iframePlaceholder.src = data.pictures.sizes[thumbnailIndex].link;
            } else {
              iframePlaceholder.src = "path_to_default_image";
            }
  
            iframePlaceholder.alt = "Video thumbnail";
            iframePlaceholder.style.width = "100%";
  
            slide.appendChild(iframePlaceholder);
            document.querySelector(".swiper-wrapper").appendChild(slide);
  
            slide.addEventListener("click", function () {
              openModal(`https://player.vimeo.com/video/${videoId}`);
            });
          } else {
            console.error("Missing video data or pictures sizes.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          if (error.message.includes("401")) {
            console.error(
              "Unauthorized: Access Token may be invalid or expired."
            );
          }
        });
    });
  });
  
  function openModal(videoUrl) {
    let modal = document.getElementById("myModal");
    let videoElement = document.getElementById("popupVideo");
    videoElement.src = videoUrl;
    modal.style.display = "block";
  }
  
  document.querySelector(".close").addEventListener("click", function () {
    closeModal();
  });
  
  function closeModal() {
    const modal = document.getElementById("myModal");
    const videoElement = document.getElementById("popupVideo");
    videoElement.src = "";
    modal.style.display = "none";
  }
  