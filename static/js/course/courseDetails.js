$(document).ready(function () {
  // 加载
  // gzui.toload();

    var mainSwiper = new Swiper('.main-focus-swiper', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }

    });

});