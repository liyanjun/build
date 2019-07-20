(function ($) {
  "use strict";
  $.fn.ecgoCalendar = function (option) {
    var defaults = {
      type: 'picker', // 日历类型
      num: 1, // 日历个数 Number
      is_range: false, // 是否有范围选择 Boolean
      max_range: null, // 最大范围 Number
      start_text: '入住', // 开始提示 String
      end_text: '离店', // 结束提示 String
      date: {
        '2018-08-10': {price: parseInt(Math.random()*10000)}
      },
      sureClick: function (res, self) {// 确认点击
        // console.log(res)
      }
    };
    var params = $.extend(defaults, option);
    var self = $(this);
    var today = new Date();
    var curDate, startDate, endDate;
    var calendar = {
      init: function () {
        var next_month, month_list, calendar_type, tpl;
        if(params.type === 'picker'){
          self.find("input").on("focus", function () {
            if (self.find(".ecgo-calendar").length === 0){
              var monthArr = [];
              var firstMonth;
              if (self.find("input").data("date") || self.find("input").data("start")) {
                if (!params.is_range) {
                  curDate = self.find("input").data("date");
                  firstMonth = new Date(curDate);
                }else{
                  startDate = self.find("input").data("start");
                  endDate = self.find("input").data("end");
                  firstMonth = new Date(startDate);
                }
              }else{
                firstMonth = today
              }
              monthArr.push(firstMonth);
              if(params.num>1){
                calendar_type = 'multiple-calendar';
                for(var i=1;i<params.num;i++){
                  next_month = new Date(firstMonth.getFullYear(), firstMonth.getMonth() + i, 1);
                  monthArr.push(next_month)
                }
              }else{
                calendar_type = 'single-calendar';
              }
              month_list = calendar.getMonthDay(monthArr);
              tpl = '<div class="ecgo-calendar '+ calendar_type +'"><span class="prev-btn"></span><span class="next-btn"></span><div class="calendar-group"></div><div class="calendar-btn"><span class="cancel-btn">取消</span><span class="sure-btn">确定</span></div></div></div>';
              self.append(tpl);
              self.find(".ecgo-calendar").addClass("picker-calendar");
              calendar.initEvent(month_list);
            }
          })
        }
      },
      initEvent: function (list) {
        calendar.baseCalendar(list);
        calendar.prevClick();
        calendar.nextClick();
        calendar.groupEvent();
        calendar.btnEvent();
        calendar.autoHide();
      },
      getMonthDay: function (months) {
        var all_months = [];
        for (var i = 0; i < months.length; i++) {// 遍历月
          var month_days = [];
          var date_num = getMonthDateNumber(months[i]);// 获取一个月的天数
          var firstDay = new Date(months[i].getFullYear(), months[i].getMonth(), 1);
          for (var j=0;j<date_num+firstDay.getDay();j++){// 遍历天
            var tem_date;
            var curMonth = true;
            if (j < firstDay.getDay()) { // 小于今日
              tem_date = new Date(firstDay.getTime() - (firstDay.getDay() - j) * 24 * 60 * 60 * 1000);
              curMonth = false;
            } else if (j >= firstDay.getDay() && j < firstDay.getDay() + date_num) { // 当月
              tem_date = new Date(months[i].getFullYear(), months[i].getMonth(), (j-firstDay.getDay()) + 1);
              curMonth = true;
            } else { // 下个月
              tem_date = new Date(firstDay.getTime() + (j-firstDay.getDay()) * 24 * 60 * 60 * 1000);
              curMonth = false;
            }
            var todayDate = today.getFullYear() + "-" + dbDate(today.getMonth() + 1)  + "-" + dbDate(today.getDate());
            var fullyear = tem_date.getFullYear() + "-" + dbDate(tem_date.getMonth() + 1) + "-" + dbDate(tem_date.getDate());
            month_days.push({
              ymd: fullyear,
              year: tem_date.getFullYear(),
              month: tem_date.getMonth() + 1,
              date: tem_date.getDate(),
              week: tem_date.getDay(),
              disable: new Date(fullyear) < new Date(todayDate),
              curMonth: curMonth,
              curDate: fullyear === curDate,
              startDate: fullyear === startDate,
              endDate: fullyear === endDate,
              rangeItem: fullyear > startDate && fullyear < endDate,
              price: params.date[fullyear]?params.date[fullyear].price:null,
            })
          }
          all_months.push(month_days);
        }
        // console.log(all_months);
        return all_months;
      },
      baseCalendar: function (monthList) {
        var date_tpl = '';
        var week_tpl = '';
        var week = ['日','一','二','三','四','五','六'];
        var calendarGroup = self.find(".calendar-group");
        calendarGroup.html('');
        for (var i=0;i<week.length;i++){
          week_tpl += '<span>'+ week[i] +'</span>';
        }
        for (var i=0;i<monthList.length;i++) {
          var year = monthList[i][6].year;
          var month = monthList[i][6].month;
          var ym = year + "年" + month + "月";
          var first_day = monthList[i][0].week;
          date_tpl += '<div class="calendar-item">'+
          '<div class="calendar-tit" data-year="'+year+'" data-month="'+month+'">'+ym+'</div>'+
          '<div class="calendar-box"><div class="calendar-week">'+week_tpl+'</div>'+
          '<div class="calendar-daylist">';
          for(var j=0;j<monthList[i].length+first_day;j++){
            var dateblank = '';
            if(monthList[i][j].curMonth){
              dateblank = '<div class="date-grid'+
              (monthList[i][j].disable?' disable':'')+
              (monthList[i][j].curDate?' active':'')+
              (monthList[i][j].startDate?' start-date':'')+
              (monthList[i][j].endDate?' end-date':'')+
              (monthList[i][j].rangeItem?' range-item':'')+'" data-ymd="'+monthList[i][j].ymd+'">'+
              '<div class="day-item">'+monthList[i][j].date+'</div>'+
              (monthList[i][j].startDate?'<div class="range-tip">'+params.start_text+'</div>':'')+
              (monthList[i][j].endDate?'<div class="range-tip">'+params.end_text+'</div>':'')+
              (monthList[i][j].price&&!monthList[i][j].disable?'<div class="price-item">￥'+monthList[i][j].price+'</div>':'')+
              '</div>';
            }
            date_tpl += '<span class="daylist-blank">'+dateblank+'</span>';
          }
          date_tpl += '</div></div></div>';
        }
        calendarGroup.append(date_tpl);
      },
      prevClick: function () {// 左点击
        self.find(".prev-btn").on("click", function () {
          var month_list;
          var all_month = [];
          self.find(".calendar-item").each(function () {
            var prev_month = new Date(parseInt($(this).find(".calendar-tit").data("year")), parseInt($(this).find(".calendar-tit").data("month")) - 2, 1);
            month_list = calendar.getMonthDay([prev_month]);
            all_month.push(month_list[0]);
          });
          calendar.baseCalendar(all_month);
          calendar.groupEvent();
        })
      },
      nextClick: function () {// 右点击
        self.find(".next-btn").on("click", function () {
          var month_list;
          var all_month = [];
          self.find(".calendar-item").each(function () {
            var next_month = new Date(parseInt($(this).find(".calendar-tit").data("year")), parseInt($(this).find(".calendar-tit").data("month")), 1);
            month_list = calendar.getMonthDay([next_month]);
            all_month.push(month_list[0]);
          });
          calendar.baseCalendar(all_month);
          calendar.groupEvent();
        })
      },
      groupEvent: function () {// 日历事件
        self.find(".date-grid").on("click",function () {
          if (!$(this).hasClass("disable")) {
            var ymd = $(this).data('ymd');
            if (!params.is_range) {
              self.find(".date-grid").removeClass("active");
              $(this).addClass("active");
              curDate = ymd;
            }else{
              var startTip = '<div class="range-tip">'+params.start_text+'</div>';
              var endTip = '<div class="range-tip">'+params.end_text+'</div>';
              if(!startDate){
                $(this).addClass("start-date");
                $(this).append(startTip);
                startDate = ymd
              }else{
                if (new Date(ymd)<new Date(startDate)) {
                  rangeReset($(this))
                } else if (new Date(ymd)>new Date(startDate)){
                  if (!endDate) {
                    var range = (new Date(ymd) - new Date(startDate))/1000/60/60/24+1;
                    if (params.max_range) {
                      if (range > params.max_range){
                        gzui.toast({text: "最大选择"+params.max_range+"天"})
                      }else{
                        endDateSel($(this));
                      }
                    }else{
                      endDateSel($(this));
                    }
                  } else {
                    rangeReset($(this))
                  }
                }
              }
            }
          }
          function rangeReset(e){
            self.find(".date-grid").removeClass("start-date").removeClass("end-date").removeClass("range-item");
            self.find(".range-tip").remove();
            e.addClass("start-date");
            e.append(startTip);
            startDate = ymd;
            endDate = null
          }
          function endDateSel (e) {
            e.removeClass("range-item").addClass("end-date");
            e.append(endTip);
            endDate = ymd;
            self.find(".date-grid").each(function () {
              if (new Date($(this).data('ymd'))>new Date(startDate) && new Date($(this).data('ymd'))<new Date(endDate)) {
                $(this).addClass("range-item");
              }
            })
          }
        }).hover(function () {
          if (params.is_range && startDate && !endDate) {
            var ymd = $(this).data('ymd');
            hover(ymd);
          }
        },function (){
          if (params.is_range && startDate && !endDate) {
            var ymd = $(this).data('ymd');
            hover(ymd);
          }
        });
        function hover(cur){
          self.find(".date-grid").each(function () {
            if (new Date($(this).data('ymd'))>new Date(startDate) && new Date($(this).data('ymd'))<=new Date(cur)) {
              $(this).addClass("range-item");
            }else{
              $(this).removeClass("range-item");
            }
          })
        }
      },
      btnEvent: function () {
        // 确定按钮
        self.find(".sure-btn").on("click", function () {
          if (!params.is_range){
            if (curDate) {
              self.find("input").data("date", curDate);
              params.sureClick(curDate, self);
              self.find("input").val(curDate);
              calendar.hide();
            }else{
              gzui.toast({text: "请选择日期"})
            }
          }else{
            var len = self.find("input").length;
            if(!startDate){
              gzui.toast({text: "请选择"+params.start_text+"日期"})
            }else if(!endDate){
              gzui.toast({text: "请选择"+params.end_text+"日期"})
            }else{
              self.find("input").data("start", startDate).data("end", endDate);
              params.sureClick({start: startDate, end: endDate}, self);
              self.find("input").val(startDate+" 至 "+endDate);
              calendar.hide();
            }
          }
        });
        // 取消按钮
        self.find(".cancel-btn").on("click", function () {
          calendar.hide();
        })
      },
      show: function () {
        self.find(".ecgo-calendar").show();
      },
      hide: function () {
        curDate = null;
        startDate = null;
        endDate = null;
        self.find(".ecgo-calendar").remove();
      },
      autoHide: function () {
        $(document).on("click",function (e) {
          if(self.find(".ecgo-calendar").is(":visible") && self.has(e.target).length===0){
            calendar.hide();
          }
        })
      }
    };
    // 获取一个月的天数
    function getMonthDateNumber(date) {
      var tem_date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return tem_date.getDate();
    }
    // 格式化日期
    function dbDate(date) {
      date = date.toString();
      date = date.length === 1 ? "0" + date : date;
      return date;
    }
    calendar.init()
  };
})(jQuery);
