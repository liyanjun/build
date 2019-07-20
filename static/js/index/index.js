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

    $(document).on("mousedown",function(e){
        if(ele.is(":visible") && ele.has(e.target).length===0){
            ele.hide();
        }
    });

})