$(document).ready(function () {

    $('.scroll-cover').each(function(){
        beScroll($(this))
    })

    function beScroll (ele) {
        var wheel = ele.find('.wheel-scroll')[0]
        var name = ele.attr('data-name')
        var scroll = new BScroll(wheel,{
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

        ele.find('li').eq(0).addClass('active')
        scroll.on('scrollEnd',function() {
            ele.find('li').eq(this.selectedIndex).addClass('active').siblings().removeClass('active');
        })
        ele.find('.scroll-head .cfm').on('click',function(){
            var value =ele.find('.active').text()
            $('#'+ name).val(value)
            ele.hide()
        })

        ele.find('.scroll-head .cancel').on('click',function(){
            ele.hide()
        })
        $('#'+ name).parents('li').on('click',function(){
            console.log(111)
            ele.show()
            scroll.refresh()
        })
    }


});