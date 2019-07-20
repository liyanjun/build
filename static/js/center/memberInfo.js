$(document).ready(function () {


    $('.label-items span').on('click', function(){
        $(this).toggleClass('selected')
    })


    // 初始化adult选择滚动框
    var scroll = new BScroll('.scroll-cover-sex .wheel-scroll',{
        click: true,
        probeType:3,
        swipeTime:700,
        swipeBounceTime:200,
        wheel: {
            selectedIndex: 0,
            adjustTime: 100,
            rotate: 36,
            wheelWrapperClass: 'wheel-scroll',
            wheelItemClass: 'wheel-item'
        }
    })
    $('.scroll-cover-sex').find('li').eq(0).addClass('active')
    scroll.on('scrollEnd',function() {
        $('.scroll-cover-sex').find('li').eq(this.selectedIndex).addClass('active').siblings().removeClass('active');
    })
    $('.scroll-head .cfm').on('click',function(){
        var value = $('.scroll-cover-sex').find('.active').text()
        $('#sex').val(value)
        $('.scroll-cover').hide()
    })

    $('.scroll-head .cancel').on('click',function(){
        $('.scroll-cover').hide()
    })
    $('.sex-li').on('click',function(){
        $('.scroll-cover').show()
        scroll.refresh()
    })


});