$(document).ready(function () {
    $('.space-nav>li').on('click', function(){
        $('.cover').remove()
        if($(this).hasClass('nav-on')){
            $(this).removeClass('nav-on')
        }else{
            $(this).addClass('nav-on').siblings().removeClass('nav-on')
            var cover= '<div class="cover"></div>'
            $('body').append(cover)
        }
    })

    $('.space-nav ul li').on('click', function(e){
        e.stopPropagation()
        var text = $(this).text()
        $(this).parents('.nav-on').find('span').text(text)
        $(this).parents('.nav-on').removeClass('nav-on')
        $('.cover').remove()
    })

    // 初始化滚动框
    var oScroll = new BScroll(".space-items-scroll", {
        probeType: 3,
        click: true,
        pullUpLoad: {
            threshold: 10
        },
        mouseWheel: {    // pc端同样能滑动
            speed: 20,
            invert: false
        },
        useTransition:false  // 防止iphone微信滑动卡顿
    });



    oScroll.on("scrollEnd",function(pos){
        var item = `<div class="space-item"><img src="../../static/images/index/room.png">
          <div class="space-info">
            <p>水明漾宴会中心102号厅</p>
            <p>面积：56㎡</p>
            <p>文化类空间</p>
          </div>
        </div>
        `
        var items=''
        for(var i=0;i<5;i++){
            items += item
        }
        //到下底
        if(pos.y<0) {
            console.log('上拉加载')
                load()
            setTimeout(()=>{
                removeLoad()
            },500)
            $('.space-items').append(items)
            oScroll.refresh();
        } else {
            console.log('下拉刷新')
        }

    });






})