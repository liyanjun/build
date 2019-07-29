$(document).ready(function () {


    // 初始化滚动框
    var oScroll = new BScroll(".orders-scroll", {
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
        var item = ` <li>
          <div class="book-date"><span>预约日期：03-11</span></div>
          <div class="order-info clearfix">
            <div class="left">
              <p class="ellipsis">2019年最专业的公务员考试网 上教学视频</p>
              <p>开课时间：2019年6月11日 10:00</p>
              <p>开课场地：南湖名都2楼1号会议厅</p>
              <p>订单编号：2579 6669 1113 32</p>
            </div>
            <div class="right">
              <p class="amount">￥899.79</p>
              <p>预约金额</p>
            </div>
          </div>
        </li>
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
            $('.orders').append(items)
            oScroll.refresh();
        } else {
            console.log('下拉刷新')
        }

    });






})