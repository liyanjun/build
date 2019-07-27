$(function () {

  $('#getV').on('click', function(){
      var sec = 10
  	if(!$(this).hasClass('disable')){
      	$(this).addClass('disable')
        $('#getV').text(sec+' S')
        var count = setInterval(function(){
            sec--
            $('#getV').text(sec+' S')
            if(sec==0){
                clearInterval(count)
                $('#getV').removeClass('disable').text('重新发送')

            }

        },1000)
	}else {
      	return
	}


  })
});