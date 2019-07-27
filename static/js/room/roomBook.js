$(document).ready(function () {

    var mainSwiper = new Swiper('.main-focus-swiper', {
        loop: false,
        slidesPerView: 5,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    $('.swiper-slide').on('click', function(){
        $(this).addClass('slide-on').siblings().removeClass('slide-on')
    })

    $('.time-nav ul li').on('click', function(){

        if(!$(this).hasClass('booked')){
            $(this).toggleClass('selected')
        }

    })
});