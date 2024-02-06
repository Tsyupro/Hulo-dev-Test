document.addEventListener("DOMContentLoaded", function () {
    swiper = new Swiper('.swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        slidesPerView: 4,
        spaceBetween: 10,
    });

    let vimeoVideos = [
        "https://player.vimeo.com/889793639",
        "https://player.vimeo.com/video/824804225",
        "https://player.vimeo.com/video/824804225",
        "https://player.vimeo.com/video/824804225",
        "https://player.vimeo.com/video/824804225",
        "https://player.vimeo.com/video/824804225",
        "https://player.vimeo.com/video/824804225",
        "https://player.vimeo.com/video/824804225",
        "https://player.vimeo.com/video/824804225",
        "https://player.vimeo.com/video/824804225",
    ];

    let swiperWrapper = document.querySelector('.swiper-wrapper');
    vimeoVideos.forEach(function (videoUrl) {
        let slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        let iframeElement = document.createElement('iframe');
        let videoId = getVimeoVideoId(videoUrl);
        iframeElement.src = "https://player.vimeo.com/video/" + videoId;
        iframeElement.frameborder = "0";
        iframeElement.allowfullscreen = true;

        iframeElement.onclick = function() {
            openModal("https://player.vimeo.com/video/" + videoId);
        };

        slide.appendChild(iframeElement);
        swiperWrapper.appendChild(slide);
    });
});


function openModal(videoUrl) {
    let modal = document.getElementById("myModal");
    let videoElement = document.getElementById("popupVideo");
    videoElement.src = videoUrl;
    modal.style.display = "block";
}

function closeModal() {
    let modal = document.getElementById("myModal");
    let videoElement = document.getElementById("popupVideo");
    videoElement.pause();
    modal.style.display = "none";
}

function getVimeoVideoId(url) {
    var regex = /(?:https?:\/\/)?(?:www\.)?(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/;
    var match = url.match(regex);
    if (match && match.length > 1) {
        return match[1];
    }
    return null;
}