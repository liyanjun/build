$(document).ready(function () {


    let scroll = new BScroll('.sex-wraper',{
        scrollY: true,
        click: true,
        wheel:{
            selectedIndex: 0,
            rotate: 25,
            adjustTime: 400,
            wheelWrapperClass: 'wheel-scroll',
            wheelItemClass: 'wheel-item',
            wheelDisabledItemClass: 'wheel-disabled-item' // version 1.15.0 支持
        }
    })


});