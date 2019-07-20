$(function () {
  "use strict";
	$('.input-item .left').on('click',function(){
	  $(this).find('.check_icon').toggleClass('active');
	});
	
	// 关闭提示
	$('.err-tip .minus_btn').on('click',function(){
		$(this).parent().hide();
	});
	
	
	$('.login-btn').on('click',function(){
        var input_list = $(".login-form input");
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
          	// 验证失败
            if (!check_result[0]) {
              validArr[name]=check_result[1];
              flag++;
            }
          }
          validArr[name]=typeof(validArr[name])!=='undefined'?validArr[name]:true;
        }
        // 验证通过
        if (flag === 0) {
          var res = [];
          $(".login-form  input").each(function (i, e) {
            var input_obj = {name: "", val: ""};
            input_obj.name = $(e).attr("data-name");
            input_obj.val = $(e).val();
            res.push(input_obj);
          }); 
          $(this).siblings('.err-tip').hide();

        }else{
          // tab1空验证
          if(validArr['account']==='不能为空'&&validArr['password']==='不能为空'){
          	$(this).siblings('.err-tip').find('font').text('请输入账户名和密码').parent().show();return;
          // 单个为空
          }else if(validArr['account']==='不能为空'){
          	$(this).siblings('.err-tip').find('font').text('请输入账户名').parent().show();return;
          }else if(validArr['password']==='不能为空'){
          	$(this).siblings('.err-tip').find('font').text('请输入密码').parent().show();return;
          }else if(validArr['validCode']==='不能为空'){
			$(this).siblings('.err-tip').find('font').text('请输入验证码').parent().show();return;
          }
          // tab2验证
          if(validArr['phone']==='不能为空'){
          	$(this).siblings('.err-tip').find('font').text('请输入手机号').parent().show();return;
          }else if(validArr['phone']==='格式不正确'){
          	$(this).siblings('.err-tip').find('font').text('请输入正确的手机号').parent().show();return;
          }else if(validArr['telValid']==='不能为空'){
          	$(this).siblings('.err-tip').find('font').text('请输入手机验证码').parent().show();return;
          }else if(validArr['validCode']==='不能为空'){
			$(this).siblings('.err-tip').find('font').text('请输入验证码').parent().show();return;
          }


          
		}
    });
    // 表单验证
	var gzformcheck = {
	  reg: {
	    // 自游通卡
	    freecard: /\d{4}/,
	    // 手机号
	    phone: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
	    // 邮箱
	    mail: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
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
	};
	// 注册账号
	$(".sign-up-btn .registered-btn").on("click",function(){
    gzui.formPopup({
      title: '申请注册分销商账号',
      saveBtn: '申请',
      cancelBtn: null,
      callbackFn: function(form){
      	console.log(form)
			}
		});
    // $(".com-form-wrp").after("<p style='padding: 0 0 0 50px;color: #666;'>工作人员将会为您注册账号，并尽快联系您。</p>")
	})
});