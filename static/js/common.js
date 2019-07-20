Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "D+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
function stopPropagation(e) {
  if (e.stopPropagation)
    e.stopPropagation();
  else
    e.cancelBubble = true;
}


// control the current nav
function navCtl(attr) {
    $(".b2b-header-nav ul li[nav-type='"+attr+"']").addClass('cur');
}

// tab click control
function tabCtl() {
    $(".com-tab-ctl ul li").unbind('click').click(function () {
        $(this).parent().find('li').removeClass('cur');
        $(this).addClass('cur');
        var index = $('.tab-ctl-ul').index($(this).parent());
        var liindex = $(this).parent().find("li").index($(this));
        $('.tab-ctx-wrp').eq(index).find('.tab-ctx').removeClass('cur');
        $('.tab-ctx-wrp').eq(index).find('.tab-ctx').eq(liindex).addClass('cur');
    });
}



// 产品预览图
/*
 * @param_1 shownum //每版展示个数
 * @author: gl
 */
(function ($) {
    "use strict";
    $.fn.preview = function (option) {
        var defaults = {
            shownum: 4, //每版展示个数
            imgurl: [],
            title: '产品图片'
        };
        var self = $(this);
        var params = $.extend(defaults, option);
        var tpl =
            '<div class="prod-preview">' +
            '  <div class="l-img-box">' +
            '    <span class="prev-btn"><i class="prev-icon dis'+(params.imgurl.length>4?"":" disabled")+'"></i></span>' +
            '    <div class="l-img"></div>' +
            '    <span class="next-btn"><i class="next-icon'+(params.imgurl.length>4?"":" disabled")+'"></i></span>' +
            '    <span class="curIndex-box"><span><em class="curIndex">1 </em> / '+params.imgurl.length+'</span></span>' +
            '  </div>' +
            '  <div class="s-img">' +
            '    <div class="s-img-box">' +
            '      <ul class="scroll-list"></ul>' +
            '    </div>' +
            '  </div>' +
            '</div>';
        self.append(tpl);
        var curPage = 1;
        var scrollList = self.find(".scroll-list");
        var imgBox = self.find(".s-img-box");
        var curIndexBox = self.find(".curIndex");
        var imgBoxW = imgBox.width();
        var pageCount = Math.ceil(params.imgurl.length / params.shownum);
        for (var i = 0; i < params.imgurl.length; i++) {
            if(i == 0){
                self.find(".l-img").append('<img src="' + params.imgurl[i] + '" alt="'+params.title+'">');
            }
            if (i === 0) {
              self.find(".scroll-list").append('<li class="active"><img src="' + params.imgurl[i] + '"  alt="'+params.title+'"></li>');
            } else {
              self.find(".scroll-list").append('<li><img src="' + params.imgurl[i] + '"  alt="'+params.title+'"></li>');
            }
        }
        // 上下按钮的移入和移出
        self.find(".l-img-box").hover(function () {
          if (!self.find(".prev-btn i").is(":animated")) {
           self.find(".prev-btn i").animate({left: '0'}, "fast")
          }
          if (!self.find(".next-btn i").is(":animated")) {
           self.find(".next-btn i").animate({right: '0'}, "fast")
          }
        }, function () {
          if (!self.find(".prev-btn i").is(":animated")) {
            self.find(".prev-btn i").animate({left: '-40px'}, "fast")
          }
          if (!self.find(".next-btn i").is(":animated")) {
            self.find(".next-btn i").animate({right: '-40px'}, "fast")
          }
        })
        //上一张图切换
        self.find(".prev-btn").on("click", function () {
          if ($(this).find("i").hasClass("dis")) return
          var previewEle = $(this).parents(".prod-preview")
          var curIndex = previewEle.find(".scroll-list li").index($(".scroll-list li.active"))
          //  上一张是否在可选择的范围
          if (curIndex === 1) {
            $(this).find("i").addClass("dis")
          } else {
            $(this).find("i").removeClass("dis")
          }
          if (curIndex === params.imgurl.length-1) {
            self.find(".next-btn i").removeClass("dis")
          }
          // 小图的滑动
          if (!scrollList.is(":animated")) {
            var page = parseInt((curIndex-1) / params.imgurl.length) +1
            if (page < curPage) {
                scrollList.animate({left: '+=' + imgBoxW}, "normal")
                curPage--
            }
          }
          previewEle.find(".scroll-list li").removeClass("active")
          // 要展示的小图
          var selectEle = previewEle.find(".scroll-list li:eq(" + (curIndex-1) + ")").addClass("active").find("img")
          var imgsrc = selectEle.attr("src")
          var lImg = self.find(".l-img img")
          lImg.attr("src", imgsrc)
          curIndexBox.html(curIndex)
        })

        //下一张图切换
        self.find(".next-btn").on("click", function () {
          if ($(this).find("i").hasClass("dis")) return
          var previewEle = $(this).parents(".prod-preview")
          var curIndex = previewEle.find(".scroll-list li").index($(".scroll-list li.active"))
          //  上下按钮的状态处理
          if (curIndex+2 === params.imgurl.length) {
              $(this).find('i').addClass("dis")
          } else {
              $(this).find('i').removeClass("dis")
          }
          if (curIndex === 0) {
            self.find(".prev-btn i").removeClass("dis")
          }
          // 小图的滑动
          if (!scrollList.is(":animated")) {
            var page = parseInt((curIndex+2) / params.imgurl.length) + (params.imgurl.length>4?1:0)
            if (page > curPage) {
              scrollList.animate({left: '-=' + imgBoxW}, "normal")
              curPage++
            }
          }
          previewEle.find(".scroll-list li").removeClass("active")
          // 要展示的小图
          var selectEle = previewEle.find(".scroll-list li:eq(" + (curIndex+1) + ")").addClass("active").find("img")
          var imgsrc = selectEle.attr("src")
          var lImg = self.find(".l-img img")
          lImg.attr("src", imgsrc)
          curIndexBox.html(curIndex+2)
        })
        //小图向右滚动
        self.find(".s-prev-btn").on("click", function () {
            if (!scrollList.is(":animated")) {
                if (page == pageCount) {
                    scrollList.animate({left: '0px'}, "normal");
                    page = 1;
                } else {
                    scrollList.animate({left: '-=' + imgBoxW}, "normal");
                    page++;
                }
            }
        });
        //小图向左滚动
        self.find(".s-next-btn").on("click", function () {
            if (!scrollList.is(":animated")) {
                if (page == 1) {
                    scrollList.animate({left: '-=' + imgBoxW * (pageCount - 1)}, "normal");
                    page = pageCount;
                } else {
                    scrollList.animate({left: '+=' + imgBoxW}, "normal");
                    page--;
                }
            }
        });
        // 鼠标click切换产品图
        $("li", scrollList).click(function () {
            $(this).parent().find("li").removeClass("active");
            var imgsrc = $(this).addClass("active").find("img").attr("src");
            var lImg = self.find(".l-img img");
            lImg.attr("src", imgsrc);
            var curIndex = self.find(".scroll-list li").index($(".scroll-list li.active"))
            //  上下按钮的状态处理
            if (curIndex+1 === params.imgurl.length) {
                self.find('.next-btn i').addClass("dis")
                // return
            } else {
                self.find('.next-btn i').removeClass("dis")
            }
            if (curIndex === 0) {
                self.find(".prev-btn i").addClass("dis")
            } else {
                self.find(".prev-btn i").removeClass("dis")
            }
            curIndexBox.html(curIndex+1)
        });
    };
})(jQuery);
(function ($) {
    "use strict";
    $.fn.preview_big = function (option) {
        var defaults = {
            shownum: 5, //每版展示个数
            imgurl: [],
            title: '产品图片'
        };
        var self = $(this);
        var params = $.extend(defaults, option);
        var tpl =
            '<div class="prod-preview">' +
            '  <div class="l-img-box">' +
            '    <span class="prev-btn"><i class="prev-icon dis'+(params.imgurl.length>4?"":" disabled")+'"></i></span>' +
            '    <div class="l-img"></div>' +
            '    <span class="next-btn"><i class="next-icon'+(params.imgurl.length>4?"":" disabled")+'"></i></span>' +
            '    <span class="curIndex-box"><span><em class="curIndex">1</em> / '+params.imgurl.length+'</span></span>' +
            '  </div>' +
            '  <div class="s-img">' +
                '<span class="s-prev-btn icon-zuoqiehuan"></span>'+
            '    <div class="s-img-box">' +
            '      <ul class="scroll-list"></ul>' +
            '    </div>' +
                '<span class="s-next-btn icon-youqiehuan"> </span>'+
            '  </div>' +
            '</div>';
        self.append(tpl);
        var curPage = 1;
        var scrollList = self.find(".scroll-list");
        var imgBox = self.find(".s-img-box");
        var curIndexBox = self.find(".curIndex");
        var imgBoxW = imgBox.width();
        var pageCount = Math.ceil(params.imgurl.length / params.shownum);
        for (var i = 0; i < params.imgurl.length; i++) {
            if(i == 0){
                self.find(".l-img").append('<img src="' + params.imgurl[i] + '" alt="'+params.title+'">');
            }
            if (i === 0) {
                self.find(".scroll-list").append('<li class="active"><img src="' + params.imgurl[i] + '"  alt="'+params.title+'"></li>');
            } else {
                self.find(".scroll-list").append('<li><img src="' + params.imgurl[i] + '"  alt="'+params.title+'"></li>');
            }
        }
        // 上下按钮的移入和移出
        self.find(".l-img-box").hover(function () {
            if (!self.find(".prev-btn i").is(":animated")) {
                self.find(".prev-btn i").animate({left: '0'}, "fast")
            }
            if (!self.find(".next-btn i").is(":animated")) {
                self.find(".next-btn i").animate({right: '0'}, "fast")
            }
        }, function () {
            if (!self.find(".prev-btn i").is(":animated")) {
                self.find(".prev-btn i").animate({left: '-40px'}, "fast")
            }
            if (!self.find(".next-btn i").is(":animated")) {
                self.find(".next-btn i").animate({right: '-40px'}, "fast")
            }
        })
        //上一张图切换
        self.find(".prev-btn").on("click", function () {
            if ($(this).find("i").hasClass("dis")) return
            var previewEle = $(this).parents(".prod-preview")
            var curIndex = previewEle.find(".scroll-list li").index($(".scroll-list li.active"))
            //  上一张是否在可选择的范围
            if (curIndex === 1) {
                $(this).find("i").addClass("dis")
            } else {
                $(this).find("i").removeClass("dis")
            }
            if (curIndex === params.imgurl.length-1) {
                self.find(".next-btn i").removeClass("dis")
            }
            // 小图的滑动
            if (!scrollList.is(":animated")) {
                // var page = parseInt((curIndex-1) / params.imgurl.length) +1
                var page = Math.ceil(curIndex/params.shownum)
                if (page < curPage) {
                    scrollList.animate({left: '+=' + imgBoxW}, "normal")
                    curPage--
                }
            }
            previewEle.find(".scroll-list li").removeClass("active")
            // 要展示的小图
            var selectEle = previewEle.find(".scroll-list li:eq(" + (curIndex-1) + ")").addClass("active").find("img")
            var imgsrc = selectEle.attr("src")
            var lImg = self.find(".l-img img")
            lImg.attr("src", imgsrc)
            curIndexBox.html(curIndex)
        })

        //下一张图切换
        self.find(".next-btn").on("click", function () {
            if ($(this).find("i").hasClass("dis")) return
            var previewEle = $(this).parents(".prod-preview")
            var curIndex = previewEle.find(".scroll-list li").index($(".scroll-list li.active"))
            //  上下按钮的状态处理
            if (curIndex+2 === params.imgurl.length) {
                $(this).find('i').addClass("dis")
            } else {
                $(this).find('i').removeClass("dis")
            }
            if (curIndex === 0) {
                self.find(".prev-btn i").removeClass("dis")
            }
            // 小图的滑动
            console.log(curIndex+2)
            if (!scrollList.is(":animated")) {
                // var page = parseInt((curIndex+2) / params.imgurl.length) + (params.imgurl.length>4?1:0)
                var page = Math.ceil(( curIndex+2)/params.shownum)
                if (page > curPage) {
                    scrollList.animate({left: '-=' + imgBoxW}, "normal")
                    curPage++
                }
            }
            previewEle.find(".scroll-list li").removeClass("active")
            // 要展示的小图
            var selectEle = previewEle.find(".scroll-list li:eq(" + (curIndex+1) + ")").addClass("active").find("img")
            var imgsrc = selectEle.attr("src")
            var lImg = self.find(".l-img img")
            lImg.attr("src", imgsrc)
            curIndexBox.html(curIndex+2)
        })
        //小图向右滚动
        self.find(".s-prev-btn").on("click", function () {

            var previewEle = $(this).parents(".prod-preview")
            var curIndex = previewEle.find(".scroll-list li").index($(".scroll-list li.active"))
            var page = Math.ceil((curIndex+1)/params.shownum)
            console.log(curIndex)
            if (!scrollList.is(":animated")) {
                if (page == 1) {
                    scrollList.animate({left: '-=' + imgBoxW*(pageCount-1)}, "normal");
                    page = pageCount;
                    curPage = pageCount;
                    curIndex = params.imgurl.length-1
                    previewEle.find('.prev-icon').removeClass("dis")
                    previewEle.find('.next-icon').addClass("dis")
                } else {
                    scrollList.animate({left: '+=' + imgBoxW}, "normal");
                    page--;
                    curPage--;
                    if(curIndex-5>0){
                        curIndex -= 5
                        previewEle.find('.next-icon').removeClass("dis")
                    }else{
                        curIndex = 0
                        previewEle.find('.next-icon').removeClass("dis")
                        previewEle.find('.prev-icon').addClass("dis")
                    }
                }
                // 要展示的小图
                previewEle.find(".scroll-list li").removeClass("active")
                var selectEle = previewEle.find(".scroll-list li:eq(" + (curIndex) + ")").addClass("active").find("img")
                var imgsrc = selectEle.attr("src")
                var lImg = self.find(".l-img img")
                lImg.attr("src", imgsrc)
                curIndexBox.html(curIndex+1)
            }

        });
        //小图向左滚动
        self.find(".s-next-btn").on("click", function () {

            var previewEle = $(this).parents(".prod-preview")
            var curIndex = previewEle.find(".scroll-list li").index($(".scroll-list li.active"))
            var page = Math.ceil((curIndex+1)/params.shownum)
            if (!scrollList.is(":animated")) {
                if (page == pageCount) {
                    scrollList.animate({left: '0px'}, "normal");
                    page = 1;
                    curIndex = 0
                    curPage = 1;
                    previewEle.find('.next-icon').removeClass("dis")
                    previewEle.find('.prev-icon').addClass("dis")
                } else {
                    scrollList.animate({left: '-=' + (imgBoxW-1)}, "normal");
                    page++;
                    curPage++;
                    if(curIndex+5 < params.imgurl.length-1){
                        curIndex += 5
                        previewEle.find('.prev-icon').removeClass("dis")
                    }else{
                        curIndex = params.imgurl.length-1
                        previewEle.find('.next-icon').addClass("dis")
                        previewEle.find('.prev-icon').removeClass("dis")
                    }
                }
                // 要展示的小图
                previewEle.find(".scroll-list li").removeClass("active")
                var selectEle = previewEle.find(".scroll-list li:eq(" + (curIndex) + ")").addClass("active").find("img")
                var imgsrc = selectEle.attr("src")
                var lImg = self.find(".l-img img")
                lImg.attr("src", imgsrc)
                curIndexBox.html(curIndex+1)
            }
        });
        // 鼠标click切换产品图
        $("li", scrollList).click(function () {
            $(this).parent().find("li").removeClass("active");
            var imgsrc = $(this).addClass("active").find("img").attr("src");
            var lImg = self.find(".l-img img");
            lImg.attr("src", imgsrc);
            var curIndex = self.find(".scroll-list li").index($(".scroll-list li.active"))
            //  上下按钮的状态处理
            if (curIndex+1 === params.imgurl.length) {
                self.find('.next-btn i').addClass("dis")
                // return
            } else {
                self.find('.next-btn i').removeClass("dis")
            }
            if (curIndex === 0) {
                self.find(".prev-btn i").addClass("dis")
            } else {
                self.find(".prev-btn i").removeClass("dis")
            }
            curIndexBox.html(curIndex+1)
        });
    };
})(jQuery);
// 步进器
/*
 * @param_1 max     // 最大值
 * @param_2 classname  // 可添加类
 * @param_3 refunc  // 点击后执行的事件
 */
(function ($) {
  "use strict";
  $.fn.stepper = function (option) {
    var defaults = {
      val: 0,
      max: undefined,
      min: 0,
      classname: undefined,
      beforecall: function(){
        return true;
      },
      refunc: function () {
      },
      templateNewType:false, //是否启用第新按钮样式
      plusIcon: '', // 传入对应icon 类名
      subIcon: '',// 传入对应icon 类名
    };
    var self = $(this);
    var params = $.extend(defaults, option);
    var inputVal = params.min>params.val?params.min:params.val;
    // 默认template
    var tpl =
    '<div class="stepper ' + (params.classname ? params.classname : '') + '">' +
    '<span class="minus-btn"><i class="minus-icon disabled"></i></span>' +
    '<input value="' + inputVal + '" readonly>' +
    '<span class="plus-btn"><i class="plus-icon"></i></span>' +
    '</div>';
    //判定是否使用第二种样式模板
    if(params.templateNewType){
      // tpl =
      // '<div class="stepper ' + (params.classname ? params.classname : '') + '">' +
      // '<span class="minus-btn"><i class="icon-stepper-sub disabled"></i></span>' +
      // '<input value="' + inputVal + '" readonly>' +
      // '<span class="plus-btn"><i class="icon-stepper-add"></i></span>' +
      // '</div>';
      tpl =
      '<div class="stepper ' + (params.classname ? params.classname : '') + '">' +
      '<span class="minus-btn"><i class="'+ params.subIcon +' disabled"></i></span>' +
      '<input value="' + inputVal + '" readonly>' +
      '<span class="plus-btn"><i class="'+ params.plusIcon +'"></i></span>' +
      '</div>';
    }
    if (self.find('.stepper').length === 0) {
      self.append(tpl);
    } else {
      self.find("input").each(function (i, e) {
        if ($(e).val() >= params.max) {
          $(e).val(params.max);
          $(e).parent().find(".plus-btn i").addClass("disabled");
        } else {
          $(e).parent().find(".plus-btn i").removeClass("disabled");
        }
      });
    }
    var plus = self.find(".plus-btn");
    var minus = self.find(".minus-btn");

    // 加
    plus.unbind('click').on("click", function () {
      var input = $(this).parent().find("input");
      if (params.max != undefined) {
        var input = $(this).parent().find('input');
        if (parseInt(input.val()) < params.max && !$(this).hasClass("unable")) {
          if(params.beforecall(parseInt(input.val()), $(this))){
            input.val(parseInt(input.val()) + 1);
            if (parseInt(input.val()) == params.max) {
              $(this).find("i").addClass("disabled");
            }
            params.refunc(parseInt(input.val()), $(this));
          }
        }
      } else {
        if(params.beforecall(parseInt(input.val()), $(this))){
          input.val(parseInt(input.val()) + 1);
          params.refunc(parseInt(input.val()), $(this));
        }
      }
      if (!$(this).hasClass("unable")) {
        if(params.templateNewType){
          console.log($(this).parent().find("."+params.plusIcon))
          $(this).parent().find("."+params.subIcon).removeClass("disabled");
        }else{
          $(this).parent().find(".minus-icon").removeClass("disabled");
        }
      }
    });
    // 减
    minus.unbind('click').on("click", function () {
      var input = $(this).parent().find("input");
      if (parseInt(input.val()) > params.min) {
        input.val(parseInt(input.val()) - 1);
        if (parseInt(input.val()) == params.min) {
          $(this).find("i").addClass("disabled");
        }
        params.refunc(parseInt(input.val()), $(this));
      }
      if(params.templateNewType){
        console.log($(this).parent().find("."+params.plusIcon))
        $(this).parent().find("."+params.plusIcon).removeClass("disabled");
      }else{
        $(this).parent().find(".plus-icon").removeClass("disabled");
      }
    });
  };
})(jQuery);

// 点击其他地方隐藏当前
(function($){
  "use strict";
  $.fn.autoHide = function(){
    var ele = $(this);
    $(document).on("mousedown",function(e){
      if(ele.is(":visible") && ele.has(e.target).length===0){
        ele.hide();
      }
    });
  };
})(jQuery);

/**
 *事件：多选checkbox-btns-con
 *@author:xuewa
 */
function checkBoxPick() {
  "use strict";
  $('.checkbox-btns-con .checkbox-btn-item').unbind('click').click(function () {
    if ($(this).attr("pre-check") === undefined&&!$(this).hasClass('disabled')) {
      $(this).toggleClass('active');
    } else if (!$(this).hasClass('disabled')) {
      // 根据pre-check的值进行判断
      var pre_check = $(this).attr("pre-check");
      if (pre_check === "membernum" || pre_check === "cruisenum"
          || pre_check === "insurannum" || pre_check === "hotelnum"
          || pre_check === "externalMembernum") {
        if (pre_check === "membernum") {
            var member_val = $(this).attr("data-value");
            var userInfo = commonUser[member_val];
            if ($(this).hasClass('active')) {
              $(this).removeClass('active')
              clearVistorInfo($(".order-info-tourist-item[data-value='" + member_val + "']"));
            } else {
              $(this).addClass('active').siblings().removeClass('active')
              $('.order-info-tourist-item').attr("data-value", member_val);
              $('.order-info-tourist-item').find(".tourist-name-input").focus().val(userInfo.name);
              $('.order-info-tourist-item').find(".tourist-phone-input").val(userInfo.mobile);
              $('.order-info-tourist-item').find("input").removeClass('error');
              $('.order-info-tourist-item').find('.user-error-tip').remove();
              checkBoxPick();
            }
        } else if (pre_check === "insurannum") {
          if ($(this).hasClass('active') || $(this).parent().find(".active").length < parseInt($(this).parent().parent().parent().find(".insurance-num-control input").val())) {
            if ($(this).parents('.insurance-item').hasClass('insurance-cpl')) {
              $(this).toggleClass('active');
              var index = $(this).index();
              if ($(this).hasClass('active')) {
                $(this).parents('.insurance-cpl').find('.checkbox-btns-row').each(function (i, e) {
                  $(e).find('li').eq(index).addClass('disabled');
                });
                $(this).removeClass('disabled');
              } else {
                $(this).parents('.insurance-cpl').find('.checkbox-btns-row').each(function (i, e) {
                  $(e).find('li').eq(index).removeClass('disabled');
                });
              }
            } else {
              $(this).toggleClass('active');
            }
          } else {
            // 成员数目判断，这里到时根据实际情况判断
            if ($(this).find(".popover-down").length === 0) {
              $(this).append("<div class='popover-down'>" + text + "</div>");
            } else {
              $(this).find(".popover-down").text(text);
            }
          }
        } else if (pre_check === "hotelnum") {
          var ablepicknum = getEmptyNum() + $(".lodger-item[data-value]").length;
          if ($(this).hasClass('active') || $(this).parent().find(".active").length < ablepicknum) {
            var member_val = $(this).attr("data-value");
            var userInfo = commonUser[member_val];
            if ($(this).hasClass('active')) {
              clearHotelInfo($(".lodger-item[data-value='" + member_val + "']"));
            } else {
              $(".lodger-item").each(function (i, e) {
                if ($(e).find("input.input-zh").val() === "") {
                  $(e).attr("data-value", member_val);
                  $(e).find("input.input-zh").focus().val(userInfo.name);
                  return false;
                }
              });
              insurance2();
              checkBoxPick();
            }
            $(this).toggleClass('active');
          } else {
            // 成员数目判断，这里到时根据实际情况判断
            if ($(this).find(".popover-down").length === 0) {
              $(this).append("<div class='popover-down'>" + text + "</div>");
            } else {
              $(this).find(".popover-down").text(text);
            }
          }
        } else if (pre_check === "externalMembernum") {
          $(this).toggleClass('active');
          var externalNum = $(this).parent().find('.active').length
          // console.log(externalNum)
          if (externalNum) {
            $(this).parents('.external-item').find('.num').html('×' + externalNum)
          } else {
            $(this).parents('.external-item').find('.num').html('&nbsp;&nbsp;&nbsp;&nbsp;')
          }
        }
      }
    }
  });
}

checkBoxPick();

function getEmptyNum() {
  'use strict';
  var flag = 0;
  $('.order-info-tourist-item, .lodger-item').each(function (i, e) {
    if (checkVistorInfoEmpty($(e))) {
      flag ++;
    }
  });
  return flag;
}

/**
 * 检查游客资料是否为空
 * **/
function checkVistorInfoEmpty(infocard) {
  'use strict';
  var input_list = infocard.find("input");
  for (var i = 0; i < input_list.length; i++) {
    if (input_list.eq(i).val() !== "") {
      return false;
    }
  }
  return true;
}
/**
 * 清空游客资料
 * **/
function clearVistorInfo(infocard) {
  'use strict';
  var input_list = infocard.find("input");
  for (var i = 0; i < input_list.length; i++) {
    input_list.eq(i).val("");
    input_list.removeClass('error');
  }
  infocard.find('.tourist-okdate-input').parents('.tourist-tr').hide();
  infocard.find(".tourist-cardtype-input").val("IDCard");
  infocard.find(".radio-item").removeClass("active");
  infocard.find(".tourist-idtype-input").val("在职人员");
  infocard.find(".tourist-up-car").val("行程所示上车地点");
  infocard.removeAttr("data-value");
  infocard.find('.save-common-vistor .radio-16').removeClass('picked');
  infocard.find('.user-error-tip').remove();
  // insurance();
  checkBoxPick();
}

/**
 * 清空酒店游客资料
 * **/
function clearHotelInfo(infocard) {
  'use strict';
  var input_list = infocard.find("input");
  for (var i = 0; i < input_list.length; i++) {
    input_list.eq(i).val("");
  }
  infocard.removeAttr("data-value");
  insurance2();
  checkBoxPick();
}

// select-group下拉
$(".select-group .select").on("click",function(){
  var dropdown = $(this).parent().find(".select-dropdown");
  if(dropdown.is(":hidden")){
    $(".select-dropdown").hide();
    dropdown.show();
    return false;
  }else{
    dropdown.hide();
  }
});

// // 多选 multi-choice
// $(".sg-multi-choice .choice").on("click",function(){
//   var dropdown = $(this).parent().find(".choice-dropdown");
//   if(dropdown.is(":hidden")){
//     $(".choice-dropdown").hide();
//     dropdown.show();
//     return false;
//   }else{
//     dropdown.hide();
//   }
// });
// // $(".choice-dropdown li .choice-wrap .choice-tit").on("click",function(){
// //
// // });
// $(".choice-dropdown ul li i").on("click",function(){
//   // 获取最大限制长度
//   var limitNum = parseInt($(this).parents(".sg-multi-choice").attr("data-max"))
//   // 获取当前check 长度
//   var checknum = $(this).parents(".choice-dropdown").find(".icon-check").length;
//   if($(this).hasClass("icon-uncheck") && parseInt(checknum)<parseInt(limitNum)){
//     $(this).removeClass("icon-uncheck");
//     $(this).addClass("icon-check");
//     if(parseInt(checknum) == parseInt(limitNum)-1){
//       $(this).parents(".choice-dropdown").find(".icon-uncheck").css("opacity", 0.3)
//     }
//   }else if($(this).hasClass("icon-check")){
//     $(this).parents(".choice-dropdown").find(".icon-uncheck").css("opacity", 1)
//     $(this).removeClass("icon-check");
//     $(this).addClass("icon-uncheck");
//   }
// })
// $(".choice-dropdown .choice-btn-warp .cancel").on("click",function(){
//   $(".choice-dropdown").hide()
// })
// $(".choice-dropdown .choice-btn-warp .sure").on("click",function(){
//   // 默认值
//   var defaultText = $(this).parents(".sg-multi-choice").find(".choice-val").text();
//   // 填充的dom
//   var val = $(this).parents(".sg-multi-choice").find(".choice-val");
//   // 选择后第一个text
//   var totalText = $(this).parents(".choice-dropdown").find(".icon-check").eq(0).parent("li").find(".choice-wrap").find(".choice-tit").text();
//   // 已选的check长度
//   var limitNum = parseInt($(this).parents(".sg-multi-choice").find(".icon-check").length)
//   // 合并text
//   var mostStr = totalText.substring(0, 8) + "...共"+limitNum+"项服务";

//   if(limitNum>0){
//     val.text(mostStr);
//   }else{
//     val.text(defaultText);
//   }
//   $(this).parents(".choice-dropdown").hide();
//   $(".choice-dropdown").hide()
// })

// // 点击其他地方隐藏当前
// $(".choice-dropdown").autoHide();


//创建新的其他游客信息
$(".other-tourists").on('click', '.other-tourists-info', function (e) {
  var maxlength =4
  if($(this).parents(".tourist-con-item").find(".form-group").length > 4){
    return
  }
  e.prevent;
  var parent = $(this).parent();
  var ulHTML = parent.prev().clone(true);
  console.log(ulHTML);
  parent.before(ulHTML);
  console.log($(this).parents(".tourist-con-item").find(".form-group").eq(-1).find(".delthis").removeClass("disable"))
  // $(this).parent().find(".form-group").eq(-1).find(".delthis").removeClass("disable");
});

$(".select-dropdown li").on("click",function(){
  var val = $(this).parents(".select-group").find(".select-val");
  $(this).addClass("active").siblings().removeClass("active");
  val.text($(this).text());
  $(this).parent().hide();
});
// 点击其他地方隐藏当前
$(".select-dropdown").autoHide();

$(document).bind('click',function(){
  $('.b2b-address').find('ul').hide();
});

$('.b2b-address').bind('click',function(e){
  $(this).find('ul').toggle();
  stopPropagation(e);
});
// 头部事件
var b2c_header = {
  /**
   *  @param num 进行到的步骤 eg: stepctl(2) 进行到第二步
   * **/
  stepctl: function (num) {
    "use strict";
    $(".step").map(function (e) {
      var step_index = $(this).attr("step-index");
      if (step_index <= num) {
        $(this).addClass("active");
        $(".step-text:eq(" + (parseInt(step_index) - 1) + ")").addClass("active");
        if (step_index < num) {
          $(".line:eq(" + (parseInt(step_index) - 1) + ") .line-ctx").addClass("active");
        }
      }
    });
  }
};

// 滚动跟随
/*
 * @param_1 index         // 滚动锚点
 * @param_2 indexDiffer   // 开始锚点位置调整
 * @param_3 startEle      // 判断开始浮动位置的元素，默认当前
 * @param_4 startDiffer   // 开始位置调整
 * @param_5 left          // 左侧浮动距离，默认当前父元素offset().left
 * @param_6 scrollBox     // 浮动区域元素，默认当前父元素
 * @param_7 time          // 滚动锚点时间间隔
 * @param_7 isFill        // 浮动后是否填充原位置
 * @author: gl
 * Example
    $(".prod-nav").scrollFloat({
      index: $("[data-index='prod-nav']"),
      indexDiffer: 46,
      startEle: $(".trip-main"),
      startDiffer: 56,
      left: 0,
      scrollBox: $(".trip-main")
    });
 */
(function ($) {
  "use strict";
  $.fn.scrollFloat = function (option) {
    var defaults = {
      index: undefined,         // 滚动锚点,
      indexDiffer: undefined,   // 滚动锚点位置调整
      startEle: undefined,      // 开始浮动位置元素，默认当前父元素
      startDiffer: undefined,   // 开始位置调整
      left: undefined,          // 左侧浮动距离，默认当前父元素offset().left
      scrollBox: undefined,     // 浮动区域元素，默认当前父元素
      callback: function (obj) {
      },
      time: 500,                // 滚动锚点时间间隔
      isFill: true,              // 浮动后是否填充原位置
      tabClass: "active",
      // hasFloatH: false,
      overflowHandle: false     //浮动内容超出屏幕高度处理
    };
    var self = $(this);

    var params = $.extend(defaults, option);
    $(window).on("scroll", function () {
      var scrollTop = $(window).scrollTop();    // 滚动条高度
      var windowH = $(window).height();         // 窗口高度
      var documentH = $(document).height();     // 内容高度
      // var blockH = params.hasFloatH?0:self.outerHeight();
      var blockH = self.outerHeight();
      // 开始位置
      var start;

      if (params.startEle) {
        start = params.startDiffer ? params.startEle.offset().top - params.startDiffer : params.startEle.offset().top;
      } else {
        start = params.startDiffer ? self.parent().offset().top - params.startDiffer : self.parent().offset().top;
      }
      // console.log(params.scrollBox.outerHeight())
      // 结束位置 开始位置+浮动区域-浮层高度
      var end = start + (params.scrollBox ? params.scrollBox.outerHeight() : self.parent().outerHeight()) - blockH;
      // 左侧边浮动距离
      var left = params.left != undefined ? self.parent().offset().left + params.left : self.parent().offset().left;
      // 浮动判断
      // console.log('scrollTop:'+scrollTop)
      // console.log('end:'+end)
      if (scrollTop > start && scrollTop < end) {
        self.addClass("fixed").css("left", left);
        // if (params.overflowHandle) self.css("height","100%");
        if (params.isFill) {
          self.parent().css("padding-top", blockH);
        }
      } else {
        // if (params.overflowHandle && scrollTop >= end){
        //   console.log(scrollTop - end)
        //   var height = windowH - (scrollTop+windowH - end)
        //   self.height(height)
        //   return
        // }
        self.removeClass("fixed").css("left", params.left ? params.left : 0);
        if (params.isFill) {
          self.parent().css("padding-top", 0);
        }
      }
      // tab滚动切换
      var idx;
      if (params.index) {
        var scrollIndex = params.index;
        scrollIndex.each(function (i) {
          var scrollStart = params.indexDiffer ? scrollIndex.eq(i).offset().top - params.indexDiffer : scrollIndex.eq(i).offset().top;
          var isBottom = scrollTop + windowH >= documentH;
          if (scrollTop > scrollStart && !isBottom) {
            $("li", self).eq(i).addClass(params.tabClass).siblings().removeClass(params.tabClass);
            $("li", self).each(function() {
              if ($(this).hasClass("active")) {
                idx = $(this).index();
              }
            })
            $(".trip-list").children().eq(idx).addClass("on").siblings().removeClass("on");
            params.callback(params.index.eq(i));
          } else if (isBottom) {
            $("li", self).last().addClass(params.tabClass).siblings().removeClass(params.tabClass);
            params.callback(params.index.last());
          }
        });
      }
    });
    // 点击滚动
    if (params.index) {
      $("li", self).on("click", function () {
        var indexNum = $("li", self).index($(this));
        $(".trip-list").children().eq(indexNum).addClass("on").siblings().removeClass("on");
        var scrollT = params.indexDiffer ? params.index.eq(indexNum).offset().top - (params.indexDiffer - 1) : params.index.eq(indexNum).offset().top;
        $("body,html").stop().animate({scrollTop: scrollT}, params.time);
      });
    }
  };
})(jQuery);

// 展示框
var gzui = {
  /**
   * 输入列表 参数名 中文 默认值 解释 类型
   * params = {
   *  title 标题名称：（default 编辑联系人 **弹窗标题名称） type string
   *  inputList 输入列表：（default 输入列表 **输入列表） type array eg { name: "姓名", checkway: "empty" , d_val: "135****7186", is_null: false} 分别为字段名，验证方式，默认值，是否允许为空
   *  closeFn 关闭触发事件：（default undefined **除关闭浮层外要执行的事件） type function|undefined
   *  submitFn 确认表单函数：（default undefined **点击确认按钮执行的事件） type function|undefined
   *  callbackFn 校验完成执行函数：（default undefined **校验完成执行的事件） type function|undefined
   *  saveBtn 按钮文本：（default 保存并使用 **按钮文本） type string
   * }
   * **/
  addAccount: function (params) {
    "use strict";
    var def_opt = {
      title: "新增账户",
      saveBtn: "确定",
      cancelBtn: "取消",
      inputList: [
        {type: 'input',name: "账号", checkway: "empty", d_val: "", is_null: false,enName: "account"},
        {type: 'input',name: "姓名", checkway: "empty", d_val: "", is_null: false,enName: "name"},
		{type: 'input',name: "手机号码", checkway: "telValid", d_val: "", is_null: false,enName: "tel"},
        {type: 'input',name: "固定电话", checkway: "phone", d_val: "", is_null: true,enName: "phone"},
        {type: 'input',name: "传真", checkway: "empty", d_val: "", is_null: true,enName:"fax"},
        {type: 'input',name: "邮件", checkway: "mail", d_val: "", is_null: true,enName: "email"},
        {type: 'input',name: "新密码", checkway: "newPassw", d_val: "", is_null: false,enName: "newPassw"},
        {type: 'input',name: "确认密码", checkway: "passwSame", d_val: "", is_null: false,enName: "passComfirm"},
        {type: 'select',name: "默认站点", checkway: "empty", d_val: "", is_null: false,options: ['广州','湖南','杭州']}
      ],
      closeFn: function () {
        $(".black-mask").remove();
        //gzui.fixScroll();
      },
      submitFn: function () {
        var input_list = $(".com-input input");
        var this_obj, is_null, name, check_type, check_result,validArr={};
        var flag = 0;
        for (var i = 0; i < input_list.length; i++) {
          this_obj = input_list.eq(i);
          is_null = this_obj.attr("is-null") == "false" ? false : true;
          name = this_obj.attr("data-name-en");
          check_type = this_obj.attr("check-type") === undefined ? "empty" : this_obj.attr("check-type");
          if (check_type === 'passwSame')
            validArr[name] = gzformcheck[check_type](input_list.eq(i - 1).val(), this_obj.val())[1];
          else
            validArr[name] = gzformcheck[check_type](this_obj.val())[1]
        }
        if (validArr['account'] === '不能为空' && (validArr['newPassw'] === '不能为空' || validArr['passComfirm'] === '不能为空')) {
          $(this).parents('.common-ctx-wrp').find('.com-err font').text('请输入账号和密码！').parent().show();
          return;
          // 单个为空
        } else if (validArr['name'] === '不能为空') {
          $(this).parents('.common-ctx-wrp').find('.com-err font').text('请输入姓名!').parent().show();
          return;
        } else if (validArr['phone'] === '不能为空') {
          $(this).parents('.common-ctx-wrp').find('.com-err font').text('请输入电话!').parent().show();
          return;
        } else if (validArr['newPassw'] === '不能为空') {
          $(this).parents('.common-ctx-wrp').find('.com-err font').text('请输入新密码!').parent().show();
          return;
        } else if (validArr['passComfirm'] === '不能为空') {
          $(this).parents('.common-ctx-wrp').find('.com-err font').text('请输入确认密码!').parent().show();
          return;
        // } else if (validArr['phone'] === '格式不正确') {
        //   $(this).parents('.common-ctx-wrp').find('.com-err font').text('请输入正确的手机号!').parent().css('visibility', 'visible');
        //   return;
        }


        if (flag === 0) {
          var res = [];
          $(".com-input input").each(function (i, e) {
            var input_obj = {name: "", val: ""};
            input_obj.name = $(e).parents('.common-ctx').find('.com-err font').text();
            input_obj.val = $(e).val();
            res.push(input_obj);
          });
          params.callbackFn(res);
          params.closeFn();
        }
      },
      callbackFn: function (res) { }
    };
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }

    var input_part = "";
    var input_list = params.inputList;
    for (var i = 0; i < input_list.length; i++) {
      var is_null = input_list[i].is_null ? "" : "<span class='red'>*</span>";
      input_part = input_part +
      "<div class='com-input'>"+
        "<span class='com-input-laber'>" +is_null+
          "<span class='com-input-name'>"+input_list[i].name + "：</span>"+
        "</span>";
      if(input_list[i].type == 'input') {
        if (input_list[i].checkway === 'newPassw' ||
          input_list[i].checkway === 'passwSame'){
          input_part = input_part +
            "<input type='password' data-name-en='" + input_list[i].enName + "' placeholder='请输入" + input_list[i].name + "' value='" + input_list[i].d_val + "' check-type='" + input_list[i].checkway + "' is-null='" + input_list[i].is_null + "'>" +
            "</div>";
        }else{
          input_part = input_part +
            "<input type='text' data-name-en='" + input_list[i].enName + "' placeholder='请输入" + input_list[i].name + "' value='" + input_list[i].d_val + "' check-type='" + input_list[i].checkway + "' is-null='" + input_list[i].is_null + "'>" +
            "</div>";
        }
      }else if(input_list[i].type == 'select'){
        input_part += " <select>";
        for(var j=0;j<input_list[i].options.length;j++){
          input_part += "<option>"+input_list[i].options[j]+"</option>"
        }
        input_part += "</select>"
      }
    }
    var addcontact_tpl = "<div class='black-mask'>" +
      "<div class='common-input-wrp'>" +
      "<div class='common-header'>" +
      "<div class='common-htext'>" + params.title + "</div>" +
      "<div class='common-close-btn close-icon'></div>" +
      "</div>" +
      "<div class='common-ctx-wrp'>" +
      "<div class='com-err'><i class='err-icon'></i><font>两个密码不一致，请重新输入</font></div>" +
      "<div class='common-ctx'>" +
      "<div class='com-form-wrp'>" +
      "<div class='com-input-wrp'>" +
      input_part +
      "</div>" +
      "</div>" +
      "<div class='save-btn-wrp com-form-save'>" +
      "<div class='cancel-btn btn'>" + params.cancelBtn + "</div>" +
      "<div class='save-btn btn comfirm-btn'>" + params.saveBtn + "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(addcontact_tpl);
    //gzui.limitScroll();
    // 调整框位置
    $(".common-input-wrp").css("margin-top", "-" + $(".common-input-wrp").height() / 2 + "px").css("margin-left", "-" + $(".common-input-wrp").width() / 2 + "px");
    $('.com-err .err-icon').on('click', function () {
      $(this).parent().hide();
    });
    // 关闭事件
    if (params.closeFn !== undefined) {
      $(".common-close-btn").click(params.closeFn);
      $(".cancel-btn").click(params.closeFn);
    }
    // 提交事件
    if (params.submitFn !== undefined) {
      $(".save-btn").click(params.submitFn);
    }
    $('input').on('focus', function () {
      $(this).removeClass('err')
    })
  },
  addToast: function (params){
    "use strict";
    var def_opt = {
      title: "停用账户",
      saveBtn: "确定",
      cancelBtn: "取消",
      content: "停用后该账号不能正常使用，确定停用该账号吗？",
      closeFn: function () {
        $(".black-mask").remove();
        //gzui.fixScroll();
      },
      submitFn: function () {
        params.callbackFn();
        params.closeFn();
      },
      callbackFn: function () { }
    }
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }


    var addToast_tpl = "<div class='black-mask'>" +
      "<div class='common-input-wrp'>" +
      "<div class='common-header'>" +
      "<div class='common-htext'>" + params.title + "</div>" +
      "<div class='common-close-btn close-icon'></div>" +
      "</div>" +
      "<div class='common-ctx-wrp'>" +
      "<div class='common-ctx'>" +
      "<div class='com-form-wrp'>" +
      "<div class='com-input-wrp toast-cont'>" +
        params.content+
      "</div>" +
      "</div>" +
      "<div class='save-btn-wrp com-form-save'>" +
      "<div class='cancel-btn btn'>" + params.cancelBtn + "</div>" +
      "<div class='save-btn btn comfirm-btn'>" + params.saveBtn + "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(addToast_tpl);
    //gzui.limitScroll();
    // 调整框位置
    $(".common-input-wrp").css("margin-top", "-" + $(".common-input-wrp").height() / 2 + "px").css("margin-left", "-" + $(".common-input-wrp").width() / 2 + "px");

    // 关闭事件
    if (params.closeFn !== undefined) {
      // $(".black-mask").remove();
      $(".common-close-btn").click(params.closeFn);
      $(".cancel-btn").click(params.closeFn);
    }
    // 提交事件
    if (params.submitFn !== undefined) {
      $(".save-btn").click(params.submitFn);
    }
  },
  /**
   * 输入列表 参数名 中文 默认值 解释 类型
   * params = {
   *  title 标题名称：（default 编辑联系人 **弹窗标题名称） type string
   *  userData 用户数据：{id: {name ... }}
   *  closeFn 关闭触发事件：（default undefined **除关闭浮层外要执行的事件） type function|undefined
   *  submitFn 确认表单函数：（default undefined **点击确认按钮执行的事件） type function|undefined
   *  callbackFn 校验完成执行函数：（default undefined **校验完成执行的事件） type function|undefined
   *  saveBtn 按钮文本：（default 保存并使用 **按钮文本） type string
   * }
   * **/
  changeVistor: function (params) {
    "use strict";
    var def_opt = {
      title: "更换游客",
      saveBtn: "更换",
      closeFn: function () {
        $(".black-mask").remove();
        gzui.fixScroll();
      },
      userData: [],
      submitFn: function () {
        if($(".common-ctx-wrp .checkbox-btns-row .checkbox-btn-item.active").length===0) {
          gzui.toast({text: '请至少选择一个游客'});
        } else {
          var data_val = $(".common-ctx-wrp .checkbox-btns-row .checkbox-btn-item.active").attr('data-value');
          params.userData[data_val].id = data_val;
          params.callbackFn(params.userData[data_val]);
          params.closeFn();
        }

      },
      callbackFn: function (res) {

      }
    };
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }
    var tem_tpl = '';
    for (var item in params.userData) {
      tem_tpl = tem_tpl + '<li data-value="'+item+'" class="checkbox-btn-item popover order-member"><span class="tick-text">'+params.userData[item].name+'</span><span class="tick-logo"></span></li>';
    }
    var vistor_tpl = '<div class="checkbox-btns-con usual-tourist-con changevistor scrollbar"><ul class="checkbox-btns-row">' + tem_tpl + '</ul></div>';
    var final_tpl = "<div class='black-mask'>" +
                    "<div class='common-input-wrp' style='width: auto'>" +
                    "<div class='common-header'>" +
                    "<div class='common-htext'>" + params.title + "</div>" +
                    "<div class='common-close-btn close-icon'></div>" +
                    "</div>" +
                    "<div class='common-ctx-wrp'>" +
                    "<div class='common-ctx'>" +
                    "<div class='com-form-wrp'>" +
                    "<div class='com-input-wrp'>" +
                    vistor_tpl +
                    "</div>" +
                    "</div>" +
                    "<div class='save-btn-wrp com-form-save'>" +
                    "<div class='save-btn btn comfirm-btn'>" + params.saveBtn + "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
    $("body").append(final_tpl);
    $(".common-ctx-wrp .checkbox-btns-row .checkbox-btn-item").click(function () {
      $(".common-ctx-wrp .checkbox-btns-row .checkbox-btn-item").removeClass('active');
      $(this).addClass('active');
    });
    gzui.limitScroll();
    // 调整框位置
    $(".common-input-wrp").css("margin-top", "-" + $(".common-input-wrp").height() / 2 + "px").css("margin-left", "-" + $(".common-input-wrp").width() / 2 + "px");
    // 关闭事件
    if (params.closeFn !== undefined) {
      $(".common-close-btn").click(params.closeFn);
    }
    // 提交事件
    if (params.submitFn !== undefined) {
      $(".save-btn").click(params.submitFn);
    }
  },
  /**
   * 输入列表 参数名 中文 默认值 解释 类型
   * params = {
   *  title 标题名称：（default 编辑联系人 **弹窗标题名称） type string
   *  closeFn 关闭触发事件：（default undefined **除关闭浮层外要执行的事件） type function|undefined
   *  submitFn 确认表单函数：（default undefined **点击确认按钮执行的事件） type function|undefined
   *  callbackFn 校验完成执行函数：（default undefined **校验完成执行的事件） type function|undefined
   *  saveBtn 按钮文本：（default 保存并使用 **按钮文本） type string
   * }
   * **/
  updatePassw: function (params) {
    "use strict";
    var def_opt = {
      title: "修改密码",
      saveBtn: "确定",
      cancelBtn: "取消",
      inputList: [
        {name: "新密码", checkway: "newPassw", d_val: "", is_null: false,enName: "newPassw"},
        {name: "确认密码", checkway: "passwSame", d_val: "", is_null: false,enName: "passComfirm"}
      ],
      closeFn: function () {
        $(".black-mask").remove();
        //gzui.fixScroll();
      },
      submitFn: function () {
        var input_list = $(".com-input input");
        var this_obj, is_null, name, check_type, check_result,validArr={};
        var flag = 0;
        for (var i = 0; i < input_list.length; i++) {
          this_obj = input_list.eq(i);
          is_null = this_obj.attr("is-null") == "false" ? false : true;
          name = this_obj.attr("data-name-en");
          check_type = this_obj.attr("check-type") === undefined ? "empty" : this_obj.attr("check-type");
          if (check_type === 'passwSame')
            validArr[name] = gzformcheck[check_type](input_list.eq(i - 1).val(), this_obj.val())[1];
          else
            validArr[name] = gzformcheck[check_type](this_obj.val())[1]
        }
        if (validArr['newPassw'] === '不能为空') {
          $(this).parents('.common-ctx-wrp').find('.com-err font').text('请输入新密码!').parent().show();
          $('[data-name-en="newPassw"]').addClass('err');
          return;
        } else if (validArr['passComfirm'] === '不能为空') {
          $(this).parents('.common-ctx-wrp').find('.com-err font').text('请输入确认密码!').parent().show();
          $('[data-name-en="passComfirm"]').addClass('err');
          return;
        }

        if (validArr['passComfirm'] === "不一致") {
          $(this).parents('.common-ctx-wrp').find('.com-err font').text('两次密码不一致').parent().show();
          $('[data-name-en="passComfirm"]').addClass('err');
          return;
        }

        if (flag === 0) {
          var res = [];
          $(".com-input input").each(function (i, e) {
            var input_obj = {name: "", val: ""};
            input_obj.name = $(e).parents('.common-ctx').find('.com-err font').text();
            input_obj.val = $(e).val();
            res.push(input_obj);
          });
          params.callbackFn(res);
          params.closeFn();
        }
      },
      callbackFn: function (res) { }
    };
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }

    var input_part = "";
    var input_list = params.inputList;
    for (var i = 0; i < input_list.length; i++) {
      var is_null = input_list[i].is_null ? "" : "<span class='red'>*</span>";
      input_part = input_part +
      "<div class='com-input'>"+
        "<span class='com-input-laber'>" +is_null+
          "<span class='com-input-name'>"+input_list[i].name + "：</span>"+
        "</span>"+
        "<input type='password' data-name-en='"+input_list[i].enName+"' placeholder='请输入" + input_list[i].name + "' value='" + input_list[i].d_val + "' check-type='" + input_list[i].checkway + "' is-null='" + input_list[i].is_null + "'>"+
      "</div>";
    }
    var addcontact_tpl = "<div class='black-mask'>" +
      "<div class='common-input-wrp'>" +
      "<div class='common-header'>" +
      "<div class='common-htext'>" + params.title + "</div>" +
      "<div class='common-close-btn close-icon'></div>" +
      "</div>" +
      "<div class='common-ctx-wrp'>" +
      "<div class='com-err'><i class='err-icon'></i><font>两个密码不一致，请重新输入</font></div>" +
      "<div class='common-ctx'>" +
      "<div class='com-form-wrp'>" +
      "<div class='com-input-wrp'>" +
      input_part +
      "</div>" +
      "</div>" +
      "<div class='save-btn-wrp com-form-save'>" +
      "<div class='cancel-btn btn'>" + params.cancelBtn + "</div>" +
      "<div class='save-btn btn comfirm-btn' >" + params.saveBtn + "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(addcontact_tpl);
    //gzui.limitScroll();
    // 调整框位置
    $(".common-input-wrp").css("margin-top", "-" + $(".common-input-wrp").height() / 2 + "px").css("margin-left", "-" + $(".common-input-wrp").width() / 2 + "px");
    $('.com-err .err-icon').on('click', function () {
      $(this).parent().hide();
    });
    // 关闭事件
    if (params.closeFn !== undefined) {
      $(".common-close-btn").click(params.closeFn);
      $(".cancel-btn").click(params.closeFn);
    }
    // 提交事件
    if (params.submitFn !== undefined) {
      $(".save-btn").click(params.submitFn);
    }
    $('input.err').on('blur', function () {
      $(this).removeClass('err')
    })
  },
  modifyInfo: function (params){
    "use strict";
    var def_opt = {
      title: "编辑资料",
      saveBtn: "确定",
      cancelBtn: "取消",
      inputList: [
        {type:"input",name: "账号", checkway: "empty", d_val: "", is_null: false,enName: "account"},
        {type:"input",name: "姓名", checkway: "empty", d_val: "", is_null: false,enName: "name"},
		{type:"input",name: "手机号码", checkway: "telValid", d_val: "", is_null: false,enName: "tel"},
        {type:"input",name: "固定电话", checkway: "phone", d_val: "", is_null: true,enName: "phone"},
        {type:"input",name: "传真", checkway: "empty", d_val: "", is_null: true,enName:"fax"},
        {type:"input",name: "邮件", checkway: "mail", d_val: "", is_null: true,enName: "email"},
        {type:"select",name: "默认站点", checkway: "empty", d_val: "", is_null: false,options: ['广州','湖南','杭州']}
      ],
      closeFn: function () {
        $(".black-mask").remove();
        //gzui.fixScroll();
      },
      submitFn: function () {
        var input_list = $(".com-input input");
        var this_obj, is_null, name, check_type, check_result,validArr={};
        var flag = 0;
        for (var i = 0; i < input_list.length; i++) {
          this_obj = input_list.eq(i);
          is_null = this_obj.attr("is-null") == "false" ? false : true;
          name = this_obj.attr("data-name-en");
          check_type = this_obj.attr("check-type") === undefined ? "empty" : this_obj.attr("check-type");
          if (check_type === 'passwSame')
            validArr[name] = gzformcheck[check_type](input_list.eq(i - 1).val(), this_obj.val())[1];
          else
            validArr[name] = gzformcheck[check_type](this_obj.val())[1]
        }
        if (validArr['account'] === '不能为空') {
          $(this).parents('.common-ctx-wrp').find('.com-err font').text('请输入账号').parent().show();
          $('[data-name-en="account"]').addClass('err');
          return;
        } else if (validArr['name'] === '不能为空') {
          $(this).parents('.common-ctx-wrp').find('.com-err font').text('请输入姓名!').parent().show();
          $('[data-name-en="name"]').addClass('err');
          return;
        } else if (validArr['phone'] === '不能为空') {
          $(this).parents('.common-ctx-wrp').find('.com-err font').text('请输入电话!').parent().show();
          $('[data-name-en="phone"]').addClass('err');
          return;
        }

        if (flag === 0) {
          var res = [];
          $(".com-input input").each(function (i, e) {
            var input_obj = {name: "", val: ""};
            input_obj.name = $(e).parents('.common-ctx').find('.com-err font').text();
            input_obj.val = $(e).val();
            res.push(input_obj);
          });
          params.callbackFn(res);
          params.closeFn();
        }
      },
      callbackFn: function (res) { }
    };
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }

    var input_part = "";
    var input_list = params.inputList;
    for (var i = 0; i < input_list.length; i++) {
      var is_null = input_list[i].is_null ? "" : "<span class='red'>*</span>";
      input_part = input_part +
        "<div class='com-input'>"+
          "<span class='com-input-laber'>" +is_null+
            "<span class='com-input-name'>"+input_list[i].name + "：</span>"+
          "</span>";
      if(input_list[i].type == 'input') {
        if(input_list[i].checkway ==='newPassw' || input_list[i].checkway ==='passwSame')
          input_part = input_part +
            "<input type='password' data-name-en='"+input_list[i].enName+"' placeholder='请输入" + input_list[i].name + "' value='" + input_list[i].d_val + "' check-type='" + input_list[i].checkway + "' is-null='" + input_list[i].is_null + "'>"+
          "</div>";
        else
          input_part = input_part +
            "<input type='text' data-name-en='"+input_list[i].enName+"' placeholder='请输入" + input_list[i].name + "' value='" + input_list[i].d_val + "' check-type='" + input_list[i].checkway + "' is-null='" + input_list[i].is_null + "'>"+
          "</div>";
      }else if(input_list[i].type == 'select'){
        input_part += " <select>";
        for(var j=0;j<input_list[i].options.length;j++){
          input_part += "<option>"+input_list[i].options[j]+"</option>"
        }
        input_part += "</select></div>"
      }
    }
    var addcontact_tpl = "<div class='black-mask'>" +
      "<div class='common-input-wrp'>" +
      "<div class='common-header'>" +
      "<div class='common-htext'>" + params.title + "</div>" +
      "<div class='common-close-btn close-icon'></div>" +
      "</div>" +
      "<div class='common-ctx-wrp'>" +
      "<div class='com-err'><i class='err-icon'></i><font></font></div>" +
      "<div class='common-ctx'>" +
      "<div class='com-form-wrp'>" +
      "<div class='com-input-wrp'>" +
      input_part +
      "</div>" +
      "</div>" +
      "<div class='save-btn-wrp com-form-save'>" +
      "<div class='cancel-btn btn'>" + params.cancelBtn + "</div>" +
      "<div class='save-btn btn comfirm-btn'>" + params.saveBtn + "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(addcontact_tpl);
    //gzui.limitScroll();
    // 调整框位置
    $(".common-input-wrp").css("margin-top", "-" + $(".common-input-wrp").height() / 2 + "px").css("margin-left", "-" + $(".common-input-wrp").width() / 2 + "px");
    $('.com-err .err-icon').on('click', function () {
      $(this).parent().hide();
    });
    // 关闭事件
    if (params.closeFn !== undefined) {
      $(".common-close-btn").click(params.closeFn);
      $(".cancel-btn").click(params.closeFn);
    }
    // 提交事件
    if (params.submitFn !== undefined) {
      $(".save-btn").click(params.submitFn);
    }
    //输入框失去焦点
    $('input').on('focus', function () {
      $(this).removeClass('err')
    })
  },
  /**
   * 内容编辑
   * **/
  editText: function (params){
    "use strict";
    var def_opt = {
      title: "变更行程",
      saveBtn: "确定",
      cancelBtn: "取消",
      placeholder: "请输入变更行程的原因（必填）",
      hist: [],
      maxLen: undefined,
      closeFn: function () {
        $(".black-mask").remove();
        //gzui.fixScroll();
      },
      submitFn: function () {
        var con = $(".black-mask .textarea-item textarea").val();
        params.callbackFn(con);
        params.closeFn();
      },
      callbackFn: function (con) {}
    };
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }

    var conTpl = "<div class='textarea-item'><textarea placeholder='"+params.placeholder+"'" +
      (params.maxLen!=undefined?"maxlength='"+params.maxLen+"'":"") +
      "></textarea>" +
      (params.maxLen!=undefined?"<span class='textarea-len'><em>0</em>/"+params.maxLen+"</span>":"") +
      "</div>";
    var histTpl = '<ul class="hist-tag">';
    if(params.hist.length>0){
      for(var i=0;i<params.hist.length;i++){
        if(i<5){
          histTpl += '<li>'+params.hist[i]+'</li>'
        }
      }
    }
    histTpl += '</ul>';
    var tpl = "<div class='black-mask'>" +
      "<div class='common-input-wrp editText-popup'>" +
      "<div class='common-header'>" +
      "<div class='common-htext'>" + params.title + "</div>" +
      "<div class='common-close-btn close-icon'></div>" +
      "</div>" +
      "<div class='common-ctx-wrp'>" +
      "<div class='common-ctx'>" + conTpl + (params.hist.length>0?histTpl:'') +
      "<div class='save-btn-wrp com-form-save'>" +
      "<div class='cancel-btn btn'>" + params.cancelBtn + "</div>" +
      "<div class='save-btn btn comfirm-btn'>" + params.saveBtn + "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(tpl);
    //gzui.limitScroll();
    // 调整框位置
    $(".common-input-wrp").css("margin-top", "-" + $(".common-input-wrp").height() / 2 + "px").css("margin-left", "-" + $(".common-input-wrp").width() / 2 + "px");
    // 输入字数显示
    $(".textarea-item textarea").on("input propertychange",function(){
      $(".textarea-len em").text($(this).val().length);
    });
    // 历史记录选择
    $(".hist-tag li").on("click",function(){
      var text = $(this).text();
      var textarea = $(this).parents(".common-ctx").find("textarea");
      var val = textarea.val() + text;
      textarea.val(val.slice(0,params.maxLen));
      $(".textarea-len em").text(textarea.val().length);
    });
    // 关闭事件
    if (params.closeFn !== undefined) {
      // $(".black-mask").remove();
      $(".common-close-btn").click(params.closeFn);
      $(".cancel-btn").click(params.closeFn);
    }
    // 提交事件
    if (params.submitFn !== undefined) {
      $(".save-btn").click(params.submitFn);
    }
  },
  /**
   *产品介绍
   **/
  showProductIntro: function(params){
    "use strict";
    var def_opt = {
      title: "产品介绍",
      saveBtn: "确定",
      isSave: true,
      content: "loremfsfasfdsafasghfuigsajkfhsaklfhklhfklashfklsdhfjkshklfhsjklhfsdhfsdfasfawfwafasfd",
      hasMask: true,
      class: '',
      closeFn: function () {
        $(this).parents(".black-mask").remove();
        //gzui.fixScroll();
      },
      submitFn: function () {
        params.closeFn();
      },
    };
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }

    var addcontact_tpl = "<div class='black-mask "+(params.hasMask ? '':'transparent')+"'>" +
      "<div class='common-input-wrp "+(params.class ? params.class : '')+"'>" +
      "<div class='common-header'>" +
      "<div class='common-htext'>" + params.title + "</div>" +
      "<div class='common-close-btn close-icon'></div>" +
      "</div>" +
      "<div class='common-ctx-wrp'>" +
      "<div class='common-ctx'>" +
      "<div class='com-form-wrp'>" +
      "<div class='com-input-wrp'>" +
        "<p class='com-product-intro'>"+
          params.content +
        "</p>"+
      "</div>" +
      "</div>" +
      "<div class='save-btn-wrp com-form-save'>" +
      (params.isSave ? "<div class='save-btn btn comfirm-btn'>" + params.saveBtn + "</div>" : "")+
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(addcontact_tpl);
    $(".common-input-wrp").css("margin-top", "-" + $(".common-input-wrp").height() / 2 + "px").css("margin-left", "-" + $(".common-input-wrp").width() / 2 + "px");

    // 关闭事件
    if (params.closeFn !== undefined) {
      $(".common-close-btn").click(params.closeFn);
      $(".save-btn").click(params.submitFn);
    }
  },
  /**
   *更新行程
   **/
  updateTravel: function(params){
    "use strict";
    var def_opt = {
      title: "发起变更行程",
      saveBtn: "确定",
      cancelBtn: "取消",
      placeholder1: "变更行程标题（必填）",
      placeholder2: "变更前内容",
      placeholder3: "变更后内容",
      closeFn: function () {
        $(".black-mask").remove();
        //gzui.fixScroll();
      },
      submitFn: function () {
        var conInput = $(".black-mask .textarea-item .common-input").val();
        var conText1 = $(".black-mask .textarea-item textarea:eq(0)").val();
        var conText2 = $(".black-mask .textarea-item textarea:eq(1)").val();
        var arrVals = [];
        arrVals.push(conInput);
        arrVals.push(conText1);
        arrVals.push(conText2);
        params.callbackFn(arrVals);
        params.closeFn();
      },
      callbackFn: function (arrVals) {
        console.log(arrVals+'---')
      }
    };
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }

    var conTpl = "<div class='textarea-item'>"+
    "<input class='common-input' placeholder='"+params.placeholder1+"'>"+
    "<textarea placeholder='"+params.placeholder2+"'></textarea>"+
    "<textarea placeholder='"+params.placeholder3+"'></textarea>"+
    "</div>";
    var tpl = "<div class='black-mask'>" +
      "<div class='common-input-wrp editText-popup'>" +
      "<div class='common-header'>" +
      "<div class='common-htext'>" + params.title + "</div>" +
      "<div class='common-close-btn close-icon'></div>" +
      "</div>" +
      "<div class='common-ctx-wrp'>" +
      "<div class='common-ctx'>" + conTpl +
      "<div class='save-btn-wrp com-form-save'>" +
      "<div class='cancel-btn btn'>" + params.cancelBtn + "</div>" +
      "<div class='save-btn btn comfirm-btn'>" + params.saveBtn + "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(tpl);
    //gzui.limitScroll();
    // 调整框位置
    $(".common-input-wrp").css("margin-top", "-" + $(".common-input-wrp").height() / 2 + "px").css("margin-left", "-" + $(".common-input-wrp").width() / 2 + "px");
    // 关闭事件
    if (params.closeFn !== undefined) {
      // $(".black-mask").remove();
      $(".common-close-btn").click(params.closeFn);
      $(".cancel-btn").click(params.closeFn);
    }
    // 提交事件
    if (params.submitFn !== undefined) {
      $(".save-btn").click(params.submitFn);
    }
  },
  /**
   *确认入住
   **/
  comfirm: function(params){
    "use strict";
    var def_opt = {
      title: "确认入住",
      saveBtn: "确定",
      cancelBtn: "取消",
      content: "是否确认入住？",
      closeFn: function () {
        params.callbackFn(false);
        $(".black-mask").remove();

      },
      submitFn: function () {
        params.callbackFn(true);
        $(".black-mask").remove();
      },
      callbackFn: function (ans) {
        console.log(ans+'---')
      }
    };
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }

    var addcontact_tpl = "<div class='black-mask'>" +
      "<div class='common-input-wrp'>" +
      "<div class='common-header'>" +
      "<div class='common-htext'>" + params.title + "</div>" +
      "<div class='common-close-btn close-icon'></div>" +
      "</div>" +
      "<div class='common-ctx-wrp'>" +
      "<div class='common-ctx'>" +
      "<div class='com-form-wrp'>" +
      "<div class='com-input-wrp'>" +
        "<p class='com-product-intro'>"+
          params.content +
        "</p>"+
      "</div>" +
      "</div>" +
      "<div class='save-btn-wrp com-form-save'>" +
      "<div class='cancel-btn btn'>" + params.cancelBtn + "</div>" +
      "<div class='save-btn btn comfirm-btn'>" + params.saveBtn + "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(addcontact_tpl);
    $(".common-input-wrp").css("margin-top", "-" + $(".common-input-wrp").height() / 2 + "px").css("margin-left", "-" + $(".common-input-wrp").width() / 2 + "px");

    // 关闭事件
    if (params.closeFn !== undefined) {
      $(".common-close-btn").click(params.closeFn);
      $(".cancel-btn").click(params.closeFn);
      $(".save-btn").click(params.submitFn);
    }
  },
  /**
   * load 加载  参数名 中文 默认值 解释 类型
   * params = {
   *  imgurl 图片地址 type string
   * }
   * **/
  toload: function(params){
    "use strict";
    var def_opt = {
      tip: "正在查询..."
    };
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }
    var toloadTpl = "<div class='toload'><div class='toload-tip'><span class='loading-gif'></span><span>"+def_opt.tip+"</span></div></div>";
    $("body").append(toloadTpl);
  },
  toloadHide: function(){
    $(".toload").remove();
  },
  partialLoadHide: function () {
    $(".partialLoad").remove();
  },
  countDownTips: function(params){
    "use strict";
    var def_opt = {
      type: "success",
      tip: "操作成功...",
      countDown: 3
    };
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }
    var countDownTipsTpl = "";
    if (def_opt.type == "success") {
      countDownTipsTpl = "<div class='countDown-tip'><div class='countDown-tip-text'><i class='icon-fasongyouxiang'></i><span>"+def_opt.tip+"，</span><span class='second'>("+def_opt.countDown+"s)</span></div></div>";
    } else if (def_opt.type == "safe-success") {
      countDownTipsTpl = "<div class='countDown-tip'><div class='countDown-tip-text'><i class='icon-anquan'></i><span>"+def_opt.tip+"，</span><span class='second'>("+def_opt.countDown+"s)</span></div></div>";
    }
    $("body").append(countDownTipsTpl);

    var second = def_opt.countDown;
    var timer = setInterval(function() {
      second--;
      $(".countDown-tip-text .second").html("("+second+"s)");
      if (second <= 0) {
        $(".countDown-tip").hide();
        $(".invoice-send-pop").hide();
        clearInterval(timer);
        timer = null;
      }
    },1000);
  },
  /**
   * 页面进度条
   * **/
  progress: function(params){
    "use strict";
    var def_opt = {
      loading: function(){
        // 获取进度条 div
        var $progress = $('#progress');
        // 初始进度，1%
        var progress = 20;
        // 生成随机数
        var random = function (min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
        };
        // 跑进度
        var onprogress = function () {
          // 随机时间
          var timeout = random(10, 30);
          setTimeout(function () {
            // 如果页面加载完毕，则直接进度到 100%
            if (window.loaded) {
              $progress.css("width",'100%');
              $(".progress").remove();
              return;
            }
            // 随机进度
            progress += random(1, 10);
            // 随机进度不能超过 98%，以免页面还没加载完毕，进度已经 100% 了
            if (progress > 98) {
              progress = 98;
            }
            $progress.css("width",progress + '%');
            onprogress();
          }, timeout);
        };
        // 开始跑进度
        onprogress();
        window.onload = function () {
          window.loaded = true;
        };
      }
    };
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }
    var tpl = '<div class="progress"><div id="progress" class="progress-inner"></div></div>';
    $("html").append(tpl);
    params.loading();
  },
  // 限制滚动
  limitScroll: function () {
    "use strict";
    $("body").css({
      "height": "100%",
      "overflow": "hidden"
    });
  },
  // 恢复滚动
  fixScroll: function () {
    "use strict";
    $("body").css({
      "height": "auto",
      "overflow": "visible"
    });
  },

  editContactInfo: function (params){
    "use strict";
    var def_opt = {
      title: "编辑联系人",
      saveBtn: "保存",
      cancelBtn: "取消",
      deleteBtn: true,
      refLi: null,
      closeFn: function () {
        $(".black-mask").remove();
        //gzui.fixScroll();
      },
      submitFn: function () {
        var input_list = $(this).parent().prev().find("input");
        var this_obj, is_null, name, check_type, check_result;
        var flag = 0;
        var validArr = {};

        for (var i = 0; i < input_list.length; i++) {
          this_obj = input_list.eq(i);

          is_null = this_obj.attr("is-null") == "false" ? false : true;
          name = this_obj.attr("data-name-en");
          check_type = this_obj.attr("check-type") === undefined ? "empty" : this_obj.attr("check-type");
          check_result = gzformcheck[check_type](this_obj.val());
          // 非必填项 或 必填且有内容
          if (!is_null || (is_null && this_obj.val() !== "")) {
            if (!check_result[0]) {
              validArr[name] = check_result[1];
              flag++;
            }
          }
          validArr[name] = typeof(validArr[name]) !== 'undefined' ? validArr[name] : true;
        }
        $('[data-name-en]').next().text('')
        if (flag === 0) {
          var res = [];

          input_list.each(function (i, e) {
            var input_obj = {name: "", val: ""};
            input_obj.name = $(e).attr("data-name-en");
            input_obj.val = $(e).val();
            res.push(input_obj);
          });
          $(this).siblings('.err-tip').css('visibility', 'hidden');
          params.callbackFn(res);
        } else {

          // 空验证
          if (validArr['contractName'] === '不能为空' ) {
            $("[data-name-en='contractName']").next().text('请输入姓名！');
            // return;
            // 单个为空
          } if (validArr['contractMobile'] === '不能为空') {
            $("[data-name-en='contractMobile']").next().text('请输入手机号码!');
            // return;
          } if (validArr['contractEmail'] === '不能为空') {
            $("[data-name-en='contractEmail']").next().text('请输入邮箱地址!');
            // return;
          } if (validArr['contractIdNo'] === '不能为空') {
            $("[data-name-en='contractIdNo']").next().text('请输入身份证号码!');
            // return;
          } if (validArr['contractMobile'] === '格式不正确' ) {
            $("[data-name-en='contractMobile']").next().text('请输入正确的手机号码!');
            // return;
          } if (validArr['contractEmail'] === '格式不正确') {
            $("[data-name-en='contractEmail']").next().text('请输入正确的邮箱地址!');
            // return;
          } if (validArr['contractIdNo'] === '格式不正确') {
            $("[data-name-en='contractIdNo']").next().text('请输入正确的身份证号码!');
            // return;
          }

        }
      },
      callbackFn: function (con) {}
    };
    if (params === undefined) {
      params = def_opt;
    } else {
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }


    var conTpl = "<div class='input-item'>"+
                  "<div class='com-form-wrp'>"+
                    "<div class='com-input-wrp'>"+
                      "<div class='com-input'>"+
                        "<span class='com-input-laber'><label>*</label>姓名</span>"+
                        "<input type='text' data-name-en='contractName' placeholder='请输入游客姓名' value='' check-type='empty' is-null='false'>"+
                        "<span class='err-tip'></span>"+
                      "</div>"+
                      "<div class='com-input'>"+
                        "<span class='com-input-laber'><label>*</label>手机号码</span>"+
                        "<input type='text' data-name-en='contractMobile' placeholder='请输入手机号码' value='' check-type='phone' is-null='false'>"+
                        "<span class='err-tip'></span>"+
                      "</div>"+
                      "<div class='com-input'>"+
                        "<span class='com-input-laber'><label>*</label>E-mail</span>"+
                        "<input type='text' data-name-en='contractEmail' placeholder='请输入邮箱地址' value='' check-type='mail' is-null='false'>"+
                        "<span class='err-tip'></span>"+
                      "</div>"+
                      "<div class='com-input'>"+
                        "<span class='com-input-laber'><label>*</label>身份证号码</span>"+
                        "<input type='text' data-name-en='contractIdNo' placeholder='请输入身份证号码' value='' check-type='mail' is-null='false'>"+
                        "<span class='err-tip'></span>"+
                      "</div>"+
                    "</div>"+
                  "</div>"+
                 "</div>";

    var tpl = "<div class='black-mask'>" +
      "<div class='common-input-wrp editContactInfo-popup'>" +

      "<div class='common-header'>" +
      "<div class='common-htext'>" + params.title + "</div>" +
      "<div class='common-close-btn close-icon'></div>" +
      "</div>" +
      "<div class='common-ctx-wrp'>" +

      "<div class='common-ctx' style='padding: 30px'>" + conTpl +
      "<div class='save-btn-wrp com-form-save'>" +
        (params.deleteBtn?"<a href='javascript: void(0);' class='delContact'>删除游客</a>":"")+
        "<div class='cancel-btn btn'>" + params.cancelBtn + "</div>" +
        "<div class='save-btn btn comfirm-btn'>" + params.saveBtn + "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(tpl);
    //gzui.limitScroll();

    // 调整框位置
    $(".common-input-wrp").css("margin-top", "-" + $(".common-input-wrp").height() / 2 + "px").css("margin-left", "-" + $(".common-input-wrp").width() / 2 + "px");
    // 关闭事件
    if (params.closeFn !== undefined) {
      // $(".black-mask").remove();


      $(".common-close-btn").click(params.closeFn);
      $(".cancel-btn").click(params.closeFn);
    }
    // 提交事件
    if (params.submitFn !== undefined) {
      $(".save-btn").click(params.submitFn);
    }

    // 删除联系人
    $(".delContact").click(function(){
      if (params.refLi) {
        params.refLi.remove()
        $(".cancel-btn").click()
      }
    });
  },
  // 输入列表
  formPopup: function(params){
    "use strict";
    var def_opt = {
      title: "标题",
      saveBtn: "确定",
      cancelBtn: "取消",
      formItem: [
        {type: 'input', name: "姓名", is_null: false, checkway: "empty"},
        {type: 'input', name: "手机", is_null: false, checkway: "phone"},
        {type: 'input', name: "邮件", is_null: true, checkway: "mail"},
        {type: 'select', name: "站点", is_null: false, checkway: "empty", options: ['广州','湖南','杭州']},
        {type: 'input', name: "图形验证码", is_null: false, checkway: "validCode"},
        {type: 'input', name: "手机验证码", is_null: false, checkway: "telValid"},
        {type: 'file', name: "资质", is_null: true},
        {type: 'input', name: "邀请码", is_null: true, checkway: "invitedCode"},
      ],
      isAgreed: true,
      agreementTit: 'B2B系统使用协议',
      agreementCon: '<iframe src="http://zt.gzl.com.cn/subject/b2b/agreement/registerAgreement.html?'+Math.random()+'" width="100%" height="'+$(window).height()*.7+'px"></iframe>',
      popupType: '',
      footBtn: [],
      closeFn: function(){
        $(".black-mask").remove();
      },
      submitFn: function(){
        var input_list = $(".com-input .check-val");
        var this_obj, is_null, name, check_type, check_result;
        var flag = 0;
        for (var i = 0; i < input_list.length; i++) {
          this_obj = input_list.eq(i);
          is_null = this_obj.attr("is-null") == "false" ? false : true;
          name = this_obj.parent().find(".com-input-name").text();
          check_type = this_obj.attr("check-type") === undefined ? "empty" : this_obj.attr("check-type");

          if (check_type === 'passwSame') {
            check_result = gzformcheck[check_type](input_list.eq(i - 1).val(), this_obj.val());
          } else {
            check_result = gzformcheck[check_type](this_obj.val());
          }
          // check_result = gzformcheck[check_type](this_obj.val());

          if (!is_null || (is_null && this_obj.val() !== "")) {
            if (!check_result[0]) {
              this_obj.parents(".common-ctx-wrp").find(".com-err").show().find("font").text(name + check_result[1]);
              flag++;
              return;
            } else {
              this_obj.parents(".common-ctx-wrp").find(".com-err").hide();
            }
          }
        }
        if (flag === 0) {
          var res = [];
          $(".com-input .check-val").each(function (i, e) {
            var input_obj = {name: "", val: ""};
            input_obj.name = $(e).parent().find(".com-input-name").text();
            input_obj.val = $(e).val();
            res.push(input_obj);
          });
          params.callbackFn(res);
          params.closeFn();
        }
      },
      callbackFn: function (res) {}
    };
    if(params === undefined){
      params = def_opt;
    }else{
      for (var prop in def_opt) {
        params[prop] = params[prop] === undefined ? def_opt[prop] : params[prop];
      }
      def_opt = params;
    }
    var form = '';
    var formItem = params.formItem;
    for(var i=0;i<formItem.length;i++){
      form += '<div class="com-input '+
        (formItem[i].checkway == 'validCode'?'com-input-valid':'')+
        (formItem[i].checkway == 'telValid'?'com-input-telValid':'')+
        (formItem[i].type == 'file'?'com-input-file':'')+'">' +
        '<span class="com-input-laber">' +
        (formItem[i].is_null?'':'<span class="red">*</span>') +
        '<span class="com-input-name">'+formItem[i].name+'</span>' +
        '</span>';
      if (formItem[i].type == 'input'){
        form += '<input class="check-val" type="'+(formItem[i].checkway === 'newPassw'||formItem[i].checkway === 'passwSame'?'password':'text')+'" placeholder="请输入'+formItem[i].name+'" check-type="'+formItem[i].checkway+'" is-null="'+formItem[i].is_null+'">' +
          (formItem[i].checkway == 'validCode'?'<span class="valid-img"><img src="../../static/images/login/code.png" alt=""></span>':'') +
          (formItem[i].checkway == 'telValid'?'<span class="telValid-btn">发送</span>':'')
      } else if (formItem[i].type == 'select') {
        form += '<select class="check-val" check-type="'+formItem[i].checkway+'" is-null="'+formItem[i].is_null+'">';
          for (var j=0;j<formItem[i].options.length;j++) {
            form += '<option>'+ formItem[i].options[j] +'</option>';
          }
        form += '</select>';
      } else if (formItem[i].type == 'file') {
        form += '<input class="check-val" type="text" placeholder="请输入'+formItem[i].name+'" readonly><span class="file-btn">选择</span>'
      }
      form += '</div>';
    }
    var btnList = params.footBtn.map(function (item, index) {
      return '<span class="com-btn-wrp-item '+(item.className || "")+'">'+item.name+'</span>';
    }).join("");
    var btnHtml = '<div class="com-btn-wrp">'+btnList+'</div>';
    var tpl = "<div class='black-mask'>" +
      "<div class='common-input-wrp "+(params.popupType==='login'?'common-login':'')+(params.popupType==='setPsw'?'common-setPsw':'')+"'>" +
      "<div class='common-header'>" +
      "<div class='common-htext'>" + params.title + "</div>" +
      "<div class='common-close-btn close-icon'></div>" +
      "</div>" +
      "<div class='common-ctx-wrp'>" +
      "<div class='com-err'><i class='err-icon'></i><font></font></div>" +
      "<div class='common-ctx'>" +
      "<div class='com-form-wrp'>" +
      "<div class='com-input-wrp'>" +
      form +
      (params.isAgreed ? "<div class='agreed-item'><i class='check-icon'></i><label>我已阅读并接受<a class='agreement'>《B2B系统使用协议》</a></label></div>" : "") +
      "</div>" +
      "</div>" +
      "<div class='save-btn-wrp com-form-save'>" +
      (params.cancelBtn?"<div class='cancel-btn btn'>" + params.cancelBtn + "</div>":'')+
      // "<div class='cancel-btn btn'>" + params.cancelBtn + "</div>" +
      "<div class='save-btn btn comfirm-btn'>" + params.saveBtn + "</div>" +
      "</div>" +
      (params.footBtn.length>0?btnHtml:'') +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(tpl);
    $(".black-mask").find('.agreed-item i').on("click",function () {
      if ($(this).hasClass("checked-icon")){
        $(this).removeClass("checked-icon")
      } else {
        $(this).addClass("checked-icon")
      }
    });
    $(".black-mask .agreed-item .agreement").on("click", function () {
      gzui.showProductIntro({
        title: params.agreementTit,
        content: params.agreementCon,
        hasMask: false,
        class: 'agreement-wrp',
        isSave: false
      })
      $(".agreement-wrp").css("margin-top", "-" + $(".agreement-wrp").height() / 2 + "px").css("margin-left", "-" + $(".agreement-wrp").width() / 2 + "px");
    })
    // 调整框位置
    $(".common-input-wrp").css("margin-top", "-" + $(".common-input-wrp").height() / 2 + "px").css("margin-left", "-" + $(".common-input-wrp").width() / 2 + "px");
    // 关闭事件
    if (params.closeFn !== undefined) {
      $(".common-close-btn").click(params.closeFn);
      $(".cancel-btn").click(params.closeFn);
    }
    // 提交事件
    if (params.submitFn !== undefined) {
      $(".save-btn").click(params.submitFn);
    }
  },
  // 普通弹窗
  dialog: function (params) {
    "use strict";
    var defaults = {
      title: '',
      con: '内容',
      btn: [],
      btnAlign: 'right',
      width: null,
      hasClose: false,
      isCheck: false
    };
    if (params  === undefined) {
      params = defaults;
    } else {
      for (var prop in defaults) {
        params[prop] = params[prop] === undefined ? defaults[prop] : params[prop]
      }
      defaults = params
    }
    var tipHtml = '<div class="g-popup-tip"><i></i><span>123122132132</span></div>';
    var titleHtml = '<div class="g-popup-tit">'+params.title+(params.hasClose?"<i class='c-close-icon'></i>":"")+'</div>';
    var conHtml = '<div class="g-popup-con">'+params.con+'</div>';
    var btnList = params.btn.map(function (item, index) {
      return '<span class="g-popup-btn-item '+(item.className || "")+'">'+item.name+'</span>';
    }).join("");
    var btnHtml = '<div class="g-popup-btn '+params.btnAlign+'">'+btnList+'</div>';
    var tpl = '<div class="g-popup"><div class="g-popup-box">' +
      tipHtml +
      (params.title?titleHtml:'') +
      conHtml +
      (params.btn.length>0?btnHtml:'') +
      '</div></div>';
    $("body").append(tpl);
    gzui.limitScroll();
    var popup = $(".g-popup");
    if (params.width) {
      popup.find(".g-popup-box").css("width",params.width);
    }
    // 按钮事件
    $(".g-popup-btn-item",popup).each(function(i,e){
      $(e).on("click", function(){
        if(!params.isCheck){
          $.closeDialog();
        }
        gzui.fixScroll();
        if(params.btn[i].click){
          params.btn[i].click($(e));
        }
      })
    });
    // 关闭提示
    $(".g-popup-tip i", popup).on("click", function (){
      $(this).parent().removeClass("show");
    })
    // 关闭按钮
    $(".c-close-icon", popup).on("click", function () {
      $.closeDialog();
    });
    $.closeDialog = function(){
      popup.remove();
      gzui.fixScroll();
    };
  },
  loginTip: function (params) {
    "use strict";
    var defaults = {
      text: '当前您还未登录，无法查看产品价格喔',
      cancelText: '暂不登录',
      cancelClass: '',
      hasSign: true,
      loginEvent: function () {}
    };
    if (params  === undefined) {
      params = defaults;
    } else {
      for (var prop in defaults) {
        params[prop] = params[prop] === undefined ? defaults[prop] : params[prop]
      }
      defaults = params
    }
    var tpl = '<div class="login-tip">' +
      '<div class="login-tip-con">' +
        '<span>'+params.text+'</span><span class="login-tip-btn"><a class="cancel-login '+(params.cancelClass?params.cancelClass:'')+'">'+params.cancelText+'</a>'+
        (params.hasSign?'<a class="sign-in">马上登录</a>':'')+'</span>' +
      '</div>' +
      '</div>';
    $("body").append(tpl);
    setTimeout(function () {
      var tip = $(".login-tip");
      tip.addClass("show");
      $(".cancel-login", tip).on("click", function () {
        gzui.loginTipHide();
      });
      $(".sign-in", tip).on("click", function () {
        params.loginEvent()
      });
    },2000);
  },
  loginTipHide: function () {
    $(".login-tip").remove();
  },
  toast: function (params) {
    "use strict";
    var defaults = {
      text: '',
      icon: '',
      callback: function () {}
    };
    if (params  === undefined) {
      params = defaults;
    } else {
      for (var prop in defaults) {
        params[prop] = params[prop] === undefined ? defaults[prop] : params[prop]
      }
      defaults = params
    }
    if($(".m-toast").length == 0){
      var tpl = "<div class='m-toast'><div class='m-toast-tip'>"+(params.icon?"<span class='m-toast-icon "+params.icon+"'></span>":"")+"<span>"+params.text+"</span></div></div>";
      var dialog = $(tpl).appendTo(document.body);
      dialog.fadeIn().delay(1500).fadeOut();
      setTimeout(function() {
        if(params.callback){
          params.callback();
        }
        $(".m-toast").remove();
      }, 2500);
    }
    $(".m-toast").on("click", function (e) {
      e.stopPropagation();
    })
  }
};
// 页面加载进度
gzui.progress();
// 表单验证
var gzformcheck = {
  reg: {
    // 手机号
    phone: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
    // 邮箱
    mail: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    // 新密码
    newPassw: /^[a-zA-Z0-9]{6,12}$/,
    // 验证码
    validCode: /^[a-zA-Z0-9]{4}$/,
    // 邀请码
    invitedCode: /\d{6}/,
    // 手机验证码
    telValid: /^[0-9]{6}$/,
    // 身份证验证
    idNo: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
    // 日期
    date: /\d{4}-\d{2}-\d{2}/
  },
  empty: function (str) {
    "use strict";
    if (str === "") {
      return [false, "不能为空"];
    } else {
      return [true, "验证通过"];
    }
  },
  phone: function (str) {
    "use strict";
    if (str === "") {
      return [false, "不能为空"];
    }
    if (!gzformcheck.reg.phone.test(str)) {
      return [false, "格式不正确"];
    } else {
      return [true, "验证通过"];
    }
  },
  mail: function (str) {
    "use strict";
    if (str === "") {
      return [false, "不能为空"];
    }
    if (!gzformcheck.reg.mail.test(str)) {
      return [false, "格式不正确"];
    } else {
      return [true, "验证通过"];
    }
  },
  passwSame: function (str1, str2) {
    "use strict";
    if (str2 === "") {
      return [false, "不能为空"];
    }
    if (str1 !== str2) {
      return [false, "不一致"];
    } else {
      return [true, "验证通过"];
    }
  },
  newPassw: function (str) {
    "use strict";
    if (str === "") {
      return [false, "不能为空"];
    }
    if (!gzformcheck.reg.newPassw.test(str)) {
      return [false, "格式不正确"];
    } else {
      return [true, "验证通过"];
    }
  },
  validCode: function (str) {
    "use strict";
    if (str === "") {
      return [false, "不能为空"];
    }
    if (!gzformcheck.reg.validCode.test(str)) {
      return [false, "格式不正确"];
    } else {
      return [true, "验证通过"];
    }
  },
  invitedCode: function (str) {
      "use strict";
      if (str === "") {
        return [false, "不能为空"];
      }
      if (!gzformcheck.reg.invitedCode.test(str)) {
        return [false, "格式不正确"];
      } else {
        return [true, "验证通过"];
      }
  },
  telValid: function (str) {
    "use strict";
    if (str === "") {
      return [false, "不能为空"];
    }
    if (!gzformcheck.reg.telValid.test(str)) {
      return [false, "格式不正确"];
    } else {
      return [true, "验证通过"];
    }
  }
};

// 点击其他隐藏
function autoHide(ele,parent,fn) {
  $(document).on("click",function(e){
    var target = $(e.target);
    if(target.closest(parent?parent:ele).length === 0){
      $(ele).hide();
      if (fn) {
        fn();
      }
    }
  });
}

// 城市选择
(function ($){
  'use string';
  $.fn.placeSelect = function (option) {
    var defaults = {
      type: 'city',
      normalTip: '未能搜索到该城市',
      placeCon: [{
        tab: {name: '国内热门'},
        city: [{name: '上海',nameStr: '上海',nameCode: 'SHA'},{name: '北京',nameStr: '北京',nameCode: 'BJS'},{name: '香港',nameStr: '香港',nameCode: 'HKG'},{name: '广州',nameStr: '广州',nameCode: 'CAN'}]
      },{
        tab: {name: '国际热门'},
        city: [{name: '首尔',nameStr: '首尔',nameCode: 'SEL'},{name: '台北',nameStr: '台北',nameCode: 'TPE'},{name: '东京',nameStr: '东京',nameCode: 'TYO'},{name: '新加坡',nameStr: '新加坡',nameCode: 'SIN'}]
      },{
        tab: {name: '亚洲'},
        city: [{name: '香港',nameStr: '香港',nameCode: 'HKG'}]
      },{
        tab: {name: '欧洲'},
        city: [{name: '巴黎',nameStr: '巴黎',nameCode: 'PAR'}]
      },{
        tab: {name: '南美洲'},
        city: [{name: '洛杉矶',nameStr: '洛杉矶',nameCode: 'LAX'}]
      },{
        tab: {name: '非洲'},
        city: [{name: '开罗',nameStr: '开罗',nameCode: 'CAI'}]
      }],
      searchCon: [{
        group: {
          keyCode: 'BJS',keyWord: '北京，所有机场，中国(BJS)',keyName: '北京(BJS)'
        },
        list: [{
          keyCode: 'NAY',keyWord: '北京，南苑机场，中国(NAY)',keyName: '南苑机场(NAY)'
        },{
          keyCode: 'PEK',keyWord: '北京，首都机场，中国(PEK)',keyName: '首都机场(PEK)'
        }]
      },{
        group: {
          keyCode: 'TPE',keyWord: '台北，所有机场，中国台湾(TPE)',keyName: '台北(BJS)'
        },
        list: [{
          keyCode: 'TSA',keyWord: '台北，松山机场，中国台湾(TSA)',keyName: '松山机场(TSA)'
        }]
      }],
      selectCon: [{
        name: '中华人民共和国', nameCode: 'China'
      },{
        name: '其他', nameCode: 'Other'
      }],
      selectFn: function () {}
    };
    var self = $(this);
    var params = $.extend(defaults,option);
    var tabList = '';
    var cityList = '';
    var selectList = '';
    var conTpl;
    if (params.type === 'city') {
      for (var i=0;i<params.placeCon.length;i++){
        tabList += '<li>'+params.placeCon[i].tab.name+'</li>';
        cityList += '<ul class="place-select-city clearfix">';
        for (var j=0;j<params.placeCon[i].city.length;j++){
          cityList += '<li data-code="' + params.placeCon[i].city[j].nameCode + '" data-name="' + params.placeCon[i].city[j].name + '">'+params.placeCon[i].city[j].nameStr+'</li>'
        }
        cityList +='</ul>';
      }
      conTpl = '<ul class="place-select-tab clearfix">' + tabList +'</ul>' +
      '<div class="place-select-city-box">'+ cityList +'</div>';
    }else if (params.type === 'select') {
      for (var i=0;i<params.selectCon.length;i++) {
        selectList += '<li data-code="'+params.selectCon[i].nameCode+'" data-name="'+params.selectCon[i].name+'">'+params.selectCon[i].name+'</li>'
      }
      conTpl = '<ul class="place-select-dropdown">'+selectList+'</ul>';
    }
    var tpl = '<div class="place-select-popup">' +
      conTpl +
      '</div><div class="keyup-search"><div class="search-normal-tip">'+params.normalTip+'</div><div class="keyup-search-list"></div></div>';
    var selectTpl = '';
    self.on("focus", function () {
      if ($(".place-select-popup").length === 0) {
        self.select();
        self.after(tpl);
        if (params.type === 'city') {
          var tabItem = $(".place-select-tab");
          var cityItem = $(".place-select-city");
          $("li",tabItem).removeClass("active");
          $("li",cityItem).removeClass("active");
          $("li",tabItem).eq(0).addClass("active");
          cityItem.eq($("li.active",tabItem).index()).show();
          $("li",tabItem).on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
            cityItem.hide().eq($(this).index()).show();
          });
          $("li",cityItem).on("click", function () {
            var code = $(this).data("code");
            var name = $(this).data("name");
            self.val(name).data("code",code);
            self.nextAll(".input-tip").show();
            $(this).parents(".place-select-popup").remove();
          });
        } else if (params.type === 'select') {
          var selectItem = $(".place-select-popup .place-select-dropdown");
          $("li",selectItem).on("click", function () {
            var code = $(this).data("code");
            var name = $(this).data("name");
            self.val(name).data("code",code);
            $(this).parents(".place-select-popup").remove();
            params.selectFn();
          })
        }
        $(document).on("mousedown",function(e){
          var popup = $(".place-select-popup, .keyup-search");
          if(popup.is(":visible") && popup.parent().has(e.target).length===0){
            popup.remove();
          }
        });
      }
    });
    self.on("keyup",function () {
      var val = $(this).val().toLowerCase();
      var content = [];
      var list = '';
      var showList = self.parent().find(".keyup-search-list");
      var placePopup = self.parent().find(".place-select-popup");
      var keyupSearch = self.parent().find(".keyup-search");
      if (val) {
        placePopup.hide();
        keyupSearch.show();
        showList.html('');
        self.nextAll(".input-tip").show();
        for (var i=0;i<params.searchCon.length;i++) {
          if (params.searchCon[i].group.keyWord.toLowerCase().indexOf(val) > -1) {
            content.push([i])
          }else if (params.searchCon[i].list){
            for (var j=0;j<params.searchCon[i].list.length;j++) {
              if (params.searchCon[i].list[j].keyWord.toLowerCase().indexOf(val) > -1) {
                content.push([i,j])
              }
            }
          }
        }
        if (content.length>0){
          keyupSearch.removeClass("search-normal");
          for (var i=0;i<content.length;i++){
            list = '<dl><dt data-code="'+params.searchCon[content[i][0]].group.keyCode+'" data-name="'+params.searchCon[content[i][0]].group.keyName+'">'+params.searchCon[content[i][0]].group.keyWord+'</dt>';
            if(params.searchCon[content[i][0]].list){
              for (var j=0;j<params.searchCon[content[i][0]].list.length;j++) {
                list += '<dd data-code="'+params.searchCon[content[i][0]].list[j].keyCode+'" data-name="'+params.searchCon[content[i][0]].list[j].keyName+'">'+params.searchCon[content[i][0]].list[j].keyWord+'</dd>';
              }
            }
            list += '</dl>';
            showList.append(list);
            $("dt, dd", showList).on("click", function () {
              self.val($(this).data("name")).data("code", $(this).data("code"));
              placePopup.remove();
              keyupSearch.remove();
            })
          }
        }else{
          keyupSearch.addClass("search-normal");
        }
      }else{
        self.nextAll(".input-tip").hide();
        placePopup.show();
        keyupSearch.hide();
      }
    });
  };
})(jQuery);

// 城市选择2
(function ($){
    'use string';
    $.fn.placeSelectHotel = function (option) {
        var defaults = {
            placeCon: [{
                tab: {name: '国内热门'},
                city: [{name: '上海',nameStr: '上海',nameCode: 'SHA'},{name: '北京',nameStr: '北京',nameCode: 'BJS'},{name: '香港',nameStr: '香港',nameCode: 'HKG'},{name: '广州',nameStr: '广州',nameCode: 'CAN'},{name: '上海',nameStr: '上海',nameCode: 'SHA'},{name: '北京',nameStr: '北京',nameCode: 'BJS'},{name: '香港',nameStr: '香港',nameCode: 'HKG'},{name: '北京',nameStr: '北京',nameCode: 'BJS'},{name: '香港',nameStr: '香港',nameCode: 'HKG'},{name: '北京',nameStr: '北京',nameCode: 'BJS'},{name: '香港)',nameStr: '香港',nameCode: 'HKG'}]
            },{
                tab: {name: '国际热门'},
                city: [{name: '首尔',nameStr: '首尔',nameCode: 'SEL'},{name: '台北',nameStr: '台北',nameCode: 'TPE'},{name: '东京',nameStr: '东京',nameCode: 'TYO'},{name: '新加坡',nameStr: '新加坡',nameCode: 'SIN'}]
            },{
                tab: {name: '亚洲'},
                city: [{name: '香港',nameStr: '香港',nameCode: 'HKG'}]
            },{
                tab: {name: '欧洲'},
                city: [{name: '巴黎',nameStr: '巴黎',nameCode: 'PAR'}]
            },{
                tab: {name: '南美洲'},
                city: [{name: '洛杉矶',nameStr: '洛杉矶',nameCode: 'LAX'}]
            },{
                tab: {name: '非洲'},
                city: [{name: '开罗',nameStr: '开罗',nameCode: 'CAI'}]
            }],
            searchCon: [
                {
                    place: '阿姆斯特丹市中心',
                    place_eng:'Amsterdam City Centre',
                    city: '阿姆斯特丹',
                    city_eng:'Amsterdam',
                    country:'荷兰',
                    country_eng: "Netherlands",
                    hotel_counts:88
                },
                {
                    place: '阿姆斯特丹市中心',
                    place_eng:'Amsterdam City Centre',
                    city: '阿姆斯特丹',
                    city_eng:'Amsterdam',
                    country:'荷兰',
                    country_eng: "Netherlands",
                    hotel_counts:88
                },
                {
                    place: '广州公园',
                    place_eng:'Guangzhou FeiXiang park',
                    city: '广州',
                    city_eng:'Guangzhou',
                    country:'中国',
                    country_eng: "china",
                    hotel_counts:88
                },
                {
                    place: '广州飞翔公园',
                    place_eng:'Guangzhou FeiXiang park',
                    city: '广州',
                    city_eng:'Guangzhou',
                    country:'中国',
                    country_eng: "china",
                    hotel_counts:88
                },
                {
                    place: '广州飞翔公园',
                    place_eng:'Guangzhou FeiXiang park',
                    city: '广州',
                    city_eng:'Guangzhou',
                    country:'中国',
                    country_eng: "china",
                    hotel_counts:88
                },
                {
                    place: '广州飞翔公园',
                    place_eng:'Guangzhou FeiXiang park',
                    city: '广州',
                    city_eng:'Guangzhou',
                    country:'中国',
                    country_eng: "china",
                    hotel_counts:88
                },
                {
                    place: '广州飞翔公园',
                    place_eng:'Guangzhou FeiXiang park',
                    city: '广州',
                    city_eng:'Guangzhou',
                    country:'中国',
                    country_eng: "china",
                    hotel_counts:88
                },
                {
                    place: '广州飞翔公园',
                    place_eng:'Guangzhou FeiXiang park',
                    city: '广州',
                    city_eng:'Guangzhou',
                    country:'中国',
                    country_eng: "china",
                    hotel_counts:88
                }
            ]
        };
        var self = $(this);
        var params = $.extend(defaults,option);
        var tabList = '';
        var cityList = '';
        for (var i=0;i<params.placeCon.length;i++){
            tabList += '<li>'+params.placeCon[i].tab.name+'</li>';
            cityList += '<ul class="place-select-city clearfix">';
            for (var j=0;j<params.placeCon[i].city.length;j++){
                cityList += '<li class="ellipsis" data-code="' + params.placeCon[i].city[j].nameCode + '" data-name="' + params.placeCon[i].city[j].name + '">'+params.placeCon[i].city[j].nameStr+'</li>'
            }
            cityList +='</ul>';
        }
        var tpl = '<div class="place-select-popup">' +
                        '<ul class="place-select-tab clearfix">' + tabList +'</ul>' +
                        '<div class="place-select-city-box">'+ cityList +'</div>' +
                    '</div>' +
                        '<div class="keyup-search hotel-picker">' +
                        '<div class="search-normal-tip">未能搜索到该城市</div>' +
                        '<div class="hotel-picker-head">' +
                        '<div class="hotel-picker-head-head"><span class="txt">目的地</span><span class="short-line"></span></div></div>'+
                        '<div class="picker-body-wraper">'+
                            '<div class="keyup-search-list hotel-picker-body">' +
                        '</div>'+
                        '</div>' +
                    '</div>';

        function blurSearch(val){
            var content = [];
            var list = '';
            var showList = self.parent().find(".keyup-search-list");
            var placePopup = self.parent().find(".place-select-popup");
            var keyupSearch = self.parent().find(".keyup-search");
            var head = self.parent().find(".hotel-picker-head");
            var picker_body = self.parent().find(".hotel-picker-body");
            if (val) {
                placePopup.hide();
                keyupSearch.show();
                picker_body.show();
                head.show();
                showList.html('');
                self.nextAll(".input-tip").show();
                for (var i=0;i<params.searchCon.length;i++) {
                    if (params.searchCon[i].place.toLowerCase().indexOf(val) > -1) {
                        var startIndex = params.searchCon[i].place.toLowerCase().indexOf(val)
                        var strLen = val.length;
                        function SearchRecord(i,startIndex, strLen) {
                            this.i = i,
                                this.startIndex = startIndex,
                                this.strLen = strLen
                        }
                        content.push(new SearchRecord(i,startIndex,strLen))
                    }
                }
                if (content.length>0){
                    keyupSearch.removeClass("search-normal");
                    keyupSearch.addClass("hotel-picker");
                    for (var i=0;i<content.length;i++){
                        list = '<ul class="hotel-picker-items">';
                        var place = params.searchCon[content[i].i].place
                        var place_list = place.split('')
                        var spans=''
                        place_list.forEach(function(item,index){
                            var start =content[i].startIndex;
                            var len = content[i].strLen;
                            if(index<start||index>start+len+-1){
                                var span = '<span>'+item+'</span>'
                            }else{
                                var span = '<span class="search-highlight">'+item+'</span>'
                            }
                            spans += span
                        })

                        list += '<li class="hotel-picker-item">'+
                            '<div class="hotel">'+
                            '<p class="chinese-name">'+spans+', '+params.searchCon[content[i].i].country+'</p>'+
                            '<p class="english-name">'+params.searchCon[content[i].i].place_eng+'</p>'+
                            '</div>'+
                            '<div class="place">附近约 <em>'+params.searchCon[content[i].i].hotel_counts +'</em> 间酒店</div>'+
                            '</li>';


                        list += '</ul>';
                        showList.append(list);
                        $("li", showList).on("click", function () {
                            self.val($(this).find('.chinese-name').text());
                            placePopup.remove();
                            keyupSearch.remove();
                        })
                    }
                }else{
                    keyupSearch.addClass("search-normal");
                    keyupSearch.removeClass("hotel-picker");
                    head.hide();
                    picker_body.hide()

                }
            }else{
                self.nextAll(".input-tip").hide();
                placePopup.show();
                keyupSearch.hide();
                head.hide();
                picker_body.hide()
            }
        }
        self.on("focus", function () {


            var head = self.parent().find(".hotel-picker-head");
            self.parent().find(".hotel-picker").remove();
            if ($(".place-select-popup").length === 0) {
                self.select();
                self.after(tpl);
                var tabItem = $(".place-select-tab");
                var cityItem = $(".place-select-city");
                $("li",tabItem).removeClass("active");
                $("li",cityItem).removeClass("active");
                $("li",tabItem).eq(0).addClass("active");
                cityItem.eq($("li.active",tabItem).index()).show();
                $("li",tabItem).on("click", function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    cityItem.hide().eq($(this).index()).show();
                });
                $("li",cityItem).on("click", function () {
                    var code = $(this).data("code");
                    var name = $(this).data("name");
                    self.val(name).data("code",code);
                    self.nextAll(".input-tip").show();
                    $(this).parents(".place-select-popup").remove();
                });
                $(document).on("mousedown",function(e){
                    var popup = $(".place-select-popup, .keyup-search");
                    if(popup.is(":visible") && popup.parent().has(e.target).length===0){
                        popup.remove();
                    }
                });
            }

            var val = $(this).val().toLowerCase();
            blurSearch(val)
        });
        self.on("keyup",function () {
            var val = $(this).val().toLowerCase();
            var content = [];
            var list = '';
            var showList = self.parent().find(".keyup-search-list");
            var placePopup = self.parent().find(".place-select-popup");
            var keyupSearch = self.parent().find(".keyup-search");
            var head = self.parent().find(".hotel-picker-head");
            var picker_body = self.parent().find(".hotel-picker-body");
            if (val) {
                placePopup.hide();
                keyupSearch.show();
                picker_body.show();
                head.show();
                showList.html('');
                self.nextAll(".input-tip").show();
                for (var i=0;i<params.searchCon.length;i++) {
                    if (params.searchCon[i].place.toLowerCase().indexOf(val) > -1) {
                        var startIndex = params.searchCon[i].place.toLowerCase().indexOf(val)
                        var strLen = val.length;
                        function SearchRecord(i,startIndex, strLen) {
                            this.i = i,
                                this.startIndex = startIndex,
                                this.strLen = strLen
                        }
                        content.push(new SearchRecord(i,startIndex,strLen))
                    }
                }
                if (content.length>0){
                    keyupSearch.removeClass("search-normal");
                    keyupSearch.addClass("hotel-picker");
                    for (var i=0;i<content.length;i++){
                        list = '<ul class="hotel-picker-items">';
                        var place = params.searchCon[content[i].i].place
                        var place_list = place.split('')
                        var spans=''
                        place_list.forEach(function(item,index){
                            var start =content[i].startIndex;
                            var len = content[i].strLen;
                            if(index<start||index>start+len+-1){
                                var span = '<span>'+item+'</span>'
                            }else{
                                var span = '<span class="search-highlight">'+item+'</span>'
                            }
                            spans += span
                        })

                                list += '<li class="hotel-picker-item">'+
                                            '<div class="hotel">'+
                                                '<p class="chinese-name">'+spans+', '+params.searchCon[content[i].i].country+'</p>'+
                                                '<p class="english-name">'+params.searchCon[content[i].i].place_eng+'</p>'+
                                            '</div>'+
                                            '<div class="place">附近约 <em>'+params.searchCon[content[i].i].hotel_counts +'</em> 间酒店</div>'+
                                         '</li>';


                        list += '</ul>';
                        showList.append(list);
                        $("li", showList).on("click", function () {
                            self.val($(this).find('.chinese-name').text());
                            placePopup.remove();
                            keyupSearch.remove();
                        })
                    }
                }else{
                    keyupSearch.addClass("search-normal");
                    keyupSearch.removeClass("hotel-picker");
                    head.hide();
                    picker_body.hide()

                }
            }else{
                self.nextAll(".input-tip").hide();
                placePopup.show();
                keyupSearch.hide();
                head.hide();
                picker_body.hide()
            }
        });
    };
})(jQuery);


// 酒店选择
(function ($){
    'use string';
    $.fn.hotelSelect = function (option) {
        var defaults = {
            searchCon: [
                {
                    place: '阿姆斯特丹市中心',
                    place_eng:'Amsterdam City Centre',
                    city: '阿姆斯特丹',
                    city_eng:'Amsterdam',
                    country:'荷兰',
                    country_eng: "Netherlands",
                    hotel: '我是春天酒店',

                },
                {
                    place: '阿姆斯特丹市中心',
                    place_eng:'Amsterdam City Centre',
                    city: '阿姆斯特丹',
                    city_eng:'Amsterdam',
                    country:'荷兰',
                    country_eng: "Netherlands",
                    hotel: '东方文华酒店',

                },
                {
                    place: '广州飞翔公园',
                    place_eng:'Guangzhou FeiXiang park',
                    city: '广州',
                    city_eng:'Guangzhou',
                    country:'中国',
                    country_eng: "china",
                    hotel: '四季酒店',

                },
                {
                    place: '广州飞翔公园',
                    place_eng:'Guangzhou FeiXiang park',
                    city: '广州',
                    city_eng:'Guangzhou',
                    country:'中国',
                    country_eng: "china",
                    hotel: '四季酒店',

                },
                {
                    place: '广州飞翔公园',
                    place_eng:'Guangzhou FeiXiang park',
                    city: '广州',
                    city_eng:'Guangzhou',
                    country:'中国',
                    country_eng: "china",
                    hotel: '四季酒店',

                },
                {
                    place: '广州飞翔公园',
                    place_eng:'Guangzhou FeiXiang park',
                    city: '广州',
                    city_eng:'Guangzhou',
                    country:'中国',
                    country_eng: "china",
                    hotel: '四季酒店',

                },
                {
                    place: '广州飞翔公园',
                    place_eng: 'Guangzhou FeiXiang park',
                    city: '广州',
                    city_eng: 'Guangzhou',
                    country:'中国',
                    country_eng: "china",
                    hotel: '四季酒店',

                },
                {
                    place: '广州飞翔公园',
                    place_eng:'Guangzhou FeiXiang park',
                    city: '广州',
                    city_eng:'Guangzhou',
                    country:'中国',
                    country_eng: "china",
                    hotel:'四季酒店',

                }
            ]
        };
        var self = $(this);
        var params = $.extend(defaults,option);
        var tpl =   '<div class="keyup-search hotel-picker">' +
                    '<div class="search-normal-tip">未能搜索到该城市</div>' +
                    '<div class="hotel-picker-head">' +
                    '<div class="hotel-picker-head-head"><span class="txt">酒店</span><span class="short-line"></span></div></div>'+
                    '<div class="picker-body-wraper">'+
                         '<div class="keyup-search-list hotel-picker-body">' +
                    '</div>'+
                    '</div>' +
                    '</div>';

        function blurSearch(val){
            console.log(self)
            console.log(val)
            var content = [];
            var list = '';
            if (val) {
                // var showList = self.parent().find(".keyup-search-list");
                // var placePopup = self.parent().find(".place-select-popup");
                var keyupSearch = self.parent().find(".keyup-search");
                // var head = self.parent().find(".hotel-picker-head");
                // var picker_body = self.parent().find(".hotel-picker-body");

                self.parent().find(".hotel-picker").remove();

                self.select();
                self.after(tpl);
                self.parent().find(".hotel-picker").clickhide();
                self.parent().find(".keyup-search").show();
                for (var i=0;i<params.searchCon.length;i++) {
                    if (params.searchCon[i].hotel.toLowerCase().indexOf(val) > -1) {
                        var startIndex = params.searchCon[i].hotel.toLowerCase().indexOf(val)
                        var strLen = val.length;
                        function SearchRecord(i,startIndex, strLen) {
                            this.i = i,
                                this.startIndex = startIndex,
                                this.strLen = strLen
                        }
                        content.push(new SearchRecord(i,startIndex,strLen))
                    }
                }
                if (content.length>0){
                    keyupSearch.removeClass("search-normal");
                    keyupSearch.addClass("hotel-picker");
                    for (var i=0;i<content.length;i++){
                        list = '<ul class="hotel-picker-items">';
                        var hotel = params.searchCon[content[i].i].hotel
                        var hotel_list = hotel.split('')
                        var spans=''
                        hotel_list.forEach(function(item,index){
                            var start =content[i].startIndex;
                            var len = content[i].strLen;
                            if(index<start||index>start+len+-1){
                                var span = '<span>'+item+'</span>'
                            }else{
                                var span = '<span class="search-highlight">'+item+'</span>'
                            }
                            spans += span
                        })

                        list += '<li class="hotel-picker-item">'+
                            '<div class="hotel">'+
                            '<p class="chinese-name">'+spans+'</p>'+
                            '<p class="english-name">'+params.searchCon[content[i].i].place_eng+'</p>'+
                            '</div>'+
                            '<div class="place">'+params.searchCon[content[i].i].place+'</span>，'+params.searchCon[content[i].i].country+'</div>'+
                            '</li>';
                        list += '</ul>';
                        self.parent().find(".keyup-search-list").append(list);
                        self.parent().find(".keyup-search-list li").on("click", function () {
                            self.val($(this).find('.chinese-name').text());
                            self.parent().find(".place-select-popup").remove();
                            self.parent().find(".keyup-search").remove();
                        })
                    }
                }else{
                    self.parent().find(".keyup-search").addClass("search-normal");
                    self.parent().find(".keyup-search").removeClass("hotel-picker");
                    self.parent().find(".hotel-picker-head").hide();
                    self.parent().find(".hotel-picker-body").hide()
                }
            }else{
                self.nextAll(".input-tip").hide();
                self.parent().find(".keyup-search").hide();
            }
        }

        self.on("focus", function () {
            var val = $(this).val().toLowerCase();
            blurSearch(val)
        });
        self.on("keyup",function () {
            $('.chinese-name span').removeClass('search-highlight');
            var val = $(this).val().toLowerCase();
            var content = [];
            var list = '';
            var showList = self.parent().find(".keyup-search-list");
            var placePopup = self.parent().find(".place-select-popup");
            var keyupSearch = self.parent().find(".keyup-search");
            var head = self.parent().find(".hotel-picker-head");
            var picker_body = self.parent().find(".hotel-picker-body");
            if (val) {
                picker_body.show();
                placePopup.hide();
                keyupSearch.show();
                head.show();
                showList.html('');
                self.nextAll(".input-tip").show();
                for (var i=0;i<params.searchCon.length;i++) {
                    if (params.searchCon[i].hotel.toLowerCase().indexOf(val) > -1) {
                        var startIndex = params.searchCon[i].hotel.toLowerCase().indexOf(val)
                        var strLen = val.length;
                        function SearchRecord(i,startIndex, strLen) {
                            this.i = i,
                            this.startIndex = startIndex,
                            this.strLen = strLen
                        }
                        content.push(new SearchRecord(i,startIndex,strLen))
                    }
                }
                if (content.length>0){
                    keyupSearch.removeClass("search-normal");
                    keyupSearch.addClass("hotel-picker");
                    for (var i=0;i<content.length;i++){
                        list = '<ul class="hotel-picker-items">';
                        var hotel = params.searchCon[content[i].i].hotel
                        var hotel_list = hotel.split('')
                        var spans=''
                        hotel_list.forEach(function(item,index){
                            var start =content[i].startIndex;
                            var len = content[i].strLen;
                            if(index<start||index>start+len+-1){
                                var span = '<span>'+item+'</span>'
                            }else{
                                var span = '<span class="search-highlight">'+item+'</span>'
                            }
                            spans += span
                        })

                        list += '<li class="hotel-picker-item">'+
                            '<div class="hotel">'+
                            '<p class="chinese-name">'+spans+'</p>'+
                            '<p class="english-name">'+params.searchCon[content[i].i].place_eng+'</p>'+
                            '</div>'+
                            '<div class="place">'+params.searchCon[content[i].i].place+'</span>，'+params.searchCon[content[i].i].country+'</div>'+
                            '</li>';
                        list += '</ul>';
                        showList.append(list);
                        $("li", showList).on("click", function () {
                            self.val($(this).find('.chinese-name').text());
                            placePopup.remove();
                            keyupSearch.remove();
                        })
                    }
                }else{
                    keyupSearch.addClass("search-normal");
                    keyupSearch.removeClass("hotel-picker");
                    head.hide();
                    picker_body.hide()
                }
            }else{
                self.nextAll(".input-tip").hide();
                keyupSearch.hide();
            }
        });
    };
})(jQuery);


// 点击他处消失
(function ($){
    'use string';
    $.fn.clickhide = function () {
        var self = $(this);
        $(document).on("click",function(e){
            var pagex = e.pageX;
            var pagey = e.pageY;
            var x = self.offset().left;
            var y = self.offset().top;
            var width =  self.width();
            var height = self.height();
            if (pagex<x||pagex>x+width||pagey<y-50||pagey>y+height){
                self.hide();
            }
        })
    }
})(jQuery);


// 局部加载loading
(function ($){
  'use string';
  $.fn.partialLoad = function (option) {
    var self = $(this);
    var defaults = {};
    $.extend(defaults, option);
    self.append('<div class="partialLoad"><div class="partialLoad-progress"></div></div>');
    loading();
    function loading (){
      var $progress = $(".partialLoad-progress")
      var progress = 0;
      var onprogress = function () {
        var timeout;
        if (progress < 50) {
          progress += 50;
          timeout = 1000
        } else {
          progress += 98;
          timeout = 500
        }
        setTimeout(function () {
          if (progress >= 98) {
            progress = 98;
            $progress.animate({"width":progress + '%'},timeout);
          }else {
            $progress.animate({"width":progress + '%'},timeout);
            onprogress();
          }
        }, timeout)
      };
      onprogress();
    }
  }
})(jQuery);
